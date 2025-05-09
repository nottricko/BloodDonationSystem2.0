package com.blooddonationsystem.backend.Controller;

import com.blooddonationsystem.backend.Entity.NotificationEntity;
import com.blooddonationsystem.backend.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<NotificationEntity>> getUserNotifications(@PathVariable int userId) {
        return ResponseEntity.ok(notificationService.getUserNotifications(userId));
    }

    @PutMapping("/mark-read/{userId}")
    public ResponseEntity<Void> markNotificationsAsRead(@PathVariable int userId) {
        notificationService.markAllAsRead(userId);
        return ResponseEntity.ok().build();
    }
}
