package com.example.shoppingsite.Repository;

import com.example.shoppingsite.Model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;


public interface CartRepository extends JpaRepository<Cart, String> {

    @Modifying
    @Transactional
    @Query(value = "DELETE from cart where customer_cust_id=:id ", nativeQuery = true)
    void deleteProduct(String id);


    @Query(value = "SELECT product_id from cart where product_id=:id ", nativeQuery = true)
    List<Cart> avoidrepeatItems(@Param("id") String id);

    @Modifying
    @Transactional
    @Query(value = "DELETE from cart where product_id=:id ", nativeQuery = true)
    void clearCart(@Param("id") String id);
}
