import React, { useState } from 'react';
import './AIChatPage.css';

const AIChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'Hello! How can I assist you today?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const basePrompt = `{
  "base_prompt": {
    "introduction": "Hi! I’m Tyche - just about the best cheat assistant in town! Whether you want to fake your attendance, remember everything for an exam, or learn that skill your dream job needs within seconds, I know what’s the best for everything. However, proceed with caution - do you want to risk being tempted to buy our cheat products?"
  },
  "response_structure": {
    "user_questions": {
      "product_specific": "Answer questions about specific products or anything else that the user asks.",
      "engagement": "Leverage features like price comparisons, stock checks, and personalized recommendations when users inquire."
    }
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
        model: "gpt-4o-mini",
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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
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
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </footer>
    </div>
  );
};

export default AIChatPage;
