package com.blooddonationsystem.backend.Controller;

import java.util.List;

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

import com.blooddonationsystem.backend.DTO.LoginRequest;
import com.blooddonationsystem.backend.DTO.RegisterRequest;
import com.blooddonationsystem.backend.DTO.UserProfileRequest;
import com.blooddonationsystem.backend.Entity.UserEntity;
import com.blooddonationsystem.backend.Service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserEntity> registerUser(@Valid @RequestBody RegisterRequest req) {
        UserEntity user = new UserEntity(
            req.getFirstName(),
            req.getLastName(),
            req.getEmail(),
            req.getContactNumber(),
            req.getAddress(),
            req.getPassword(),
            UserEntity.Role.valueOf(req.getRole())

        );
        return ResponseEntity.ok(userService.registerUser(user));
    }


    @PostMapping("/login/manual")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            UserEntity user = userService.login(request.getEmail(), request.getPassword());
            return ResponseEntity.ok("Login successful for " + user.getEmail());
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<UserEntity>> getAll() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUser(@PathVariable int id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserEntity> update(@PathVariable int id, @RequestBody UserEntity user) {
        user.setUserId(id);
        return ResponseEntity.ok(userService.save(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/profile/{id}")
    public ResponseEntity<UserEntity> getUserProfile(@PathVariable int id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update the profile information of a specific user
    @PutMapping("/profile/{id}")
    public ResponseEntity<UserEntity> updateUserProfile(@PathVariable int id, @RequestBody UserProfileRequest userProfileRequest) {
        UserEntity existingUser = userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update user profile fields (for example: address, contact number)
        existingUser.setAddress(userProfileRequest.getAddress());
        existingUser.setContactNumber(userProfileRequest.getContactNumber());
        existingUser.setProfileImage(userProfileRequest.getProfileImage());

        // Save the updated profile
        UserEntity updatedUser = userService.save(existingUser);
        return ResponseEntity.ok(updatedUser);
    }
}

