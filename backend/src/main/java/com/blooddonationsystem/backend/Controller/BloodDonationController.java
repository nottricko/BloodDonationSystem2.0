package com.blooddonationsystem.backend.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blooddonationsystem.backend.Entity.BloodDonationEntity;
import com.blooddonationsystem.backend.Service.BloodDonationService;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "http://localhost:3000")
public class    BloodDonationController {

    @Autowired
    private BloodDonationService donationService;

    @PostMapping
    public ResponseEntity<BloodDonationEntity> saveDonation(@RequestBody BloodDonationEntity entity) {
        return ResponseEntity.ok(donationService.saveDonation(entity));
    }

    @GetMapping
    public ResponseEntity<List<BloodDonationEntity>> getAllDonations() {
        return ResponseEntity.ok(donationService.getAllDonations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BloodDonationEntity> getDonationById(@PathVariable int id) {
        Optional<BloodDonationEntity> donation = donationService.getDonationById(id);
        return donation.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<BloodDonationEntity>> getDonationsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(donationService.getDonationsByStatus(status));
    }

    @GetMapping("/donor/{donorId}")
    public ResponseEntity<List<BloodDonationEntity>> getDonationsByDonor(@PathVariable int donorId) {
        return ResponseEntity.ok(donationService.getDonationsByDonorId(donorId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BloodDonationEntity> update(@PathVariable int id, @RequestBody BloodDonationEntity entity) {
        entity.setDonationId(id);
        return ResponseEntity.ok(donationService.saveDonation(entity));
    }   

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonation(@PathVariable int id) {
        donationService.deleteDonation(id);
        return ResponseEntity.noContent().build();
    }
}