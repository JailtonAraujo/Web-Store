package com.br.backend.reporitory;

import com.br.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long > {

    @Modifying
    @Query(value = "update tbl_product set quantity = ?1 where id = ?2")
    public void updateQuantityProduct( int newQuantity, Long ProductId );

    @Query(value=" select quantity from tbl_product where id = ?1")
    public int findQuantityProduct(Long productId);

    @Query(value = " select order from tbl_order order where order.id = ?1 and user.id = ?2")
    public Optional<Order> getOrderDetails(Long orderId, Long userId);

    @Query("select order from tbl_order order where order.id = ?1 and user.id = ?2")
    public Optional<Order> findOrderByIdAndUserId(Long orderId, Long userId);

}
