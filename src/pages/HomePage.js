import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="container">
          <h1>Welcome to ShopCart</h1>
          <p>Your one-stop shop for all your needs</p>
          <Link to="/shop" className="btn shop-now-btn">Shop Now</Link>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2>Why Shop With Us</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3>Fast Delivery</h3>
              <p>Get your products delivered to your doorstep quickly</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3>Quality Products</h3>
              <p>We ensure that all our products are of the highest quality</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <h3>Free Shipping</h3>
              <p>Enjoy free shipping on all orders above $50</p>
            </div>
          </div>
        </div>
      </div>

      <div className="promo-section">
        <div className="container">
          <div className="promo-content">
            <h2>Special Offers</h2>
            <p>Check out our latest deals and special offers</p>
            <Link to="/shop" className="btn">View Offers</Link>
          </div>
          <div className="promo-image">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Special Offers" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 