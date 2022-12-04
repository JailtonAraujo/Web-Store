package com.br.backend.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "tbl_custumer")
public class Customer extends Person implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Column(nullable = false)
	private String CPF;
	
	@Column(nullable = false)
	private String username;
	
	@Column(nullable = false)
	private String password;

}
