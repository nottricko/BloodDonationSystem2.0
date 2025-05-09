import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register"; // ✅ Import Register
import LandingPage from "./components/LandingPage";
import DonateBlood from "./components/DonateBlood";
import RequestBlood from "./components/RequestBlood";
import VerifiedDocument from "./components/VerifiedDocument";

import AdminDashboard from "./components/AdminDashboard";
import UserProfile from "./components/UserProfile";
import AboutUs from "./components/AboutUs"; // ✅ Import About Us


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* ✅ Add Register route */}
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/donations" element={<DonateBlood />} />
        <Route path="/request" element={<RequestBlood />} />

        <Route path="/verified-document" element={<VerifiedDocument />} />

        <Route path="/admin" element={<AdminDashboard />} /> {/* Admin Dashboard route */}

        <Route path="/admin-login" element={<AdminLogin />} /> {/* Admin Login route */}


        <Route path="/user-profile" element={<UserProfile />} /> {/* User Profile route */}
        <Route path="/about-us" element={<AboutUs />} /> {/* About Us route */}

      </Routes>
    </Router>
  );
}

export default App;
