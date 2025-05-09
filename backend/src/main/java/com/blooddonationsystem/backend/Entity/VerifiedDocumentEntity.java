package com.blooddonationsystem.backend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "verified_document")
public class VerifiedDocumentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int documentId;

    private String documentType;
    private String status;
    private String filePath;

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    private UserEntity recipient;

    @ManyToOne
    @JoinColumn(name = "hospital_id")
    private HospitalClinicEntity hospital;

    @ManyToOne
    @JoinColumn(name = "reviewed_by")
    private UserEntity reviewedBy;

    @ManyToOne
    @JoinColumn(name = "requested_inventory_id")
    private BloodInventoryEntity requestedInventory;

    public VerifiedDocumentEntity() {}

    public VerifiedDocumentEntity(String documentType, String status, String filePath, UserEntity recipient, HospitalClinicEntity hospital, UserEntity reviewedBy, BloodInventoryEntity requestedInventory) {
        this.documentType = documentType;
        this.status = status;
        this.filePath = filePath;
        this.recipient = recipient;
        this.hospital = hospital;
        this.reviewedBy = reviewedBy;
        this.requestedInventory = requestedInventory;
    }

    // Getters and Setters
    public int getDocumentId() {
        return documentId;
    }
    public void setDocumentId(int documentId) {
        this.documentId = documentId;
    }

    public String getDocumentType() {
        return documentType;
    }
    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public String getFilePath() {
        return filePath;
    }
    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public UserEntity getRecipient() {
        return recipient;
    }
    public void setRecipient(UserEntity recipient) {
        this.recipient = recipient;
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
    public BloodInventoryEntity getRequestedInventory() {
        return requestedInventory;
    }
    
    public void setRequestedInventory(BloodInventoryEntity requestedInventory) {
        this.requestedInventory = requestedInventory;
    }
}
