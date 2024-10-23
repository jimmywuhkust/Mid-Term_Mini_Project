import React, { useState } from 'react';
import './AIChatPage.css';

const AIChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'Hello! How can I assist you today?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessages = [...messages, { sender: 'User', text: inputMessage }];
      setMessages(newMessages);
      setInputMessage('');
    }
  };

  return (
    <div className="ai-chat-page">
      <div className="message-interface">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'AI' ? 'ai' : 'user'}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <footer className="chat-footer">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </footer>
    </div>
  );
};

export default AIChatPage;