package com.example.shoppingsite.Service;

import com.example.shoppingsite.Model.OrderDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderDetailsService {

    OrderDetails addOrderDetails (OrderDetails orderDetails);

    List<OrderDetails> getAll();
}
