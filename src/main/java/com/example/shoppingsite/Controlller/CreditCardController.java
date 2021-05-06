package com.example.shoppingsite.Controlller;

import com.example.shoppingsite.Model.CreditCardDummy;
import com.example.shoppingsite.Repository.CreditCardDummyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/CreditCardController")
public class CreditCardController {

    @Autowired
    private CreditCardDummyRepository creditCardDummyRepository;

    @GetMapping("/getAll")
    public List<CreditCardDummy> getAllCreditCards(){
        return creditCardDummyRepository.findAll();
    }

    @GetMapping("/getSecretNumber/{cardNo}")
    public CreditCardDummy getSecretNumber(@PathVariable String cardNo){
        return creditCardDummyRepository.getSecretNumber(cardNo);
    }
}
