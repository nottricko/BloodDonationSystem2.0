package com.blooddonationsystem.backend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blooddonationsystem.backend.Entity.BloodInventoryEntity;
import com.blooddonationsystem.backend.Entity.VerifiedDocumentEntity;
import com.blooddonationsystem.backend.Repository.BloodInventoryRepository;
import com.blooddonationsystem.backend.Repository.VerifiedDocumentRepository;

@Service
public class VerifiedDocumentService {

    @Autowired
    private VerifiedDocumentRepository repository;

    @Autowired
    private BloodInventoryRepository bloodInventoryRepository;

    public VerifiedDocumentEntity save(VerifiedDocumentEntity entity) {
        VerifiedDocumentEntity saved = repository.save(entity);

        // ✅ If approved, assign the requested inventory to the recipient
        if ("APPROVED".equalsIgnoreCase(saved.getStatus()) && saved.getRequestedInventory() != null) {
            BloodInventoryEntity inventory = saved.getRequestedInventory();
            inventory.setRecipient(saved.getRecipient());
            inventory.setRequestStatus("APPROVED");
            bloodInventoryRepository.save(inventory);
        }

        return saved;
    }

    public List<VerifiedDocumentEntity> getAll() {
        return repository.findAll();
    }

    public Optional<VerifiedDocumentEntity> getById(int id) {
        return repository.findById(id);
    }

    public List<VerifiedDocumentEntity> getByRecipientId(int recipientId) {
        return repository.findByRecipient_UserId(recipientId);
    }

    public List<VerifiedDocumentEntity> getByStatus(String status) {
        return repository.findByStatus(status);
    }

    public void delete(int id) {
        repository.deleteById(id);
    }
}
