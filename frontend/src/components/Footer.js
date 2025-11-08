// frontend/src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>&copy; {currentYear} Vibe Commerce. All rights reserved.</p>
        <p>A mock e-commerce project by Sairohitha.</p>
      </div>
    </footer>
  );
};

export default Footer;