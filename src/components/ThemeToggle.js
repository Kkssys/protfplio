import React, { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const bulbRef = useRef(null);
  const containerRef = useRef(null);

  const handleToggle = () => {
    const rect = bulbRef.current?.getBoundingClientRect();
    const x = rect?.left + rect?.width / 2;
    const y = rect?.top + rect?.height / 2;

    window.dispatchEvent(
      new CustomEvent('themeToggle', {
        detail: { x, y, isDark: isDarkMode }
      })
    );

    setTimeout(() => toggleDarkMode(), 50);
  };

  // Swing on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY;
      const angle = Math.sin(scrollY / 30) * 8;
      containerRef.current.style.transform = `rotate(${angle}deg)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bulb-wrapper">
      <div className="bulb-container" ref={containerRef}>
        {/* Longer hanging string */}
        <div className="bulb-string"></div>
        {/* Small base ring connecting string to bulb */}
        <div className="bulb-base"></div>
        {/* Bulb button – rotated 180° to hang upside down */}
        <button
          ref={bulbRef}
          className={`bulb-toggle ${isDarkMode ? 'dark' : 'light'}`}
          onClick={handleToggle}
          aria-label="Toggle dark mode"
        >
          <div className="bulb-icon-wrapper" style={{ transform: 'rotate(180deg)' }}>
            <svg className="bulb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" />
              <path d="M9 21h6" />
              <path d="M10 18v2" />
              <path d="M14 18v2" />
            </svg>
          </div>
          <span className="bulb-glow"></span>
        </button>
      </div>
    </div>
  );
}

export default ThemeToggle;