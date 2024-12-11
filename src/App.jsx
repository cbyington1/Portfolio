import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/layout/ParticleBackground';
import Navigation from './components/layout/Navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';

function App() {
  const [activeSection, setActiveSection] = useState('hero'); // Changed initial state to 'hero'
  const [showParticleControls, setShowParticleControls] = useState(false);
  const navigationItems = ['about', 'skills', 'experience', 'projects', 'contact']; // Added 'hero' to navigation items
  
  const [particleSettings, setParticleSettings] = useState({
    particleCount: 150,
    colorMode: 'blue',
    connectionDistance: 100,
    particleSpeed: 0.5
  });

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-40% 0px', // Adjusted rootMargin for better accuracy
      threshold: 0.1 // Added small threshold for better detection
    };

    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    // Slight delay to ensure all elements are rendered
    setTimeout(() => {
      navigationItems.forEach(item => {
        const element = document.getElementById(item);
        if (element) {
          observer.observe(element);
        } else {
          console.warn(`Element with id "${item}" not found`);
        }
      });
    }, 100);

    return () => {
      navigationItems.forEach(item => {
        const element = document.getElementById(item);
        if (element) observer.unobserve(element);
      });
    };
  }, [navigationItems]);

  return (
    <>
      <ParticleBackground settings={particleSettings} />
      
      {/* Main content container */}
      <div className="relative z-10">
        {/* Navigation is outside the transition container */}
        <Navigation
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          navigationItems={navigationItems}
        />
        
        {/* Content container with transitions */}
        <div className={`transition-all duration-500 ease-in-out ${showParticleControls ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}>
          <main className="text-white">
            <Hero
              particleSettings={particleSettings}
              setParticleSettings={setParticleSettings}
              showControls={showParticleControls}
              setShowControls={setShowParticleControls}
              contentOnly={true}
            />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
          </main>
        </div>
      </div>

      {/* Particle controls */}
      <Hero
        particleSettings={particleSettings}
        setParticleSettings={setParticleSettings}
        showControls={showParticleControls}
        setShowControls={setShowParticleControls}
        controlsOnly={true}
      />
    </>
  );
}

export default App;