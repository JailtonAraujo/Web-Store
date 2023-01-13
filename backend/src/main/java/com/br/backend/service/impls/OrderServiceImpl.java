package com.br.backend.service.impls;

import com.br.backend.DTO.OrderDTO;
import com.br.backend.exception.QuantityProductException;
import com.br.backend.model.Order;
import com.br.backend.model.OrderItem;
import com.br.backend.reporitory.CustomOrderRepository;
import com.br.backend.reporitory.OrderRepository;
import jakarta.persistence.NoResultException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.br.backend.service.OrderService;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomOrderRepository customOrderRepository;

    @Transactional(rollbackFor = {SQLException.class, RuntimeException.class, QuantityProductException.class})
    @Override
    public Order newOrder(Order order) throws QuantityProductException {

        //Update quantity of all products
        for ( OrderItem item : order.getItems() ) {
            final int quantity = orderRepository.findQuantityProduct(item.getProduct().getId());

            if (quantity < item.getQuantity()) {
                throw new QuantityProductException("insufficient quantity products [ " + item.getProduct().getId() + " ]");
            }
            // decrement product quantity
            orderRepository.updateQuantityProduct((quantity - item.getQuantity()), item.getProduct().getId());
        }
        order.setDate(LocalDate.now());
        return orderRepository.save(order);//Finalize operations
    }

    @Override
    public Page<OrderDTO> getOrders(int limit, int offset, Long userId) throws Exception {
        return customOrderRepository.getOrdersPaginate(limit,offset,userId);
    }

    @Override
    public OrderDTO getOrderDetails(Long orderId, Long userId) {

        Optional<Order>  optional = orderRepository.getOrderDetails(orderId,userId);

        if(optional.isPresent()){

            OrderDTO dto = new OrderDTO(optional.get());

            return dto;
        }

        throw new NoResultException("Order [id:"+orderId+"] not found ");
    }

    @Override
    public Page<OrderDTO> getOrdersFilterByDate(int limit, int offset, LocalDate date, Long userId) throws Exception {
        return customOrderRepository.getOrdersFilterDatePaginate(limit, offset, userId, date);
    }


}
