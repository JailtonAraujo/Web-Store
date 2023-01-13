package com.br.backend.service;

import com.br.backend.DTO.OrderDTO;
import com.br.backend.exception.QuantityProductException;
import com.br.backend.model.Order;
import org.springframework.data.domain.Page;

import java.time.LocalDate;

public interface OrderService {

    public Order newOrder (Order order) throws QuantityProductException;

    public Page<OrderDTO> getOrders (int limit, int offset, Long serId) throws Exception;

    public OrderDTO getOrderDetails ( Long orderId, Long userId );

    public Page<OrderDTO> getOrdersFilterByDate(int limit, int offset, LocalDate date, Long userId) throws Exception;

}
