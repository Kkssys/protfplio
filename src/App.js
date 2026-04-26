import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { personalInfo, experiences, projects } from './data/portfolioData';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header personalInfo={personalInfo} />
        <main>
          <Hero personalInfo={personalInfo} />
          <Experience experiences={experiences} />
          <Projects projects={projects} />
          <Contact personalInfo={personalInfo} />
        </main>
        <Footer personalInfo={personalInfo} />
      </div>
    </ThemeProvider>
  );
}

export default App;