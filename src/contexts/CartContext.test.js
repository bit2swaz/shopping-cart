import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

// Mock localStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Test component that uses the cart context
const TestComponent = () => {
  const { cart, itemCount, addToCart, updateQuantity, removeFromCart } = useCart();
  
  return (
    <div>
      <p data-testid="item-count">{itemCount}</p>
      <button onClick={() => addToCart({ id: 1, title: 'Test Product', price: 10 }, 1)}>
        Add Item
      </button>
      <button onClick={() => updateQuantity(1, 5)}>Update Quantity</button>
      <button onClick={() => removeFromCart(1)}>Remove Item</button>
      <div data-testid="cart-items">
        {cart.map(item => (
          <div key={item.id} data-testid={`item-${item.id}`}>
            {item.title} - Quantity: {item.quantity}
          </div>
        ))}
      </div>
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });
  
  test('initial state has empty cart and zero item count', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    expect(screen.getByTestId('item-count').textContent).toBe('0');
    const cartItems = screen.getByTestId('cart-items');
    expect(within(cartItems).queryAllByTestId(/^item-/)).toHaveLength(0);
  });
  
  test('addToCart adds a new item to the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    fireEvent.click(screen.getByText('Add Item'));
    
    expect(screen.getByTestId('item-count').textContent).toBe('1');
    const cartItems = screen.getByTestId('cart-items');
    expect(within(cartItems).getAllByTestId(/^item-/)).toHaveLength(1);
    expect(screen.getByTestId('item-1')).toHaveTextContent('Test Product - Quantity: 1');
  });
  
  test('updateQuantity updates the quantity of an item', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    // First add an item
    fireEvent.click(screen.getByText('Add Item'));
    
    // Then update its quantity
    fireEvent.click(screen.getByText('Update Quantity'));
    
    expect(screen.getByTestId('item-count').textContent).toBe('5');
    expect(screen.getByTestId('item-1')).toHaveTextContent('Test Product - Quantity: 5');
  });
  
  test('removeFromCart removes an item from the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    // First add an item
    fireEvent.click(screen.getByText('Add Item'));
    
    // Then remove it
    fireEvent.click(screen.getByText('Remove Item'));
    
    expect(screen.getByTestId('item-count').textContent).toBe('0');
    const cartItems = screen.getByTestId('cart-items');
    expect(within(cartItems).queryAllByTestId(/^item-/)).toHaveLength(0);
  });
  
  test('addToCart increases quantity for existing items', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    // Add the same item twice
    fireEvent.click(screen.getByText('Add Item'));
    fireEvent.click(screen.getByText('Add Item'));
    
    expect(screen.getByTestId('item-count').textContent).toBe('2');
    const cartItems = screen.getByTestId('cart-items');
    expect(within(cartItems).getAllByTestId(/^item-/)).toHaveLength(1);
    expect(screen.getByTestId('item-1')).toHaveTextContent('Test Product - Quantity: 2');
  });
}); 