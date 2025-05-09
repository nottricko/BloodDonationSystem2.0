package com.blooddonationsystem.backend.Entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "blood_donation")
public class BloodDonationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int donationId;

    private String bloodType;
    private LocalDate donationDate;
    private String status; // PENDING, APPROVED, REJECTED

    @ManyToOne
    @JoinColumn(name = "donor_id")
    @JsonIgnoreProperties({"donations", "managedHospital", "assignedInventories", "verifiedDocuments", "reviewedDonations", "reviewedDocuments"})
    private UserEntity donor;

    @ManyToOne
    @JoinColumn(name = "hospital_id")
    @JsonIgnoreProperties({"admin", "donations", "verifiedDocuments"})
    private HospitalClinicEntity hospital;

    @ManyToOne
    @JoinColumn(name = "reviewed_by")
    @JsonIgnoreProperties({"donations", "managedHospital", "assignedInventories", "verifiedDocuments", "reviewedDonations", "reviewedDocuments"})
    private UserEntity reviewedBy; // Admin user

    public BloodDonationEntity() {}

    public BloodDonationEntity(String bloodType, LocalDate donationDate, String status, UserEntity donor, HospitalClinicEntity hospital, UserEntity reviewedBy) {
        this.bloodType = bloodType;
        this.donationDate = donationDate;
        this.status = status;
        this.donor = donor;
        this.hospital = hospital;
        this.reviewedBy = reviewedBy;
    }

    // Getters and Setters
    public int getDonationId() {
        return donationId;
    }
    public void setDonationId(int donationId) {
        this.donationId = donationId;
    }

    public String getBloodType() {
        return bloodType;
    }
    public void setBloodType(String bloodType) {
        this.bloodType = bloodType;
    }

    public LocalDate getDonationDate() {
        return donationDate;
    }
    public void setDonationDate(LocalDate donationDate) {
        this.donationDate = donationDate;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public UserEntity getDonor() {
        return donor;
    }
    public void setDonor(UserEntity donor) {
        this.donor = donor;
    }

    public HospitalClinicEntity getHospital() {
        return hospital;
    }
    public void setHospital(HospitalClinicEntity hospital) {
        this.hospital = hospital;
    }

    public UserEntity getReviewedBy() {
        return reviewedBy;
    }
    public void setReviewedBy(UserEntity reviewedBy) {
        this.reviewedBy = reviewedBy;
    }
}
