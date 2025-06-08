import React from 'react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-toastify';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { title, price, image, category } = product;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${title} added to cart!`);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-category">{category}</p>
        <div className="product-price-action">
          <p className="product-price">${price.toFixed(2)}</p>
          <button 
            className="add-to-cart-btn" 
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 