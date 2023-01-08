package com.br.backend.reporitory;

import com.br.backend.model.AddressModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<AddressModel, Long> {

    @Query(value = "select address from tbl_address address where address.user.id = ?1")
    public List<AddressModel> findAllByUserId (Long userId);

    @Transactional
    @Modifying
    @Query(value = "delete from tbl_address address where address.id = ?1 and address.user_id = ?2", nativeQuery = true)
    public void deleteByIdAndUserId (Long addressId, Long userId);

}
