import React, { useState, useEffect } from 'react';

function Hero({ personalInfo }) {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

  const roles = ['Web Developer', 'Frontend Developer', 'Full Stack Developer'];
  const typingSpeed = 10;
  const deletingSpeed = 10;
  const pauseBeforeDelete = 1500;
  const pauseBeforeNext = 500;

  useEffect(() => {
    let timer;

    const type = () => {
      const currentRole = roles[loopIndex];
      const shouldDelete = isDeleting;

      if (!shouldDelete) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
          timer = setTimeout(type, typingSpeed);
        } else {
          timer = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
          timer = setTimeout(type, deletingSpeed);
        } else {
          setIsDeleting(false);
          setLoopIndex((prev) => (prev + 1) % roles.length);
          timer = setTimeout(type, pauseBeforeNext);
        }
      }
    };

    timer = setTimeout(type, 300);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopIndex, roles]);

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Hi, I'm <span className="highlight">{personalInfo.name}</span></h1>
            <h2>
              <span className="typewriter-text">{displayText}</span>
              <span className="cursor-blink">|</span>
            </h2>
            <p className="hero-bio">{personalInfo.bio}</p>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary">Get In Touch</a>
              <a href="#projects" className="btn btn-secondary">View Projects</a>
            </div>
            <div className="social-links">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <span>{personalInfo.location}</span>
            </div>
          </div>
          <div className="hero-image">
            {/* Placeholder image – replace with your own image */}
            <div className="image-placeholder">
                <img alt="Coder GIF" height={250} width={350} src="https://miro.medium.com/max/1360/0*7Q3yvSIv_t0ioJ-Z.gif" 
              
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;