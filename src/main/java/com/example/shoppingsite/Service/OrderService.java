package com.example.shoppingsite.Service;

import com.example.shoppingsite.Model.OrderList;

import java.util.List;

//@Service
public interface OrderService {

    OrderList addOrder(OrderList order);

    List<OrderList> getAll();

    void deleteOrder(String id);
}
