import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/terminal-59.svg'
import Projects from './components/projects/projects.jsx';
import Testimonials from './components/testimonials/testimonials.jsx';

const colors = ['#FFFFFF', '#f0f8ff', '#E1F8DC', '#D9F8E3', '#C7F0E0', '#FFFCE5', '#FCECD6', '#FDF6EE'];

function App() {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const name = '<Zindy_M'
  const title = 'Logo Designer/>'

  const [isActive, setIsActive] = useState(false);

  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="App">
      <div className='top-band'>
        <a href="https://www.linkedin.com/in/zindy-mathabatha-3991b520a/"><i class="fa-brands fa-linkedin"></i><p>LinkedIn</p></a>
      </div>
      <nav className="navbar" style={{ backgroundColor: colors[currentColorIndex] }}>
        <div className="navbar-content">
          <img src={logo} alt="logo" className='logo'/>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><a href="#work">Work</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#resources">Resources</a></li>
            <li><button className="get-in-touch">Get in Touch</button></li>
          </ul>
          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            &#9776;
          </div>
        </div>
      </nav>
      <div className="hero" style={{ backgroundColor: colors[currentColorIndex] }}>
        <div className="hero-text">
          <h1>{name}</h1>
          <h1>Software Developer</h1>
          <h1>{title}</h1>
        </div>
      </div>
      <Projects/>
      <Testimonials/>
    </div>
  );
}

export default App;
