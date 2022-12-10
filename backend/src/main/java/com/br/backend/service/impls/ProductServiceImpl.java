package com.br.backend.service.impls;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.backend.model.Product;
import com.br.backend.reporitory.CustomProductRepository;
import com.br.backend.reporitory.ProductRepositoty;
import com.br.backend.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired
	protected ProductRepositoty productRepositoty;
	
	@Autowired
	protected CustomProductRepository customProductRepository;

	
	@Override
	public List<Product> findAllProducts() throws Exception {
		
		return customProductRepository.findAllProductsPagination();
	}


	@Override
	public Optional<Product> findById(Long productId) {
		
		return productRepositoty.findById(productId);
	}


	@Override
	public List<Product> findByCategory(Long categoryId) throws Exception {
		
		return customProductRepository.findByCategory(categoryId);
	}

}
