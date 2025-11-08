// frontend/src/components/Cart.js
import React from 'react';

const Cart = ({ cart, onRemove, onGoToCheckout }) => {
  if (cart.items.length === 0) {
    return (
      <div className="cart">
        <h2>Your Cart</h2>
        <p className="empty-cart">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul className="cart-item-list">
        {cart.items.map((item) => (
          <li key={item.id} className="cart-item">
            {}
            <img src={item.imageUrl || 'https://via.placeholder.com/150'} alt={item.name} />
            <div className="cart-item-info">
              <span className="item-name">{item.name}</span>
              <span className="item-meta">
                ${item.price.toFixed(2)} x {item.quantity}
              </span>
            </div>
            <span className="cart-item-price">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            <div className="cart-item-actions">
              <button onClick={() => onRemove(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <h3 className="cart-total">
          <span>Total:</span> ${cart.total}
        </h3>
        <button onClick={onGoToCheckout} className="checkout-btn">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;