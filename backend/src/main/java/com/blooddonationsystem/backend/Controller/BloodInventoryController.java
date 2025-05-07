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

import com.blooddonationsystem.backend.Entity.BloodInventoryEntity;
import com.blooddonationsystem.backend.Service.BloodInventoryService;

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

    @GetMapping("/all")
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
    @GetMapping("/available")
    public ResponseEntity<List<BloodInventoryEntity>> getAvailableInventory() {
        List<BloodInventoryEntity> all = service.getAll();
        List<BloodInventoryEntity> available = all.stream()
            .filter(item -> item.getRecipient() == null && "NONE".equalsIgnoreCase(item.getRequestStatus()))
            .toList();
        return ResponseEntity.ok(available);
    }
    
    
    @PutMapping("/{id}")
    public ResponseEntity<BloodInventoryEntity> update(@PathVariable int id, @RequestBody BloodInventoryEntity entity) {
        entity.setInventoryId(id);
        return ResponseEntity.ok(service.save(entity));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
