package com.example.shoppingsite.Model;

import com.sun.istack.NotNull;

public class EmailFeedback {

    @NotNull
    private String name;
    @NotNull
    private String email;
    private String feedback;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
}
