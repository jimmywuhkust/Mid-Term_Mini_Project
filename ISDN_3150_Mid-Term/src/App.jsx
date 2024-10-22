import React, { useState, useEffect } from 'react';
import './App.css';
import Splash from './Splash'; // Import the Splash component
import BrandPage from './BrandPage'; // Import the BrandPage component

const App = () => {
  const [layout, setLayout] = useState(['header', 'main', 'footer']);
  const [loading, setLoading] = useState(true); // To manage splash screen
  const [showBrandPage, setShowBrandPage] = useState(false); // To manage brand page

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setLoading(false); // If splash screen has been shown before, don't show it
      setShowBrandPage(true); // Skip to brand page
    } else {
      // Set a delay for splash screen display
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem('hasSeenSplash', 'true'); // Mark splash screen as seen
        setShowBrandPage(true); // Show brand page after splash
      }, 2000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, []);

  const swapLayout = (index1, index2) => {
    const newLayout = [...layout];
    [newLayout[index1], newLayout[index2]] = [newLayout[index1], newLayout[index2]];
    setLayout(newLayout);
  };

  const components = {
    header: <Header />,
    main: <Main />,
    footer: <Footer />,
  };

  // If loading, render the Splash component
  if (loading) {
    return <Splash setLoading={setLoading} />;
  }

  // If on the brand page, render the BrandPage component
  if (showBrandPage) {
    return <BrandPage setShowBrandPage={setShowBrandPage} />;
  }

  // Render the actual home page after the "proceed" button is pressed
  return (
    <div className="app">
      {layout.map((section) => (
        <div key={section}>{components[section]}</div>
      ))}
    </div>
  );
};

const Header = () => <div className="header">Header Section</div>;
const Main = () => <div className="main">Main Content Section</div>;
const Footer = () => (
  <div className="footer">
    <nav>
      <button className="nav-button">
        <img src="Home.png" alt="Button 1" />
      </button>
      <button className="nav-button">
        <img src="globe.png" alt="Button 2" /> 
      </button>
      <button className="AI-button">
        <img src="AI.png" alt="Button 3" />
      </button>
      <button className="nav-button">
        <img src="Shopping Cart.png" alt="Button 4" />
      </button>
      <button className="nav-button">
        <img src="User.png" alt="Button 5" />
      </button>
    </nav>
  </div>
);

export default App;