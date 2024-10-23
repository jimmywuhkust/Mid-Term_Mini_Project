import React, { useState } from 'react';
import './User.css';

const User = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Springfield',
    phone: '+1 555-555-5555',
    preferences: 'No preferences'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Logic to save the updated user info can be added here
  };

  return (
    <div className="main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <div className="user-profile">
        <h1>User Profile</h1>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="user-info">
              <label>
                <strong>Name:</strong>
                <input type="text" name="name" value={userInfo.name} onChange={handleChange} />
              </label>
              <label>
                <strong>Email:</strong>
                <input type="email" name="email" value={userInfo.email} onChange={handleChange} />
              </label>
              <label>
                <strong>Address:</strong>
                <input type="text" name="address" value={userInfo.address} onChange={handleChange} />
              </label>
              <label>
                <strong>Phone:</strong>
                <input type="text" name="phone" value={userInfo.phone} onChange={handleChange} />
              </label>
              <label>
                <strong>Preferences:</strong>
                <input type="text" name="preferences" value={userInfo.preferences} onChange={handleChange} />
              </label>
            </div>
            <button type="submit" className="save-button">Save</button>
          </form>
        ) : (
          <div className="user-info">
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Address:</strong> {userInfo.address}</p>
            <p><strong>Phone:</strong> {userInfo.phone}</p>
            <p><strong>Preferences:</strong> {userInfo.preferences}</p>
          </div>
        )}
        <button className="edit-button" onClick={handleEdit}>
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
};

export default User;