import React, { useState } from 'react';
import './Dashboard_Module.css'; 
import Frontpage from './frontpage'; 

const Dashboard = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="dashboard">
      {!showDashboard ? (
        
        <Frontpage onGetStarted={() => setShowDashboard(true)} />
      ) : (
        <div className="dashboard-container">
          <h1>Emergency Medical Service Dashboard</h1>

          {/* Main Rectangle Container */}
          <div className="dashboard-rectangle">
            {/* User Details Section */}
            <div className="section user-details">
              <h2>User Information</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Full Name:</label>
                  <p>John Doe</p>
                </div>
                <div className="detail-item">
                  <label>Age:</label>
                  <p>32</p>
                </div>
                <div className="detail-item">
                  <label>Gender:</label>
                  <p>Male</p>
                </div>
                <div className="detail-item">
                  <label>Blood Group:</label>
                  <p>O+</p>
                </div>
                <div className="detail-item">
                  <label>Emergency Contact:</label>
                  <p>+1 555 123 4567</p>
                </div>
                <div className="detail-item">
                  <label>Allergies:</label>
                  <p>None</p>
                </div>
              </div>
            </div>

            {/* Live Chat Section */}
            <div className="section live-chat">
              <h2>Live Chat with a Professional</h2>
              <div className="placeholder">
                <p>Live chat will appear here.</p>
              </div>
            </div>

            {/* Nearby Hospitals Section */}
            <div className="section nearby-hospitals">
              <h2>Nearby Hospitals</h2>
              <div className="placeholder">
                <p>List of nearby hospitals will appear here.</p>
              </div>
            </div>

            {/* Medical History Section */}
            <div className="section medical-history">
              <h2>Medical History</h2>
              <div className="placeholder">
                <p>Medical history details will appear here.</p>
              </div>
            </div>

            {/* Emergency Contacts Section */}
            <div className="section emergency-contacts">
              <h2>Emergency Contacts</h2>
              <div className="placeholder">
                <p>Emergency contact details will appear here.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;