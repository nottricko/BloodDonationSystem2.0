package com.blooddonationsystem.backend.Service;

import com.blooddonationsystem.backend.Entity.HospitalClinicEntity;
import com.blooddonationsystem.backend.Repository.HospitalClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HospitalClinicService {

    @Autowired
    private HospitalClinicRepository hospitalClinicRepository;

    public HospitalClinicEntity save(HospitalClinicEntity entity) {
        return hospitalClinicRepository.save(entity);
    }

    public List<HospitalClinicEntity> getAll() {
        return hospitalClinicRepository.findAll();
    }

    public HospitalClinicEntity getById(int id) {
        return hospitalClinicRepository.findById(id).orElse(null);
    }

    public void delete(int id) {
        hospitalClinicRepository.deleteById(id);
    }
}
