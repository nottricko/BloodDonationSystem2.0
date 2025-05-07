package com.blooddonationsystem.backend.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blooddonationsystem.backend.Entity.BloodDonationEntity;
import com.blooddonationsystem.backend.Entity.BloodInventoryEntity;
import com.blooddonationsystem.backend.Repository.BloodDonationRepository;
import com.blooddonationsystem.backend.Repository.BloodInventoryRepository;

@Service
public class BloodDonationService {

    @Autowired
    private BloodDonationRepository donationRepository;

    @Autowired
    private BloodInventoryRepository bloodInventoryRepository;

    public BloodDonationEntity saveDonation(BloodDonationEntity entity) {
        BloodDonationEntity saved = donationRepository.save(entity);

        // ✅ Auto-create inventory if donation is approved
        if ("APPROVED".equalsIgnoreCase(saved.getStatus())) {
            BloodInventoryEntity inventory = new BloodInventoryEntity();
            inventory.setBloodType(saved.getBloodType());
            inventory.setStoredDate(LocalDate.now());
            inventory.setDonation(saved);
            inventory.setRequestStatus("NONE");
            inventory.setRecipient(null); // not yet assigned

            bloodInventoryRepository.save(inventory);
        }

        return saved;
    }

    public List<BloodDonationEntity> getAllDonations() {
        return donationRepository.findAll();
    }

    public Optional<BloodDonationEntity> getDonationById(int id) {
        return donationRepository.findById(id);
    }

    public void deleteDonation(int id) {
        donationRepository.deleteById(id);
    }

    public List<BloodDonationEntity> getDonationsByStatus(String status) {
        return donationRepository.findByStatus(status);
    }

    public List<BloodDonationEntity> getDonationsByDonorId(int donorId) {
        return donationRepository.findByDonor_UserId(donorId);
    }
}
