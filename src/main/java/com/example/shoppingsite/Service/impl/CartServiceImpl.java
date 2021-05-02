package com.example.shoppingsite.Service.impl;

import com.example.shoppingsite.Model.Cart;
import com.example.shoppingsite.Model.Customer;
import com.example.shoppingsite.Model.Product;
import com.example.shoppingsite.Repository.CartRepository;
import com.example.shoppingsite.Repository.CustomerRepository;
import com.example.shoppingsite.Repository.ProductRepository;
import com.example.shoppingsite.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CustomerRepository customerRepository;


    @Override
    public Cart addedToCart(Cart cart) {

        ArrayList<Product> productArrayList = new ArrayList<>();
        System.out.println("size:" + this.getAlProducts(cart.getCustomer().getCustId()).size());
        this.getAlProducts(cart.getCustomer().getCustId()).forEach(
                //lamda experssion
                product -> {
                    if (cart.getProduct().getId().equals(product.getId()))
                        productArrayList.add(product);
                    System.out.println("Product:" + product.getId());
                }
        );
        if (productArrayList.size() == 0)
            return cartRepository.save(cart);
        else
            return cart;
    }

    //get all the details of cart
    @Override
    public List<Cart> getAll() {
        return cartRepository.findAll();
    }

    @Override
    public void deleteProduct(String id) {
        cartRepository.deleteProduct(id);
    }

    @Override
    public Cart avoidrepeat(String id) {
        cartRepository.avoidrepeatItems(id);
        return null;
    }

    @Override
    public void clearCart(String id) {
        cartRepository.clearCart(id);
    }

//    @Override
//    public void deleteProduct(long  id) {
//        String t= String.valueOf(id);
//        cartRepository.deleteById(t);
//
//    }


    @Override
    public List<Product> getAlProducts(String customerId) {
        List<Object[]> ob = productRepository.getAllBy(customerId);
        List<Product> item = new ArrayList<>();


        for (Object s2[] : ob) {
            Product product = new Product();

            product.setId(s2[0].toString());
            product.setBrand(s2[1].toString());
            product.setDescription(s2[2].toString());
            product.setPicture((byte[]) s2[3]);
            product.setPrice(Double.parseDouble(s2[4].toString()));
            product.setProductname(s2[5].toString());
            product.setQty(Integer.parseInt(s2[6].toString()));


            item.add(product);

        }
        return item;
    }

    @Override
    public List<Product> getAlProductsbyuser(String id1) {

        List<Object[]> ob = productRepository.getAlProductsbyuser(id1);
        List<Product> item = new ArrayList<>();


        for (Object s2[] : ob) {
            Product product = new Product();

            product.setId(s2[0].toString());
            product.setBrand(s2[1].toString());
            product.setDescription(s2[2].toString());
            product.setPicture((byte[]) s2[3]);
            product.setPrice(Double.parseDouble(s2[4].toString()));
            product.setProductname(s2[5].toString());
            product.setQty(Integer.parseInt(s2[6].toString()));


            item.add(product);

        }
        return item;
    }

    @Override
    public Customer addtoTable(Customer cust) {

        return customerRepository.save(cust);
    }


}
