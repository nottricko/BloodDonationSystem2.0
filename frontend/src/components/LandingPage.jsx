import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../styles/LandingPage.css";


const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Container maxWidth="lg" className="landing-page">
        <div className="landing-hero">
            <img src="/images/blood-donation-heartbag.png" alt="Blood Bag" className="hero-left-img" />
          <div className="hero-title">
            <Typography variant="h3" className="hero-red">BLOOD DONATION</Typography>
            <Typography variant="h3" className="hero-black">MANAGEMENT SYSTEM</Typography>
          </div>
          <img src="/images/blood-donation-doctorPatient.png" alt="Doctor" className="hero-right-img" />
        </div>

        <Grid container spacing={4} justifyContent="center" className="hero-buttons">
            <Grid item>
                <div className="hero-card red" onClick={() => navigate("/donations")}>
                DONATE A<br />BLOOD DONOR
                </div>
            </Grid>
            
            <Grid item>
                <div className="hero-card brown" onClick={() => navigate("/request")}>
                SEE AVAILABLE<br />BLOOD
                </div>
            </Grid>
            
            <Grid item>
                <div className="hero-card red-dark" onClick={() => navigate("/details")}>
                BLOOD TYPES AND<br />DETAILS
                </div>  
            </Grid>
            </Grid>
        <div className="donation-info-section">
          <div className="donation-fact-wrapper">
          <img src="/images/3lives.png" alt="Save Lives Fact" className="donation-fact-image" />
          </div>
        </div>

        <div className="blood-type-section">
          <div className="blood-image">
          <img src="/images/blood-arm.png" alt="Blood Donation Arm" />
          </div>
          <div className="compatibility-image">
          <img src="/images/blood-type-chart.png" alt="Blood Type Compatibility Chart" />
          </div>
        </div>

        <div className="donation-description">
          <h3>TYPES OF DONATION</h3>
          <p>
            Did you know your blood is made up of powerful components? Red blood cells, platelets, and plasma—each one can save lives in different ways. When you donate, your blood is carefully separated so it can help those who need it most.
          </p>
        </div>
      </Container>

      <footer className="basic-footer">
        <div className="footer-content">
          <p>&copy; 2025 Blood Donation Management System. All Rights Reserved.</p>
          <div className="footer-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/about-us">About Us</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
