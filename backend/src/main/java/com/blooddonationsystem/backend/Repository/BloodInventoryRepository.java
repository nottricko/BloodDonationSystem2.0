package com.blooddonationsystem.backend.Repository;

import com.blooddonationsystem.backend.Entity.BloodInventoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BloodInventoryRepository extends JpaRepository<BloodInventoryEntity, Integer> {
    List<BloodInventoryEntity> findByRecipient_UserId(int recipientId);
    BloodInventoryEntity findByDonation_DonationId(int donationId);
}
