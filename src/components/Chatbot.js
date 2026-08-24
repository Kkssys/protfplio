// src/components/Chatbot.js
import React, { useState, useRef, useEffect } from 'react';
import { personalInfo, experiences, projects } from '../data/portfolioData';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);
  const [hasVideoPlayed, setHasVideoPlayed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef(null);
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "👋 Hi! I'm GD's Asst. Ask me anything about Dinesh!", 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Listen for welcome screen completion
  useEffect(() => {
    const checkWelcome = () => {
      const welcomeElement = document.querySelector('.welcome-screen.visible');
      const isVisible = !!welcomeElement;
      setIsWelcomeVisible(isVisible);

      if (!isVisible && !hasVideoPlayed) {
        setShowVideo(true);
        setHasVideoPlayed(true);
        setTimeout(() => {
          setShowGreeting(true);
        }, 100);
      }
    };

    checkWelcome();

    const observer = new MutationObserver(() => {
      checkWelcome();
    });

    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [hasVideoPlayed]);

  // Hide greeting when chat opens
  useEffect(() => {
    if (isOpen) {
      setShowGreeting(false);
      setShowVideo(false);
    }
  }, [isOpen]);

  // Auto-scroll messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Auto-play video
  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay blocked:', err);
      });
    }
  }, [showVideo]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }
  }, [isOpen]);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = '/images/chatbot-icon.jpeg';
    img.onload = () => setImageLoaded(true);
  }, []);

  // Video ended handler - smooth transition
  const handleVideoEnd = () => {
    setVideoEnded(true);
    setShowGreeting(false);
    setIsTransitioning(true);
    
    // Start fade out of video
    setTimeout(() => {
      setShowVideo(false);
      // After video is hidden, end transition
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300); // Match CSS transition duration
  };

  // Skip video on click
  const handleSkipVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setVideoEnded(true);
    setShowGreeting(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setShowVideo(false);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  // ===== OPEN/CLOSE CHAT =====
  const openChat = () => {
    setIsOpen(true);
    setShowGreeting(false);
    setShowVideo(false);
  };

  const closeChat = (e) => {
    e?.stopPropagation();
    setIsOpen(false);
  };

  // ===== INPUT HANDLERS =====
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // ===== QUICK REPLY HANDLER =====
  const handleQuickReply = (reply) => {
    setInput(reply);
    setTimeout(() => {
      sendMessage({ preventDefault: () => {} });
    }, 100);
  };

  // Helper: extract username from URL
  const getUsername = (url) => {
    if (!url) return null;
    const parts = url.split('/');
    return parts[parts.length - 1] || parts[parts.length - 2];
  };

  const githubUsername = getUsername(personalInfo.github);
  const linkedinUsername = getUsername(personalInfo.linkedin);

  // ===== KNOWLEDGE BASE =====
  const getBotResponse = (userInput) => {
    const lower = userInput.toLowerCase();

    if (lower.includes('phone') || lower.includes('number') || lower.includes('call')) {
      if (personalInfo.phone && personalInfo.phone !== 'Not available') {
        return `You can reach me at ${personalInfo.phone}`;
      } else {
        return `I don't have a phone number listed. Feel free to email me at ${personalInfo.email}`;
      }
    }

    if (lower.includes('github id') || lower.includes('github username')) {
      return `My GitHub username is **${githubUsername}**. You can find my code at ${personalInfo.github}`;
    }
    if (lower.includes('github') || lower.includes('git')) {
      return `My GitHub profile: ${personalInfo.github}`;
    }

    if (lower.includes('linkedin id') || lower.includes('linkedin username')) {
      return `My LinkedIn ID is **${linkedinUsername}**. Connect with me at ${personalInfo.linkedin}`;
    }
    if (lower.includes('linkedin') || lower.includes('linked in')) {
      return `My LinkedIn profile: ${personalInfo.linkedin}`;
    }

    if (lower.includes('resume') || lower.includes('cv') || lower.includes('curriculum') || lower.includes('vitae')) {
      return `<a href="/Dinesh_Resume.pdf" download="Dinesh_Resume.pdf" class="chatbot-btn">📄 Download Resume</a>`;
    }

    for (const project of projects) {
      if (lower.includes(project.title.toLowerCase())) {
        let response = `<strong>📁 ${project.title}</strong><br><br>`;
        response += `${project.description}<br><br>`;
        response += `<strong>🛠️ Technologies:</strong> ${project.technologies.join(', ')}<br><br>`;
        
        if (project.github) {
          response += `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="chatbot-btn">💻 Code</a> `;
        }
        if (project.demo) {
          response += `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="chatbot-btn">🚀 Demo</a>`;
        }
        return response;
      }
    }

    if (lower.includes('project') || lower.includes('projects') || lower.includes('built') || lower.includes('work')) {
      const projectList = projects.map(p => `• ${p.title}`).join('\n');
      return `Here are my projects:\n${projectList}\n\nWhich one would you like to know more about?`;
    }

    for (const exp of experiences) {
      if (lower.includes(exp.company.toLowerCase()) || 
          lower.includes(exp.position.toLowerCase())) {
        return `💼 **${exp.position} at ${exp.company}**\n${exp.duration}\n\n${exp.description.join('\n')}`;
      }
    }

    if (lower.includes('experience') || lower.includes('intern') || lower.includes('internship') || lower.includes('work')) {
      const expList = experiences.map(e => `• ${e.position} at ${e.company} (${e.duration})`).join('\n');
      return `Here's my experience:\n${expList}\n\nWant to know more about any of these?`;
    }

    if (lower.includes('skill') || lower.includes('tech') || lower.includes('know') || lower.includes('technologies')) {
      const allTech = [...new Set(projects.flatMap(p => p.technologies))];
      return `I work with: ${allTech.join(', ')}`;
    }

    if (lower.includes('email') || lower.includes('mail') || lower.includes('contact')) {
      return `You can email me at ${personalInfo.email}`;
    }

    if (lower.includes('location') || lower.includes('where') || lower.includes('based')) {
      return `I'm based in ${personalInfo.location}`;
    }

    if (lower.includes('intro') || lower.includes('bio') || 
        lower.includes('about') || lower.includes('yourself') || lower.includes('who')) {
      return personalInfo.bio;
    }

    if (lower.includes('name') || lower.includes('called')) {
      return `My name is ${personalInfo.name}. I'm a ${personalInfo.title}.`;
    }

    return `I'm not sure about that. You can ask me about:\n• My projects\n• My experience\n• My skills\n• My contact info (email, LinkedIn, GitHub, phone)\n• My resume\n• My location`;
  };

  // ===== SEND MESSAGE =====
  const sendMessage = (e) => {
    e?.preventDefault();
    const message = input.trim();
    if (!message) return;

    const userMessage = { id: Date.now(), text: message, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const botResponse = getBotResponse(message);

    setTimeout(() => {
      const botMessage = { 
        id: Date.now() + 1, 
        text: botResponse, 
        sender: 'bot',
        isHtml: botResponse.includes('<a') || botResponse.includes('<strong>')
      };
      setMessages(prev => [...prev, botMessage]);
    }, 400);
  };

  // ===== QUICK REPLIES =====
  const quickReplies = [
    "Who are you?",
    "What projects have you built?",
    "Tell me about your experience",
    "What are your skills?",
    "How can I contact you?",
    "Can I see your resume?"
  ];

  const handleGreetingClick = () => {
    setShowGreeting(false);
    setShowVideo(false);
    openChat();
  };

  if (isWelcomeVisible) {
    return null;
  }

  return (
    <div className="chatbot-container">
      {/* Greeting Popup */}
      {showGreeting && (
        <div className="chatbot-greeting" onClick={handleGreetingClick}>
          <div className="greeting-content">
            <span className="greeting-emoji">🗨️</span>
            <span className="greeting-text">Hi, I'm GD's Asst</span>
          </div>
        </div>
      )}

      {/* Chat Button */}
      {!isOpen && (
        <button 
          className="chatbot-toggle" 
          onClick={openChat}
          aria-label="Open chat"
        >
          {/* Video Layer */}
          <div 
            className={`chatbot-video-wrapper ${videoEnded ? 'fade-out' : ''}`}
            style={{ 
              opacity: showVideo ? 1 : 0,
              pointerEvents: showVideo ? 'auto' : 'none',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              transition: 'opacity 0.4s ease-in-out',
              borderRadius: '50%',
              overflow: 'hidden',
              zIndex: 2,
            }}
          >
            <video
              ref={videoRef}
              src="/videos/chatbot-intro.mp4"
              muted
              playsInline
              onEnded={handleVideoEnd}
              onClick={handleSkipVideo}
              className="chatbot-video"
              loop={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          {/* Image Layer - Always present below video */}
          <div 
            className="chatbot-image-wrapper"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              zIndex: 1,
            }}
          >
            <img 
              src="/images/chatbot-icon.jpeg" 
              alt="Chatbot"
              className="chatbot-image"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '💬';
              }}
            />
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>🤖 GD's Asst</span>
            <button 
              className="chatbot-close" 
              onClick={closeChat}
              aria-label="Close chat"
              type="button"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className="message-bubble">
                  {msg.isHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                  ) : (
                    msg.text.split('\n').map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-quick-replies">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                className="quick-reply-btn"
                onClick={() => handleQuickReply(reply)}
                type="button"
              >
                {reply}
              </button>
            ))}
          </div>

          <form 
            className="chatbot-input" 
            onSubmit={sendMessage}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask me something..."
              maxLength={200}
              autoFocus={isOpen}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chatbot;