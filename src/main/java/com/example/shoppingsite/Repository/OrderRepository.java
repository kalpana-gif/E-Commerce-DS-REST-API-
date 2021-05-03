package com.example.shoppingsite.Repository;

import com.example.shoppingsite.Model.OrderList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface OrderRepository extends JpaRepository<OrderList, String> {


    @Modifying
    @Transactional
    @Query(value = "DELETE from Order_List where order_id=?1 ", nativeQuery = true)
    void deleteOrder(String id);

}
