package com.br.backend.reporitory;

import com.br.backend.model.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {

    @Query(value = "select cart from tbl_shppingCart cart where cart.user.id = ?1")
    public List<ShoppingCart> findAllByUserId (Long userId);
}
