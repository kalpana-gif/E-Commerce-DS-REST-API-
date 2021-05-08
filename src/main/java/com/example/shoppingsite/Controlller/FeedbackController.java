package com.example.shoppingsite.Controlller;

import com.example.shoppingsite.Model.EmailConfiguration;
import com.example.shoppingsite.Model.EmailFeedback;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Feedback")
public class FeedbackController {

    @Autowired
    private EmailConfiguration emailConfiguration;

    public FeedbackController(EmailConfiguration emailConfiguration){
        this.emailConfiguration = emailConfiguration;
    }

    @PostMapping("/Email")
    public void sendFeedback(@RequestBody EmailFeedback emailFeedback, BindingResult bindingResult){

//        if(bindingResult.hasErrors()){
//            throw new ValidatorException("Email Body Has invalid format");
//        }

        //create mail sender
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(this.emailConfiguration.getHost());
        mailSender.setPort(this.emailConfiguration.getPort());
        mailSender.setUsername(this.emailConfiguration.getUsername());
        mailSender.setPassword(this.emailConfiguration.getPassword());

        //create an email instance
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("it19184036@my.sliit.lk");
        mailMessage.setTo(emailFeedback.getEmail());
        mailMessage.setSubject("Payment Successful");
        mailMessage.setText(emailFeedback.getFeedback());

        //send E-mail
        mailSender.send(mailMessage);
    }
}
