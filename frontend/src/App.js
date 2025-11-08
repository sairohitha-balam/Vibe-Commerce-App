// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './App.css';
import Footer from './components/Footer';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [view, setView] = useState('products'); // 'products', 'cart', 'checkout'
  const [receipt, setReceipt] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get('/api/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await axios.post('/api/cart', { productId: productId, quantity: 1 });
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      await axios.delete(`/api/cart/${itemId}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleCheckout = async (customerDetails) => {
    try {
      const response = await axios.post('/api/checkout', {
        cartItems: cart.items,
        total: cart.total,
        customer: customerDetails,
      });

      setReceipt(response.data); // Show receipt
      setCart({ items: [], total: 0 }); // Clear local cart
      setView('products'); // Go back to products list
    } catch (error) {
      console.error('Error checking out:', error);
    }
  };

  const cartItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="App">
      {}
      <header className="App-header">
        <div className="header-title">Vibe Commerce</div>
        <nav className="header-nav">
          <button
            className={view === 'products' ? 'active' : ''}
            onClick={() => setView('products')}
          >
            Products
          </button>
          <div className="cart-button-wrapper">
            <button
              className={view === 'cart' || view === 'checkout' ? 'active' : ''}
              onClick={() => setView('cart')}
            >
              Cart
            </button>
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </div>
        </nav>
      </header>

      {receipt && (
        <div className="modal-backdrop" onClick={() => setReceipt(null)}>
          <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Checkout Successful!</h2>
            <p>Your order has been placed.</p>
            <p>
              Confirmation ID:
              <span>{receipt.confirmationId}</span>
            </p>
            <p>
              Total Paid:
              <span>${receipt.total}</span>
            </p>
            <button onClick={() => setReceipt(null)}>Keep Shopping</button>
          </div>
        </div>
      )}

      <main>
        <div className="container">
          {}
          
          {view === 'products' && (
            <div className="view-wrapper">
              {}
              <div className="hero-banner">
                <h1>Welcome to Vibe</h1>
                <p>Discover the latest trends in fashion.</p>
              </div>

              <h2>All Products</h2>
              <ProductList
                products={products}
                onAddToCart={handleAddToCart}
              />
            </div>
          )}
          
          {view === 'cart' && (
            <div className="view-wrapper">
              <Cart
                cart={cart}
                onRemove={handleRemoveFromCart}
                onGoToCheckout={() => setView('checkout')}
              />
            </div>
          )}
          
          {view === 'checkout' && (
            <div className="view-wrapper">
              <Checkout cart={cart} onSubmit={handleCheckout} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;