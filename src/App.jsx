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
  const [activeSection, setActiveSection] = useState('about');
  const navigationItems = ['about', 'skills', 'experience', 'projects', 'contact'];

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0
    };

    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    navigationItems.forEach(item => {
      const element = document.getElementById(item);
      if (element) observer.observe(element);
    });

    return () => {
      navigationItems.forEach(item => {
        const element = document.getElementById(item);
        if (element) observer.unobserve(element);
      });
    };
  }, [navigationItems]);

  return (
    <>
      <ParticleBackground />
      {/* Remove the full-screen div wrapper and only wrap the actual content */}
      <div className="relative z-10">
        <Navigation
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          navigationItems={navigationItems}
        />
        <main className="text-white">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </div>
    </>
  );
}

export default App;