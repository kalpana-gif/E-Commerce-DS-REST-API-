package com.example.shoppingsite.Controlller;

import com.example.shoppingsite.Model.Delivery;
import com.example.shoppingsite.Repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/DeliveryController")
public class DeliveryController {

    @Autowired
    DeliveryRepository deliveryRepository;

    @PostMapping("/adddelivery")
    public Delivery createDelivery(@RequestBody Delivery delivery){
        return deliveryRepository.save(delivery);
    }

    @GetMapping("/getAll")
    public List<Delivery> getAll(){
        return deliveryRepository.findAll();
    }
}
