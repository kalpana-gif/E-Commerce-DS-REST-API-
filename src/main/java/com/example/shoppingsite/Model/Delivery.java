package com.example.shoppingsite.Model;

import javax.persistence.*;

@Entity
public class Delivery {

    @Id
    @GeneratedValue
    private int deliveryID;
    private String customerID;
    private String address;
    private String userMobile;
    private String orderAmount;
    private String date;

    public Delivery() {
    }

    public Delivery(int deliveryID, String customerID, String address, String userMobile, String orderAmount, String date) {
        this.deliveryID = deliveryID;
        this.customerID = customerID;
        this.address = address;
        this.userMobile = userMobile;
        this.orderAmount = orderAmount;
        this.date = date;
    }

    public int getDeliveryID() {
        return deliveryID;
    }

    public void setDeliveryID(int deliveryID) {
        this.deliveryID = deliveryID;
    }

    public String getCustomerID() {
        return customerID;
    }

    public void setCustomerID(String customerID) {
        this.customerID = customerID;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUserMobile() {
        return userMobile;
    }

    public void setUserMobile(String userMobile) {
        this.userMobile = userMobile;
    }

    public String getOrderAmount() {
        return orderAmount;
    }

    public void setOrderAmount(String orderAmount) {
        this.orderAmount = orderAmount;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
