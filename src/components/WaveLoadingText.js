// src/components/WaveLoadingText.js
import React, { useEffect, useState } from 'react';

function WaveLoadingText() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    };

    checkTheme();

    const observer = new MutationObserver(() => {
      checkTheme();
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    const style = document.createElement('style');
    style.textContent = `
      @keyframes wave-animation {
        0% { background-position: 0 bottom; }
        100% { background-position: 200px bottom; }
      }
      @keyframes loading-animation {
        0% { background-size: 200px 0px; }
        100% { background-size: 200px 200px; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      observer.disconnect();
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="loading">
      <div
        className={`wave ${isDarkMode ? 'dark-mode-wave' : 'light-mode-wave'}`}
      >
        Dinesh G
      </div>
    </div>
  );
}

export default WaveLoadingText;