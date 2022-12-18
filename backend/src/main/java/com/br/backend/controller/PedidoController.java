package com.br.backend.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.br.backend.service.PedidoService;

@RestController
@RequestMapping("/order")
public class PedidoController {

	@Autowired
	protected PedidoService pedidoService;

	@GetMapping("/frete-prazo")
		public ResponseEntity<String> calcFretePrazo( @RequestParam("cepDestino") String cepDestino ) throws IOException, InterruptedException {

		return ResponseEntity.ok(this.pedidoService.calcFretePrazo("70002900", cepDestino).toString());
	}
}
