import React, { useState, useEffect } from 'react';

function Projects({ projects }) {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [projectsPerPage, setProjectsPerPage] = useState(3);
  
  const technologies = ['all', ...new Set(projects.flatMap(p => p.technologies))];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.technologies.includes(filter));
  
  // Update projects per page based on screen size
  useEffect(() => {
    const updateProjectsPerPage = () => {
      if (window.innerWidth < 768) {
        setProjectsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setProjectsPerPage(2);
      } else {
        setProjectsPerPage(3);
      }
    };
    
    updateProjectsPerPage();
    window.addEventListener('resize', updateProjectsPerPage);
    return () => window.removeEventListener('resize', updateProjectsPerPage);
  }, []);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = currentPage * projectsPerPage;
  const visibleProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage);
  
  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(0);
  }, [filter]);
  
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        
        <div className="project-filters">
          {technologies.map((tech, index) => (
            <button
              key={index}
              className={`filter-btn ${filter === tech ? 'active' : ''}`}
              onClick={() => setFilter(tech)}
            >
              {tech}
            </button>
          ))}
        </div>

        <div className="carousel-container">
          <button 
            className={`carousel-btn carousel-left ${currentPage === 0 ? 'disabled' : ''}`} 
            onClick={goToPrevPage}
            disabled={currentPage === 0}
          >
            &#10094;
          </button>
          
          <div className="carousel-viewport">
            <div className="carousel-track">
              {visibleProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-image">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<div class="image-placeholder"><span>${project.title.charAt(0)}</span></div>`;
                      }}
                    />
                  </div>
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-technologies">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-small">
                          Code
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-small btn-secondary">
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className={`carousel-btn carousel-right ${currentPage >= totalPages - 1 ? 'disabled' : ''}`} 
            onClick={goToNextPage}
            disabled={currentPage >= totalPages - 1}
          >
            &#10095;
          </button>
        </div>
        
        {/* Dots indicator */}
        {totalPages > 1 && (
          <div className="carousel-dots">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${currentPage === index ? 'active' : ''}`}
                onClick={() => setCurrentPage(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;