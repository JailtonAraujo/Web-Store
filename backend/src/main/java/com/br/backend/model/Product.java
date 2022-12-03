package com.br.backend.model;

import java.io.Serializable;
import java.util.List;

import org.hibernate.annotations.ForeignKey;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "tbl_product")
public class Product implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String descrition;
	
	@Column(nullable = false)
	private Double price;
	
	@Column(nullable = false)
	private Boolean isNew;
	
	@Column(nullable = false)
	private Integer quantity;
	
	@ManyToOne(cascade = CascadeType.MERGE, optional = false, fetch = FetchType.EAGER)
	@JoinColumn(name = "category_id")
	@ForeignKey(name = "FK_tblcategory_tblproduct")
	private Category category;
	
	@OneToMany(mappedBy = "product",cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<ImgProduct> images;

}
