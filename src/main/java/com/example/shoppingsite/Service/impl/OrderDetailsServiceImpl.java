//package com.example.shoppingsite.Service.impl;
//
//import com.example.shoppingsite.Model.OrderDetails;
//import com.example.shoppingsite.Repository.OrderDetailsRepository;
//import com.example.shoppingsite.Service.OrderDetailsService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class OrderDetailsServiceImpl implements OrderDetailsService {
//
//    @Autowired
//    OrderDetailsRepository orderDetailsRepository;
//
//    @Override
//    public OrderDetails addOrderDetails(OrderDetails orderDetails) {
//        return orderDetailsRepository.save(orderDetails);
//    }
//
//    @Override
//    public List<OrderDetails> getAll() {
//        return orderDetailsRepository.findAll();
//    }
//}
