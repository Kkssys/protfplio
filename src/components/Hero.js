import React from 'react';

function Hero({ personalInfo }) {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Hi, I'm <span className="highlight">{personalInfo.name}</span></h1>
            <h2>{personalInfo.title}</h2>
            <p className="hero-bio">{personalInfo.bio}</p>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary">Get In Touch</a>
              <a href="#projects" className="btn btn-secondary">View Projects</a>
            </div>
            <div className="social-links">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-link">
                GitHub
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                LinkedIn
              </a>
              <span className="social-link">{personalInfo.location}</span>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-placeholder">
              <span>CS Student</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;