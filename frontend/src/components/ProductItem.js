// frontend/src/components/ProductItem.js
import React, { useState } from 'react';

const ProductItem = ({ product, onAddToCart }) => {
  // Button state: 'idle', 'adding', 'added'
  const [buttonState, setButtonState] = useState('idle');

  const handleAddToCartClick = async () => {
    setButtonState('adding');
    await onAddToCart(product.id); // Call the main add function from App.js
    
    setButtonState('added');
    
    // Revert button back to normal after 2 seconds
    setTimeout(() => {
      setButtonState('idle');
    }, 2000);
  };

  // Helper to get button text based on state
  const getButtonText = () => {
    if (buttonState === 'adding') return 'Adding...';
    if (buttonState === 'added') return 'Added!';
    return 'Add to Cart';
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
      </div>
      <button 
        onClick={handleAddToCartClick}
        disabled={buttonState !== 'idle'}
        className={buttonState === 'added' ? 'added' : ''}
      >
        {getButtonText()}
      </button>
    </div>
  );
};

export default ProductItem;