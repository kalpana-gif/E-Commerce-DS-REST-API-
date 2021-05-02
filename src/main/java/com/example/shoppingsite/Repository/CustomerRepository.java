package com.example.shoppingsite.Repository;

import com.example.shoppingsite.Model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, String> {
}
