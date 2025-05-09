import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css"; // reuse login stylesx  

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    address: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration request to the backend
      await axios.post("http://localhost:8080/api/users/register", {
        ...formData,
        role: "USER"
      });

      // Store the user profile data in localStorage
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        address: formData.address
      };
      localStorage.setItem("userProfile", JSON.stringify(userData));

      alert("Registration successful");
      window.location.href = "/landingpage"; // Redirect to login or another page after registration
    } catch (err) {
      const errorMessage = err.response?.data || err.message;
      if (errorMessage.includes("Email already exists")) {
        alert("Email is already registered. Please use a different email.");
      } else {
        alert("Registration failed: " + errorMessage);
      }
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: "url('/images/blood-donor-background.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <div className="logo-wrapper">
        <img src="/images/blood-donation-logo.png" alt="Logo" className="logo-img" />
        <div className="title-text">
          <h2 className="title-red">BLOOD DONATION</h2>
          <h3 className="title-black">MANAGEMENT SYSTEM</h3>
        </div>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="contactNumber" placeholder="Contact Number" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

        <button type="submit" className="login-btn">REGISTER</button>

        <div className="register-link">
          <span>Already have an account? </span>
          <a href="/">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
