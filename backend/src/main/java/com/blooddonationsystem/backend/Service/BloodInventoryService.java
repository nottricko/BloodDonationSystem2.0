package com.blooddonationsystem.backend.Service;

import com.blooddonationsystem.backend.Entity.BloodInventoryEntity;
import com.blooddonationsystem.backend.Repository.BloodInventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BloodInventoryService {

    @Autowired
    private BloodInventoryRepository repository;

    public BloodInventoryEntity save(BloodInventoryEntity entity) {
        return repository.save(entity);
    }

    public List<BloodInventoryEntity> getAll() {
        return repository.findAll();
    }

    public Optional<BloodInventoryEntity> getById(int id) {
        return repository.findById(id);
    }

    public List<BloodInventoryEntity> getByRecipientId(int recipientId) {
        return repository.findByRecipient_UserId(recipientId);
    }

    public BloodInventoryEntity getByDonationId(int donationId) {
        return repository.findByDonation_DonationId(donationId);
    }

    public void delete(int id) {
        repository.deleteById(id);
    }
}
