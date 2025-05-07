package com.blooddonationsystem.backend.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    private String firstName;
    private String lastName;
    private String email;
    private String contactNumber;
    private String address;
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Role role;

    public enum Role {
        USER,
        ADMIN
    }

    @OneToOne(mappedBy = "admin", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"admin", "donations", "verifiedDocuments"})
    private HospitalClinicEntity managedHospital;

    @OneToMany(mappedBy = "donor", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"donor", "hospital", "reviewedBy"})
    private List<BloodDonationEntity> donations;

    @OneToMany(mappedBy = "recipient", cascade = CascadeType.ALL)
    @JsonIgnore // not critical for response, prevent loops with inventory
    private List<BloodInventoryEntity> assignedInventories;

    @OneToMany(mappedBy = "recipient", cascade = CascadeType.ALL)
    @JsonIgnore // same logic as above
    private List<VerifiedDocumentEntity> verifiedDocuments;

    @OneToMany(mappedBy = "reviewedBy")
    @JsonIgnore
    private List<BloodDonationEntity> reviewedDonations;

    @OneToMany(mappedBy = "reviewedBy")
    @JsonIgnore
    private List<VerifiedDocumentEntity> reviewedDocuments;

    // Constructors
    public UserEntity() {}

    public UserEntity(String firstName, String lastName, String email, String contactNumber, String address, String password, Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.contactNumber = contactNumber;
        this.address = address;
        this.password = password;
        this.role = role;
    }

    // Getters and Setters
    public int getUserId() {
        return userId;
    }
    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNumber() {
        return contactNumber;
    }
    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }

    public HospitalClinicEntity getManagedHospital() {
        return managedHospital;
    }
    public void setManagedHospital(HospitalClinicEntity managedHospital) {
        this.managedHospital = managedHospital;
    }

    public List<BloodDonationEntity> getDonations() {
        return donations;
    }
    public void setDonations(List<BloodDonationEntity> donations) {
        this.donations = donations;
    }

    public List<BloodInventoryEntity> getAssignedInventories() {
        return assignedInventories;
    }
    public void setAssignedInventories(List<BloodInventoryEntity> assignedInventories) {
        this.assignedInventories = assignedInventories;
    }

    public List<VerifiedDocumentEntity> getVerifiedDocuments() {
        return verifiedDocuments;
    }
    public void setVerifiedDocuments(List<VerifiedDocumentEntity> verifiedDocuments) {
        this.verifiedDocuments = verifiedDocuments;
    }

    public List<BloodDonationEntity> getReviewedDonations() {
        return reviewedDonations;
    }
    public void setReviewedDonations(List<BloodDonationEntity> reviewedDonations) {
        this.reviewedDonations = reviewedDonations;
    }

    public List<VerifiedDocumentEntity> getReviewedDocuments() {
        return reviewedDocuments;
    }
    public void setReviewedDocuments(List<VerifiedDocumentEntity> reviewedDocuments) {
        this.reviewedDocuments = reviewedDocuments;
    }
}
