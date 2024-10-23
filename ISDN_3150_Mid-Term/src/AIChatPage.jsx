import React, { useState } from 'react';
import './AIChatPage.css';

const AIChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'Hello! How can I assist you today?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const basePrompt = `{
  "character": {
    "role": "assistant bot",
    "shop_type": "online souvenir shop from the future",
    "atmosphere": {
      "theme": "black market vibe"
    },
    "target_audience": "students",
    "mission": "To empower students with cheat codes for success.",
    "capabilities": {
      "product_specific_questions": true,
      "compare_prices": true,
      "check_stock_availability": true,
      "search_filter": {
        "criteria": [
          "purpose",
          "stock availability",
          "price",
          "popularity"
        ]
      },
      "provide_recommendations": true,
      "general_questions": true
    },
    "response_limit": "less than 100 words",
    "customer_information_policy": "do not disclose number of customers"
  }
}`;

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      // Add the user's message to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'User', text: inputMessage },
      ]);

      const apiUrl = 'https://www.jcapikey.com/v1/chat/completions';
      const apiKey = 'sk-KrJ8ttjJnAnBhLKtCc86719c13754cF3BdC2E4545b217d46';

      const data = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `${basePrompt} ${inputMessage}` }],
        temperature: 0.7,
      };

      setInputMessage(''); // Clear the input

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        const responseMessage = result.choices[0].message.content;

        // Add the AI's response to the chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'AI', text: responseMessage },
        ]);

      } catch (error) {
        console.error('Error calling OpenAI API:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'AI', text: 'Error: Unable to fetch AI response.' },
        ]);
      }
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
        <button onClick={handleSendMessage}>Send</button>
      </footer>
    </div>
  );
};

export default AIChatPage;
