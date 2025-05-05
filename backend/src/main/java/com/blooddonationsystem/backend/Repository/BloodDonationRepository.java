package com.blooddonationsystem.backend.Repository;

import com.blooddonationsystem.backend.Entity.BloodDonationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BloodDonationRepository extends JpaRepository<BloodDonationEntity, Integer> {
    List<BloodDonationEntity> findByDonor_UserId(int donorId);
    List<BloodDonationEntity> findByStatus(String status);
}
