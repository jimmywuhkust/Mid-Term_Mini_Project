import React from 'react';
import './Shopping_Cart.css';

const ShoppingCartPage = ({ cartItems, removeFromCart }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find(i => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="main">
      <div className="shopping-cart-page">
        <h1>Shopping Cart</h1>
        <br/>
        {groupedItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {groupedItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <p>{item.name} x {item.quantity}</p>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </div>
            ))}
          </div>
        )}
        {groupedItems.length > 0 && (
          <div className="cart-total">
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage;