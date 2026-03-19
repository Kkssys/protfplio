import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

function Contact({ personalInfo }) {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please fill in all required fields'
      });
      return;
    }

    if (!formData.email.includes('@')) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please enter a valid email address'
      });
      return;
    }

    setIsSending(true);

    // EmailJS configuration - REPLACE WITH YOUR ACTUAL CREDENTIALS
    const serviceId = 'service_1mj4qss'; // Get from EmailJS
    const templateId = 'template_l0pl82g'; // Get from EmailJS
    const publicKey = 'bVN4XeUMlAfs4UNRW'; // Get from EmailJS

    // Template parameters - match these with your EmailJS template
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject || 'New Message from Portfolio',
      message: formData.message,
      to_email: personalInfo.email // Your email address
    };

    // Send email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response);
        setFormStatus({
          submitted: true,
          success: true,
          message: 'Thank you for your message! I will get back to you soon.'
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setFormStatus({
            submitted: false,
            success: false,
            message: ''
          });
        }, 5000);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        setFormStatus({
          submitted: true,
          success: false,
          message: 'Failed to send message. Please try again later or email me directly.'
        });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>I'm always interested in hearing about new opportunities, collaborations, or just having a chat about tech!</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-label">Email:</span>
                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Location:</span>
                <span>{personalInfo.location}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">GitHub:</span>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">{personalInfo.github}</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">LinkedIn:</span>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">{personalInfo.linkedin}</a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
              {formStatus.submitted && (
                <div className={`form-message ${formStatus.success ? 'success' : 'error'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  disabled={isSending}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  disabled={isSending}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  disabled={isSending}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows="5"
                  disabled={isSending}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`btn btn-primary btn-full ${isSending ? 'btn-disabled' : ''}`}
                disabled={isSending}
              >
                {isSending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;