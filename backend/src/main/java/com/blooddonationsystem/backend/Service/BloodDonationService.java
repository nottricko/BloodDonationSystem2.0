package com.blooddonationsystem.backend.Service;

import com.blooddonationsystem.backend.Entity.BloodDonationEntity;
import com.blooddonationsystem.backend.Repository.BloodDonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BloodDonationService {

    @Autowired
    private BloodDonationRepository donationRepository;

    public BloodDonationEntity saveDonation(BloodDonationEntity entity) {
        return donationRepository.save(entity);
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
