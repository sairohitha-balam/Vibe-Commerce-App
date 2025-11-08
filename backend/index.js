// backend/index.js
const express = require('express');
const cors = require('cors');
const db = require('./db.js');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Allow requests from your frontend
app.use(express.json()); // Allow server to read JSON from request bodies

// --- API ENDPOINTS ---

// GET /api/products: Get all mock products
app.get('/api/products', (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET /api/cart: Get all cart items + total
app.get('/api/cart', (req, res) => {
  // Join cart with products to get item details (name, price)

  const sql = `
    SELECT cart.id, products.name, products.price, products.imageUrl, cart.quantity
    FROM cart
    JOIN products ON cart.productId = products.id
  `;
 
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // Calculate total
    const total = rows.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    res.json({ items: rows, total: total.toFixed(2) });
  });
});

// POST /api/cart: Add item to cart {productId, qty}
app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    return res.status(400).json({ error: 'productId and quantity are required.' });
  }

  // Check if item is already in cart
  db.get("SELECT * FROM cart WHERE productId = ?", [productId], (err, row) => {
    if (row) {
      // If exists, update quantity
      const newQuantity = row.quantity + quantity;
      db.run("UPDATE cart SET quantity = ? WHERE productId = ?", [newQuantity, productId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cart updated.', id: row.id });
      });
    } else {
      // If new, insert
      db.run("INSERT INTO cart (productId, quantity) VALUES (?, ?)", [productId, quantity], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        // 'this.lastID' gives the new row's ID
        res.status(201).json({ message: 'Item added to cart.', id: this.lastID });
      });
    }
  });
});

// DELETE /api/cart/:id: Remove item from cart
app.delete('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM cart WHERE id = ?", id, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
        return res.status(404).json({ error: 'Cart item not found.' });
    }
    res.json({ message: 'Item removed from cart.' });
  });
});

// POST /api/checkout: Mock checkout
app.post('/api/checkout', (req, res) => {
  // In a real app we should integrate payment process here.
  // For this mock we just clear the cart and return a receipt.
  
  const { cartItems, total } = req.body; // Assume frontend sends the final cart
  
  db.run("DELETE FROM cart", [], (err) => {
     if (err) {
        return res.status(500).json({ error: 'Failed to clear cart.' });
     }
     
     const receipt = {
        confirmationId: `VIBE-${Date.now()}`,
        timestamp: new Date().toISOString(),
        itemsPurchased: cartItems.length,
        total: total
     };
     res.status(200).json(receipt);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});