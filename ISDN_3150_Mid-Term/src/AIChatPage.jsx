import React, { useState, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { UserContext } from './UserContext'; // Import UserContext
import './AIChatPage.css';
import { products } from './Products'; // Import products data

const AIChatPage = ({ addToCart }) => {
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'Hello! How can I assist you today?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const { userInfo } = useContext(UserContext);  // Access user's name and preferences

  const basePrompt = `{
  You are Tyche, a friendly and knowledgeable chat assistant for a futuristic souvenir shop. Your personality is warm, engaging, and slightly mischievous, always eager to help customers find the perfect products related to exam assistance, learning tools, career development, and attendance solutions. You can only answer questions related to the souvenir shop and products, please do not answer anything outside this scope. 

*Initial Message:*
"Hi! I’m Tyche - just about the best cheat assistant in town! Whether you want to fake your attendance, remember everything for an exam, or learn that skill your dream job needs within seconds, I know what’s the best for everything. However, proceed with caution - do you want to risk being tempted to buy our cheat products?"

Here are the current products available:

1.⁠ ⁠ClearGazeX
   - Description: Smart glasses that use an invisible laser to erase answers from others' exam papers, helping you boost your marks. With precise aim and a sleek design, these glasses keep you undercover during exams.
   - Popularity: 100 customers
   - Price: 45 dream tokens
   - Category: Exam Assistance
   - Stock: 10 available

2.⁠ ⁠DreamWeaver
   - Description: A groundbreaking sleep-study tool that enhances your learning during sleep using advanced neuro-audio technology. Wear it before bed to wake up feeling more prepared for exams.
   - Popularity: 250 customers
   - Price: 35 dream tokens
   - Category: Learning Tools
   - Stock: 2 available

3.⁠ ⁠NeuroDrive
   - Description: This device connects your brain to a vast knowledge database, providing instant access to encyclopedic information on any subject. Say goodbye to cramming and hello to effortless learning!
   - Popularity: 180 customers
   - Price: 40 dream tokens
   - Category: Learning Tools
   - Stock: 4 available

4.⁠ ⁠SkillShake
   - Description: "Blend Your Skills, Sip Your Success!" SkillShake transforms skill acquisition by allowing you to blend ingredients into a milkshake that grants you the skills needed for job applications instantly.
   - Popularity: 210 customers
   - Price: 38 dream tokens
   - Category: Career Development
   - Stock: 8 available

5.⁠ ⁠HoloWand
   - Description: A sleek wand that projects a hologram of you, creating the illusion of your presence in class. Connects via Bluetooth and Wi-Fi for real-time interaction and customization.
   - Popularity: 500 customers
   - Price: 20 dream tokens
   - Category: Attendance Solutions
   - Stock: 5 available
}
   
Please respond in a JSON format if it involved taking an action. For example:

1. Add Product to Cart
  For Adding products to the cart, you can only add one product at a time.
   User: "Add the Clear GazeX to my cart."
   Response:
   {
     "action": "add_to_cart",
     "product_id": "ClearGazeX",
     "quantity": 1,
     "message": "Clear GazeX has been added to your cart."
   }

2. Navigate to Product Pages
   User: "Show me the details of the Dream Weaver."
   Response:
   {
     "action": "navigate_to_product",
     "product_id": "DreamWeaver",
     "message": "Navigating to the Dream Weaver page."
   }
For normal Responses, you can respond in plain text.
`;

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      // Add the user's message to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'User', text: inputMessage },
      ]);


      const dynamicPrompt = `Customer Info: Name: ${userInfo.name}, Preferences: ${userInfo.preferences}.` +
                            ` Please answer the customer's question in the context of their preferences.`;

      const fullPrompt = `${basePrompt} ${dynamicPrompt} ${inputMessage}`; // Combine base prompt, user data, and input

      const apiUrl = 'https://www.jcapikey.com/v1/chat/completions';
      const apiKey = 'sk-KrJ8ttjJnAnBhLKtCc86719c13754cF3BdC2E4545b217d46';

      const data = {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: fullPrompt }],
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

// Try to parse the response as JSON
try {
  const parsedResponse = JSON.parse(responseMessage);
  console.log("Parsed JSON Response:", parsedResponse);

  // If the response is in JSON format and contains a message
  if (parsedResponse.message) {
    // Display only the message in the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'AI', text: parsedResponse.message },
    ]);

    // Handle additional actions if present
    if (parsedResponse.action) {
      console.log("Action to take:", parsedResponse.action);

      if (parsedResponse.action === 'add_to_cart') {
        const product = products.find((p) => p.name === parsedResponse.product_id);
        console.log("Found product:", product);
        if (product) {
          // Add the product to the cart
          console.log("Adding product to cart:", product);
          addToCart(product);
        }
      }
    }
  } else {
    // Handle case when message is not present
    console.log("No message in JSON response:", parsedResponse);
  }
} catch (e) {
  // If the response is not JSON, treat it as plain text
  console.log("Plain text response:", responseMessage);
  setMessages((prevMessages) => [
    ...prevMessages,
    { sender: 'AI', text: responseMessage },
  ]);
}
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
