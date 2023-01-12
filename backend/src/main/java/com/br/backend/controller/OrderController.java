package com.br.backend.controller;

import com.br.backend.DTO.OrderDTO;
import com.br.backend.exception.QuantityProductException;
import com.br.backend.model.Order;
import com.br.backend.model.OrderItem;
import com.br.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.br.backend.service.OrderService;

import java.time.LocalDate;

@RestController
@RequestMapping("/order")
public class OrderController {

	@Autowired
	protected OrderService pedidoService;

	@PostMapping("/")
	public ResponseEntity<Order> newOrder ( @RequestBody Order order ) throws QuantityProductException {

		User user = new User();
		user.setId(1L);

		order.setUser(user);

		for ( OrderItem item :
			  order.getItems() ) {
			item.setOrder(order);
		}

		return ResponseEntity.ok(this.pedidoService.newOrder(order));
	}

	@GetMapping("/")
	public ResponseEntity<Page<OrderDTO>> getOrdersPaginate(
			@RequestParam(name = "limit") int limit,
			@RequestParam( name = "offset") int offset) throws Exception {

		return ResponseEntity.ok(this.pedidoService.getOrders(limit,offset, LocalDate.now(),1L));
	}

	@GetMapping("/details/{id}")
	public ResponseEntity<OrderDTO> getOrderDetails ( @PathVariable(name = "id") Long id ) {

		return  ResponseEntity.ok(this.pedidoService.getOrderDetails(id,1L));
	}

}
