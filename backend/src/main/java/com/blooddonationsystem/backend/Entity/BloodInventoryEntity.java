package com.blooddonationsystem.backend.Entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "blood_inventory")
public class BloodInventoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int inventoryId;

    private String bloodType;
    private LocalDate storedDate;

    @OneToOne
    @JoinColumn(name = "donation_id")
    private BloodDonationEntity donation;

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    private UserEntity recipient;

    @Column(name = "request_status")
    private String requestStatus; // NONE, REQUESTED, APPROVED, REJECTED

    public BloodInventoryEntity() {}

    public BloodInventoryEntity(String bloodType, LocalDate storedDate, BloodDonationEntity donation, UserEntity recipient) {
        this.bloodType = bloodType;
        this.storedDate = storedDate;
        this.donation = donation;
        this.recipient = recipient;
        this.requestStatus = "NONE";
    }

    // Getters and Setters
    public int getInventoryId() {
        return inventoryId;
    }
    public void setInventoryId(int inventoryId) {
        this.inventoryId = inventoryId;
    }

    public String getBloodType() {  
        return bloodType;
    }
    public void setBloodType(String bloodType) {
        this.bloodType = bloodType;
    }

    public LocalDate getStoredDate() {
        return storedDate;
    }
    public void setStoredDate(LocalDate storedDate) {
        this.storedDate = storedDate;
    }

    public BloodDonationEntity getDonation() {
        return donation;
    }
    public void setDonation(BloodDonationEntity donation) {
        this.donation = donation;
    }

    public UserEntity getRecipient() {
        return recipient;
    }
    public void setRecipient(UserEntity recipient) {
        this.recipient = recipient;
    }
    
    public String getRequestStatus() {
        return requestStatus;
    }
    
    public void setRequestStatus(String requestStatus) {
        this.requestStatus = requestStatus;
    }
    
}
