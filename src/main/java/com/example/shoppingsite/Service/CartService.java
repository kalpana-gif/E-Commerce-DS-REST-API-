package com.example.shoppingsite.Service;

import com.example.shoppingsite.Model.Cart;
import com.example.shoppingsite.Model.Customer;
import com.example.shoppingsite.Model.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartService {
    Cart addedToCart(Cart cart);

    //get cart details from cart table
    List<Cart> getAll();

    void deleteProduct(String id);

    Cart avoidrepeat(String id);

    void clearCart(String id);

    List<Product> getAlProducts(String id1);

    //
    List<Product> getAlProductsbyuser(String id1);

    Customer addtoTable(Customer cust);


}
