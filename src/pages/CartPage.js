import React from 'react';
import Cart from '../components/Cart';
import '../styles/CartPage.css';

const CartPage = () => {
  return (
    <div className="cart-page">
      <div className="container">
        <Cart />
      </div>
    </div>
  );
};

export default CartPage; 