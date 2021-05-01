package com.example.shoppingsite.Model;

import javax.persistence.Entity;
import javax.persistence.Id;


@Entity
public class Seller {

    @Id
    private Long sellerID;
    private String name;
    private String email;

    public Seller() {
    }

    public Seller(String name, String email) {
        super();
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}
