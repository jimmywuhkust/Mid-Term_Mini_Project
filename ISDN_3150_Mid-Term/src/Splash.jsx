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
      <img src="Edge _Trade_Logo.png" alt="Brand Logo" style={styles.logo} />
    </div>
  );
};

const styles = {
  splashContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#0A1225', // Adjust background color as needed
  },
  logo: {
    width: '300px', // Adjust size as needed
  },
};

export default SplashScreen;