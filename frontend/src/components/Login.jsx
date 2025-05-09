import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/login/manual", {
        email,
        password,
      });
  
      const { role, userId } = response.data;
  
      // ✅ Store login info
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
  
      alert("Login successful");
  
      // ✅ Redirect based on role
      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/landingpage");
      }
    } catch (err) {
      alert("Login failed: " + err.response?.data || err.message);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: "url('/images/blood-donor-background.jpg   ')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
        <div className="logo-wrapper">
        <img
            src="/images/blood-donation-logo.png"
            alt="Logo"
            className="logo-img"
        />
        <div className="title-text">
            <h2 className="title-red">BLOOD DONATION</h2>
            <h3 className="title-black">MANAGEMENT SYSTEM</h3>
        </div>
        </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email/User Name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">
          LOGIN
        </button>

        <div className="register-link">
          <span>Not Having Account Yet? </span>
          <a href="/register">Create New</a>
        </div>
      </form>
    </div>
  );
};

export default Login;