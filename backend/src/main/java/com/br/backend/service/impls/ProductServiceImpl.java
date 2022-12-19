package com.br.backend.service.impls;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.br.backend.DTO.ObjectPaginate;
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
	public Page<Product> findAllProducts(int limit, int offset) throws Exception {
		
		return customProductRepository.findAllProductsPagination(limit, offset);
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
