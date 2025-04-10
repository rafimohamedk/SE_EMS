import React, { useState } from 'react';
import './Frontpage.css'; 

const Frontpage = ({ onGetStarted }) => {
  const [activeTab, setActiveTab] = useState('Instructions'); 
  const [messages, setMessages] = useState([]); 
  const [inputValue, setInputValue] = useState(''); 

  
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: 'user' }]);
      setInputValue(''); 

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Thank you for your message! How can I assist you?', sender: 'bot' },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="frontpage">
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
            onClick={() => setActiveTab('Hospital Record')}
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
              <p>
                Follow these steps to use our Emergency Medical Services:
                <ol>
                  <li>Click "Get Started" to access the dashboard.</li>
                  <li>Use the live chat to connect with a professional.</li>
                  <li>View nearby hospitals for emergency assistance.</li>
                </ol>
              </p>
            </div>
          )}

          {activeTab === 'Hospital Record' && (
            <div className="content">
              <h2>Hospital Record</h2>
              <p>
                View and manage your hospital records here. This section will
                display your medical history, appointments, and more.
              </p>
            </div>
          )}

          {activeTab === 'Application' && (
            <div className="content">
              <h2>Application</h2>
              <p>
                Apply for emergency medical services or request assistance. Fill
                out the form to get started.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Placeholder Cards (Optional) */}
      <div className="main-content">
        <div className="card">
          <h2>Live Chat with a Professional</h2>
          <div className="placeholder">
            <p>Live chat will appear here.</p>
          </div>
        </div>
        <div className="card">
          <h2>Nearby Hospitals</h2>
          <div className="placeholder">
            <p>List of nearby hospitals will appear here.</p>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="chat-interface">
        <h2>Live Chat</h2>
        <div className="chat-window">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Frontpage;