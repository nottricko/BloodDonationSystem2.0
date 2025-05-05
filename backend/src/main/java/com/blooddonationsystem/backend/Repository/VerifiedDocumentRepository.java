package com.blooddonationsystem.backend.Repository;

import com.blooddonationsystem.backend.Entity.VerifiedDocumentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VerifiedDocumentRepository extends JpaRepository<VerifiedDocumentEntity, Integer> {
    List<VerifiedDocumentEntity> findByRecipient_UserId(int recipientId);
    List<VerifiedDocumentEntity> findByStatus(String status);
}
