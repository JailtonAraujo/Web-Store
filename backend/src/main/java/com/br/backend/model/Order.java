package com.br.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Entity(name = "tbl_order")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order implements Serializable {

    private static final long serialVersionUID = 3336484911725567498L;

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany(orphanRemoval = true, cascade = CascadeType.ALL, mappedBy = "order")
    private List<OrderItem> items;

    @ManyToOne(optional = false,cascade =  CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    @org.hibernate.annotations.ForeignKey(name = "FK_Order_User")
    private User user;

    private float valueItems;

    private float frete;

}
