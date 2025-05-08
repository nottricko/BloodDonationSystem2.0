package com.blooddonationsystem.backend.Repository;

import com.blooddonationsystem.backend.Entity.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
}

