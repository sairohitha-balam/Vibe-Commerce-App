// frontend/src/components/ProductList.js
import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;