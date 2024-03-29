package com.br.backend.reporitory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.br.backend.model.Favorite;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorite, Long>{

	@Query(value= " Select favorites from tbl_favorites favorites where favorites.user.id = ?1" )
	public List<Favorite> findByUserId ( Long userId);

	@Transactional
	@Modifying
	@Query(value = "delete from tbl_favorites favorites where favorites.product_id = ?1 and favorites.user_id = ?2", nativeQuery = true)
	public void deleteFavoriteByProductIdAndUserId(Long productId, Long userId);
	
}
