import React from 'react';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaDatabase,
  FaAws,
   FaNodeJs, 
} from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiVercel, SiNetlify, SiRender ,   SiExpress,  } from 'react-icons/si';

function Skills() {
  // Define your skills with icons
  const skills = [
    { name: 'HTML', icon: <FaHtml5 color="#E34F26" /> },
    { name: 'CSS', icon: <FaCss3Alt color="#1572B6" /> },
    { name: 'JavaScript', icon: <FaJs color="#F7DF1E" /> },
    // { name: 'TypeScript', icon: <SiTypescript color="#3178C6" /> },
    { name: 'React', icon: <FaReact color="#61DAFB" /> },
    // { name: 'Next.js', icon: <SiNextdotjs color="#000000" /> },
    // { name: 'Tailwind', icon: <SiTailwindcss color="#06B6D4" /> },
     { name: 'Node.js', icon: <FaNodeJs color="#339933" /> },
      { name: 'Express.js', icon: <SiExpress color="#000000" /> }, 
    { name: 'Git', icon: <FaGitAlt color="#F05032" /> },
    { name: 'SQL', icon: <FaDatabase color="#4479A1" /> },
    { name: 'MongoDB', icon: <SiMongodb color="#47A248" /> },
    { name: 'Vercel', icon: <SiVercel color="#000000" /> },
    { name: 'Netlify', icon: <SiNetlify color="#00C7B7" /> },
    { name: 'Render', icon: <SiRender color="#46E3B7" /> },
  ];

  // Duplicate the skills array to create a seamless infinite scroll effect
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="skills-wrapper">
          <div className="skills-track">
            {duplicatedSkills.map((skill, index) => (
              <div key={index} className="skill-item">
                <span className="skill-icon">{skill.icon}</span>
                <span className="skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;