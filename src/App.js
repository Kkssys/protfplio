import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About'; 
// import Skills from './components/Skills';
import SkillsCertificates from './components/SkillsCertificates'; 
import Experience from './components/Experience';
// import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import RocketBackToTop from './components/RocketBackToTop';
import WelcomeScreen from './components/WelcomeScreen';  // ← Import
import CustomCursor from './components/CustomCursor';  // ← Import
import { personalInfo, experiences, projects } from './data/portfolioData';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  return (
    <ThemeProvider>
      <div className="app">
        {/* Welcome Screen */}
        {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}

        {/* Main content */}
        <Header personalInfo={personalInfo} />
        
        <main>
          <Hero personalInfo={personalInfo} />
          <About /> 
           <Experience experiences={experiences} />
           <SkillsCertificates /> 
          {/* <Experience experiences={experiences} /> */}
          {/* <Projects projects={projects} /> */}
          <Contact personalInfo={personalInfo} />
        </main>
       

        <Footer personalInfo={personalInfo} />
        <Chatbot />
          <RocketBackToTop /> 
        <CustomCursor />  {/* ← Add CustomCursor */}
      </div>
    </ThemeProvider>
  );
}

export default App;