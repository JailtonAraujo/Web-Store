package com.br.backend.controller;

import com.br.backend.DTO.OrderDTO;
import com.br.backend.exception.QuantityProductException;
import com.br.backend.model.Order;
import com.br.backend.model.OrderItem;
import com.br.backend.model.User;
import net.sf.jasperreports.engine.JRException;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.br.backend.service.OrderService;

import java.time.LocalDate;

@RestController
@RequestMapping("/order")
public class OrderController {

	@Autowired
	protected OrderService pedidoService;

	@PostMapping("/")
	public ResponseEntity<OrderDTO> newOrder (@RequestBody @NotNull Order order, @AuthenticationPrincipal User user) throws QuantityProductException {

		order.setUser(user);

		for ( OrderItem item :
			  order.getItems() ) {
			item.setOrder(order);
		}

		var dto = new OrderDTO(this.pedidoService.newOrder(order));

		return ResponseEntity.ok(dto);
	}

	@GetMapping("/")
	public ResponseEntity<Page<OrderDTO>> getOrdersPaginate(
			@RequestParam(name = "limit") int limit,
			@RequestParam( name = "offset") int offset,
			@AuthenticationPrincipal User user ) throws Exception {

		return ResponseEntity.ok(this.pedidoService.getOrders(limit,offset,user.getId()));
	}

	@GetMapping("/filter")
	public ResponseEntity<Page<OrderDTO>> getOrdersFilterByDatePaginate(
			@RequestParam(name = "date") LocalDate date,
			@RequestParam(name = "limit") int limit,
			@RequestParam( name = "offset") int offset,
			@AuthenticationPrincipal User user) throws Exception {

		return ResponseEntity.ok(this.pedidoService.getOrdersFilterByDate(limit,offset,date,user.getId())) ;
	}

	@GetMapping("/details/{id}")
	public ResponseEntity<OrderDTO> getOrderDetails ( @PathVariable(name = "id") Long id, @AuthenticationPrincipal User user ) {

		return  ResponseEntity.ok(this.pedidoService.getOrderDetails(id, user.getId()));
	}

	@GetMapping(value="/proof/{id}",produces = "application/text")
	public ResponseEntity<String> emitProofOrder( @PathVariable(name = "id") Long id, @AuthenticationPrincipal User user ) throws JRException {

		return ResponseEntity.ok(this.pedidoService.emitProofOrder(id,user.getId()));

	}

}
