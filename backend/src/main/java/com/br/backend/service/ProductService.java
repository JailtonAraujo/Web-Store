package com.br.backend.service;

import java.util.List;
import java.util.Optional;

import com.br.backend.model.Product;

public interface ProductService {

	public List<Product> findAllProducts()throws Exception;
	
	public Optional<Product>findById( Long productId );
	
	public List<Product> findByCategory(Long categoryId) throws Exception;
}
