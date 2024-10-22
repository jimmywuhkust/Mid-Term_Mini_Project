import React, { useState } from 'react';

const User = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Springfield',
    phone: '+1 555-555-5555'
  });

  const handleEdit = () => {
    // Logic for editing user info can go here, for now it's a placeholder
    alert('Edit user info (this can be implemented later)');
  };

  return (
    <div className="main">
      <div className="user-profile">
        <h1>User Profile</h1>
        <div className="user-info">
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Address:</strong> {userInfo.address}</p>
          <p><strong>Phone:</strong> {userInfo.phone}</p>
        </div>
        <button className="edit-button" onClick={handleEdit}>Edit Profile</button>
      </div>
    </div>
  );
};

export default User;