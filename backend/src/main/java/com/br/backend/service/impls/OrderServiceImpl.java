package com.br.backend.service.impls;

import com.br.backend.DTO.OrderDTO;
import com.br.backend.DTO.OrderReport;
import com.br.backend.exception.QuantityProductException;
import com.br.backend.model.Order;
import com.br.backend.model.OrderItem;
import com.br.backend.reporitory.CustomOrderRepository;
import com.br.backend.reporitory.OrderRepository;
import com.br.backend.reporitory.UserRepository;
import com.br.backend.service.ReportService;
import jakarta.persistence.NoResultException;
import net.sf.jasperreports.engine.JRException;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.br.backend.service.OrderService;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ReportService reportService;

    @Autowired
    private CustomOrderRepository customOrderRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional(rollbackFor = {SQLException.class, RuntimeException.class, QuantityProductException.class})
    @Override
    public Order newOrder(Order order) throws QuantityProductException {

        //Update quantity of all products
        for ( OrderItem item : order.getItems() ) {
            final int quantity = orderRepository.findQuantityProduct(item.getProduct().getId());

            if (quantity < item.getQuantity()) {
                throw new QuantityProductException("insufficient quantity products [ " + item.getProduct().getId() + " ]");
            }
            // decrement product quantity
            orderRepository.updateQuantityProduct((quantity - item.getQuantity()), item.getProduct().getId());
        }
        order.setDate(LocalDate.now());
        final Float valueTotal = (order.getValueItems()+order.getFrete());

        if(valueTotal > order.getUser().getWallet()){
             throw new ArithmeticException("Insulficiente balance!");
        }

        //Decrement wallet balance user
        userRepository.changeWallet((order.getUser().getWallet()-valueTotal),order.getUser().getId());

        return orderRepository.save(order);//Finalize operations
        //decrement wallet user
    }

    @Override
    public Page<OrderDTO> getOrders(int limit, int offset, Long userId) throws Exception {
        return customOrderRepository.getOrdersPaginate(limit,offset,userId);
    }

    @Override
    public OrderDTO getOrderDetails(Long orderId, Long userId) {

        Optional<Order>  optional = orderRepository.getOrderDetails(orderId,userId);

        if(optional.isPresent()){

            OrderDTO dto = new OrderDTO(optional.get());

            return dto;
        }

        throw new NoResultException("Order [id:"+orderId+"] not found ");
    }

    @Override
    public Page<OrderDTO> getOrdersFilterByDate(int limit, int offset, LocalDate date, Long userId) throws Exception {
        return customOrderRepository.getOrdersFilterDatePaginate(limit, offset, userId, date);
    }

    @Override
    public String emitProofOrder(Long orderId, Long userId) throws JRException {

        var optional = orderRepository.findOrderByIdAndUserId(orderId,userId);

        if(!optional.isPresent()){
           throw new NoResultException("Order not found!");
        }

//        String tempDate = optional.get().getDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
//
//        optional.get().setDate(LocalDate.parse(tempDate,DateTimeFormatter.ofPattern("dd/MM/yyyy")));

        OrderReport orderReport = new OrderReport(optional.get());
        var list = new ArrayList<OrderReport>();
        list.add(orderReport);

        String proof = "data:application/pdf;base64,"+ Base64.encodeBase64String(reportService.generatedReport(list,"proof-report"));

        return proof;
    }


}
