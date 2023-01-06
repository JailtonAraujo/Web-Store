package com.br.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.backend.model.Favorite;
import com.br.backend.model.Product;
import com.br.backend.model.User;
import com.br.backend.service.FavoriteService;

@RestController
@RequestMapping(value="/favorites")
public class FavoritesController {
	
	@Autowired
	protected FavoriteService favoriteService;

	@PostMapping("/")
	public ResponseEntity<Boolean> addProductInFavorites ( @RequestBody Product product ){
		
		User user = new User();
		user.setId(1L);
		
		Favorite favorite = new Favorite().builder().product(product).user(user).build();
		
		this.favoriteService.addProductInFavorites(favorite);
		
		return new ResponseEntity<Boolean>(true,HttpStatus.CREATED);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<Product>> getFavorites() {
		
		return ResponseEntity.ok(this.favoriteService.getFavorites(1L));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> removeFavorite ( @PathVariable(name = "id") Long id ){

		return ResponseEntity.ok(this.favoriteService.removeFavorite(id, 1L));
	}
	
}
