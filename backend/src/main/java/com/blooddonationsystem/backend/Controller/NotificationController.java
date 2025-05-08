    package com.blooddonationsystem.backend.Controller;
    
    
    import com.blooddonationsystem.backend.Entity.NotificationEntity;
    import com.blooddonationsystem.backend.Repository.NotificationRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    
    import java.util.List;
    import java.util.Map;
    
    @RestController 
    @RequestMapping("/api/notifications")
    @CrossOrigin(origins = "http://localhost:3000")
    public class NotificationController {
    
        @Autowired
        private NotificationRepository repository;
    
        // Submit new notification
        @PostMapping
        public NotificationEntity submitRequest(@RequestBody NotificationEntity request) {
            return repository.save(request);
        }
    
        // Get all notifications
        @GetMapping
        public List<NotificationEntity> getAllRequests() {
            return repository.findAll();
        }
    
        // Get notification by ID
        @GetMapping("/{id}")
        public ResponseEntity<NotificationEntity> getRequestById(@PathVariable Long id) {
            return repository.findById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }
    
        // Approve or Reject
        @PutMapping("/{id}/status")
        public ResponseEntity<NotificationEntity> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
            String status = body.get("status");
            return repository.findById(id).map(request -> {
                request.setStatus(status);
                repository.save(request);
                return ResponseEntity.ok(request);
            }).orElse(ResponseEntity.notFound().build());
        }
    }
    
