package com.example.shoppingsite.Repository;

import com.example.shoppingsite.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, String> {

    @Query(value = "select p.id,p.brand,p.description,p.picture,p.price,p.productname ,c.cid " +
            "from cart c ,product p " +
            "where p.id=c.product_id and c.customer_cust_id = :id ", nativeQuery = true)
    List<Object[]> getAllBy(@Param("id") String id);


//    @Query(value = "select p.id,p.brand,p.description,p.picture,p.price,p.productname,p.catogeory,p.qty " +
//            "from product p " +
//            "where p.id=:keyword or p.productname=:keyword  or p.brand=:keyword or p.id like :keyword% or p.brand like :keyword% or  p.productname LIKE :keyword%", nativeQuery = true)
//    List<Product> search(@Param("keyword") String productname);

    @Query(value = "select p.id,p.brand,p.description,p.picture,p.price,p.productname,p.catogeory,p.qty " +
            "from product p " +
            "where p.id LIKE %:keyword% or p.productname LIKE %:keyword%", nativeQuery = true)
    List<Product> search(@Param("keyword") String productname);

    @Query(value = "select p.id,p.brand,p.description,p.picture,p.price,p.productname ,c.cid " +
            "from cart c ,product p " +
            "where p.id=c.product_id and c.customer_cust_id = :id1 ", nativeQuery = true)
    List<Object[]> getAlProductsbyuser(@Param("id1") String id1);

    @Query(value = "select * from product p where p.catogeory = :category", nativeQuery = true)
    List<Product> findByCategory(@Param("category") String itemType);

}
