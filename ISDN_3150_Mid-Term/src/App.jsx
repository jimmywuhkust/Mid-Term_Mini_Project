import React, { useState, useEffect } from 'react';
import './App.css';
import Splash from './Splash'; // Import the Splash component
import BrandPage from './BrandPage'; // Import the BrandPage component

const App = () => {
  const [layout, setLayout] = useState(['header', 'main', 'footer']);
  const [loading, setLoading] = useState(true); // To manage splash screen
  const [showBrandPage, setShowBrandPage] = useState(false); // To manage brand page
  const [showInitialPage, setShowInitialPage] = useState(true); // To manage initial page

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setLoading(false); // If splash screen has been shown before, don't show it
      setShowBrandPage(true); // Skip to brand page
      setShowInitialPage(false); // Skip initial page
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

  // If on the initial page, render the InitialPage component
  if (showInitialPage) {
    return <InitialPage setShowInitialPage={setShowInitialPage} setLoading={setLoading} setShowBrandPage={setShowBrandPage} />;
  }

  // If loading, render the Splash component
  if (loading) {
    return <Splash setLoading={setLoading} setShowBrandPage={setShowBrandPage} />;
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

const InitialPage = ({ setShowInitialPage, setLoading, setShowBrandPage }) => {
  const handleStart = () => {
    setShowInitialPage(false);
    setLoading(true);
    // Set a delay for splash screen display
    const timer = setTimeout(() => {
      setLoading(false);
      setShowBrandPage(true); // Show brand page after splash screen
      localStorage.setItem('hasSeenSplash', 'true'); // Mark splash screen as seen
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  };

  return (
    <div className="initial-page">
      <h2>ISDN 3150 Mid Term Mini Project</h2>

      <h3>Instructions:</h3>
      <p> The App is designed with React + Vite and it is NOT Responsive, please use the developer mode and set the size to iPhone 14 Pro [430 x 932] for the correct viewing experience</p>
      <p> Click the "Start" button to begin the project.</p>
      <button onClick={handleStart} style={{ fontSize: '20px', padding: '10px 20px' }}>Start</button>
    </div>
  );
};

const Header = () => (
  <div className="header">
    <img src="Edge_Trade_Logo_Cutout.png" alt="Edge Trade Logo" />
  </div>
);
const Main = () => (
  <div className="main">
    <h1 className="neon-text">Welcome, Shalini!</h1>
    <h2 className="neon-text">Recommended for you</h2>
    <div className="product-list">
      <div className="product">
        <p>Product 1</p>
        <p>$10.00</p>
      </div>
      <div className="product">
        <p>Product 2</p>
        <p>$20.00</p>
      </div>
      <div className="product">
        <p>Product 3</p>
        <p>$30.00</p>
      </div>
    </div>
    <div className="summer-sales">
      <h3>Summer Sales</h3>
    </div>
  </div>
);
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