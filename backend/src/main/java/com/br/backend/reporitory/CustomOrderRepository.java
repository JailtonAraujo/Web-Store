package com.br.backend.reporitory;

import com.br.backend.DTO.OrderDTO;
import com.br.backend.model.Order;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class CustomOrderRepository {

    @Autowired
    private EntityManager entityManager;

    public Page<OrderDTO> getOrdersPaginate (int limit, int offset, Long userId) throws Exception {

        Query query = entityManager.createNativeQuery("select id, value_items, date, frete from tbl_order where user_id = ?");
        query.setParameter(1,userId);

        try {


            List<Object[]> listObjs = query.setMaxResults(limit).setFirstResult(offset).getResultList();

            List<Order> orders = new ArrayList<Order>();

            for ( Object[] obj : listObjs){
                Order order = new Order().builder().id( Long.parseLong( obj[0].toString() ))
                        .valueItems( Float.valueOf( obj[1].toString()))
                        .Date( LocalDate.parse( obj[2].toString(), DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                        .frete( Float.valueOf( obj[3].toString())).build();
                orders.add(order);
            }

            List<OrderDTO> dtos = orders.stream().map( order -> new OrderDTO(order) ).collect(Collectors.toList());

            Page<OrderDTO> page = new PageImpl<OrderDTO>( dtos, PageRequest.of(0, limit), countAllOrdersByUserId(userId));

            return page;


        }catch ( Exception ex){
            throw new Exception(ex);
        }


    }

    //Find orders and filter by date
    public Page<OrderDTO> getOrdersFilterDatePaginate (int limit, int offset, Long userId, LocalDate date) throws Exception {

        Query query = entityManager.createNativeQuery("select id, value_items, date, frete from tbl_order where user_id = ? and date = ?");
        query.setParameter(1,userId);
        query.setParameter(2,date);

        try {


            List<Object[]> listObjs = query.setMaxResults(limit).setFirstResult(offset).getResultList();

            List<Order> orders = new ArrayList<Order>();

            for ( Object[] obj : listObjs){
                Order order = new Order().builder().id( Long.parseLong( obj[0].toString() ))
                        .valueItems( Float.valueOf( obj[1].toString()))
                        .Date( LocalDate.parse( obj[2].toString(), DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                        .frete( Float.valueOf( obj[3].toString())).build();
                orders.add(order);
            }

            List<OrderDTO> dtos = orders.stream().map( order -> new OrderDTO(order) ).collect(Collectors.toList());

            Page<OrderDTO> page = new PageImpl<OrderDTO>( dtos, PageRequest.of(0, limit), countAllOrdersByUserIdAndDate(userId,date));

            return page;


        }catch ( Exception ex){
            throw new Exception(ex);
        }


    }


    public Integer countAllOrdersByUserId (Long userId){

        Query query = entityManager.createNativeQuery(" select count(1) from tbl_order where user_id = ?");
        query.setParameter(1, userId);

        int value = Integer.valueOf(query.getSingleResult().toString());

        return  value;

    }

    public Integer countAllOrdersByUserIdAndDate (Long userId, LocalDate date){

        Query query = entityManager.createNativeQuery(" select count(1) from tbl_order where user_id = ? and date = ?");
        query.setParameter(1, userId);
        query.setParameter(2, date);

        int value = Integer.valueOf(query.getSingleResult().toString());

        return  value;

    }

}
