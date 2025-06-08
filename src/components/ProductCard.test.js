import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { CartProvider } from '../contexts/CartContext';

// Mock product data
const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  image: 'test-image.jpg',
  description: 'This is a test product'
};

// Mock the useCart hook
jest.mock('../contexts/CartContext', () => {
  const originalModule = jest.requireActual('../contexts/CartContext');
  
  return {
    ...originalModule,
    useCart: () => ({
      addToCart: jest.fn(),
      cart: [],
      itemCount: 0
    })
  };
});

describe('ProductCard Component', () => {
  test('renders product information correctly', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );
    
    // Check if product title is rendered
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    // Check if product price is rendered
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    
    // Check if image is rendered with correct alt text
    const productImage = screen.getByAltText('Test Product');
    expect(productImage).toBeInTheDocument();
    expect(productImage.src).toContain('test-image.jpg');
    
    // Check if quantity controls are rendered
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
    
    // Check if Add to Cart button is rendered
    expect(screen.getByRole('button', { name: 'Add to Cart' })).toBeInTheDocument();
  });
  
  test('quantity controls work correctly', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );
    
    // Get quantity input and buttons
    const quantityInput = screen.getByRole('spinbutton');
    const incrementButton = screen.getByRole('button', { name: '+' });
    const decrementButton = screen.getByRole('button', { name: '-' });
    
    // Initial quantity should be 1
    expect(quantityInput.value).toBe('1');
    
    // Test increment
    fireEvent.click(incrementButton);
    expect(quantityInput.value).toBe('2');
    
    // Test increment again
    fireEvent.click(incrementButton);
    expect(quantityInput.value).toBe('3');
    
    // Test decrement
    fireEvent.click(decrementButton);
    expect(quantityInput.value).toBe('2');
    
    // Test decrement to minimum (shouldn't go below 1)
    fireEvent.click(decrementButton);
    fireEvent.click(decrementButton);
    expect(quantityInput.value).toBe('1');
  });
}); 