import React from 'react';
import './resources.css';

const Resources = () => {
  const resources = [
    {
      id: 1,
      title: 'React Documentation',
      description: 'The official React documentation - your go-to resource for learning React.',
      url: 'https://react.dev/',
      icon: 'fab fa-react',
      category: 'Documentation'
    },
    {
      id: 2,
      title: 'MDN Web Docs',
      description: 'Comprehensive web development documentation covering HTML, CSS, and JavaScript.',
      url: 'https://developer.mozilla.org/',
      icon: 'fas fa-book',
      category: 'Documentation'
    },
    {
      id: 3,
      title: 'CSS Tricks',
      description: 'Tips, tricks, and techniques on using CSS for modern web development.',
      url: 'https://css-tricks.com/',
      icon: 'fab fa-css3-alt',
      category: 'Tutorial'
    },
    {
      id: 4,
      title: 'JavaScript.info',
      description: 'Modern JavaScript tutorial covering everything from basics to advanced topics.',
      url: 'https://javascript.info/',
      icon: 'fab fa-js',
      category: 'Tutorial'
    },
    {
      id: 5,
      title: 'Frontend Mentor',
      description: 'Practice your frontend skills with real-world projects and challenges.',
      url: 'https://www.frontendmentor.io/',
      icon: 'fas fa-code',
      category: 'Practice'
    },
    {
      id: 6,
      title: 'Figma',
      description: 'Collaborative design tool for creating beautiful user interfaces.',
      url: 'https://www.figma.com/',
      icon: 'fab fa-figma',
      category: 'Design Tool'
    },
    {
      id: 7,
      title: 'GitHub',
      description: 'Version control and collaboration platform for developers.',
      url: 'https://github.com/',
      icon: 'fab fa-github',
      category: 'Tool'
    },
    {
      id: 8,
      title: 'Stack Overflow',
      description: 'Q&A community for developers to learn and share knowledge.',
      url: 'https://stackoverflow.com/',
      icon: 'fab fa-stack-overflow',
      category: 'Community'
    },
    {
      id: 9,
      title: 'Netlify',
      description: 'Platform for deploying and hosting modern web projects.',
      url: 'https://www.netlify.com/',
      icon: 'fas fa-server',
      category: 'Hosting'
    }
  ];

  return (
    <section id="resources" className="resources-section">
      <div className="resources-container">
        <div className="section-header">
          <h1>Resources</h1>
          <p>Tools, documentation, and learning materials that I find helpful</p>
        </div>

        <div className="resources-grid">
          {resources.map((resource) => (
            <a 
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-card"
            >
              <div className="resource-icon">
                <i className={resource.icon}></i>
              </div>
              <div className="resource-content">
                <span className="resource-category">{resource.category}</span>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <div className="resource-link">
                  Visit Resource
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;