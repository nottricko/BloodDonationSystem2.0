package com.blooddonationsystem.backend.Controller;

import com.blooddonationsystem.backend.Entity.BloodDonationEntity;
import com.blooddonationsystem.backend.Service.BloodDonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "http://localhost:3000")
public class BloodDonationController {

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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonation(@PathVariable int id) {
        donationService.deleteDonation(id);
        return ResponseEntity.noContent().build();
    }
}
