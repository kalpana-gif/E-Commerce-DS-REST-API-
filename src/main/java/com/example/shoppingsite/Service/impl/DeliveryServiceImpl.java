//package com.example.shoppingsite.Service.impl;
//
//import com.example.shoppingsite.Model.Delivery;
//import com.example.shoppingsite.Repository.DeliveryRepository;
//import com.example.shoppingsite.Service.DeliveryService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class DeliveryServiceImpl implements DeliveryService {
//
//    @Autowired
//    DeliveryRepository deliveryRepository;
//
//    @Override
//    public Delivery addDelivery(Delivery delivery) {
//        return deliveryRepository.save(delivery);
//    }
//
//    @Override
//    public List<Delivery> getAll() {
//        return deliveryRepository.findAll();
//    }
//}
