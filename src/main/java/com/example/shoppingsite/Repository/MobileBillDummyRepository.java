package com.example.shoppingsite.Repository;

import com.example.shoppingsite.Model.MobileBillDummy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MobileBillDummyRepository extends JpaRepository <MobileBillDummy, String> {


    @Query(value = "SELECT * from MobileBillDummy where mobileNo=:mobileNo ", nativeQuery = true)
    MobileBillDummy getPinNumber(@Param("mobileNo") String mobileNo);
}
