package com.blooddonationsystem.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blooddonationsystem.backend.Entity.NotificationEntity;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
}

