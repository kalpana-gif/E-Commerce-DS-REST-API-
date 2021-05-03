package com.example.shoppingsite.Model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class MobileBillDummy {

    @Id
    private String mobileNo;
    private String secretNo;
    private float amount;
    private String configEmail;

    public MobileBillDummy() {
    }

    public MobileBillDummy(String mobileNo, String secretNo, float amount, String configEmail) {
        this.mobileNo = mobileNo;
        this.secretNo = secretNo;
        this.amount = amount;
        this.configEmail = configEmail;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getSecretNo() {
        return secretNo;
    }

    public void setSecretNo(String secretNo) {
        this.secretNo = secretNo;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public String getConfigEmail() {
        return configEmail;
    }

    public void setConfigEmail(String configEmail) {
        this.configEmail = configEmail;
    }
}
