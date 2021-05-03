//package com.example.shoppingsite.Repository;
//
//import com.example.shoppingsite.Model.Payment;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//interface paymentRepository extends JpaRepository<Payment, Long> {
//
//    List<Payment> findBystudentID(String studentID);
//
//    @Query("From Payment p WHERE p.customerID= :searchText ORDER BY p.customerID DESC")
//    List<Payment> searchQuery(@Param("searchText") String studentID);
//
//
//}
