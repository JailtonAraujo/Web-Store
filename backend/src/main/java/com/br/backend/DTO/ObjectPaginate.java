package com.br.backend.DTO;

import java.io.Serializable;

import lombok.Data;

@Data
public class ObjectPaginate implements Serializable{

	private static final long serialVersionUID = 1L;
	
	//can it be a ID, Name, Category and etc
	private String criteriaToSsearch;
	
	private int limit;
	
	private int offset;

}
