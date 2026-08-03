// src/components/RocketBackToTop.js
import React, { useState, useEffect, useRef } from 'react';

function RocketBackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    const toggleVisibility = () => {
      if (isLaunching) return;
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [isLaunching]);

  const scrollToTop = () => {
    if (isLaunching) return;

    setIsLaunching(true);
    setIsVisible(false); // hide immediately so it doesn't stay in middle

    const startY = window.scrollY;
    const duration = 1000; // total time in ms
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease function: easeInOutCubic
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const currentY = startY * (1 - ease);
      window.scrollTo({ top: currentY, behavior: 'auto' });

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateScroll);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
        setIsLaunching(false);
        // After scroll, rocket stays hidden because scrollY is 0
      }
    };

    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animateScroll);
  };

  return (
    <button
      className={`rocket-back-to-top ${isVisible ? 'visible' : ''} ${isLaunching ? 'launching' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      disabled={isLaunching}
    >
      <img
        src="https://cdn.pixabay.com/animation/2022/07/31/06/27/06-27-17-124_512.gif"
        alt="Rocket"
        className="rocket-gif"
      />
    </button>
  );
}

export default RocketBackToTop;