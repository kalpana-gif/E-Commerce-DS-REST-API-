package com.example.shoppingsite.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;


@Entity
public class Payment {

    @Id
    @GeneratedValue
    private Long paymentID;
    private String customerID;
    private double amount;
    private Date date;
    private String month;

    public Payment() {
        super();
    }

    public Payment(Long paymentID, String studentID, double amount, Date date, String month) {
        super();
        this.paymentID = paymentID;
        this.customerID = studentID;
        this.amount = amount;
        this.date = date;
        this.month = month;
    }

    public Long getPaymentID() {
        return paymentID;
    }

    public void setPaymentID(Long paymentID) {
        this.paymentID = paymentID;
    }

    public String getStudentID() {
        return customerID;
    }

    public void setStudentID(String studentID) {
        this.customerID = studentID;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((paymentID == null) ? 0 : paymentID.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Payment other = (Payment) obj;
        if (paymentID == null) {
            if (other.paymentID != null)
                return false;
        } else if (!paymentID.equals(other.paymentID))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Payment [paymentID=" + paymentID + ", customerID=" + customerID + ", amount=" + amount + ", date=" + date
                + ", month=" + month + "]";
    }


}
