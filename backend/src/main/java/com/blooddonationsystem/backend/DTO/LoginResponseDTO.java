package com.blooddonationsystem.backend.DTO;

public class LoginResponseDTO {
    private int userId;
    private String email;
    private String firstName;
    private String lastName;
    private String role;


    // Constructors
    public LoginResponseDTO() {
    }

    public LoginResponseDTO(int userId, String email, String firstName, String lastName, String role) {
        this.userId = userId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }

    // Getters and Setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // If you add a token:
    // public String getToken() { return token; }
    // public void setToken(String token) { this.token = token; }
}