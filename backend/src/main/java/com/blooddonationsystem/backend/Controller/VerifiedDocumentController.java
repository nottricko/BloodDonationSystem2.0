package com.blooddonationsystem.backend.Controller;

import com.blooddonationsystem.backend.Entity.VerifiedDocumentEntity;
import com.blooddonationsystem.backend.Service.VerifiedDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "http://localhost:3000")
public class VerifiedDocumentController {

    @Autowired
    private VerifiedDocumentService service;

    @PostMapping
    public ResponseEntity<VerifiedDocumentEntity> submit(@RequestBody VerifiedDocumentEntity entity) {
        return ResponseEntity.ok(service.save(entity));
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
