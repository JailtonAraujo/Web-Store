package com.br.backend.DTO;

import com.br.backend.model.Order;
import com.br.backend.model.OrderItem;
import com.br.backend.model.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemDTO implements Serializable {

    private static final long serialVersionUID = -4541863223257506037L;

    public OrderItemDTO (OrderItem item){
        this.id = item.getId();
        this.product = item.getProduct();
        this.quantity = item.getQuantity();
    }

    private Long id;

    private Product product;

    private int quantity;
}
