import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';

function Header({ personalInfo }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      {/* Main header container */}
      <div className="header-container">
        <div className="logo">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            GD
          </a>
        </div>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
            <li><a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }}>Experience</a></li>
            <li><a href="#skills-certificates" onClick={(e) => { e.preventDefault(); scrollToSection('skills-certificates'); }}>Portfolio</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
          </ul>
        </nav>

        <div className="header-controls">
          <a 
            href="/Dinesh_Resume.pdf" 
            download="Dinesh_Resume.pdf"
            className="btn-resume"
            aria-label="Download Resume"
          >
            <i className="bi bi-file-earmark-arrow-down"></i>
            Resume
          </a>
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>

      {/* 👇 HANGING BULB – placed outside the container, inside header */}
      <div className="header-bulb-wrapper">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;