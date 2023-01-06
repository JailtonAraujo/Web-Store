package com.br.backend.reporitory;

import com.br.backend.model.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {

    @Query(value = "select cart from tbl_shppingCart cart where cart.user.id = ?1")
    public List<ShoppingCart> findAllByUserId (Long userId);
    @Query(value = "delete from tbl_shpping_cart shop where shop.product_id = ?1 and shop.user_id = ?2", nativeQuery = true)
    @Modifying
    @Transactional
    public void deleteByProductIdAndUserId(Long productId, Long userId);


}
