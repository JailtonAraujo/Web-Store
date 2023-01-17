package com.br.backend.reporitory;

import com.br.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository <User, Long> {

    @Query(value = "update tbl_user set password = ?1 where id = ?2")
    @Modifying
    @Transactional
    public void updateUserPassword(String newPassword, Long userId);

    public Optional<User> findByUsername(String username);

//    public void changeWallet(Float value);
}
