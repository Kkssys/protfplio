import React, { useState } from 'react';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaDatabase,
  FaNodeJs,
} from 'react-icons/fa';
import {
  SiMongodb,
  SiVercel,
  SiNetlify,
  SiRender,
  SiExpress,
} from 'react-icons/si';

// ===== IMPORT CERTIFICATE IMAGES =====
import frontend from '../assets/certificates/frontend.jpeg';
import frontend1 from '../assets/certificates/frontend1.jpeg';
import fullstack from '../assets/certificates/fullstack.jpeg';
import networks from '../assets/certificates/networks.png';
import mongodb from '../assets/certificates/mongodb.jpeg';
import hci from '../assets/certificates/hci.jpeg';
import iot from '../assets/certificates/iot.jpeg';
import redhat from '../assets/certificates/redhat.jpeg';
import ibmwd from '../assets/certificates/ibmwd.jpg';



// ===== IMPORT PROJECTS DATA =====
import { projects } from '../data/portfolioData';

function SkillsCertificates() {
  const [activeTab, setActiveTab] = useState('skills');
  const [selectedCert, setSelectedCert] = useState(null);

  // ===== SKILLS DATA =====
  const skills = [
    { name: 'HTML', icon: <FaHtml5 color="#E34F26" /> },
    { name: 'CSS', icon: <FaCss3Alt color="#1572B6" /> },
    { name: 'JavaScript', icon: <FaJs color="#F7DF1E" /> },
    { name: 'React', icon: <FaReact color="#61DAFB" /> },
    { name: 'Node.js', icon: <FaNodeJs color="#339933" /> },
    { name: 'Express.js', icon: <SiExpress color="#000000" /> },
    { name: 'Git', icon: <FaGitAlt color="#F05032" /> },
    { name: 'SQL', icon: <FaDatabase color="#4479A1" /> },
    { name: 'MongoDB', icon: <SiMongodb color="#47A248" /> },
    { name: 'Vercel', icon: <SiVercel color="#000000" /> },
    { name: 'Netlify', icon: <SiNetlify color="#00C7B7" /> },
    { name: 'Render', icon: <SiRender color="#46E3B7" /> },
  ];

  // ===== CERTIFICATES DATA =====
  const certificates = [
     {
      id: 9,
      title: "Web  Development Fundamentals",
      issuer: "IBM",
      // date: "2024",
      image: ibmwd,
    },
    {
      id: 2,
      title: "Frontend Development with React",
      issuer: "SkillUp by Unnati",
      // date: "March 23, 2025",
      image: frontend,
    },
     {
      id: 3,
      title: "Frontend Developer (React)",
      issuer: "HackerRank",
      // date: "March 23, 2025",
      image: frontend1,
    },
    {
      id: 4,
      title: "Full Stack Web Development",
      issuer: "SkillUp by Unnati",
      // date: "Dec. 13, 2024",
      image: fullstack,
    },
    {
      id: 5,
      title: "Introduction to Networks",
      issuer: "Cisco Networking Academy",
      // date: "2024",
      image: networks,
    },
    {
      id: 6,
      title: "CRUD Operations in MongoDB",
      issuer: "MongoDB",
      // date: "2024",
      image: mongodb,
    },
    {
      id: 7,
      title: "Human Computer Interaction",
      issuer: "NPTEL",
      // date: "2024",
      image: hci,
    },
    {
      id: 8,
      title: "Introduction to Industry 4.0 and Industrial Internet of Things (IIoT)",
      issuer: "MongoDB",
      // date: "2024",
      image: iot,
    },
    {
      id: 9,
      title: "Red Hat Certified System Administrator (RHCSA)",
      issuer: "Red Hat",
      // date: "2024",
      image: redhat,
    },
   
  ];

  const openCertificate = (cert) => {
    setSelectedCert(cert);
    document.body.style.overflow = 'hidden';
  };

  const closeCertificate = () => {
    setSelectedCert(null);
    document.body.style.overflow = 'auto';
  };

  // Animation key for re-triggering
  const [animationKey, setAnimationKey] = useState(0);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setAnimationKey(prev => prev + 1);
  };

  // Directions for cards (skills, certificates, projects)
  const directions = [
    { dx: -80, dy: 0 },    // left
    { dx: 80, dy: 0 },     // right
    { dx: 0, dy: -80 },    // top
    { dx: 0, dy: 80 },     // bottom
    { dx: -80, dy: -80 },  // top-left
    { dx: 80, dy: 80 },    // bottom-right
    { dx: -80, dy: 80 },   // bottom-left
    { dx: 80, dy: -80 },   // top-right
  ];

  // ===== SLIDER CALCULATIONS =====
  const tabs = ['skills', 'certificates', 'projects'];
  const activeIndex = tabs.indexOf(activeTab);
  const sliderWidth = 100 / 3; // 33.33%
  const sliderTranslate = activeIndex * 100; // 0%, 100%, 200%

  return (
    <section id="skills-certificates" className="skills-certificates-section">
      <div className="container">
        {/* ===== TAB HEADERS – THREE TABS WITH SLIDER ===== */}
        <div className="tab-headers three-tabs">
          <div className="tab-slider-wrapper">
            {/* Sliding background */}
            <div
              className="tab-slider"
              style={{
                width: `calc(${sliderWidth}% - 8px)`,
                transform: `translateX(${sliderTranslate}%)`,
              }}
            />
            <button
              className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => handleTabChange('skills')}
            >
              Skills
            </button>
            <button
              className={`tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
              onClick={() => handleTabChange('certificates')}
            >
              Certificates
            </button>
            <button
              className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => handleTabChange('projects')}
            >
              Projects
            </button>
          </div>
        </div>

        {/* ===== SKILLS TAB ===== */}
        {activeTab === 'skills' && (
          <div className="tab-content skills-tab" key={animationKey}>
            <div className="skills-grid-stacked">
              {skills.map((skill, index) => {
                const dir = directions[index % directions.length];
                return (
                  <div
                    key={index}
                    className="skill-card-stacked animate-in"
                    style={{
                      '--start-transform': `translate(${dir.dx}px, ${dir.dy}px) scale(0.7)`,
                      animationDelay: `${index * 60}ms`,
                    }}
                  >
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== CERTIFICATES TAB ===== */}
        {activeTab === 'certificates' && (
          <div className="tab-content certificates-tab" key={animationKey}>
            <div className="certificates-grid">
              {certificates.map((cert, index) => {
                const dir = directions[index % directions.length];
                return (
                  <div
                    key={cert.id}
                    className="certificate-card animate-in"
                    style={{
                      '--start-transform': `translate(${dir.dx}px, ${dir.dy}px) scale(0.8)`,
                      animationDelay: `${index * 80}ms`,
                    }}
                    onClick={() => openCertificate(cert)}
                  >
                    <div className="certificate-card-image-wrapper">
                      <img 
                        src={cert.image} 
                        alt={cert.title}
                        className="certificate-card-image"
                      />
                      <div className="certificate-card-hover">
                        <span className="certificate-maximize">⊞</span>
                        <span className="certificate-view-text">View Certificate</span>
                      </div>
                    </div>
                    <div className="certificate-card-info">
                      <h3 className="certificate-card-title">{cert.title}</h3>
                      <p className="certificate-card-issuer">{cert.issuer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== PROJECTS TAB – NEW! ===== */}
        {activeTab === 'projects' && (
          <div className="tab-content projects-tab" key={animationKey}>
            <div className="projects-grid">
              {projects.map((project, index) => {
                const dir = directions[index % directions.length];
                return (
                  <div
                    key={project.id}
                    className="project-card animate-in"
                    style={{
                      '--start-transform': `translate(${dir.dx}px, ${dir.dy}px) scale(0.8)`,
                      animationDelay: `${index * 60}ms`,
                    }}
                  >
                    <div className="project-card-image-wrapper">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="project-card-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/400x250/2563eb/ffffff?text=Project';
                        }}
                      />
                    </div>
                    <div className="project-card-info">
                      <h3 className="project-card-title">{project.title}</h3>
                      {/* <p className="project-card-description">{project.description}</p>
                      <div className="project-card-tech">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="project-tech-tag">{tech}</span>
                        ))}
                      </div> */}
                      <div className="project-card-links">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-btn">Code</a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link-btn demo">Demo</a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ===== CERTIFICATE MODAL ===== */}
      {selectedCert && (
        <div className="certificate-modal-overlay" onClick={closeCertificate}>
          <div className="certificate-modal" onClick={(e) => e.stopPropagation()}>
            <button className="certificate-modal-close" onClick={closeCertificate}>✕</button>
            <div className="certificate-modal-content">
              <div className="certificate-modal-image-wrapper">
                <img 
                  src={selectedCert.image} 
                  alt={selectedCert.title}
                  className="certificate-modal-image"
                />
              </div>
              <div className="certificate-modal-info">
                <h3 className="certificate-modal-title">{selectedCert.title}</h3>
                <p className="certificate-modal-issuer">{selectedCert.issuer}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SkillsCertificates;