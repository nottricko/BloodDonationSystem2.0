package com.blooddonationsystem.backend.Service;

import com.blooddonationsystem.backend.Entity.VerifiedDocumentEntity;
import com.blooddonationsystem.backend.Repository.VerifiedDocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VerifiedDocumentService {

    @Autowired
    private VerifiedDocumentRepository repository;

    public VerifiedDocumentEntity save(VerifiedDocumentEntity entity) {
        return repository.save(entity);
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
