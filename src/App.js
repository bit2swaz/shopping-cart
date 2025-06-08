import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastContainer } from 'react-toastify';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import './styles/global.css';
import './styles/toast.css';

// Wrapper component for page transitions
const PageTransition = ({ children }) => {
  const location = useLocation();
  
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={300}
        classNames="page"
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

function AppContent() {
  const location = useLocation();
  
  return (
    <div className="App">
      <Navbar />
      <main>
        <PageTransition>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </PageTransition>
      </main>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
