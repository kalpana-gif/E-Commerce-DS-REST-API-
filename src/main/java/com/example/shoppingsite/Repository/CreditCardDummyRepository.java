package com.example.shoppingsite.Repository;

import com.example.shoppingsite.Model.CreditCardDummy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CreditCardDummyRepository extends JpaRepository <CreditCardDummy, String> {

    @Query(value = "SELECT * from CreditCardDummy where cardNo=:cardNo ", nativeQuery = true)
    CreditCardDummy getSecretNumber(@Param("cardNo") String cardNo);
}
