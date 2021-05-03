package com.example.shoppingsite.Service.impl;

import com.example.shoppingsite.Model.OrderList;
import com.example.shoppingsite.Model.Product;
import com.example.shoppingsite.Repository.OrderRepository;
import com.example.shoppingsite.Repository.ProductRepository;
import com.example.shoppingsite.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ProductRepository productRepository;

    @Override
    public OrderList addOrder(OrderList order) {

        Product product = productRepository.findById(order.getProduct_id()).get();
        // when the order is purchursed it auto change in the product_table
        product.setQty(product.getQty() - Integer.parseInt(order.getQty()));
        //save updated data in order
        productRepository.save(product);
        //save data in order list
        return orderRepository.save(order);
    }

    @Override
    public List<OrderList> getAll() {
        return orderRepository.findAll();
    }

    @Override
    public void deleteOrder(String id) {
        orderRepository.deleteOrder(id);
    }
}
