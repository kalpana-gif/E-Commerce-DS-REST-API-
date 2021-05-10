package com.example.shoppingsite.Controlller;

import com.example.shoppingsite.Model.EmailConfiguration;
import com.example.shoppingsite.Model.EmailFeedback;
import com.example.shoppingsite.Model.SMSConfiguration;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

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

    //for e-mail sending functio
    @Autowired
    private EmailConfiguration emailConfiguration;
    public FeedbackController(EmailConfiguration emailConfiguration){
        this.emailConfiguration = emailConfiguration;
    }

    //for SMS function
    private final static String accountSid = "AC86d43d0e3ffae901bb1a5ef20cf18353";
    private final static String token = "c915f053f6a76e3e7fc8df7a02e34112";


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

    @PostMapping("/SMS")
    public void sendSMS(@RequestBody SMSConfiguration smsConfiguration, BindingResult bindingResult){

        //configuring the service connection
        Twilio.init(accountSid, token);

        //create message and sent
        Message.creator(new PhoneNumber(smsConfiguration.getToNumber()), new PhoneNumber("+13345774039"),smsConfiguration.getMessage()).create();
    }
}
