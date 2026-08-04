import React, { useState, useEffect } from 'react';

function WelcomeScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [titleText, setTitleText] = useState('');

  const fullTitle = 'Welcome';

  // Typewriter effect for title only
  useEffect(() => {
    let titleTimeout;
    let titleIndex = 0;

    const typeTitle = () => {
      if (titleIndex <= fullTitle.length) {
        setTitleText(fullTitle.slice(0, titleIndex));
        titleIndex++;
        titleTimeout = setTimeout(typeTitle, 80);
      }
    };
    typeTitle();

    return () => clearTimeout(titleTimeout);
  }, []);

  // Auto-hide after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 500);
  };

  return (
    <div className={`welcome-screen ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="welcome-content">
        <h1 className="welcome-title">{titleText}</h1>
        {/* Optional: Static subtitle (uncomment if you want it) */}
         <button className="welcome-skip" onClick={handleSkip}>
          Skip →
        </button>
         <p className="welcome-subtitle">For better experience use Desktop view</p> 
        {/* <button className="welcome-skip" onClick={handleSkip}>
          Skip →
        </button> */}
      </div>
    </div>
  );
}

export default WelcomeScreen;