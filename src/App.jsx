import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/terminal-59.svg';
import Projects from './components/projects/projects.jsx';
import About from './components/about/about.jsx';
import Contact from './components/contact/contact.jsx';
import Resources from './components/resources/resources.jsx';
import Footer from './components/footer/footer.jsx';

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

  const name = '<Zindy_M';
  const title = 'Logo Designer/>';

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <div className="App">
      <div className='top-band'>
        <a href="https://www.linkedin.com/in/zindy-mathabatha-3991b520a/">
          <i className="fa-brands fa-linkedin"></i>
          <p>LinkedIn</p>
        </a>
      </div>
      
      <nav className="navbar" style={{ backgroundColor: colors[currentColorIndex] }}>
        <div className="navbar-content">
          <img src={logo} alt="logo" className='logo'/>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><a href="#work" onClick={(e) => handleNavClick(e, 'work')}>Work</a></li>
            <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
            <li><a href="#resources" onClick={(e) => handleNavClick(e, 'resources')}>Resources</a></li>
            <li>
              <button className="get-in-touch" onClick={(e) => handleNavClick(e, 'contact')}>
                Get in Touch
              </button>
            </li>
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
          <h1>{title}<span className='blinking-cursor'></span></h1>
        </div>
      </div>
      
      <div id="work">
        <Projects/>
      </div>
      
      <About/>
      
      <Resources/>
      
      <Contact/>

      <Footer/>

    </div>
  );
}

export default App;