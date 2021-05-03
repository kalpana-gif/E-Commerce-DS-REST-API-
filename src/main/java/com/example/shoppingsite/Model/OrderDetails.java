package com.example.shoppingsite.Model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class OrderDetails {

    @Id
    private int orderID;
    private String userID;
    private String orderType;
    private String fullAmount;
    private String date;

    public OrderDetails() {
    }

    public OrderDetails(int orderID, String userID, String orderType, String fullAmount, String date) {
        this.orderID = orderID;
        this.userID = userID;
        this.orderType = orderType;
        this.fullAmount = fullAmount;
        this.date = date;
    }

    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    public String getFullAmount() {
        return fullAmount;
    }

    public void setFullAmount(String fullAmount) {
        this.fullAmount = fullAmount;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
