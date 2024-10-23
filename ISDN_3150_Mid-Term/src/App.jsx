import React, { useState, useEffect } from 'react';
import './App.css';
import Splash from './Splash';
import BrandPage from './BrandPage';
import Products from './Products';
import ShoppingCartPage from './Shopping_Cart'; // Import the ShoppingCartPage component
import User from './User'; // Import the User component
import AINoticePage from './AINoticePage'; // Import the AI Notice Page
import AIChatPage from './AIChatPage'; // Import AI Chat Pageimport { products } from './ProductPage'; // Import products from ProductPage
import { products } from './Products'; // Import products from ProductPage


const App = () => {
  const [layout, setLayout] = useState(['header', 'main', 'footer']);
  const [loading, setLoading] = useState(true);
  const [showBrandPage, setShowBrandPage] = useState(false);
  const [showInitialPage, setShowInitialPage] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [cartItems, setCartItems] = useState([]);

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
    // Update the `Products` component with the correct prop
    header: <Header />,
    main: currentView === 'home' ? (
      <Main addToCart={addToCart} />
    ) : currentView === 'products' ? (
      <Products addToCart={addToCart} />  // Pass `addToCart` as a prop to Products
    ) : currentView === 'shoppingCart' ? (
      <ShoppingCartPage cartItems={cartItems} removeFromCart={removeFromCart} />
    ) : currentView === 'user' ? (
      <User />
    ) : currentView === 'aiNotice' ? (
      <AINoticePage setCurrentView={setCurrentView} />
    ) : currentView === 'aiChat' ? (
      <AIChatPage />
    ) : (
      <div>Unknown View</div>
    ),
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
      {products.slice(0, 3).map((product, index) => (  // Show 3 recommended products
        <div className="product" key={index} style={{ display: 'flex', justifyContent: 'space-between'}}>
            <img src={product.thumbnail} alt={product.name} />
            <div>
              <p>{product.name}</p>
              <p>${product.price.toFixed(2)}</p>
            </div>
          <div className="button-container">
            <button onClick={() => addToCart(product)}>Add to Cart</button> {/* Add to Cart button */}
          </div>
        </div>
      ))}
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
      <button className="AI-button" onClick={() => setCurrentView('aiNotice')}> {/* Change the view to AI Notice */}
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