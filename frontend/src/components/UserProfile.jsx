import React, { useState } from 'react';
import { ChevronDown, Lock, Save } from 'lucide-react';
import '../styles/UserProfile.css';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ userData = {}, saveUserData }) => {
  // Navigation hook for redirecting
  const navigate = useNavigate();
  
  // Default user data if none is provided
  const defaultUserData = {
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
    profileImage: '', // Will use default avatar if no image provided
  };

  // Merge provided data with defaults
  const user = { ...defaultUserData, ...userData };
  
  // State for tracking form changes
  const [formData, setFormData] = useState(user);
  const [hasChanges, setHasChanges] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setHasChanges(true);
  };

  // Handle save changes
  const handleSave = async () => {
    setIsSubmitting(true);
  
    try {
      // Prepare the data to send
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('contactNumber', formData.contactNumber);
      formDataToSend.append('address', formData.address);
  
      // If profile image exists, append it to FormData
      if (formData.profileImage) {
        const imageFile = dataURLtoFile(formData.profileImage, 'profileImage.jpg');
        formDataToSend.append('profileImage', imageFile);
      }
  
      // Send the data to the backend API
      const response = await fetch(`/api/users/${formData.email}`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer YOUR_TOKEN',
        },
        body: formDataToSend, // Send FormData containing the image and user info
      });
  
      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
  
      const updatedUserData = await response.json();
  
      // If saveUserData function was provided as prop, call it
      if (typeof saveUserData === 'function') {
        await saveUserData(updatedUserData);
      }
  
      console.log('User data saved successfully:', updatedUserData);
      setSavedMessage('Changes saved successfully!');
      setHasChanges(false);
  
      setTimeout(() => {
        setSavedMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error saving user data:', error);
      setSavedMessage('Error saving changes. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle redirect to landing page
  const handleLogoClick = () => {
    navigate('/');
  };

  // Function to convert Data URL to File
const dataURLtoFile = (dataURL, fileName) => {
  const [prefix, base64Data] = dataURL.split(',');
  const mimeType = prefix.match(/:(.*?);/)[1];
  const binaryData = atob(base64Data);
  const array = [];

  for (let i = 0; i < binaryData.length; i++) {
    array.push(binaryData.charCodeAt(i));
  }

  const file = new File([new Uint8Array(array)], fileName, { type: mimeType });
  return file;
};


  return (
    <div className="user-profile-container">
      <div className="sidebar">
        <div className="logo" onClick={handleLogoClick}>
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="#e91e63" strokeWidth="2" fill="none">
              <path d="M20 10h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2z"></path>
              <path d="M12 8v12"></path>
              <path d="M8 12h8"></path>
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-title">BLOOD DONATION</span>
            <span className="logo-subtitle">MANAGEMENT SYSTEM</span>
          </div>
        </div>
        <h2 className="sidebar-title">User profile management</h2>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <div className="nav-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            Personal Info
          </a>
          <a href="#" className="nav-item">
            <div className="nav-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            Emails & Password
          </a>
          <a href="#" className="nav-item">
            <div className="nav-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3z"></path>
                <path d="M8 17v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2"></path>
              </svg>
            </div>
            Notifications
          </a>
        </nav>
      </div>

      <div className="main-content">
        <div className="content-header">
          <h1 className="content-title">Personal information</h1>
          <button 
            className={`save-button-clean ${isSubmitting || !hasChanges ? 'disabled' : ''}`} 
            onClick={handleSave}
            disabled={isSubmitting || !hasChanges}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
          {savedMessage && (
            <div className="success-message">
              {savedMessage}
            </div>
          )}
        </div>

        <div className="profile-image">
          {formData.profileImage ? (
            <img src={formData.profileImage} alt="Profile" />
          ) : (
            <div className="default-avatar">
              <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          )}

          {/* Overlay plus button */}
          <div className="image-overlay">
            <button
              className="add-image-btn"
              onClick={() => document.getElementById('profileImageInput').click()}
              title="Add profile image"
            >
              +
            </button>
          </div>

          {/* Hidden file input */}
          <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setFormData({ ...formData, profileImage: reader.result });
                  setHasChanges(true);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter contact number"
            />
          </div>

          <div className="form-group address-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your full address"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
