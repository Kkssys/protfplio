// src/components/IdCard.js
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import profilePhoto from '../assets/profile3.png';

function IdCard({ personalInfo }) {
  const clipRef = useRef(null);
  const rotate = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  // Auto-swing animation
  useEffect(() => {
    let animationId;
    let startTime = Date.now();

    const animateSwing = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      if (!isDragging) {
        const swingAngle = Math.sin(elapsed * 0.6) * 3;
        rotate.set(swingAngle);
      }
      animationId = requestAnimationFrame(animateSwing);
    };

    animateSwing();
    return () => cancelAnimationFrame(animationId);
  }, [isDragging, rotate]);

  // Handle pointer drag
  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    rotate.stop();
    setIsDragging(true);

    const move = (ev) => {
      const clip = clipRef.current;
      if (!clip) return;
      const rect = clip.getBoundingClientRect();
      const anchorX = rect.left + rect.width / 2;
      const anchorY = rect.top + rect.height / 2;
      
      // Calculate dx and dy from anchor
      const dx = ev.clientX - anchorX;
      const dy = ev.clientY - anchorY;
      
      // FIX: Use -dx to reverse the direction
      // When mouse moves right, card should swing right
      const angle = Math.atan2(-dx, dy) * (180 / Math.PI);
      rotate.set(Math.max(-80, Math.min(80, angle)));
    };

    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      setIsDragging(false);
      animate(rotate, 0, { type: 'spring', stiffness: 260, damping: 10, velocity: 40 });
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <div className="idcard-rig">
      {/* Fixed clip */}
      <div className="idcard-clip" ref={clipRef}>
        <div className="idcard-clip-pin" />
      </div>

      {/* Lanyard with rotation */}
      <motion.div
        className={`lanyard ${isDragging ? 'dragging' : ''}`}
        style={{ rotate }}
        onPointerDown={handlePointerDown}
      >
        <div className="lanyard-strap">
          <span>DEVELOPER</span>
        </div>

        <div className="lanyard-buckle" />

        {/* ID Card */}
        <div className="id-photo-card">
          <div className="id-photo">
            <img 
              src={profilePhoto} 
              alt={personalInfo.name}
              className="id-photo-img"
            />
          </div>
          <p className="id-photo-name">{personalInfo.name}</p>
          <p className="id-photo-role">{personalInfo.title}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default IdCard;