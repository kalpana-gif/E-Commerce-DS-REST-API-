package com.example.shoppingsite.Service.impl;

import com.example.shoppingsite.Model.Product;
import com.example.shoppingsite.Repository.ProductRepository;
import com.example.shoppingsite.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product addProduct(Product p) {
        return productRepository.save(p);
    }

    @Override
    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }


    @Override
    public List<Product> getAll() {
        return productRepository.findAll();
    }


    @Override
    public Optional<Product> getDetails(String id) {
        return productRepository.findById(id);
    }

    @Override
    public List<Product> SearchDetails(String productname) {
        return productRepository.search(productname);
    }


    @Override
    public Product UpdateProduct(Product p) {
        return productRepository.save(p);
    }

    @Override
    public List<Product> filterByType(String catogeory) {
        return productRepository.findByCategory(catogeory);
    }


}
