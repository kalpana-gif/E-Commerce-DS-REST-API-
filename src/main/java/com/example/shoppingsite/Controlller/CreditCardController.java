package com.example.shoppingsite.Controlller;

import com.example.shoppingsite.Model.CreditCardDummy;
import com.example.shoppingsite.Repository.CreditCardCummyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/CreditCardController")
public class CreditCardController {

    @Autowired
    private CreditCardCummyRepository creditCardCummyRepository;

    @GetMapping("/getAll")
    public List<CreditCardDummy> getAllCreditCards(){
        return creditCardCummyRepository.findAll();
    }
}
