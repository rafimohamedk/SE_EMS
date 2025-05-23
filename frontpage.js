import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Frontpage.css';

const socket = io('http://localhost:5001'); // Make sure backend runs here
const room = 'hospital123'; // Shared room name

const Frontpage = ({ onGetStarted, saveUserData }) => {
  const [activeTab, setActiveTab] = useState('Instructions');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showReviewsPopup, setShowReviewsPopup] = useState(false);

  const hospitalReviews = [
    { id: 1, text: 'Excellent emergency care service', rating: '4.8/5' },
    { id: 2, text: 'Friendly staff and clean facilities', rating: '4.5/5' },
    { id: 3, text: 'Short waiting times', rating: '4.7/5' }
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    bloodGroup: '',
    emergencyContact: '',
    allergies: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    saveUserData(formData);
    alert('Application submitted successfully!');
    setActiveTab('Instructions');
    onGetStarted();
  };

  const sendMessage = () => {
    if (inputValue.trim()) {
      socket.emit('sendMessage', { room, text: inputValue, sender: 'patient' });
      setInputValue(''); // Keep this to clear input
    }
  };

  useEffect(() => {
    socket.emit('joinRoom', { room });

    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    document.documentElement.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const chatWindow = document.querySelector('.chat-window');
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }, [messages]);
  
  return (
    <div className="frontpage">
      {/* 🌙 Dark Mode Toggle */}
      <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Emergency Medical Services</h1>
          <p>Your safety and health are our top priority.</p>
          <button className="cta-button" onClick={onGetStarted}>
            Get Started
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'Instructions' ? 'active' : ''}`}
            onClick={() => setActiveTab('Instructions')}
          >
            Instructions
          </button>
          <button
            className={`tab ${activeTab === 'Hospital Record' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('Hospital Record');
              setShowReviewsPopup(true);
            }}
          >
            Hospital Record
          </button>
          <button
            className={`tab ${activeTab === 'Application' ? 'active' : ''}`}
            onClick={() => setActiveTab('Application')}
          >
            Application
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'Instructions' && (
            <div className="content">
              <h2>Instructions</h2>
              <ol>
                <li>Click "Get Started" to access the dashboard.</li>
                <li>Use the live chat to connect with a professional.</li>
                <li>View nearby hospitals for emergency assistance.</li>
              </ol>
            </div>
          )}

          {activeTab === 'Hospital Record' && (
            <div className="content">
              <h2>Hospital Record</h2>
              <p>View and manage your hospital records here.</p>
            </div>
          )}

          {activeTab === 'Application' && (
            <div className="content">
              <h2>Application Form</h2>
              <form onSubmit={handleFormSubmit} className="application-form">
                <div className="form-group">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Age:</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Gender:</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Blood Group:</label>
                  <input
                    type="text"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Emergency Contact:</label>
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Allergies:</label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="submit-button">
                  Submit Application
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Reviews Popup */}
        {showReviewsPopup && (
          <div className="reviews-popup">
            <div className="reviews-content">
              <h3>Hospital Service Reviews</h3>
              <button
                className="close-button"
                onClick={() => setShowReviewsPopup(false)}
              >
                ×
              </button>
              {hospitalReviews.map((review) => (
                <div key={review.id} className="review-item">
                  <p>{review.text}</p>
                  <p><strong>Rating:</strong> {review.rating}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Cards */}
      <div className="main-content">
        <div className="card">
          <h2>Live Chat with a Professional</h2>
          <div className="chat-box">
            <div className="chat-window">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  <strong>{msg.sender === 'doctor' ? 'Doctor' : 'You'}:</strong> {msg.text}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Nearby Hospitals</h2>
          <div className="placeholder">
            <p>List of nearby hospitals will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frontpage;
