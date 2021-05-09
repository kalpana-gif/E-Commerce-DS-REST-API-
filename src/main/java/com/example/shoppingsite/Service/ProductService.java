package com.example.shoppingsite.Service;

import com.example.shoppingsite.Model.Product;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ProductService {

    Product addProduct(Product p);

    void deleteProduct(String id);

    List<Product> getAll();

    Optional<Product> getDetails(String id);

    List<Product> SearchDetails(String productname);

    Product UpdateProduct(Product p);

    List<Product> filterByType(String catogeory);

}
