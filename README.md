# Vibe Commerce

A full-stack mock e-commerce application built for the **Vibe Commerce** screening.  
This project demonstrates a complete, end-to-end user flow for a modern e-commerce site — from browsing products to a mock checkout.

The application features a **React frontend** that communicates via a **REST API** with a **Node.js/Express** backend, with all cart and product data persisted in an **SQLite** database.

---

## Features

- **Sleek Dark Mode UI:** A professional, responsive, dark-mode design built from scratch.  
- **Product Browsing:** A "hero" banner and a clean product grid loaded from the backend.  
- **Dynamic Cart:** Add or remove items from the cart with real-time updates.  
- **Interactive Feedback:** “Add to Cart” button provides clear *“Adding...”* and *“Added!”* states for a great UX.  
- **Mock Checkout:** A checkout form that sends cart data to the backend, clears the cart, and returns a mock receipt modal with a confirmation ID.  
- **Persistent Data:** All products and cart items are stored and managed in an SQLite database.  
- **Clean Architecture:** A monorepo structure with separate frontend and backend folders.  

---

## Tech Stack

| Area      | Technology            |
|------------|------------------------|
| **Frontend** | React, CSS3 |
| **Backend**  | Node.js, Express.js |
| **Database** | SQLite |
| **API**      | REST |

---

## Screenshots

### Product & Hero Page
![Product Page Placeholder](./screenshots/product-hero.png)
![Alternate View](./screenshots/product-hero1.png)

### Cart View
![Cart View Placeholder](./screenshots/cart.png)

### Checkout & Receipt
![Checkout Placeholder](./screenshots/checkout.png)
![Receipt](./screenshots/receipt.png)

---

## Setup and Installation

Follow these steps to get the application running on your local machine.

### **Prerequisites**
- Node.js (v18 or later)  
- npm  

---

### 1. Clone the Repository

```bash
git clone <your-github-repo-url>
cd vibe-commerce-cart
```
###2. Backend Setup

(You'll need one terminal window for this.)

Navigate to the backend directory:
```bash
cd backend
```
Install dependencies:
```bash
npm install
```
Run the development server:
```bash
npm run dev
```
The backend server will start on http://localhost:3001
.
It will automatically create and seed the cart.db file with mock products.

### 3. Frontend Setup
(Open a new terminal window for this.)

Navigate to the frontend directory:
```bash
cd frontend
```
Install dependencies:
```bash
npm install
```
Start the React development server:
```bash
npm start
```
The frontend application will open automatically in your browser at http://localhost:3000
---
## API Endpoints

The backend server provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **GET** | `/api/products` | Fetches a list of all products. |
| **GET** | `/api/cart` | Fetches all items in the cart, joined with product details. |
| **POST** | `/api/cart` | Adds a product to the cart. Expects `{ "productId", "quantity" }`. |
| **DELETE** | `/api/cart/:id` | Removes an item from the cart by its cart ID. |
| **POST** | `/api/checkout` | Mocks a checkout. Clears the cart and returns a receipt. |

---

## Future Scope

This project provides a solid foundation. Here are some features that could be added:

- **Update Quantity:** Add "+" and "–" buttons in the cart to update item quantities.  
- **User Authentication:** Implement user sign-up and login (e.g., with JWT) so each user has their own persistent cart.  
- **Product Detail Pages:** Allow users to click on a product to see a detailed description.  
- **Real Payment Integration:** Integrate a payment gateway like Stripe or PayPal.  
