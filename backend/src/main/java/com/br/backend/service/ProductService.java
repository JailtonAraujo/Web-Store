package com.br.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import com.br.backend.DTO.ObjectPaginate;
import com.br.backend.model.Product;

public interface ProductService {

	public Page<Product> findAllProducts(int limit, int offset)throws Exception;
	
	public Optional<Product>findById( Long productId );
	
	public List<Product> findByCategory(Long categoryId) throws Exception;
	
	public Page<Product> findProductByNameOrCategory (int limit, int offset, String name)throws Exception;
}
