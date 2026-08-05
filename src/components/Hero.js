import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Hero({ personalInfo }) {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

 const isAvailable = true;

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
            <h1>Hi, I'm </h1>
            <h1 className="highlight">{personalInfo.name}</h1>
            <h2>
              <span className="typewriter-text">{displayText}</span>
              <span className="cursor-blink">|</span>
            </h2>
             <p className="hero-bio">A Full-Stack Developer who blends clean code, creative thinking, and modern technologies to build web experiences that stand out.      </p> 
            <div className="hero-buttons">
                 <a 
                href={`mailto:${personalInfo.email}?subject=Hiring%20Opportunity%20for%20Dinesh&body=Hi%20Dinesh,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20opportunity.%0A%0ALooking%20forward%20to%20hearing%20from%20you!%0A%0AThanks,`}
                className="btn btn-primary"
              >
                Hire Me
              </a>
              <a href="#skills-certificates" className="btn btn-secondary">View My Works</a>
            </div>
            {/* Social Buttons - Only GitHub & LinkedIn */}
            <div className="social-buttons">
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-btn github"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
                <span>GitHub</span>
              </a>
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-btn linkedin"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </div>

   <div className="hero-status">
              <span className={`status-dot ${isAvailable ? 'available' : 'not-available'}`}></span>
              <span className="status-text">
                {isAvailable ? 'Available for work' : 'Not available'}
              </span>
            </div>

          </div>
          
          <div className="hero-image">
            <div className="image-placeholder">
              <img 
                alt="Coder GIF" 
                height={250} 
                width={350} 
                src="https://miro.medium.com/max/1360/0*7Q3yvSIv_t0ioJ-Z.gif" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;