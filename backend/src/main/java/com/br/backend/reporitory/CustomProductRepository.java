package com.br.backend.reporitory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.br.backend.model.ImgProduct;
import com.br.backend.model.Product;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.Query;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CustomProductRepository {

	@Autowired
	private EntityManager entityManager;
	
	
	public List<Product> findByCategory(Long categoryId) throws Exception{
		
		
		Query query = entityManager.createNativeQuery("select tbl_product.id, tbl_product.name, tbl_product.price, tbl_imgproduct.url as imgProduct\r\n"
				+ "from tbl_product\r\n"
				+ "inner join tbl_imgproduct on tbl_imgproduct.product_id = tbl_product.id\r\n"
				+ "inner join tbl_category on tbl_product.category_id = tbl_category.id\r\n"
				+ "where tbl_category.id = ?");
		query.setParameter(1, categoryId);
		
		
		try {
			
			List<Object[]> objects = query.setMaxResults(10).getResultList();
			
			List<Product> products = new ArrayList<Product>();
			
			
			for(Object [] object : objects  ) {
				
				Product product = new Product().builder().id(Long.parseLong(object[0].toString()))
						.name(object[1].toString()).price(Double.valueOf(object[2].toString())).build();
				
				
				
				ImgProduct imgProduct = new ImgProduct().builder().url(object[3].toString()).build();
				
				
				
				product.setImage(imgProduct);
				
				products.add(product);
			}
			
			return products;
			
		} catch (Exception e) {
			throw new Exception(e);
		}
		
	}
	
	public List<Product> findAllProductsPagination() throws Exception {
		
		Query query = entityManager.createNativeQuery("select tbl_product.id, tbl_product.name, tbl_product.price, tbl_imgproduct.url as imgProduct\r\n"
				+ "from tbl_product\r\n"
				+ "inner join tbl_imgproduct on tbl_imgproduct.product_id = tbl_product.id\r\n"
				+ "inner join tbl_category on tbl_product.category_id = tbl_category.id\r\n");
		
		try {
			
			List<Object[]> objects = query.setMaxResults(16).getResultList();
			
			List<Product> products = new ArrayList<Product>();
			
			for (Object [] object : objects) {
				
				Product product = new Product().builder().id(Long.parseLong(object[0].toString()))
						.name(object[1].toString()).price(Double.valueOf(object[2].toString())).build();
				
				
				ImgProduct imgProduct = new ImgProduct().builder().url(object[3].toString()).build();
				
				
				
				product.setImage(imgProduct);
				
				products.add(product);
				
			}
			
			return products;
			
		} catch (Exception e) {
			throw new Exception(e);
		}
	}
	
}
