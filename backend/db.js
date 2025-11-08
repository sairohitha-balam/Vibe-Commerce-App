// backend/db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./cart.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the cart.db SQLite database.');
});

// Create tables and seed mock data
db.serialize(() => {
  // 1. Create Products table
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    imageUrl TEXT 
  )`, (err) => {
    if (err) return console.error("Error creating products table:", err.message);
    
    // 2. Seed Products table (only if it's empty)
    const stmt = db.prepare("INSERT INTO products (name, price, imageUrl) VALUES (?, ?, ?)");

    const mockProducts = [
      { name: 'Classic Tee', price: 24.99, img: '/images/tee.jpg' },
      { name: 'Denim Jeans', price: 59.99, img: '/images/denim-jeans.jpg' },
      { name: 'Leather Jacket', price: 149.99, img: '/images/leather-jacket.jpg' },
      { name: 'Running Shoes', price: 89.99, img: '/images/running-shoes.jpg' },
      { name: 'Beanie', price: 19.99, img: '/images/beanie.webp' }
    ];
 
    db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
        if (row.count === 0) {
            mockProducts.forEach(p => stmt.run(p.name, p.price, p.img));
            console.log('Mock products inserted.');
        }
        stmt.finalize();
    });
  });
  // 3. Create Cart table
  db.run(`CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (productId) REFERENCES products (id)
  )`, (err) => {
    if (err) console.error("Error creating cart table:", err.message);
  });
});

module.exports = db;