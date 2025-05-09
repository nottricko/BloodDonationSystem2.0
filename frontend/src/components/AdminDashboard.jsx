// Final Cleaned AdminDashboard.jsx with Combined Notifications and Detail Modal
import { useState, useEffect } from 'react';
import { Bell, Search, Settings, User, ChevronDown, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showNotificationDetail, setShowNotificationDetail] = useState(false);
  const [loading, setLoading] = useState({ notifications: true });
  const [error, setError] = useState({ notifications: null });
  const [pendingDonations, setPendingDonations] = useState([]);
  const [pendingDocuments, setPendingDocuments] = useState([]);
  const [bloodInventory, setBloodInventory] = useState([]);

  const totalBloodUnits = bloodInventory.filter(item => item.requestStatus === 'NONE').length;

  const donorRequests = pendingDonations.length;
  const recipientRequests = pendingDocuments.length;

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/inventory/all");
        setBloodInventory(res.data);
      } catch (err) {
        console.error("Error fetching blood inventory", err);
      }
    };
    fetchInventory();
  }, []);

  useEffect(() => {
    const fetchPendingData = async () => {
      try {
        const [donationRes, documentRes] = await Promise.all([
          axios.get("http://localhost:8080/api/donations/status/PENDING"),
          axios.get("http://localhost:8080/api/documents/status/PENDING")
        ]);

        setPendingDonations(donationRes.data);
        setPendingDocuments(documentRes.data);

        const formattedDonations = donationRes.data.map((donation) => ({
          id: donation.donationId,
          type: 'DONOR',
          name: donation.donor ? `${donation.donor.firstName} ${donation.donor.lastName}` : 'Unknown',
          bloodType: donation.bloodType,
          date: donation.donationDate,
          time: donation.time || '',
          status: donation.status,
          full: donation
        }));

        const formattedDocuments = documentRes.data.map((doc) => {
          const recipient = doc.recipient;
          const inventory = doc.requestedInventory;

          return {
            id: doc.documentId,
            type: 'RECIPIENT',
            name: recipient ? `${recipient.firstName} ${recipient.lastName}` : 'Unknown',
            status: doc.status,
            filePath: doc.filePath,
            inventoryDetails: inventory,
            full: doc
          };
        });

        setNotifications([...formattedDonations, ...formattedDocuments]);
      } catch (err) {
        console.error("Error fetching notifications", err);
        setError({ notifications: "Failed to load notifications" });
      } finally {
        setLoading({ notifications: false });
      }
    };
    fetchPendingData();
  }, []);

  const handleApprove = async (id) => {
    const notif = notifications.find(n => n.id === id);
    if (!notif) return;

    try {
      if (notif.type === 'DONOR') {
        const donation = notif.full;
        donation.status = 'APPROVED';
        await axios.put(`http://localhost:8080/api/donations/${donation.donationId}`, donation);
      } else if (notif.type === 'RECIPIENT') {
        const document = notif.full;
        document.status = 'APPROVED';
        await axios.put(`http://localhost:8080/api/documents/${document.documentId}`, document);
      }

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, status: 'APPROVED' } : n))
      );
      setShowNotificationDetail(false);
    } catch (err) {
      console.error("Error approving request", err);
      alert("Failed to approve request.");
    }
  };

  const handleReject = async (id) => {
    const notif = notifications.find(n => n.id === id);
    if (!notif) return;

    try {
      if (notif.type === 'DONOR') {
        const donation = notif.full;
        donation.status = 'REJECTED';
        await axios.put(`http://localhost:8080/api/donations/${donation.donationId}`, donation);
      } else if (notif.type === 'RECIPIENT') {
        const document = notif.full;
        document.status = 'REJECTED';
        await axios.put(`http://localhost:8080/api/documents/${document.documentId}`, document);
      }

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, status: 'REJECTED' } : n))
      );
      setShowNotificationDetail(false);
    } catch (err) {
      console.error("Error rejecting request", err);
      alert("Failed to reject request.");
    }
  };

  const viewNotificationDetails = (notification) => {
    setSelectedNotification(notification);
    setShowNotificationDetail(true);
  };

  const filteredNotifications = notifications.filter((notification) => {
    const name = notification.name?.toLowerCase();
    return name && name.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="header-title">Blood Donation System</h1>
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search notifications..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="notification-container">
              <button className="icon-button" title="Notifications">
                <Bell className="icon" />
              </button>
            </div>
            <button className="icon-button">
              <Settings className="icon" />
            </button>
            <div className="user-profile">
              <div className="avatar">
                <User className="avatar-icon" />
              </div>
              <span className="user-name">Admin</span>
              <ChevronDown className="dropdown-icon" />
            </div>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="dashboard-header">
          <h2 className="dashboard-title">Admin Dashboard</h2>
          <p className="dashboard-subtitle">Welcome to Blood Donation System Administration</p>
        </div>

        <div className="stats-grid">
          <div className="stats-card">
            <h3 className="stats-title">Total Blood Available</h3>
            <p className="stats-number stats-pending">{totalBloodUnits}</p>
          </div>
          <div className="stats-card">
            <h3 className="stats-title">Pending Blood Donations</h3>
            <p className="stats-number stats-donor">{donorRequests}</p>
          </div>
          <div className="stats-card">
            <h3 className="stats-title">Pending Blood Requests</h3>
            <p className="stats-number stats-recipient">{recipientRequests}</p>
          </div>
        </div>

        <div className="data-card">
          <h3 className="card-title">Notifications</h3>
          {loading.notifications ? (
            <p>Loading notification data...</p>
          ) : error.notifications ? (
            <p>{error.notifications}</p>
          ) : filteredNotifications.length === 0 ? (
            <p>No new notifications available</p>
          ) : (
            <div className="notifications-list">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.status !== 'PENDING' ? 'notification-processed' : ''}`}
                >
                  <div className="notification-main">
                    <div className="notification-header">
                      <button
                        onClick={() => viewNotificationDetails(notification)}
                        className="notification-name-button"
                      >
                        {notification.name}
                      </button>
                      <span className={`status-badge status-${notification.status.toLowerCase()}`}>{notification.status}</span>
                    </div>
                    <div className="notification-meta">
                      <span className={`type-badge type-${notification.type.toLowerCase()}`}>{notification.type}</span>
                      <span className="notification-time">{notification.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showNotificationDetail && selectedNotification && (
          <div className="modal-overlay">
            <div className="modal-container">
              <h3 className="modal-title">Request Details</h3>
              <div className="notification-detail">
                <p><strong>Name:</strong> {selectedNotification.name}</p>
                <p><strong>Type:</strong> {selectedNotification.type}</p>
                <p><strong>Bloodtype:</strong> {selectedNotification.bloodType}</p>
                <p><strong>Date:</strong> {selectedNotification.date}</p>
                {selectedNotification.type === 'RECIPIENT' && selectedNotification.filePath && (
                  <>
                    <p><strong>Document:</strong> <a href={`http://localhost:8080/api/documents/file/${selectedNotification.full.filePath}`} target="_blank">View Document</a>
                    </p>
                    {selectedNotification.inventoryDetails && (
                      <div>
                        <p><strong>Inventory Info:</strong></p>
                        <ul>
                          <li><strong>Inventory ID:</strong> {selectedNotification.inventoryDetails.inventoryId}</li>
                          <li><strong>Type:</strong> {selectedNotification.inventoryDetails.bloodType}</li>
                          <li><strong>Stored Date:</strong> {selectedNotification.inventoryDetails.storedDate}</li>
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="modal-actions">
                <button onClick={() => setShowNotificationDetail(false)} className="cancel-button">
                  Close
                </button>
                <button onClick={() => handleReject(selectedNotification.id)} className="reject-button">
                  <XCircle className="button-icon" /> Reject
                </button>
                <button onClick={() => handleApprove(selectedNotification.id)} className="approve-button">
                  <CheckCircle className="button-icon" /> Approve
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
