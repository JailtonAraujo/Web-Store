package com.br.backend.reporitory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.backend.model.Product;

@Repository
public interface ProductRepositoty extends JpaRepository<Product,Long>{

}
