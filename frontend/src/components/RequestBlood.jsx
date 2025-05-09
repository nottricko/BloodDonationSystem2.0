import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import "../styles/RequestBlood.css";

const RequestBlood = () => {
  const [inventoryList, setInventoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/inventory/available')

      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setInventoryList(data);
      })
      .catch(err => {
        console.error('Error fetching inventory:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleRequest = (inventoryId) => {
    localStorage.setItem('selectedInventoryId', inventoryId);
    navigate('/verified-document');
  };

  return (
    <div className="request-blood-container">
      <Header />
      <div className="request-blood-content">
        <h1 className="request-title">Request Blood</h1>

        {loading ? (
          <p className="text-gray-600">Loading available blood inventory...</p>
        ) : inventoryList.length === 0 ? (
          <p className="no-data-message">No available blood units at the moment.</p>
        ) : (
          <div className="request-list">
            {inventoryList.map((item) => (
              <div key={item.inventoryId} className="request-card">
                <p><strong>Blood Type:</strong> {item.bloodType}</p>
                <p><strong>Date Stored:</strong> {new Date(item.storedDate).toLocaleDateString()}</p>
                <p><strong>Hospital:</strong> {item.donation?.hospital?.name || 'N/A'}</p>
                <button
                  onClick={() => handleRequest(item.inventoryId)}
                  className="request-button"
                >
                  Request This Blood
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestBlood;