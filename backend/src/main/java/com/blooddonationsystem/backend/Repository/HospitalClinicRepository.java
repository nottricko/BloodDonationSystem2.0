package com.blooddonationsystem.backend.Repository;

import com.blooddonationsystem.backend.Entity.HospitalClinicEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalClinicRepository extends JpaRepository<HospitalClinicEntity, Integer> {
    
}
