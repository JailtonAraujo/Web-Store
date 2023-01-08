package com.br.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "tbl_address")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddressDelivery {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20)
    private String cep;

    @Column(length = 3)
    private String uf;

    @Column(length = 80)
    private String city;

    private String logradouro;

    private int number;

    private String complement;

    private String whoReceive;

    @JsonIgnore
    @ManyToOne(optional = false, cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    @org.hibernate.annotations.ForeignKey(name = "FK_tblAddress_tblUser")
    private User user;
}
