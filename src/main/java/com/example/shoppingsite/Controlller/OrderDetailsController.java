package com.example.shoppingsite.Controlller;

import com.example.shoppingsite.Model.OrderDetails;
import com.example.shoppingsite.Repository.OrderDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/OrderDetailsController")
public class OrderDetailsController {

    @Autowired
    OrderDetailsRepository orderDetailsRepository;

    @PostMapping("/addorderdetails")
    public OrderDetails createOrderDetails(@RequestBody OrderDetails orderDetails){
        return orderDetailsRepository.save(orderDetails);
    }

    @GetMapping("/getAll")
    public List<OrderDetails> getAll(){
        return orderDetailsRepository.findAll();
    }
}
