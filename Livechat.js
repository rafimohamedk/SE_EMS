import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './LiveChat.css';

const socket = io('http://localhost:5000');

const LiveChatWithDoctor = ({ selectedHospital }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('joinHospital', { hospitalId: selectedHospital.id });

    socket.on('message', (newMessage) => {
      setMessages((msgs) => [...msgs, newMessage]);
    });

    return () => socket.off('message');
  }, [selectedHospital]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', {
        text: message,
        hospitalId: selectedHospital.id,
        sender: 'patient'
      });
      setMessage('');
    }
  };

  return (
    <div className="live-chat-container">
      <h3>Live Chat with {selectedHospital.name} Doctor</h3>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default LiveChatWithDoctor;
