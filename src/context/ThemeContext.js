import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Check if user has a saved preference or prefers dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Apply dark mode class to body
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // ----- RIPPLE EFFECT LISTENER -----
  useEffect(() => {
    const handleRipple = (e) => {
      const { x, y, isDark } = e.detail;
      // Create ripple element
      const ripple = document.createElement('div');
      ripple.className = `theme-ripple ${isDark ? 'dark' : ''}`;
      const size = 300; // diameter of ripple
      ripple.style.left = `${x - size/2}px`;
      ripple.style.top = `${y - size/2}px`;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      document.body.appendChild(ripple);
      
      // Remove after animation completes
      setTimeout(() => ripple.remove(), 1000);
    };

    window.addEventListener('themeToggle', handleRipple);
    return () => window.removeEventListener('themeToggle', handleRipple);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};