package com.example.shoppingsite.Controlller;

import com.example.shoppingsite.Model.OrderList;
import com.example.shoppingsite.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//import com.ITP.IFKFbackend.model.Order;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/OrderController")
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping("/Order")
    public OrderList addOrder(@RequestParam("productname") String productname, @RequestParam("id") String id,
                              @RequestParam("total") String total, @RequestParam("purchase_date") String purchase_date,
                              @RequestParam("Qty") String qty) {

        OrderList order = new OrderList();
        order.setTotal_amount(total);
        order.setProductname(productname);
        order.setCustomer_id(id);
        order.setPurchase_date(purchase_date);
        order.setQty(qty);

        return orderService.addOrder(order);

    }

    @GetMapping("/getAll")
    public List<OrderList> getAll() {
        return orderService.getAll();
    }


    @DeleteMapping("/deleteItem/{id}")
    void deleteOrder(@PathVariable String id) {

        System.out.println(id);
        orderService.deleteOrder(id);

    }

}
