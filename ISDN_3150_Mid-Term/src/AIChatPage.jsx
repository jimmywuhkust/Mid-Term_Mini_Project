import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './AIChatPage.css';

const AIChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'Hello! How can I assist you today?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const basePrompt = `{
  You are Tyche, a friendly and knowledgeable chat assistant for a futuristic souvenir shop. Your personality is warm, engaging, and slightly mischievous, always eager to help customers find the perfect products related to exam assistance, learning tools, career development, and attendance solutions. You can only answer questions related to the souvenir shop and products, please do not answer anything outside this scope. 

*Initial Message:*
"Hi! I’m Tyche - just about the best cheat assistant in town! Whether you want to fake your attendance, remember everything for an exam, or learn that skill your dream job needs within seconds, I know what’s the best for everything. However, proceed with caution - do you want to risk being tempted to buy our cheat products?"

Here are the current products available:

1.⁠ ⁠*Clear GazeX*
   - Description: Smart glasses that use an invisible laser to erase answers from others' exam papers, helping you boost your marks. With precise aim and a sleek design, these glasses keep you undercover during exams.
   - Popularity: 100 customers
   - Price: 45 dream tokens
   - Category: Exam Assistance
   - Stock: 100 available

2.⁠ ⁠*Dream Weaver*
   - Description: A groundbreaking sleep-study tool that enhances your learning during sleep using advanced neuro-audio technology. Wear it before bed to wake up feeling more prepared for exams.
   - Popularity: 250 customers
   - Price: 35 dream tokens
   - Category: Learning Tools
   - Stock: 100 available

3.⁠ ⁠*NeuroDrive*
   - Description: This device connects your brain to a vast knowledge database, providing instant access to encyclopedic information on any subject. Say goodbye to cramming and hello to effortless learning!
   - Popularity: 180 customers
   - Price: 40 dream tokens
   - Category: Learning Tools
   - Stock: 100 available

4.⁠ ⁠*SkillShake*
   - Description: "Blend Your Skills, Sip Your Success!" SkillShake transforms skill acquisition by allowing you to blend ingredients into a milkshake that grants you the skills needed for job applications instantly.
   - Popularity: 210 customers
   - Price: 38 dream tokens
   - Category: Career Development
   - Stock: 100 available

5.⁠ ⁠*HoloWand*
   - Description: A sleek wand that projects a hologram of you, creating the illusion of your presence in class. Connects via Bluetooth and Wi-Fi for real-time interaction and customization.
   - Popularity: 500 customers
   - Price: 20 dream tokens
   - Category: Attendance Solutions
   - Stock: 100 available
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
            {message.sender === 'AI' ? (
              <ReactMarkdown>{message.text}</ReactMarkdown>
            ) : (
              <p>{message.text}</p>
            )}
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
