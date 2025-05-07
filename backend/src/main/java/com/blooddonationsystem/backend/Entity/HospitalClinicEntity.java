package com.blooddonationsystem.backend.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "hospital_clinic")
public class HospitalClinicEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int hospitalId;

    private String name;
    private String address;
    private String contactInfo;

    @OneToOne
    @JoinColumn(name = "admin_id")
    @JsonIgnoreProperties({"managedHospital", "donations", "assignedInventories", "reviewedDonations", "reviewedDocuments", "verifiedDocuments"})
    private UserEntity admin;

    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL)
    @JsonIgnore 
    private List<BloodDonationEntity> donations;

    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL)
    private List<VerifiedDocumentEntity> verifiedDocuments;

    public HospitalClinicEntity() {}

    public HospitalClinicEntity(String name, String address, String contactInfo, UserEntity admin) {
        this.name = name;
        this.address = address;
        this.contactInfo = contactInfo;
        this.admin = admin;
    }

    // Getters and Setters
    public int getHospitalId() {
        return hospitalId;
    }
    public void setHospitalId(int hospitalId) {
        this.hospitalId = hospitalId;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactInfo() {
        return contactInfo;
    }
    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    public UserEntity getAdmin() {
        return admin;
    }
    public void setAdmin(UserEntity admin) {
        this.admin = admin;
    }

    public List<BloodDonationEntity> getDonations() {
        return donations;
    }
    public void setDonations(List<BloodDonationEntity> donations) {
        this.donations = donations;
    }

    public List<VerifiedDocumentEntity> getVerifiedDocuments() {
        return verifiedDocuments;
    }
    public void setVerifiedDocuments(List<VerifiedDocumentEntity> verifiedDocuments) {
        this.verifiedDocuments = verifiedDocuments;
    }
}
