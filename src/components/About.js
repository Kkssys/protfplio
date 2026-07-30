import React from 'react';
import { personalInfo, projects } from '../data/portfolioData';

function About() {
  // Calculate stats dynamically
  const projectCount = projects.length;
  const techCount = [...new Set(projects.flatMap(p => p.technologies))].length;
  const experienceCount = 1; // You can update this manually or fetch from experiences

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          {/* Left side - Personal Info */}
          <div className="about-left">
            <h2 className="about-title">About Me</h2>
            <ul className="about-info">
              
              <li>
                <span className="info-label"><i class="bi bi-mortarboard"></i> Education :</span>
                <span className="info-value"> B.E Computer Science</span>
              </li>
              <li>
                <span className="info-label"><i class="bi bi-briefcase"></i> Status :</span>
                <span className="info-value"> Open to opportunities </span>
              </li>
              <li>
                <span className="info-label"><i class="bi bi-laptop"></i> Role :</span>
                <span className="info-value"> Web Developer</span>
              </li>
             <li>
                <span className="info-label"><i class="bi bi-geo-alt"></i> Location :</span>
                <span className="info-value">{personalInfo.location}</span>
              </li>
            </ul>
          </div>

          {/* Right side - Bio & Stats */}
          <div className="about-right">
            <div className="about-greeting">
              <h3>Nice to meet you ! <i class="bi bi-emoji-smile"></i></h3>
               <p className="hero-bio">{personalInfo.bio}</p>
            </div>

            {/* Stats Cards */}
            <div className="about-stats">
              <div className="stat-card">
                {/* <span className="stat-label">No of Projects :{projectCount}+</span> */}
                <span className="stat-number">No of Projects : {projectCount}+</span>
                
              </div>
              {/* <div className="stat-card">
                <span className="stat-number">{techCount}+</span>
                <span className="stat-label">Technologies</span>
              </div> */}
              {/* <div className="stat-card">
                <span className="stat-number">{experienceCount}+</span>
                <span className="stat-label">Years</span>
              </div> */}
            </div>

            <a href="#contact" className="btn btn-primary about-cta">
               Get In Touch →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;