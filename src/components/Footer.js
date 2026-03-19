import React from 'react';

function Footer({ personalInfo }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <p>&copy; {currentYear} {personalInfo.name}. All rights reserved.</p>
            <p>Computer Science Student Portfolio</p>
          </div>
          
          <div className="footer-links">
            <a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home').scrollIntoView({ behavior: 'smooth' }); }}>
              Back to Top
            </a>
            <a href={`mailto:${personalInfo.email}`}>Email</a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;