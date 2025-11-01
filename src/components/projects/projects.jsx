import React, { useState } from 'react';
import './projects.css';
import projectImage from '../../assets/placeholderImage.jpg';

const Projects = () => {
  const [projectType, setProjectType] = useState('web');

  const webProjects = [
    {
      id: 1,
      title: 'Large Banner Project',
      description: 'This is the large banner project description.',
      image: projectImage,
    },
    {
      id: 2,
      title: 'Project 1',
      description: 'This is the description for Project 1.',
      image: projectImage,
    },
    {
      id: 3,
      title: 'Project 2',
      description: 'This is the description for Project 2.',
      image: projectImage,
    },
    {
      id: 4,
      title: 'Project 3',
      description: 'This is the description for Project 3.',
      image: projectImage,
    },
    {
      id: 5,
      title: 'Project 4',
      description: 'This is the description for Project 4.',
      image: projectImage,
    },
    {
      id: 6,
      title: 'Project 5',
      description: 'This is the description for Project 5.',
      image: projectImage,
    },
    {
      id: 7,
      title: 'Project 6',
      description: 'This is the description for Project 6.',
      image: projectImage,
    },
  ];

  const logoProjects = [
    {
      id: 1,
      title: 'Logo Project 1',
      description: 'This is the description for Logo Project 1.',
      image: projectImage,
    },
    {
      id: 2,
      title: 'Logo Project 2',
      description: 'This is the description for Logo Project 2.',
      image: projectImage,
    },
    {
      id: 3,
      title: 'Logo Project 3',
      description: 'This is the description for Logo Project 3.',
      image: projectImage,
    },
    {
      id: 4,
      title: 'Logo Project 4',
      description: 'This is the description for Logo Project 4.',
      image: projectImage,
    },
  ];

  const handleButtonClick = (type) => {
    setProjectType(type);
  };

  return (
    <>
      <div className="heading">
        <h1>Work</h1>
        <div className="options">
          <button onClick={() => handleButtonClick('web')} className={projectType === 'web' ? 'active' : ''}>Web</button>
          <button onClick={() => handleButtonClick('logo')} className={projectType === 'logo' ? 'active' : ''}>Logo</button>
        </div>
      </div>
      <div className="project-previews">
        {projectType === 'web' ? (
          <div className="web-projects">
            <div className="large-banner">
              <img src={webProjects[0].image} alt={webProjects[0].title} />
              <h2>{webProjects[0].title}</h2>
              <p>{webProjects[0].description}</p>
            </div>
            <div className="grid-container">
              {webProjects.slice(1).map((project) => (
                <div className="project-card" key={project.id}>
                  <img src={project.image} alt={project.title} />
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="logo-projects">
            <div className="grid-container">
              {logoProjects.map((project) => (
                <div className="project-card" key={project.id}>
                  <img src={project.image} alt={project.title} />
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Projects;
