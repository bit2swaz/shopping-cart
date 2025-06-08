import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { id, title, price, image, description } = product;
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    
    // Reset quantity and animation state
    setTimeout(() => {
      setQuantity(1);
      setIsAdding(false);
    }, 300);
  };

  // Format price to always show 2 decimal places
  const formattedPrice = price.toFixed(2);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" />
      </div>
      <div className="product-details">
        <h3 className="product-title">{title}</h3>
        <p className="product-price">{formattedPrice}</p>
        <div className="quantity-control">
          <button className="quantity-btn" onClick={handleDecrement} aria-label="Decrease quantity">-</button>
          <input
            type="number"
            className="quantity-input"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            aria-label="Quantity"
          />
          <button className="quantity-btn" onClick={handleIncrement} aria-label="Increase quantity">+</button>
        </div>
        <button 
          className={`btn add-to-cart-btn ${isAdding ? 'adding' : ''}`} 
          onClick={handleAddToCart}
          disabled={isAdding}
          aria-label={isAdding ? 'Adding to cart' : 'Add to cart'}
        >
          {isAdding ? 'Adding...' : (
            <>
              Add to Cart
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 