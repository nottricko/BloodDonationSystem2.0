package com.blooddonationsystem.backend.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.blooddonationsystem.backend.DTO.LoginResponseDTO; // <-- IMPORT THE NEW DTO
import com.blooddonationsystem.backend.Entity.UserEntity;
import com.blooddonationsystem.backend.Service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // Make sure this matches your React dev server
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
                req.getPassword(), // Reminder: Store hashed passwords!
                UserEntity.Role.valueOf(req.getRole().toUpperCase()) // Ensure role is consistently cased if needed
        );
        // Any other fields from RegisterRequest to set on UserEntity before saving?
        // e.g., if RegisterRequest had profileImage: user.setProfileImage(req.getProfileImage());

        UserEntity registeredUser = userService.registerUser(user);
        // Consider returning a DTO here as well to avoid sending back the password hash
        // For now, returning UserEntity which includes the ID needed by frontend.
        // Ensure password field is handled (e.g., nulled out or not serialized if sent directly)
        // registeredUser.setPassword(null); // Simple way if not using DTO for response
        return ResponseEntity.ok(registeredUser);
    }


    @PostMapping("/login/manual")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            UserEntity user = userService.login(request.getEmail(), request.getPassword());


            // ✅ Respond with role and ID
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("email", user.getEmail());
            response.put("role", user.getRole().toString());
            response.put("userId", user.getUserId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());

            // Create the response DTO
            LoginResponseDTO loginResponse = new LoginResponseDTO(
                    user.getUserId(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getRole().name() // .name() gives the string representation of the enum
            );
            // If you implement JWT, you would generate a token here and add it to loginResponse

            return ResponseEntity.ok(loginResponse);
        } catch (IllegalArgumentException e) { // Catch specific exceptions from your service
            return ResponseEntity.status(401).body(e.getMessage()); // Unauthorized
        } catch (Exception e) { // Catch any other unexpected errors
            // Log this exception on the server side for debugging
            // logger.error("Unexpected error during login for email: " + request.getEmail(), e);
            return ResponseEntity.status(500).body("An unexpected error occurred during login.");

        }
    }


    @GetMapping
    public ResponseEntity<List<UserEntity>> getAll() {
        // Consider if this endpoint needs protection (e.g., ADMIN role only)
        // Also, consider returning a List<UserDTO> to avoid exposing all entity details or password hashes
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUser(@PathVariable int id) {
        // Consider returning a UserDTO
        return userService.getUserById(id)
                .map(user -> {
                    // user.setPassword(null); // Example if not using DTO
                    return ResponseEntity.ok(user);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // This is the endpoint your frontend should call to get the profile information
    // AFTER getting the userId from login or registration.
    @GetMapping("/profile/{id}")
    public ResponseEntity<UserEntity> getUserProfile(@PathVariable int id) {
        // Ideally, this should be secured to ensure user {id} is the authenticated user
        // or an admin. For now, it fetches any user by ID.
        // Consider returning a specific UserProfileDTO if the profile view has different fields
        // than the general UserEntity or if you want to explicitly exclude some fields.
        return userService.getUserById(id)
                .map(user -> {
                    // user.setPassword(null); // Ensure password isn't sent
                    return ResponseEntity.ok(user);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserEntity> update(@PathVariable int id, @RequestBody UserEntity userUpdateRequest) {
        // This is a general update. Ensure it's secured and handles password updates carefully (if allowed).
        // If this allows changing the password, it should expect the new password and re-hash it.
        // It's better to have a specific DTO for updates to control what can be changed.
        UserEntity existingUser = userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Selectively update fields from userUpdateRequest to existingUser
        // e.g., existingUser.setFirstName(userUpdateRequest.getFirstName());
        // DO NOT just call user.setUserId(id) and save, as userUpdateRequest might not have all fields
        // or might have fields that shouldn't be updated this way (like role, password without hashing).

        // For now, assuming userUpdateRequest is a full UserEntity body to replace fields:
        userUpdateRequest.setUserId(id); // Set the ID to ensure an update, not an insert
        // If password can be updated here, it MUST be re-hashed if it's plain text in the request.
        // userService.save handles the actual save operation.
        return ResponseEntity.ok(userService.save(userUpdateRequest));
    }


    // Update the profile information of a specific user
    @PutMapping("/profile/{id}")
    public ResponseEntity<UserEntity> updateUserProfile(@PathVariable int id, @RequestBody UserProfileRequest userProfileRequest) {
        // This is more specific and safer for profile updates.
        UserEntity existingUser = userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Update only allowed profile fields
        if (userProfileRequest.getAddress() != null) {
            existingUser.setAddress(userProfileRequest.getAddress());
        }
        if (userProfileRequest.getContactNumber() != null) {
            existingUser.setContactNumber(userProfileRequest.getContactNumber());
        }
        if (userProfileRequest.getProfileImage() != null) {
            existingUser.setProfileImage(userProfileRequest.getProfileImage());
        }
        // Add other updatable fields from UserProfileRequest here

        UserEntity updatedUser = userService.save(existingUser);
        // updatedUser.setPassword(null); // Don't send password back
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        // Ensure this is adequately protected (e.g., only admin or the user themselves)
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}