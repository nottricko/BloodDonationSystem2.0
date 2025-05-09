import { useState, useEffect } from 'react';
import { Bell, Search, Settings, User, ChevronDown, CheckCircle, XCircle, Edit2, PlusCircle } from 'lucide-react';
import axios from 'axios'; // Assuming you'll use axios for API calls
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  // State for blood inventory
  const [bloodInventory, setBloodInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // State for notifications (previously appointments)
  const [notifications, setNotifications] = useState([]);
  
  // State for currently selected notification
  const [selectedNotification, setSelectedNotification] = useState(null);
 
  
  // Loading states
  const [loading, setLoading] = useState({
    inventory: true,
    notifications: true
  });

  // Error states
  const [error, setError] = useState({
    inventory: null,
    notifications: null
  });

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBlood, setEditingBlood] = useState(null);
  const [editAmount, setEditAmount] = useState('');

  // Add blood modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBloodType, setNewBloodType] = useState('');
  const [newBloodAmount, setNewBloodAmount] = useState('');
  
  // Notification detail modal state
  const [showNotificationDetail, setShowNotificationDetail] = useState(false);

  // Calculate stats
  const notificationCount = notifications.filter(notif => notif.isNew).length;
  const pendingCount = notifications.filter(n => n.status === 'pending').length;
  const donorRequests = notifications.filter(n => n.type === 'DONOR' && n.status === 'pending').length;
  const recipientRequests = notifications.filter(n => n.type === 'RECIPIENT' && n.status === 'pending').length;

  // Fetch blood inventory data
  useEffect(() => {
    const fetchBloodInventory = async () => {
      try {
        setLoading(prev => ({ ...prev, inventory: true }));
        
        const response = await axios.get('http://localhost:8080/api/inventory/all');

        console.log('Blood Inventory Response:', response.data); // Check API response
    
        const inventoryWithStatus = response.data.map(item => ({
          ...item,
          status: item.amount > 10 ? 'Available' : item.amount > 5 ? 'Low' : 'Critical'
        }));
        
        setBloodInventory(inventoryWithStatus);
        setError(prev => ({ ...prev, inventory: null }));
      } catch (err) {
        console.error('Error fetching blood inventory:', err);
        setError(prev => ({ ...prev, inventory: 'Failed to load blood inventory data' }));
      } finally {
        setLoading(prev => ({ ...prev, inventory: false }));
      }
    };
  
    fetchBloodInventory();
  }, []);
  
  // Fetch notifications data (previously appointments)
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(prev => ({ ...prev, notifications: true }));
        
        // Replace with your actual API endpoint
        const response = await axios.get('http://localhost:8080/api/notifications');
        
        setNotifications(response.data);
        setError(prev => ({ ...prev, notifications: null }));
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError(prev => ({ ...prev, notifications: 'Failed to load notification data' }));
      } finally {
        setLoading(prev => ({ ...prev, notifications: false }));
      }
    };

    fetchNotifications();
    
    // Set up polling or websocket connection for real-time updates
    const intervalId = setInterval(fetchNotifications, 60000); // Poll every minute
    
    return () => clearInterval(intervalId);
  }, []);

  // View notification details
  const viewNotificationDetails = (notification) => {
    setSelectedNotification(notification);
    setShowNotificationDetail(true);
  };

  const filteredNotifications = notifications.filter(notification => {
    // Check if the notification message is a valid string before calling toLowerCase
    const message = notification.message?.toLowerCase();  // Optional chaining
    return message && message.includes(searchTerm.toLowerCase());
  });

  // Handle notification approval
  const handleApprove = async (id) => {
    try {
      // Optimistic update
      setNotifications(notifications.map(notification => 
        notification.id === id ? {...notification, status: 'approved', isNew: false} : notification
      ));
      
      // Close detail modal if open
      if (showNotificationDetail && selectedNotification?.id === id) {
        setShowNotificationDetail(false);
      }
      
      // Send approval to API
      await axios.put(`http://localhost:8080/api/notifications/${id}/status`, {
        status: 'approved'
      });
      
      // If it's a recipient, we should update blood inventory
      const notification = notifications.find(n => n.id === id);
      if (notification && notification.type === 'RECIPIENT') {
        await updateBloodInventoryOnServer(notification.bloodType, -1);
      }
    } catch (err) {
      console.error('Error approving notification:', err);
      // Revert optimistic update on error
      setNotifications(prevNotifications => [...prevNotifications]);
      alert('Failed to approve request. Please try again.');
    }
  };

  // Handle notification rejection
  const handleReject = async (id) => {
    try {
      // Optimistic update
      setNotifications(notifications.map(notification => 
        notification.id === id ? {...notification, status: 'rejected', isNew: false} : notification
      ));
      
      // Close detail modal if open
      if (showNotificationDetail && selectedNotification?.id === id) {
        setShowNotificationDetail(false);
      }
      
      // Send rejection to API
      await axios.put(`http://localhost:8080/api/notifications/${id}/status`, {
        status: 'rejected'
      });
      
    } catch (err) {
      console.error('Error rejecting notification:', err);
      // Revert optimistic update on error
      setNotifications(prevNotifications => [...prevNotifications]);
      alert('Failed to reject request. Please try again.');
    }
  };

  // Update blood inventory on server
  const updateBloodInventoryOnServer = async (bloodType, changeAmount) => {
    try {
      const bloodItem = bloodInventory.find(item => item.type === bloodType);
      if (!bloodItem) return;
      
      const newAmount = bloodItem.amount + changeAmount;
      const newStatus = newAmount > 10 ? 'Available' : newAmount > 5 ? 'Low' : 'Critical';
      
      // Optimistic update
      setBloodInventory(bloodInventory.map(blood => 
        blood.type === bloodType ? 
          {...blood, amount: newAmount, status: newStatus} : blood
      ));
      
      // Send update to API
      await axios.put(`/api/blood-inventory/${bloodType}`, { 
        amount: newAmount 
      });
    } catch (err) {
      console.error('Error updating blood inventory:', err);
      // Refresh data on error to revert to the correct state
      const response = await axios.get('/api/blood-inventory');
      setBloodInventory(response.data.map(item => ({
        ...item,
        status: item.amount > 10 ? 'Available' : item.amount > 5 ? 'Low' : 'Critical'
      })));
    }
  };
  
  // Open update blood modal
  const openEditModal = (blood) => {
    setEditingBlood(blood);
    setEditAmount(blood.amount.toString());
    setShowEditModal(true);
  };

  // Save blood update
  const saveBloodUpdate = async () => {
    try {
      const newAmount = parseInt(editAmount);
      if (isNaN(newAmount) || newAmount < 0) {
        alert('Please enter a valid amount');
        return;
      }
      
      // Close modal first for better UX
      setShowEditModal(false);
      
      // Update on server
      await axios.put(`/api/blood-inventory/${editingBlood.type}`, { 
        amount: newAmount 
      });
      
      // Update local state
      setBloodInventory(bloodInventory.map(blood => 
        blood.type === editingBlood.type ? 
          {
            ...blood, 
            amount: newAmount, 
            status: newAmount > 10 ? 'Available' : newAmount > 5 ? 'Low' : 'Critical'
          } : 
          blood
      ));
    } catch (err) {
      console.error('Error saving blood update:', err);
      alert('Failed to update blood inventory. Please try again.');
    }
  };

  // Open add blood modal
  const openAddModal = () => {
    setNewBloodType('');
    setNewBloodAmount('');
    setShowAddModal(true);
  };

  // Add new blood to inventory
  const addBloodToInventory = async () => {
    try {
      // Validate inputs
      const amount = parseInt(newBloodAmount);
      if (!newBloodType.trim()) {
        alert('Please enter a blood type');
        return;
      }
      if (isNaN(amount) || amount < 0) {
        alert('Please enter a valid amount');
        return;
      }

      // Check if blood type already exists
      const existingBlood = bloodInventory.find(blood => 
        blood.type.toLowerCase() === newBloodType.trim().toLowerCase()
      );
      
      if (existingBlood) {
        alert(`Blood type ${newBloodType} already exists. Please use update instead.`);
        return;
      }
      
      // Close modal first for better UX
      setShowAddModal(false);
      
      const status = amount > 10 ? 'Available' : amount > 5 ? 'Low' : 'Critical';
      
      // Send to API
      await axios.post('http://localhost:8080/api/inventory/add', {
        type: newBloodType.trim(),
        amount: amount
      });
      
      // Update local state with optimistic update
      const newBlood = {
        type: newBloodType.trim(),
        amount: amount,
        status: status
      };
      
      setBloodInventory([...bloodInventory, newBlood]);
    } catch (err) {
      console.error('Error adding blood to inventory:', err);
      alert('Failed to add blood to inventory. Please try again.');
      // Refresh data on error
      const response = await axios.get('http://localhost:8080/api/inventory/all');
      const inventoryWithStatus = response.data.map(item => ({
        ...item,
        status: item.amount > 10 ? 'Available' : item.amount > 5 ? 'Low' : 'Critical'
      }));
      setBloodInventory(inventoryWithStatus);
    }
  };



  // Mark notifications as read
  const markAllNotificationsRead = async () => {
    try {
      // Update local state first
      setNotifications(notifications.map(notification => ({
        ...notification,
        isNew: false
      })));
      
      // Update on server
      await axios.put('/api/notifications/mark-read');
    } catch (err) {
      console.error('Error marking notifications as read:', err);
    }
  };

  return (
    <div className="admin-container">
      {/* Header */}
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
              <button 
                className="icon-button"
                onClick={markAllNotificationsRead}
                title="Notifications"
              >
                <Bell className="icon" />
                {notificationCount > 0 && (
                  <span className="notification-badge">
                    {notificationCount}
                  </span>
                )}
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

      {/* Main Content */}
      <main className="admin-main">
        <div className="dashboard-header">
          <h2 className="dashboard-title">Admin Dashboard</h2>
          <p className="dashboard-subtitle">Welcome to Blood Donation System Administration</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stats-card">
            <div className="stats-header">
              <h3 className="stats-title">Total Blood Available</h3>
            </div>
            <p className="stats-number stats-pending">{pendingCount}</p>
          
          </div>
          
          <div className="stats-card">
            <div className="stats-header">
              <h3 className="stats-title">Donor Requests</h3>
            </div>
            <p className="stats-number stats-donor">{donorRequests}</p>
            <p className="stats-description">New donors waiting for approval</p>
          </div>
          
          <div className="stats-card">
            <div className="stats-header">
              <h3 className="stats-title">Recipient Requests</h3>
            </div>
            <p className="stats-number stats-recipient">{recipientRequests}</p>
            <p className="stats-description">Blood requests awaiting approval</p>
          </div>
        </div>

        {/* Blood Inventory Table */}
        <div className="data-card">
          <div className="card-header">
            <h3 className="card-title">Blood Inventory Management</h3>
            <button 
              onClick={openAddModal}
              className="add-button"
            >
              <PlusCircle className="button-icon" />
              Add Blood
            </button>
          </div>
          
          {/* Loading and error states */}
          {loading.inventory && (
            <div className="loading-state">
              <p>Loading blood inventory data...</p>
            </div>
          )}
          
          {error.inventory && (
            <div className="error-message">
              <p>{error.inventory}</p>
              <button 
                className="retry-button"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          )}
          
          {/* Table content */}
          {!loading.inventory && !error.inventory && (
            <div className="table-container">
              <table className="data-table">
                <thead className="table-header">
                  <tr>
                    <th className="table-heading">Blood Type</th>
                    <th className="table-heading">Units Available</th>
                    <th className="table-heading">Status</th>
                    <th className="table-heading">Action</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {bloodInventory.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="empty-table-message">
                        No blood inventory data available
                      </td>
                    </tr>
                  ) : (
                    bloodInventory.map((blood) => (
                      <tr key={blood.type}>
                        <td className="table-cell">{blood.type}</td>
                        <td className="table-cell">{blood.amount} units</td>
                        <td className="table-cell">
                          <span className={`status-badge ${blood.status === 'Available' ? 'status-available' : 
                            blood.status === 'Low' ? 'status-low' : 
                            'status-critical'}`}>
                            {blood.status}
                          </span>
                        </td>
                        <td className="table-cell">
                          <button 
                            onClick={() => openEditModal(blood)}
                            className="update-button"
                          >
                            <Edit2 className="button-icon" />
                            Update
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Notifications Section (Previously Appointments) */}
        <div className="data-card">
          <h3 className="card-title">Notifications</h3>
          
          {/* Loading and error states */}
          {loading.notifications && (
            <div className="loading-state">
              <p>Loading notification data...</p>
            </div>
          )}
          
          {error.notifications && (
            <div className="error-message">
              <p>{error.notifications}</p>
              <button 
                className="retry-button"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          )}
          
          {/* Notifications list */}
          {!loading.notifications && !error.notifications && (
            <>
              {filteredNotifications.length === 0 ? (
                <div className="empty-table-message">
                  {searchTerm ? (
                    <p>No notifications match your search criteria</p>
                  ) : (
                    <p>No new notifications available</p>
                  )}
                </div>
              ) : (
                <div className="notifications-list">
                  {filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`notification-item ${notification.isNew ? 'notification-new' : ''} ${notification.status !== 'pending' ? 'notification-processed' : ''}`}
                    >
                      <div className="notification-main">
                        <div className="notification-header">
                          <div className="notification-user">
                            {notification.isNew && (
                              <span className="new-indicator">
                                <span className="ping-animation"></span>
                                <span className="ping-dot"></span>
                              </span>
                            )}
                            <button 
                              onClick={() => viewNotificationDetails(notification)}
                              className="notification-name-button"
                            >
                              {notification.name}
                            </button>
                          </div>
                          <span className={`status-badge ${notification.status === 'approved' ? 'status-approved' : 
                            notification.status === 'rejected' ? 'status-rejected' : 
                            'status-pending'}`}>
                            {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                          </span>
                        </div>
                        <div className="notification-meta">
                          <span className={`type-badge ${notification.type === 'DONOR' ? 'type-donor' : 
                            'type-recipient'}`}>
                            {notification.type}
                          </span>
                          <span className="notification-time">
                            {notification.date} at {notification.time}
                          </span>
                        </div>
                      </div>
                      
                      {notification.status === 'pending' && (
                        <div className="notification-actions">
                          <button 
                            onClick={() => handleApprove(notification.id)}
                            className="approve-button"
                          >
                            <CheckCircle className="button-icon" />
                            Approve
                          </button>
                          <button 
                            onClick={() => handleReject(notification.id)}
                            className="reject-button"
                          >
                            <XCircle className="button-icon" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Edit Blood Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3 className="modal-title">Update Blood Inventory</h3>
            <div className="form-group">
              <label className="form-label">
                Blood Type
              </label>
              <input
                type="text"
                value={editingBlood.type}
                disabled
                className="form-input-disabled"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Units Available
              </label>
              <input
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                className="form-input"
                min="0"
              />
            </div>
            <div className="modal-actions">
              <button
                onClick={() => setShowEditModal(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={saveBloodUpdate}
                className="save-button"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Blood Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3 className="modal-title">Add New Blood Type</h3>
            <div className="form-group">
              <label className="form-label">
                Blood Type
              </label>
              <input
                type="text"
                value={newBloodType}
                onChange={(e) => setNewBloodType(e.target.value)}
                className="form-input"
                placeholder="e.g., A+, B-, O+"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Units Available
              </label>
              <input
                type="number"
                value={newBloodAmount}
                onChange={(e) => setNewBloodAmount(e.target.value)}
                className="form-input"
                min="0"
                placeholder="Enter number of units"
              />
            </div>
            <div className="modal-actions">
              <button
                onClick={() => setShowAddModal(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={addBloodToInventory}
                className="save-button"
              >
                Add Blood
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Notification Detail Modal */}
      {showNotificationDetail && selectedNotification && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3 className="modal-title">Request Details</h3>
            
            <div className="notification-detail">
              <div className="detail-row">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{selectedNotification.name}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Request Type:</span>
                <span className="detail-value">
                  <span className={`type-badge ${selectedNotification.type === 'DONOR' ? 'type-donor' : 'type-recipient'}`}>
                    {selectedNotification.type}
                  </span>
                </span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Blood Type:</span>
                <span className="detail-value">{selectedNotification.bloodType}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{selectedNotification.date}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Time:</span>
                <span className="detail-value">{selectedNotification.time}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className="detail-value">
                  <span className={`status-badge ${selectedNotification.status === 'approved' ? 'status-approved' : 
                    selectedNotification.status === 'rejected' ? 'status-rejected' : 
                    'status-pending'}`}>
                    {selectedNotification.status.charAt(0).toUpperCase() + selectedNotification.status.slice(1)}
                  </span>
                </span>
              </div>
              
              {selectedNotification.phone && (
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{selectedNotification.phone}</span>
                </div>
              )}
              
              {selectedNotification.email && (
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{selectedNotification.email}</span>
                </div>
              )}
              
              {selectedNotification.notes && (
                <div className="detail-row">
                  <span className="detail-label">Notes:</span>
                  <span className="detail-value">{selectedNotification.notes}</span>
                </div>
              )}
            </div>
            
            <div className="modal-actions">
              <button
                onClick={() => setShowNotificationDetail(false)}
                className="cancel-button"
              >
                Close
              </button>
              
              {selectedNotification.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleReject(selectedNotification.id);
                    }}
                    className="reject-button"
                  >
                    <XCircle className="button-icon" />
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      handleApprove(selectedNotification.id);
                    }}
                    className="approve-button"
                  >
                    <CheckCircle className="button-icon" />
                    Approve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;