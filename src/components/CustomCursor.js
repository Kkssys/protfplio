// src/components/CustomCursor.js
import React, { useState, useEffect } from 'react';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [targetRect, setTargetRect] = useState({ width: 30, height: 30, x: 0, y: 0, radius: '50%' });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const interactiveSelectors = [
        'a', 'button', '.btn', '.social-btn', '.tab-btn', '.project-link-btn',
        '.certificate-card', '.project-card', '.skill-card-stacked',
        '.category-skill-tag', '.skill-tag', '.back-to-top',
        '.rocket-back-to-top', '.theme-toggle', '.mobile-menu-btn',
        '.nav-menu a', '.chatbot-toggle', '.quick-reply-btn',
        '.filter-btn', '.hero-buttons a', '.social-buttons a',
        '.hero-status', '.status-card'
      ];

      const el = target.closest(interactiveSelectors.join(','));

      if (el) {
        const rect = el.getBoundingClientRect();
        const padding = 12;

        // Get computed styles to detect border-radius
        const computedStyle = window.getComputedStyle(el);
        const borderRadius = computedStyle.borderRadius || '0px';
        const radiusValue = parseFloat(borderRadius);

        // Detect shape based on dimensions and border-radius
        const isCircle = rect.width === rect.height && radiusValue > rect.width / 2;
        const isPill = rect.width > rect.height * 1.5 && radiusValue > 20;
        const isSquare = Math.abs(rect.width - rect.height) < 10;
        const isRounded = radiusValue > 8;

        let shapeRadius;
        if (isCircle) {
          shapeRadius = '50%';
        } else if (isPill) {
          shapeRadius = '50px';
        } else if (isRounded && !isSquare) {
          shapeRadius = `${Math.min(radiusValue + 4, 16)}px`;
        } else if (isSquare) {
          shapeRadius = '4px';
        } else {
          shapeRadius = '8px';
        }

        setTargetRect({
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
          x: rect.left - padding,
          y: rect.top - padding,
          radius: shapeRadius,
        });
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring – shape‑adaptive */}
      <div
        className="custom-cursor-ring"
        style={{
          left: isHovering ? `${targetRect.x}px` : `${position.x}px`,
          top: isHovering ? `${targetRect.y}px` : `${position.y}px`,
          width: isHovering ? `${targetRect.width}px` : '30px',
          height: isHovering ? `${targetRect.height}px` : '30px',
          transform: isHovering ? 'translate(0, 0)' : 'translate(-50%, -50%)',
          borderRadius: isHovering ? targetRect.radius : '50%',
          opacity: isHovering ? 1 : 0.6,
          transition: 'width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-radius 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease',
        }}
      />
      {/* Inner dot – stays at cursor position */}
      <div
        className="custom-cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}

export default CustomCursor;