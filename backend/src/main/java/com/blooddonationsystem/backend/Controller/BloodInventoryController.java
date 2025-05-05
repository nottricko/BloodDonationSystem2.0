package com.blooddonationsystem.backend.Controller;

import com.blooddonationsystem.backend.Entity.BloodInventoryEntity;
import com.blooddonationsystem.backend.Service.BloodInventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "http://localhost:3000")
public class BloodInventoryController {

    @Autowired
    private BloodInventoryService service;

    @PostMapping
    public ResponseEntity<BloodInventoryEntity> save(@RequestBody BloodInventoryEntity entity) {
        return ResponseEntity.ok(service.save(entity));
    }

    @GetMapping
    public ResponseEntity<List<BloodInventoryEntity>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BloodInventoryEntity> getById(@PathVariable int id) {
        Optional<BloodInventoryEntity> inventory = service.getById(id);
        return inventory.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/recipient/{recipientId}")
    public ResponseEntity<List<BloodInventoryEntity>> getByRecipient(@PathVariable int recipientId) {
        return ResponseEntity.ok(service.getByRecipientId(recipientId));
    }

    @GetMapping("/donation/{donationId}")
    public ResponseEntity<BloodInventoryEntity> getByDonation(@PathVariable int donationId) {
        return ResponseEntity.ok(service.getByDonationId(donationId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
