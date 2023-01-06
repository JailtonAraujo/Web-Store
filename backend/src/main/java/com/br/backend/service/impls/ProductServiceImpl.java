package com.br.backend.service.impls;

import java.util.Optional;

import com.br.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.br.backend.model.Product;
import com.br.backend.reporitory.CustomProductRepository;
import com.br.backend.reporitory.ProductRepositoty;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	protected ProductRepositoty productRepositoty;
	
	@Autowired
	protected CustomProductRepository customProductRepository;

	
	@Override
	public Page<Product> findAllProducts(int limit, int offset) throws Exception {
		
		return customProductRepository.findAllProductsPagination(limit, offset);
	}


	@Override
	public Optional<Product> findById(Long productId) {
		
		return productRepositoty.findById(productId);
	}


	@Override
	public Page<Product> findByCategory(Long categoryId,int offset) throws Exception {
		
		return customProductRepository.findByCategory(categoryId,offset);
	}


	@Override
	public Page<Product> findProductByNameOrCategory(int limit, int offset, String name) throws Exception {
		
		return customProductRepository.findProductByNameOrCategory(limit, offset, name);
	}

}
