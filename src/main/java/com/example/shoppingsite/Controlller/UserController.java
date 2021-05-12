package com.example.shoppingsite.Controlller;

import com.example.shoppingsite.Model.User;
import com.example.shoppingsite.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/ShoppingSite") //  <-
//TODO:NOTE!!! URLS HAVE BEEN CHANGED ,REMEMBER TO CHANGE TO MAKE THE FRONTEND WORK....

public class UserController {

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/addusers")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    @PostMapping("/addusers")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }


    @GetMapping("/login/{userId}")
    public Optional<User> getUsers(@PathVariable String userId) {
        return userRepository.findById(userId);

    }


    @PutMapping("/addusers/{userId}")
    public ResponseEntity<User> updateEquipment(
            @PathVariable String userId, @RequestBody User user) {


        User result = userRepository.save(user);

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

}

