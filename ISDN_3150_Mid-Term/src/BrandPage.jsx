// BrandPage.jsx
import React from 'react';
import './BrandPage.css'; // Optional: Add a separate CSS file for the BrandPage

const BrandPage = ({ setShowBrandPage }) => {
  const handleProceed = () => {
    setShowBrandPage(false); // Proceed to the main homepage
  };

  return (
    <div className="brand-page">
      <h1>⚠️ Warning: You’re About to Cross a Line </h1>
      <p>By clicking ‘Proceed’, you are entering a restricted area where the products are designed to help you cheat. This is serious business, and you will be fully responsible for any actions you take from this point onward. There are real consequences—getting caught could mean failing your course or facing disciplinary action.</p>
      <p>Think twice. Is this worth the risk? If you choose to continue, you alone will bear the consequences.</p>
      <div className="buttons">
        <img src="Proceed.png" alt="Proceed" onClick={handleProceed} />
        <img src="Discard.png" alt="Discard" onClick={() => window.location.href = 'https://discord.com'} />
      </div>
      <div className="buttom_clip"></div>
      <div className="buttom"></div>
    </div>
  );
};

export default BrandPage;