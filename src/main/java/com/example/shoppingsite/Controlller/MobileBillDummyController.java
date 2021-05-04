package com.example.shoppingsite.Controlller;

import com.example.shoppingsite.Model.MobileBillDummy;
import com.example.shoppingsite.Repository.MobileBillDummyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/MobileBillController")
public class MobileBillDummyController {

    @Autowired
    private MobileBillDummyRepository mobileBillDummyRepository;

    @GetMapping("/getAll")
    public List<MobileBillDummy> getAll(){
        return mobileBillDummyRepository.findAll();
    }
}
