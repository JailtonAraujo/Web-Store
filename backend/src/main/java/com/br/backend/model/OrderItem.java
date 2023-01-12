package com.br.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity(name = "tbl_orderItem")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem implements Serializable {

    private static final long serialVersionUID = 2349890362481715181L;

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, cascade = CascadeType.MERGE)
    @JoinColumn(name = "product_id")
    @org.hibernate.annotations.ForeignKey(name = "FK_ordemItem_Product")
    private Product product;

    @JsonIgnore
    @ManyToOne(optional = false,cascade = CascadeType.MERGE)
    @JoinColumn(name = "order_id")
    @org.hibernate.annotations.ForeignKey(name = "FK_ordemItem_Order")
    private Order order;

    private int quantity;

}
