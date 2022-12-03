package com.br.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.backend.model.Product;
import com.br.backend.service.ProductService;

import jakarta.persistence.NoResultException;

@RestController
@RequestMapping(value = "/product")
public class ProductController {

	@Autowired
	protected ProductService productService;
	
	@GetMapping("/")
	public ResponseEntity<List<Product>> findAllProducts(){
		return ResponseEntity.ok(this.productService.findAllProducts());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Product> findById( @PathVariable(value = "id") Long id ){
		
		Optional<Product> optional = this.productService.findById(id);
		
		if(optional.isPresent()) {
			return ResponseEntity.ok(optional.get());
			}
		
		throw new NoResultException("Product not found!");
		
	}
	
	
	@GetMapping("/category/{id}")
	public ResponseEntity<List<Product>> findByCategory( @PathVariable(value = "id") Long categoryId ) throws Exception{
		
		return ResponseEntity.ok(this.productService.findByCategory(categoryId));
		
	}
}
