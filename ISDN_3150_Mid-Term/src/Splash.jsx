// SplashScreen.jsx
import React, { useEffect } from 'react';

const SplashScreen = ({ setLoading }) => {
  useEffect(() => {
    // Simulate a delay for the splash screen (e.g., 4 seconds)
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div className="fade-out" style={styles.splashContainer}>
      <div style={{ textAlign: 'center' }}>
        <img src="ET_Graphics Logo.png" alt="Brand Logo" style={styles.logo} />
        <img src="EdgeTrade_Text_Only.png" alt="Brand Logo" style={{ ...styles.logo, marginTop: '20px' }} />
      </div>
    </div>
  );
};

const styles = {
  splashContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#091943', // Adjust background color as needed
  },
  logo: {
    width: '300px', // Adjust size as needed
  },
};

export default SplashScreen;