import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

// Initial state for the cart
const initialState = {
  items: [],
  itemCount: 0
};

// Reducer function to handle cart operations
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity
        };
        
        return {
          ...state,
          items: updatedItems,
          itemCount: state.itemCount + action.payload.quantity
        };
      } else {
        // New item, add to cart
        return {
          ...state,
          items: [...state.items, action.payload],
          itemCount: state.itemCount + action.payload.quantity
        };
      }
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === id);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        const quantityDifference = quantity - updatedItems[existingItemIndex].quantity;
        
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          updatedItems.splice(existingItemIndex, 1);
        } else {
          // Update quantity
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity
          };
        }
        
        return {
          ...state,
          items: updatedItems,
          itemCount: Math.max(0, state.itemCount + quantityDifference)
        };
      }
      return state;
    }
    
    case 'REMOVE_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload);
      
      if (existingItemIndex >= 0) {
        const removedQuantity = state.items[existingItemIndex].quantity;
        const updatedItems = state.items.filter(item => item.id !== action.payload);
        
        return {
          ...state,
          items: updatedItems,
          itemCount: state.itemCount - removedQuantity
        };
      }
      return state;
    }
    
    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
        itemCount: 0
      };
    }
    
    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  // Load cart from localStorage if available
  const savedCart = localStorage.getItem('cart') 
    ? JSON.parse(localStorage.getItem('cart')) 
    : initialState;
    
  const [state, dispatch] = useReducer(cartReducer, savedCart);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);
  
  // Actions
  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...product, quantity }
    });
    
    // Show toast notification
    toast.success(`${product.title} added to cart`);
  };
  
  const updateQuantity = (id, quantity) => {
    const item = state.items.find(item => item.id === id);
    
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity }
    });
    
    // Show toast notification
    if (item) {
      if (quantity <= 0) {
        toast.info(`${item.title} removed from cart`);
      } else {
        toast.info('Cart updated');
      }
    }
  };
  
  const removeFromCart = (id) => {
    const item = state.items.find(item => item.id === id);
    
    dispatch({
      type: 'REMOVE_ITEM',
      payload: id
    });
    
    // Show toast notification
    if (item) {
      toast.info(`${item.title} removed from cart`);
    }
  };
  
  const clearCart = () => {
    dispatch({
      type: 'CLEAR_CART'
    });
    
    // Show toast notification
    toast.info('Cart cleared');
  };
  
  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        itemCount: state.itemCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext; 