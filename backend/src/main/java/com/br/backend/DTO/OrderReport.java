package com.br.backend.DTO;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.br.backend.model.Order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderReport implements Serializable{


    private static final long serialVersionUID = 3106415551386821588L;

    public  OrderReport(Order order){
        this.id = order.getId();
        this.Date = order.getDate();
        this.frete = order.getFrete();
        this.valueItems = order.getValueItems();
        this.user = new CurrentUserDTO(order.getUser());

        if(order.getItems() != null){
        this.items = order.getItems().stream().map( orderItem -> new OrderItemDTO(orderItem)).collect(Collectors.toList());
        }else {
            this.items = new ArrayList<OrderItemDTO>();
        }
    }

    private long id;
    
    private CurrentUserDTO user;

    private List<OrderItemDTO> items;

    private float valueItems;

    private float frete;

    private LocalDate Date;
}
