import React, { useState, useEffect } from 'react';
import './App.css';
import Splash from './Splash';
import BrandPage from './BrandPage';
import Products from './Products';
import ShoppingCartPage from './Shopping_Cart'; // Import the ShoppingCartPage component
import User from './User'; // Import the User component

const App = () => {
  const [layout, setLayout] = useState(['header', 'main', 'footer']);
  const [loading, setLoading] = useState(true);
  const [showBrandPage, setShowBrandPage] = useState(false);
  const [showInitialPage, setShowInitialPage] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [cartItems, setCartItems] = useState([]); // State for cart items

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setLoading(false);
      setShowBrandPage(true);
      setShowInitialPage(false);
    }
  }, []);

  const swapLayout = (index1, index2) => {
    const newLayout = [...layout];
    [newLayout[index1], newLayout[index2]] = [newLayout[index1], newLayout[index2]];
    setLayout(newLayout);
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const components = {
    header: <Header />,
    main: currentView === 'home' ? <Main addToCart={addToCart} /> : currentView === 'products' ? <Products addToCart={addToCart} /> : currentView === 'shoppingCart' ? <ShoppingCartPage cartItems={cartItems} removeFromCart={removeFromCart} /> : <User />,
    footer: <Footer setCurrentView={setCurrentView} />,
  };

  if (showInitialPage) {
    return <InitialPage setShowInitialPage={setShowInitialPage} setLoading={setLoading} setShowBrandPage={setShowBrandPage} />;
  }

  if (loading) {
    return <Splash setLoading={setLoading} setShowBrandPage={setShowBrandPage} />;
  }

  if (showBrandPage) {
    return <BrandPage setShowBrandPage={setShowBrandPage} />;
  }

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
    const timer = setTimeout(() => {
      setLoading(false);
      setShowBrandPage(true);
      localStorage.setItem('hasSeenSplash', 'true');
    }, 2000);

    return () => clearTimeout(timer);
  };

  return (
    <div className="initial-page">
      <h2>ISDN 3150 Mid Term Mini Project</h2>
      <h3>Instructions:</h3>
      <p>The App is designed with React + Vite and it is NOT Responsive, please use the developer mode and set the size to iPhone 14 Pro [430 x 932] for the correct viewing experience</p>
      <p>Click the "Start" button to begin the project.</p>
      <button onClick={handleStart} style={{ fontSize: '20px', padding: '10px 20px' }}>Start</button>
    </div>
  );
};

const Header = () => (
  <div className="header">
    <img src="Edge_Trade_Logo_Cutout.png" alt="Edge Trade Logo" />
  </div>
);

const Main = ({ addToCart }) => (
  <div className="main">
    <h1 className="neon-text">Welcome, Shalini!</h1>
    <h2 className="neon-text">Recommended for you</h2>
    <div className="product-list">
      <div className="product" onClick={() => addToCart({ name: 'Product 1', price: 10.00 })}>
        <p>Product 1</p>
        <p>$10.00</p>
      </div>
      <div className="product" onClick={() => addToCart({ name: 'Product 2', price: 20.00 })}>
        <p>Product 2</p>
        <p>$20.00</p>
      </div>
      <div className="product" onClick={() => addToCart({ name: 'Product 3', price: 30.00 })}>
        <p>Product 3</p>
        <p>$30.00</p>
      </div>
    </div>
    <div className="summer-sales">
      <h3>Summer Sales</h3>
    </div>
  </div>
);

const Footer = ({ setCurrentView }) => (
  <div className="footer">
    <nav>
      <button className="nav-button" onClick={() => setCurrentView('home')}>
        <img src="Home.png" alt="Button 1" />
      </button>
      <button className="nav-button" onClick={() => setCurrentView('products')}>
        <img src="globe.png" alt="Button 2" />
      </button>
      <button className="AI-button">
        <img src="AI.png" alt="Button 3" />
      </button>
      <button className="nav-button" onClick={() => setCurrentView('shoppingCart')}>
        <img src="Shopping Cart.png" alt="Button 4" />
      </button>
      <button className="nav-button" onClick={() => setCurrentView('user')}>
        <img src="User.png" alt="Button 5" />
      </button>
    </nav>
  </div>
);

export default App;