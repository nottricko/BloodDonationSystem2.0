package com.blooddonationsystem.backend.Service;

import com.blooddonationsystem.backend.Entity.NotificationEntity;
import com.blooddonationsystem.backend.Repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.Notification;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    // Create and submit a new notification
    public NotificationEntity submitNotification(NotificationEntity notification) {
        // By default, set the status to "Pending"
        notification.setStatus("Pending");
        return notificationRepository.save(notification);
    }

    // Fetch all notifications
    public List<NotificationEntity> getAllNotifications() {
        return notificationRepository.findAll();
    }

    // Update the status of a notification (Approve/Reject)
    public Optional<NotificationEntity> updateNotificationStatus(Long id, String status) {
        Optional<NotificationEntity> notificationOptional = notificationRepository.findById(id);

        if (notificationOptional.isPresent()) {
            NotificationEntity notification = notificationOptional.get();
            notification.setStatus(status);  // Set status to Approved/Rejected
            return Optional.of(notificationRepository.save(notification));
        }

        return Optional.empty();
    }
}

