package com.br.backend.service;

import java.util.List;

import com.br.backend.model.Favorite;
import com.br.backend.model.Product;

public interface FavoriteService {

	public void addProductInFavorites (Favorite favorite);
	
	public List<Product> getFavorites ( Long userId );
	
	//Remember verify if the favorite belong at the user 
	public Boolean removeFavorite(Long favoriteId);
	
}
