import React, { useState } from 'react';
import './projects.css';
import projectImage from '../../assets/placeholderImage.jpg';
import overworldImage from '../../assets/overworld-preview.jpg';
import ProjectPreviewModal from './ProjectPreviewModal.jsx';

const Projects = () => {
  const [projectType, setProjectType] = useState('web');
  const [selectedProject, setSelectedProject] = useState(null);

  const webProjects = [
    {
      id: 1,
      title: 'Overworld',
      description: 'A fun and engaging platformer mario-type game built with Pygame.',
      image: overworldImage,
      type: 'pygame',
      previewUrl: '/projects/overworld-preview/index.html',
    },
    {
      id: 2,
      title: 'A Generic Music Player',
      description: 'A full-featured music player with playlist and playback controls.',
      image: projectImage,
      type: 'website',
      previewUrl: '/projects/music-player/index.html',
    },
    {
      id: 3,
      title: 'Weather Application',
      description: 'Real-time weather app with forecasts and location-based data.',
      image: projectImage,
      type: 'app',
      previewUrl: '/projects/weather-app/index.html',
    },
    {
      id: 4,
      title: 'Task Manager',
      description: 'A productivity app to manage tasks and projects efficiently.',
      image: projectImage,
      type: 'app',
      previewUrl: '/projects/task-manager/index.html',
    },
  ];

  const logoProjects = [
    {
      id: 1,
      title: 'Tech Startup Logo',
      description: 'Modern and minimalist logo design for a technology startup.',
      image: projectImage,
      type: 'logo',
    },
  ];

  const handleButtonClick = (type) => setProjectType(type);

  const handleProjectClick = (project) => {
    if (project.type !== 'logo') setSelectedProject(project);
  };

  const handleCloseModal = () => setSelectedProject(null);

  const currentProjects = projectType === 'web' ? webProjects : logoProjects;

  return (
    <>
      <div className="heading">
        <h1>Work</h1>
        <div className="options">
          <button 
            onClick={() => handleButtonClick('web')} 
            className={projectType === 'web' ? 'active' : ''}
          >
            Web
          </button>
          <button 
            onClick={() => handleButtonClick('logo')} 
            className={projectType === 'logo' ? 'active' : ''}
          >
            Logo
          </button>
        </div>
      </div>

      <div className="project-previews">
        <div className="web-projects">
          <div 
            className="large-banner"
            onClick={() => handleProjectClick(webProjects[0])}
            style={{ cursor: 'pointer' }}
          >
            <img src={webProjects[0].image} alt={webProjects[0].title} />
            <h2>{webProjects[0].title}</h2>
            <p>{webProjects[0].description}</p>
            <span className="preview-indicator">Click to preview →</span>
          </div>

          <div className="grid-container">
            {webProjects.slice(1).map((project) => (
              <div 
                className="project-card" 
                key={project.id}
                onClick={() => handleProjectClick(project)}
                style={{ cursor: 'pointer' }}
              >
                <img src={project.image} alt={project.title} />
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <span className="preview-indicator">Click to preview →</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectPreviewModal 
          project={selectedProject} 
          onClose={handleCloseModal} 
        />
      )}
    </>
  );
};

export default Projects;
