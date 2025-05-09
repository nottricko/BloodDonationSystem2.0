package com.blooddonationsystem.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blooddonationsystem.backend.Entity.BloodDonationEntity;

@Repository
public interface BloodDonationRepository extends JpaRepository<BloodDonationEntity, Integer> {
    List<BloodDonationEntity> findByDonor_UserId(int donorId);
    List<BloodDonationEntity> findByStatus(String status);
    // BloodDonationRepository.java
    List<BloodDonationEntity> findByStatusAndHospital_HospitalId(String status, int hospitalId);

}
