package com.example.shoppingsite.Controlller;

import com.example.shoppingsite.Model.OrderDetails;
import com.example.shoppingsite.Service.OrderDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/OrderDetailsController")
public class OrderDetailsController {

    @Autowired
    OrderDetailsService orderDetailsService;

    @PostMapping("/addorderdetails")
    public OrderDetails createOrderDetails(@RequestBody OrderDetails orderDetails){
        return orderDetailsService.addOrderDetails(orderDetails);
    }

    @GetMapping("/getAll")
    public List<OrderDetails> getAll(){
        return orderDetailsService.getAll();
    }
}
