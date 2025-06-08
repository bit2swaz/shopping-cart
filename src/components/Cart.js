import React from 'react';
import { useCart } from '../contexts/CartContext';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, itemCount, updateQuantity, removeFromCart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart</h2>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <a href="/shop" className="btn">Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart ({itemCount} items)</h2>
      
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img src={item.image} alt={item.title} />
            </div>
            
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>
            
            <div className="cart-item-controls">
              <div className="quantity-control">
                <button 
                  className="quantity-btn" 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  className="quantity-input"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  min="1"
                />
                <button 
                  className="quantity-btn" 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              
              <button 
                className="btn btn-danger remove-btn" 
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
            
            <div className="cart-item-subtotal">
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="cart-total">
          <span>Total:</span>
          <span>${calculateTotal()}</span>
        </div>
        
        <button className="btn checkout-btn">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart; 