package com.br.backend.reporitory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.br.backend.model.Product;

@Repository
public interface ProductRepositoty extends JpaRepository<Product,Long>{
	
//	@Query("select p from tbl_product p where tbl_product.category_id = ?1")
//	public List<Product> findByCategory (Long categoryId);

}
