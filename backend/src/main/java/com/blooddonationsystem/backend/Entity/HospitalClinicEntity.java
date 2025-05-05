package com.blooddonationsystem.backend.Entity;

import jakarta.persistence.*;
import java.util.List;

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
    private UserEntity admin;

    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL)
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
