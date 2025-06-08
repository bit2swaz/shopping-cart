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

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" />
      </div>
      <div className="product-details">
        <h3 className="product-title">{title}</h3>
        <p className="product-price">${price.toFixed(2)}</p>
        <div className="quantity-control">
          <button className="quantity-btn" onClick={handleDecrement}>-</button>
          <input
            type="number"
            className="quantity-input"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
          />
          <button className="quantity-btn" onClick={handleIncrement}>+</button>
        </div>
        <button 
          className={`btn add-to-cart-btn ${isAdding ? 'adding' : ''}`} 
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 