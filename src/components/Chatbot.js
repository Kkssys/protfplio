import React, { useState, useRef, useEffect } from 'react';
import { FaSync } from 'react-icons/fa';
import { personalInfo, experiences, projects } from '../data/portfolioData';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "👋 Hi! I'm GD's Asst. Ask me anything about Dinesh!", 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Show greeting after welcome screen
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowGreeting(true);
    }, 3500);

    const hideTimer = setTimeout(() => {
      setShowGreeting(false);
    }, 8500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShowGreeting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset chat function
  const resetChat = () => {
    setMessages([
      { 
        id: Date.now(), 
        text: "👋 Hi! I'm GD's Asst. Ask me anything about Dinesh!", 
        sender: 'bot' 
      }
    ]);
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

    // --- 1. PHONE NUMBER ---
    if (lower.includes('phone') || lower.includes('number') || lower.includes('call')) {
      if (personalInfo.phone && personalInfo.phone !== 'Not available') {
        return `You can reach me at ${personalInfo.phone}`;
      } else {
        return `I don't have a phone number listed. Feel free to email me at ${personalInfo.email}`;
      }
    }

    // --- 2. GITHUB ID ---
    if (lower.includes('github id') || lower.includes('github username')) {
      return `My GitHub username is **${githubUsername}**. You can find my code at ${personalInfo.github}`;
    }
    if (lower.includes('github') || lower.includes('git')) {
      return `My GitHub profile: ${personalInfo.github}`;
    }

    // --- 3. LINKEDIN ID ---
    if (lower.includes('linkedin id') || lower.includes('linkedin username')) {
      return `My LinkedIn ID is **${linkedinUsername}**. Connect with me at ${personalInfo.linkedin}`;
    }
    if (lower.includes('linkedin') || lower.includes('linked in')) {
      return `My LinkedIn profile: ${personalInfo.linkedin}`;
    }

    // --- 4. RESUME ---
    if (lower.includes('resume') || lower.includes('cv') || lower.includes('curriculum') || lower.includes('vitae')) {
      return `<a href="/Dinesh_Resume.pdf" download="Dinesh_Resume.pdf" className="chatbot-btn">📄 Download Resume</a>`;
    }

    // --- 5. PROJECTS (specific) - WITH BUTTONS ---
    for (const project of projects) {
      if (lower.includes(project.title.toLowerCase())) {
        let response = `<strong>📁 ${project.title}</strong><br><br>`;
        response += `${project.description}<br><br>`;
        response += `<strong>🛠️ Technologies:</strong> ${project.technologies.join(', ')}<br><br>`;
        
        if (project.github) {
          response += `<a href="${project.github}" target="_blank" rel="noopener noreferrer" className="chatbot-btn">💻 Code</a> `;
        }
        if (project.demo) {
          response += `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" className="chatbot-btn">🚀 Demo</a>`;
        }
        return response;
      }
    }

    // --- 6. PROJECTS (list) ---
    if (lower.includes('project') || lower.includes('projects') || lower.includes('built') || lower.includes('work')) {
      const projectList = projects.map(p => `• ${p.title}`).join('\n');
      return `Here are my projects:\n${projectList}\n\nWhich one would you like to know more about?`;
    }

    // --- 7. EXPERIENCE (specific) ---
    for (const exp of experiences) {
      if (lower.includes(exp.company.toLowerCase()) || 
          lower.includes(exp.position.toLowerCase())) {
        return `💼 **${exp.position} at ${exp.company}**\n${exp.duration}\n\n${exp.description.join('\n')}`;
      }
    }

    // --- 8. EXPERIENCE (list) ---
    if (lower.includes('experience') || lower.includes('intern') || lower.includes('internship') || lower.includes('work')) {
      const expList = experiences.map(e => `• ${e.position} at ${e.company} (${e.duration})`).join('\n');
      return `Here's my experience:\n${expList}\n\nWant to know more about any of these?`;
    }

    // --- 9. SKILLS ---
    if (lower.includes('skill') || lower.includes('tech') || lower.includes('know') || lower.includes('technologies')) {
      const allTech = [...new Set(projects.flatMap(p => p.technologies))];
      return `I work with: ${allTech.join(', ')}`;
    }

    // --- 10. EMAIL ---
    if (lower.includes('email') || lower.includes('mail') || lower.includes('contact')) {
      return `You can email me at ${personalInfo.email}`;
    }

    // --- 11. LOCATION ---
    if (lower.includes('location') || lower.includes('where') || lower.includes('based')) {
      return `I'm based in ${personalInfo.location}`;
    }

    // --- 12. INTRO / BIO ---
    if (lower.includes('intro') || lower.includes('bio') || 
        lower.includes('about') || lower.includes('yourself') || lower.includes('who')) {
      return personalInfo.bio;
    }

    // --- 13. NAME ---
    if (lower.includes('name') || lower.includes('called')) {
      return `My name is ${personalInfo.name}. I'm a ${personalInfo.title}.`;
    }

    // --- 14. FALLBACK ---
    return `I'm not sure about that. You can ask me about:\n• My projects\n• My experience\n• My skills\n• My contact info (email, LinkedIn, GitHub, phone)\n• My resume\n• My location`;
  };

  // ===== SEND MESSAGE =====
  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const botResponse = getBotResponse(input);

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
    // "What's your GitHub ID?",
    // "What's your LinkedIn ID?",
    // "What's your phone number?",
    "Can I see your resume?"
  ];

  const handleGreetingClick = () => {
    setShowGreeting(false);
    setIsOpen(true);
  };

  return (
    <div className="chatbot-container">
      {showGreeting && (
        <div className="chatbot-greeting" onClick={handleGreetingClick}>
          <div className="greeting-content">
            <span className="greeting-emoji"><i className="bi bi-chat-dots"></i></span>
            <span className="greeting-text">Hi, I'm GD's Asst</span>
          </div>
        </div>
      )}

      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
         <i className="bi bi-robot"></i>
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>🤖 GD's Asst</span>
            <div className="chatbot-header-actions">
              <button className="chatbot-refresh" onClick={resetChat} aria-label="Reset chat">
               <i className="bi bi-arrow-clockwise"></i>
              </button>
              <button className="chatbot-close" onClick={() => setIsOpen(false)}>✕</button>
            </div>
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
                onClick={() => {
                  setInput(reply);
                  setTimeout(() => sendMessage({ preventDefault: () => {} }), 100);
                }}
              >
                {reply}
              </button>
            ))}
          </div>

          <form className="chatbot-input" onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              maxLength={200}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chatbot;