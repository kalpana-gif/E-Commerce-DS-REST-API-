package com.example.shoppingsite.Model;

import org.springframework.stereotype.Component;

@Component
public class SMSConfiguration {

    private String toNumber;
    private String message;

    public String getToNumber() {
        return toNumber;
    }

    public void setToNumber(String toNumber) {
        this.toNumber = toNumber;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
