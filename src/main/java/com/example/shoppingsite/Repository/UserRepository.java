package com.example.shoppingsite.Repository;

import com.example.shoppingsite.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

    public User findTopByOrderByUserIdDesc();

}
