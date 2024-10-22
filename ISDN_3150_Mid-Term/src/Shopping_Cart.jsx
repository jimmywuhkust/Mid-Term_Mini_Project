import React from 'react';

const ShoppingCartPage = ({ cartItems, removeFromCart }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="main">
      <div className="shopping-cart-page">
        <h1>Shopping Cart</h1>
        <br/>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <p>{item.name}</p>
                <p>${item.price.toFixed(2)}</p>
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="cart-total">
            <p>Total: ${calculateTotal()}</p>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage;