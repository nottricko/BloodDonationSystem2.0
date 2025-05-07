import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register"; // ✅ Import Register
import LandingPage from "./components/LandingPage";
import DonateBlood from "./components/DonateBlood";
import RequestBlood from "./components/RequestBlood";
import VerifiedDocument from "./components/VerifiedDocument";
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
      </Routes>
    </Router>
  );
}

export default App;
