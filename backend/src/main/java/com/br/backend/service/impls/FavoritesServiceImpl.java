package com.br.backend.service.impls;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.backend.model.Favorite;
import com.br.backend.model.Product;
import com.br.backend.reporitory.FavoritesRepository;
import com.br.backend.service.FavoriteService;

@Service
public class FavoritesServiceImpl implements FavoriteService{
	
	@Autowired
	protected FavoritesRepository favoritesRepository;

	@Override
	public void addProductInFavorites(Favorite favorite) {

		favoritesRepository.save(favorite);
		
	}

	@Override
	public List<Product> getFavorites(Long userId) {
		
		List<Favorite> favorites = favoritesRepository.findByUserId(userId);
		
		List<Product> products = favorites.stream().map( obj -> obj.getProduct() ).collect(Collectors.toList());
		
		return products;
	}

	@Override
	public Boolean removeFavorite(Long productId, Long userId) {
		favoritesRepository.deleteFavoriteByProductIdAndUserId(productId, userId);
		return true;
	}
	
	

}
