import React from 'react';
import myImage from '../../assets/me.jpg';
import './about.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="section-header">
          <h1>About Me</h1>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <h2>Hi, I'm Zindy Mathabatha</h2>
            <p>
              I'm a passionate Software Developer and Logo Designer with a love for creating 
              beautiful, functional digital experiences. I specialize in building modern web 
              applications using React, JavaScript, and Python.
            </p>
            <p>
              When I'm not coding, you'll find me designing logos that capture the essence 
              of brands and help businesses stand out or painting. I believe in clean code, thoughtful 
              design, and creating solutions that make a real impact.
            </p>
            
            <div className="skills-section">
              <h3>Skills & Technologies</h3>
              <div className="skills-grid">
                <div className="skill-category">
                  <h4>Frontend</h4>
                  <ul>
                    <li>Java</li>
                    <li>React.js</li>
                    <li>JavaScript (ES6+)</li>
                    <li>HTML5 & CSS3</li>
                    <li>Responsive Design</li>
                  </ul>
                </div>
                
                <div className="skill-category">
                  <h4>Backend & Tools</h4>
                  <ul>
                    <li>Python</li>
                    <li>Git</li>
                    <li>Vite</li>
                    <li>RESTful APIs</li>
                  </ul>
                </div>
                
                <div className="skill-category">
                  <h4>Design</h4>
                  <ul>
                    <li>Logo Design</li>
                    <li>Brand Identity</li>
                    <li>UI/UX Principles</li>
                    <li>Adobe Creative Suite</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <div className="image-placeholder">
              <img src={myImage} alt="Zindy Mathabatha" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;