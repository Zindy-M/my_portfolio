import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // For now, just show a success message
    // Later, I will integrate with a backend or email service
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => {
      setStatus('');
    }, 5000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="section-header">
          <h1>Get In Touch</h1>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Let's Work Together</h2>
            <p>
              I'm always excited to collaborate on new projects and explore 
              creative opportunities. Whether you need a web application, a 
              stunning logo, or just want to say hi, feel free to reach out!
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <i className="fas fa-envelope"></i>
                <div>
                  <h3>Email</h3>
                  <a href="mailto:mathabathanz@gmail.com">mathabathanz@gmail.com</a>
                </div>
              </div>

              <div className="contact-method">
                <i className="fab fa-linkedin"></i>
                <div>
                  <h3>LinkedIn</h3>
                  <a href="https://www.linkedin.com/in/zindy-mathabatha-3991b520a/" target="_blank" rel="noopener noreferrer">
                    Connect with me
                  </a>
                </div>
              </div>

              <div className="contact-method">
                <i className="fab fa-github"></i>
                <div>
                  <h3>GitHub</h3>
                  <a href="https://github.com/Zindy-M" target="_blank" rel="noopener noreferrer">
                    Check out my code
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Send Message
                <i className="fas fa-paper-plane"></i>
              </button>

              {status === 'success' && (
                <div className="success-message">
                  <i className="fas fa-check-circle"></i>
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;