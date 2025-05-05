package com.blooddonationsystem.backend.Entity;

import jakarta.persistence.*;
import java.util.List;

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
    private Role role;

    public enum Role {
        DONOR,
        RECIPIENT,
        ADMIN
    }

    // ✅ One admin can manage one hospital
    @OneToOne(mappedBy = "admin", cascade = CascadeType.ALL)
    private HospitalClinicEntity managedHospital;

    // ✅ One donor can have many blood donations
    @OneToMany(mappedBy = "donor", cascade = CascadeType.ALL)
    private List<BloodDonationEntity> donations;

    // ✅ One recipient can submit many verified documents
    @OneToMany(mappedBy = "recipient", cascade = CascadeType.ALL)
    private List<VerifiedDocumentEntity> verifiedDocuments;

    // ✅ One recipient can be assigned to multiple blood inventory entries
    @OneToMany(mappedBy = "recipient", cascade = CascadeType.ALL)
    private List<BloodInventoryEntity> assignedInventories;

    // ✅ Used to track donations or documents this admin has reviewed
    @OneToMany(mappedBy = "reviewedBy")
    private List<BloodDonationEntity> reviewedDonations;

    @OneToMany(mappedBy = "reviewedBy")
    private List<VerifiedDocumentEntity> reviewedDocuments;

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

    public List<VerifiedDocumentEntity> getVerifiedDocuments() {
        return verifiedDocuments;
    }
    public void setVerifiedDocuments(List<VerifiedDocumentEntity> verifiedDocuments) {
        this.verifiedDocuments = verifiedDocuments;
    }

    public List<BloodInventoryEntity> getAssignedInventories() {
        return assignedInventories;
    }
    public void setAssignedInventories(List<BloodInventoryEntity> assignedInventories) {
        this.assignedInventories = assignedInventories;
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
