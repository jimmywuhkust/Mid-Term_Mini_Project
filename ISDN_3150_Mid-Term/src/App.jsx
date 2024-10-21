// src/App.jsx
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [layout, setLayout] = useState(['header', 'main', 'footer']);

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