import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/VerifiedDocument.css';

const VerifiedDocument = () => {
  const [documentType, setDocumentType] = useState('');
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const inventoryId = localStorage.getItem('selectedInventoryId');
  const userEmail = localStorage.getItem('userEmail'); // ⬅️ Get logged-in user email

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!documentType || !file || !inventoryId || !userEmail) {
      alert('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('documentType', documentType);
    formData.append('requestedInventoryId', inventoryId);
    formData.append('userEmail', userEmail); // ⬅️ Include in form
    formData.append('file', file);

    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:8080/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to submit document');

      alert('Document submitted successfully!');
      localStorage.removeItem('selectedInventoryId');
      navigate('/landingpage');
    } catch (err) {
      console.error('Upload error:', err);
      alert('Error submitting document.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="verified-document-container">
      <Header />
      <div className="verified-document-content">
        <h1>Submit Verification Document</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label>Document Type:</label>
            <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} required>
              <option value="">Select a type</option>
              <option value="VALID_ID">Valid ID</option>
              <option value="MEDICAL_CERTIFICATE">Medical Certificate</option>
              <option value="OTHERS">Others</option>
            </select>
          </div>
          <div>
            <label>Upload File:</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFile(e.target.files[0])} required />
          </div>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Document'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifiedDocument;