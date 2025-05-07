import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import "../styles/DonateBlood.css";

const DonateBlood = () => {
  const [bloodType, setBloodType] = useState("");
  const [donationDate, setDonationDate] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const donorId = 2; // Replace with logged-in user ID logic

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/donations  ", {
        bloodType,
        donationDate,
        donor: { userId: donorId },
        hospital: { hospitalId: parseInt(hospitalId) },
        status: "PENDING",
      });
      alert("Donation submitted successfully.");
    } catch (err) {
      alert("Failed to donate blood: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <Header />
      <div className="donate-blood-page">
        <h2>Donate Blood</h2>
        <form className="donate-form" onSubmit={handleSubmit}>
        <label>Blood Type:</label>
            <select
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            required
            >
            <option value="" disabled>Select your blood type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            </select>


          <label>Donation Date:</label>
          <input
            type="date"
            value={donationDate}
            onChange={(e) => setDonationDate(e.target.value)}
            required
          />

          <label>Hospital ID:</label>
          <input
            type="number"
            value={hospitalId}
            onChange={(e) => setHospitalId(e.target.value)}
            placeholder="Hospital ID"
            required
          />

          <button type="submit">Submit Donation</button>
        </form>
      </div>
    </>
  );
};

export default DonateBlood;
