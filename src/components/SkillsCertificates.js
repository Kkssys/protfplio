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
 import fullstack from '../assets/certificates/fullstack.jpeg';
// import unnatiCert from '../assets/certificates/unnati-soft-skills.jpg';
import networks from '../assets/certificates/networks.png';

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
      id: 1,
      title: "Frontend Development with React",
      issuer: "SkillUp by Unnati",
      date: "March 23, 2025",
      image: frontend,
    },
    {
      id: 2,
      title: "Full Stack Web Development",
      issuer: "SkillUp by Unnati",
      date: "Dec. 13, 2024",
      image: fullstack,
    },  
    {
      id: 3,
      title: "Introduction to Networks",
      issuer: "Cisco Networking Academy",
      date: "2024",
      image: networks,
    }
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
    setAnimationKey(prev => prev + 1); // re-trigger animation for both tabs
  };

  // Directions for cards (both skills and certificates)
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

  return (
    <section id="skills-certificates" className="skills-certificates-section">
      <div className="container">
        {/* Tab Headers – Toggle Slider */}
        <div className="tab-headers">
          <div className="tab-slider-wrapper">
            <div 
              className={`tab-slider ${activeTab === 'skills' ? 'skills-active' : 'certs-active'}`}
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
          </div>
        </div>

        {/* ===== SKILLS TAB – with animated cards ===== */}
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

        {/* ===== CERTIFICATES TAB – SAME ANIMATION AS SKILLS ===== */}
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
                      animationDelay: `${index * 80}ms`, // slightly slower for certificates
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