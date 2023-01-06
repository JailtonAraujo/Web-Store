package com.br.backend.reporitory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.br.backend.model.Favorite;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorite, Long>{

	@Query(value= " Select favorites from tbl_favorites favorites where favorites.user.id = ?1" )
	public List<Favorite> findByUserId ( Long userId);
	
}
