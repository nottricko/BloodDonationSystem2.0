package com.blooddonationsystem.backend.Entity;

import jakarta.persistence.*;
import java.time.LocalDate;

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
    private UserEntity donor;

    @ManyToOne
    @JoinColumn(name = "hospital_id")
    private HospitalClinicEntity hospital;

    @ManyToOne
    @JoinColumn(name = "reviewed_by")
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
