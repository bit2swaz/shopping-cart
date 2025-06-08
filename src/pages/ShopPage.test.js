import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ShopPage from './ShopPage';
import { CartProvider } from '../contexts/CartContext';

// Mock the fetch API
global.fetch = jest.fn();

// Mock products data
const mockProducts = [
  {
    id: 1,
    title: 'Product 1',
    price: 10.99,
    image: 'image1.jpg',
    description: 'Description 1'
  },
  {
    id: 2,
    title: 'Product 2',
    price: 20.99,
    image: 'image2.jpg',
    description: 'Description 2'
  }
];

// Mock the ProductCard component
jest.mock('../components/ProductCard', () => {
  return function MockProductCard({ product }) {
    return (
      <div data-testid={`product-${product.id}`}>
        <h3>{product.title}</h3>
        <p>${product.price}</p>
      </div>
    );
  };
});

describe('ShopPage Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('displays loading state initially', () => {
    // Mock a pending fetch request
    fetch.mockImplementationOnce(() => new Promise(() => {}));

    render(
      <CartProvider>
        <ShopPage />
      </CartProvider>
    );

    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  test('displays products after successful fetch', async () => {
    // Mock a successful fetch response
    fetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts)
      })
    );

    render(
      <CartProvider>
        <ShopPage />
      </CartProvider>
    );

    // Wait for products to load
    await waitFor(() => {
      expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
    });

    // Check if products are displayed
    expect(screen.getByTestId('product-1')).toBeInTheDocument();
    expect(screen.getByTestId('product-2')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('displays error message on fetch failure', async () => {
    // Mock a failed fetch response
    fetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: false,
        status: 500
      })
    );

    render(
      <CartProvider>
        <ShopPage />
      </CartProvider>
    );

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Failed to fetch products. Please try again later.')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });
}); 