package com.example.shoppingsite.Model;

import javax.persistence.*;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cid;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Customer customer;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Product product;


    public void setCid(int cid) {
        this.cid = cid;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
