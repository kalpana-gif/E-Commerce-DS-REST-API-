package com.example.shoppingsite.Controlller;

import com.example.shoppingsite.Model.Cart;
import com.example.shoppingsite.Model.Customer;
import com.example.shoppingsite.Model.Product;
import com.example.shoppingsite.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/CartController")
public class CartController {

    @Autowired
    private CartService cartService;


    @PostMapping("/CartItems/{id}/{customerId}")
    public Cart addedToCart(@PathVariable String id, @PathVariable("customerId") String CID) {

        Cart cart = new Cart();
        Product p = new Product();
        p.setId(id);
        Customer c = new Customer();
        c.setCustId(CID);
        cart.setCustomer(c);
        cart.setProduct(p);

//        Cart avoidrepeat = cartService.avoidrepeat(id);


        return cartService.addedToCart(cart);


    }
//
//    @PostMapping("/checkCartItems/{id}/{customerId}")
//    public Cart checkcart(@PathVariable String id, @PathVariable ("customerId")String CID){
//
//        return cartService.avoidrepeat(id);
//
//
//    }


//    @GetMapping("/GetCartItems")
//    public List<Product> getAll() {
//        return cartService.getAlProducts("C001");
//    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    @GetMapping("/GetCartItems/{id1}")
    public List<Product> getAllbyuser(@PathVariable String id1) {
        return cartService.getAlProducts(id1);
    }

    @PostMapping("/saveCustomer/{id1}")
    public Customer addtoTabele(@PathVariable String id1) {
        Customer cust = new Customer();
        cust.setCustId(id1);

        return cartService.addtoTable(cust);
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    @DeleteMapping("/deleteItem/{id}")
    void deleteProduct(@PathVariable String id) {

//        System.out.println("AAAAAAAAA"+id);
        cartService.deleteProduct(id);

    }


    @DeleteMapping("/deleteItemAuto/{id}")
    void deleteProductAuto(@PathVariable String id) {

        System.out.println("BBBBB" + id);
        cartService.clearCart(id);

    }


}
