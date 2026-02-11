import Navigation from './components/Navigation.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import BackgroundParticles from './components/BackgroundParticles.jsx'
import { useTheme } from './contexts/ThemeContext.jsx'
import { useEffect } from 'react'

function App() {
  const { 
    mode, 
    invertColors, 
    primaryColorRGB, 
    secondaryColorRGB, 
    secondaryEnabled,
    customTheme,
    customThemeData
  } = useTheme()
  
  // Update body background color based on theme mode
  useEffect(() => {
    if (mode === 'dark') {
      document.body.style.backgroundColor = 'rgb(15, 23, 42)' // slate-900
    } else {
      document.body.style.backgroundColor = 'rgb(252, 250, 247)' // warm-white
    }
  }, [mode])
  
  // Update scrollbar colors based on theme
  useEffect(() => {
    const root = document.documentElement
    
    // Determine scrollbar color based on theme
    let scrollbarColor, scrollbarHoverColor
    
    if (customTheme && customThemeData) {
      if (customThemeData.type === 'multi-color') {
        // For rainbow/temperature/pastel: use the first color
        const firstColor = customThemeData.colors[0]
        scrollbarColor = `rgba(${firstColor}, 0.5)`
        scrollbarHoverColor = `rgba(${firstColor}, 0.8)`
      } else {
        // For monochrome: use the darker shade
        const rgb = customThemeData.primaryRGB
        scrollbarColor = `rgba(${rgb}, 0.5)`
        scrollbarHoverColor = `rgba(${rgb}, 0.8)`
      }
    } else if (secondaryEnabled) {
      // Use primary color when secondary is enabled
      scrollbarColor = `rgba(${primaryColorRGB}, 0.5)`
      scrollbarHoverColor = `rgba(${primaryColorRGB}, 0.8)`
    } else {
      // Use primary color
      scrollbarColor = `rgba(${primaryColorRGB}, 0.5)`
      scrollbarHoverColor = `rgba(${primaryColorRGB}, 0.8)`
    }
    
    // Set CSS variables
    root.style.setProperty('--scrollbar-color', scrollbarColor)
    root.style.setProperty('--scrollbar-hover-color', scrollbarHoverColor)
  }, [primaryColorRGB, secondaryColorRGB, secondaryEnabled, customTheme, customThemeData])
  
  return (
    <div 
      className={`${mode === 'light' ? 'bg-[rgb(252,250,247)]' : 'bg-slate-900'}`}
      {...(invertColors && { style: { filter: 'invert(1)' } })}
    >
      {/* Shared background particles for all sections except Hero */}
      <BackgroundParticles particleCount={100} opacity={0.8} />
      
      <Hero />
      
      {/* Navigation sits at bottom of Hero, sticks to top when scrolling */}
      <Navigation />
      
      <About />
      
      <Projects />
      
      <Contact />
    </div>
  )
}

export default App