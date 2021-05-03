package com.example.shoppingsite.Model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class CreditCardDummy {

    @Id
    private String cardNo;
    private String secretNo;
    private float cardBalance;
    private String configEmail;

    public CreditCardDummy() {
    }

    public CreditCardDummy(String cardNo, String secretNo, float cardBalance, String configEmail) {
        this.cardNo = cardNo;
        this.secretNo = secretNo;
        this.cardBalance = cardBalance;
        this.configEmail = configEmail;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public String getSecretNo() {
        return secretNo;
    }

    public void setSecretNo(String secretNo) {
        this.secretNo = secretNo;
    }

    public float getCardBalance() {
        return cardBalance;
    }

    public void setCardBalance(float cardBalance) {
        this.cardBalance = cardBalance;
    }

    public String getConfigEmail() {
        return configEmail;
    }

    public void setConfigEmail(String configEmail) {
        this.configEmail = configEmail;
    }
}
