package com.br.backend.model;

import java.io.Serializable;

import org.hibernate.annotations.ForeignKey;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "tbl_favorites")
public class Favorite implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(cascade = CascadeType.MERGE, optional = false)
	@JoinColumn(name = "product_id")
	@ForeignKey(name = "FK_tblFavorite_Product")
	private Product product;
	
	@ManyToOne(cascade = CascadeType.MERGE, optional = false)
	@JoinColumn(name = "user_id")
	@ForeignKey(name = "FK_tblFavorite_tblUser")
	private User user;

}
