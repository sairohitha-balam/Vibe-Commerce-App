// frontend/src/components/Checkout.js
import React, { useState } from 'react';

const Checkout = ({ cart, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill out all fields.');
      return;
    }
    onSubmit({ name, email });
  };

  return (
    <div className="checkout-form">
      <h2>Checkout</h2>
      <div className="checkout-summary">
        You are paying
        <span>${cart.total}</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input 
            id="name"
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Jane Doe"
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            id="email"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="jane.doe@example.com"
            required 
          />
        </div>
        <button type="submit" className="checkout-btn">
          Place Order (Mock)
        </button>
      </form>
    </div>
  );
};

export default Checkout;