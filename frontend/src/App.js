import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register"; // ✅ Import Register
import LandingPage from "./components/LandingPage";
import DonateBlood from "./components/DonateBlood";
import RequestBlood from "./components/RequestBlood";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* ✅ Add Register route */}
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/donations" element={<DonateBlood />} />
        <Route path="/request" element={<RequestBlood />} />
        <Route path="/admin" element={<AdminDashboard />} /> {/* Admin Dashboard route */}
        <Route path="/admin-login" element={<AdminLogin />} /> {/* Admin Login route */}
        <Route path="/user-profile" element={<UserProfile />} /> {/* User Profile route */}
      </Routes>
    </Router>
  );
}

export default App;
