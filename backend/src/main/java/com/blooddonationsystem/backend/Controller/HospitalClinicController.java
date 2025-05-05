package com.blooddonationsystem.backend.Controller;

import com.blooddonationsystem.backend.Entity.HospitalClinicEntity;
import com.blooddonationsystem.backend.Service.HospitalClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitals")
@CrossOrigin(origins = "http://localhost:3000")
public class HospitalClinicController {

    @Autowired
    private HospitalClinicService service;

    @PostMapping
    public ResponseEntity<HospitalClinicEntity> save(@RequestBody HospitalClinicEntity entity) {
        return ResponseEntity.ok(service.save(entity));
    }

    @GetMapping
    public ResponseEntity<List<HospitalClinicEntity>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HospitalClinicEntity> getById(@PathVariable int id) {
        HospitalClinicEntity entity = service.getById(id);
        return entity != null ? ResponseEntity.ok(entity) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
