package com.blooddonationsystem.backend.Entity;

import jakarta.persistence.*;

import java.time.LocalDate;

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
    private UserEntity recipient; // Only if document is verified

    public BloodInventoryEntity() {}

    public BloodInventoryEntity(String bloodType, LocalDate storedDate, BloodDonationEntity donation, UserEntity recipient) {
        this.bloodType = bloodType;
        this.storedDate = storedDate;
        this.donation = donation;
        this.recipient = recipient;
    }

    // Getters and Setters
    public int getInventoryId() {
        return inventoryId;
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
    
}
