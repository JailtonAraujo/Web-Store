package com.br.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.br.backend.DTO.ObjectPaginate;
import com.br.backend.model.Product;
import com.br.backend.service.ProductService;

import jakarta.persistence.NoResultException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/product")
public class ProductController {

	@Autowired
	protected ProductService productService;
	
	@GetMapping("/")
	public ResponseEntity<Page<Product>> findAllProducts( @RequestParam(name = "limit",defaultValue = "16") int limit,
			@RequestParam(name="offset", defaultValue = "0") int offset ) throws Exception{
		return ResponseEntity.ok(this.productService.findAllProducts(limit, offset));
	}

	
	@GetMapping("/{id}")
	public ResponseEntity<Product> findById( @PathVariable(value = "id") Long id ){
		
		Optional<Product> optional = this.productService.findById(id);
		
		if(optional.isPresent()) {
			return ResponseEntity.ok(optional.get());
			}
		
		throw new NoResultException("Product not found!");
		
	}
	
	
	@GetMapping("/category")
	public ResponseEntity<Page<Product>> findByCategory( @RequestParam(value = "id") Long categoryId, 
			@RequestParam(name = "offset") int offset) throws Exception{
		
		return ResponseEntity.ok(this.productService.findByCategory(categoryId,offset));
		
	}
	
	@GetMapping("/search")
	public ResponseEntity<Page<Product>> searchProductByNameOrCategory( @RequestParam(name = "limit",defaultValue = "16") int limit,
			@RequestParam(name="offset", defaultValue = "0") int offset, @RequestParam(name = "name") String name) throws Exception{
		
		return ResponseEntity.ok(this.productService.findProductByNameOrCategory(limit, offset, name));
		
	}
}
