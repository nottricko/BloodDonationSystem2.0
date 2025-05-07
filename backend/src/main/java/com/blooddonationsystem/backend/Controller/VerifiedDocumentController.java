package com.blooddonationsystem.backend.Controller;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.blooddonationsystem.backend.Entity.UserEntity;
import com.blooddonationsystem.backend.Entity.BloodInventoryEntity;
import com.blooddonationsystem.backend.Entity.VerifiedDocumentEntity;
import com.blooddonationsystem.backend.Service.VerifiedDocumentService;
import com.blooddonationsystem.backend.Service.UserService;
import com.blooddonationsystem.backend.Service.BloodInventoryService;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "http://localhost:3000")
public class VerifiedDocumentController {

    @Autowired
    private VerifiedDocumentService service;

    @Autowired
    private UserService userService;

    @Autowired
    private BloodInventoryService inventoryService;

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<VerifiedDocumentEntity> submitWithFile(
        @RequestParam("documentType") String documentType,
        @RequestParam("requestedInventoryId") int requestedInventoryId,
        @RequestParam("userEmail") String userEmail,
        @RequestParam("file") MultipartFile file
    ) throws IOException {
        UserEntity recipient = userService.getByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("User not found"));
    
        BloodInventoryEntity inventory = inventoryService.getById(requestedInventoryId)
            .orElseThrow(() -> new RuntimeException("Inventory not found"));
    
        String filePath = service.saveFile(file);
    
        VerifiedDocumentEntity doc = new VerifiedDocumentEntity();
        doc.setDocumentType(documentType);
        doc.setRequestedInventory(inventory);
        doc.setRecipient(recipient);
        doc.setFilePath(filePath);
        doc.setStatus("PENDING");
    
        return ResponseEntity.ok(service.save(doc));
    }
    
    

    @GetMapping
    public ResponseEntity<List<VerifiedDocumentEntity>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VerifiedDocumentEntity> getById(@PathVariable int id) {
        Optional<VerifiedDocumentEntity> document = service.getById(id);
        return document.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/recipient/{recipientId}")
    public ResponseEntity<List<VerifiedDocumentEntity>> getByRecipient(@PathVariable int recipientId) {
        return ResponseEntity.ok(service.getByRecipientId(recipientId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<VerifiedDocumentEntity>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(service.getByStatus(status));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VerifiedDocumentEntity> update(@PathVariable int id, @RequestBody VerifiedDocumentEntity entity) {
        entity.setDocumentId(id);
        return ResponseEntity.ok(service.save(entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
