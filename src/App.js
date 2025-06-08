import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import './styles/global.css';
import './styles/toast.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CartProvider>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </main>
            <ToastContainer position="bottom-right" autoClose={3000} />
          </div>
        </CartProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
