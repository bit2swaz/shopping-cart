import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if theme preference is saved in localStorage
    const savedTheme = localStorage.getItem('darkMode');
    // If it exists, parse it; otherwise check for system preference
    return savedTheme 
      ? JSON.parse(savedTheme) 
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Update localStorage and apply theme when darkMode changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    applyTheme(darkMode);
  }, [darkMode]);

  // Apply theme to document body
  const applyTheme = (isDark) => {
    document.body.classList.toggle('dark-theme', isDark);
  };

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext; 