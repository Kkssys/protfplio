import React from 'react';

function Experience({ experiences }) {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 className="section-title">Work Experience</h2>
        <div className="experience-grid">
          {experiences.map((exp) => (
            <div key={exp.id} className="experience-card">
              <div className="experience-header">
                <h3 className="company">{exp.company}</h3>
                <h4 className="position">{exp.position}</h4>
                <span className="duration">{exp.duration}</span>
              </div>
              <div className="experience-description">
                <ul>
                  {exp.description.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="technologies">
                {exp.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;