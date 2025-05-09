import React, { useState, useRef, useEffect } from "react";
import "../styles/Header.css";
import { NavLink } from "react-router-dom";
import { User, LogOut } from "lucide-react";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="header-container">
      <div className="logo">
        <h1>BLOOD DONATION MANAGEMENT SYSTEM</h1>
      </div>
      
      <nav className="navigation">
        <NavLink to="/landingpage" className="nav-item">HOME</NavLink>
        <NavLink to="/request" className="nav-item">REQUEST BLOOD</NavLink>
        <NavLink to="/donations" className="nav-item">DONATE BLOOD</NavLink>
        <NavLink to="/about-us" className="nav-item">ABOUT US</NavLink>
        
        <div className="user-dropdown" ref={dropdownRef}>
          <button 
            className="profile-button" 
            onClick={toggleDropdown}
            aria-label="User menu"
          >
            <User size={24} />
          </button>
          
          {showDropdown && (
            <div className="dropdown-menu">
              <NavLink to="/user-profile" className="dropdown-item">
                <User size={16} />
                <span>Your Profile</span>
              </NavLink>
              <NavLink to="/" className="dropdown-item">
                <LogOut size={16} />
                <span>Logout</span>
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;