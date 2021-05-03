package com.example.shoppingsite.Repository;

import com.example.shoppingsite.Model.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, String> {

}
