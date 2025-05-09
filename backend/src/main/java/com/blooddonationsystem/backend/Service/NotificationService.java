package com.blooddonationsystem.backend.Service;

import com.blooddonationsystem.backend.Entity.NotificationEntity;
import com.blooddonationsystem.backend.Entity.UserEntity;
import com.blooddonationsystem.backend.Repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public NotificationEntity createNotification(UserEntity user, String message, String status) {
        NotificationEntity notification = new NotificationEntity(message, status, user);
        return notificationRepository.save(notification);
    }

    public List<NotificationEntity> getUserNotifications(int userId) {
        return notificationRepository.findByUser_UserIdOrderByTimestampDesc(userId);
    }

    public void markAllAsRead(int userId) {
        List<NotificationEntity> notifications = getUserNotifications(userId);
        for (NotificationEntity n : notifications) {
            n.setRead(true);
        }
        notificationRepository.saveAll(notifications);
    }
}
