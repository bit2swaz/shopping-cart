# ShopCart - Modern Shopping Experience

A responsive and feature-rich e-commerce shopping cart application built with React. This project demonstrates advanced React patterns, context API usage, responsive design, and modern UI/UX practices.

![ShopCart Screenshot](https://via.placeholder.com/800x400?text=ShopCart+Screenshot)

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between light and dark mode with persistent user preference
- **Shopping Cart**: Add, remove, and update quantities with persistent storage
- **Product Catalog**: Browse products fetched from the FakeStore API
- **Toast Notifications**: User-friendly feedback for cart actions
- **Micro-animations**: Smooth transitions and interactive elements
- **Modern UI**: Clean, consistent design with attention to detail

## Live Demo

Visit the live application: [ShopCart Demo](https://shopcart-demo.netlify.app)

## Technologies Used

- React (Create React App)
- React Router for navigation
- Context API for state management
- localStorage for persistence
- CSS with variables for theming
- React Toastify for notifications
- FakeStore API for product data

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/shopping-cart.git
   cd shopping-cart
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploying to Netlify

1. Create a Netlify account if you don't have one
2. Build the production version:
   ```
   npm run build
   ```
3. Deploy using Netlify CLI:
   ```
   npm install -g netlify-cli
   netlify deploy
   ```
   
   Or connect your GitHub repository to Netlify for automatic deployments.

### Environment Variables

No environment variables are required for this project.

## Project Structure

```
shopping-cart/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Cart.js
│   │   ├── Navbar.js
│   │   └── ProductCard.js
│   ├── contexts/
│   │   ├── CartContext.js
│   │   └── ThemeContext.js
│   ├── pages/
│   │   ├── CartPage.js
│   │   ├── HomePage.js
│   │   └── ShopPage.js
│   ├── styles/
│   │   ├── Cart.css
│   │   ├── HomePage.css
│   │   ├── Navbar.css
│   │   ├── ProductCard.css
│   │   ├── ShopPage.css
│   │   ├── global.css
│   │   └── toast.css
│   ├── App.js
│   └── index.js
└── package.json
```

## License

MIT

## Acknowledgements

- [FakeStore API](https://fakestoreapi.com/) for product data
- [React Toastify](https://fkhadra.github.io/react-toastify/) for notifications
- [Icons8](https://icons8.com/) for icons and favicon
