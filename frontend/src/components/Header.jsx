import React from "react";
import "../styles/Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="blood-donation-header">
      <div className="blood-donation-header-logo">
        <img src="/images/blood-donation-logo.png" alt="Logo" className="logo" />
        <div className="logo-text-group">
          <span className="logo-line-1">BLOOD DONATION</span>
          <span className="logo-line-2">MANAGEMENT SYSTEM</span>
        </div>
      </div>
      <nav className="nav-bar">
        <NavLink to="/landingpage" className="blood-donation-header-nav">HOME</NavLink>
        <NavLink to="/request" className="blood-donation-header-nav">REQUEST BLOOD</NavLink>
        <NavLink to="/donations" className="blood-donation-header-nav">DONATE BLOOD</NavLink>
        <NavLink to="/about" className="blood-donation-header-nav">ABOUT US</NavLink>
        <NavLink to="/login" className="login-button">LOGOUT</NavLink>
      </nav>
    </header>
  );
};

export default Header;
