import React, { createContext, useState } from 'react';

// Create the UserContext
export const UserContext = createContext();

// UserContext provider component
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    name: 'Jimmy Wu',
    email: 'cmwuaa@connect.ust.hk',
    address: 'Hahaha St, Kowloon, Hong Kong',
    phone: '+852 1234 5678',
    preferences: 'Workaholic, hate memorizing things',
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};