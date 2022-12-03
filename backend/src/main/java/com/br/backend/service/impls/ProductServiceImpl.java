package com.br.backend.service.impls;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.backend.model.Product;
import com.br.backend.reporitory.ProductRepositoty;
import com.br.backend.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired
	protected ProductRepositoty productRepositoty;

	
	@Override
	public List<Product> findAllProducts() {
		
		return productRepositoty.findAll();
	}


	@Override
	public Optional<Product> findById(Long productId) {
		
		return productRepositoty.findById(productId);
	}

}
