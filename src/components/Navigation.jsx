import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'

function Navigation() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMobile, setIsMobile] = useState(false)
  const { mode, accentColor, primaryColor, secondaryColor, secondaryEnabled, customTheme } = useTheme()

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Skip scroll listener on mobile to prevent jitter
    if (isMobile) return

    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'contact']
      const scrollPos = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section === 'hero' ? 'home' : section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Instant scroll on mobile to prevent jitter
      element.scrollIntoView({ behavior: isMobile ? 'auto' : 'smooth' })
    }
  }

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ]

  // Map accent colors to Tailwind classes
  const accentClasses = {
    red: 'bg-red-600 hover:bg-red-700',
    orange: 'bg-orange-500 hover:bg-orange-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
    green: 'bg-green-500 hover:bg-green-600',
    cyan: 'bg-cyan-500 hover:bg-cyan-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    pink: 'bg-pink-500 hover:bg-pink-600',
  }

  // Rainbow colors for each nav section
  const rainbowNavColors = {
    home: 'bg-red-600 hover:bg-red-700',
    about: 'bg-orange-500 hover:bg-orange-600',
    projects: 'bg-green-500 hover:bg-green-600',
    contact: 'bg-blue-600 hover:bg-blue-700',
  }

  const rainbowNavHoverClasses = {
    home: 'hover:bg-red-100',
    about: 'hover:bg-orange-100',
    projects: 'hover:bg-green-100',
    contact: 'hover:bg-blue-100',
  }

  const rainbowNavHoverClassesDark = {
    home: 'hover:bg-red-950',
    about: 'hover:bg-orange-950',
    projects: 'hover:bg-green-950',
    contact: 'hover:bg-blue-950',
  }

  // Pastel colors for each nav section
  const pastelNavColors = {
    home: 'bg-purple-400 hover:bg-purple-500',
    about: 'bg-green-300 hover:bg-green-400',
    projects: 'bg-pink-300 hover:bg-pink-400',
    contact: 'bg-blue-300 hover:bg-blue-400',
  }

  const pastelNavHoverClasses = {
    home: 'hover:bg-purple-100',
    about: 'hover:bg-green-100',
    projects: 'hover:bg-pink-100',
    contact: 'hover:bg-blue-100',
  }

  const pastelNavHoverClassesDark = {
    home: 'hover:bg-purple-950',
    about: 'hover:bg-green-950',
    projects: 'hover:bg-pink-950',
    contact: 'hover:bg-blue-950',
  }

  const secondaryHoverClasses = {
    red: 'hover:bg-red-100',
    orange: 'hover:bg-orange-100',
    yellow: 'hover:bg-yellow-100',
    green: 'hover:bg-green-100',
    cyan: 'hover:bg-cyan-100',
    blue: 'hover:bg-blue-100',
    purple: 'hover:bg-purple-100',
    pink: 'hover:bg-pink-100',
  }

  const secondaryHoverClassesDark = {
    red: 'hover:bg-red-950',
    orange: 'hover:bg-orange-950',
    yellow: 'hover:bg-yellow-950',
    green: 'hover:bg-green-950',
    cyan: 'hover:bg-cyan-950',
    blue: 'hover:bg-blue-950',
    purple: 'hover:bg-purple-950',
    pink: 'hover:bg-pink-950',
  }

  return (
    <nav className={`sticky top-0 left-0 right-0 z-50 border-b shadow-sm ${
      mode === 'light' ? 'bg-stone-50 border-slate-200' : 'bg-slate-800 border-slate-700'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-end h-16">
          {/* Nav Links */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1 sm:gap-2">
              {navItems.map((item) => {
                const sectionName = item.id === 'hero' ? 'home' : item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-colors ${
                      !isMobile && activeSection === (item.id === 'hero' ? 'home' : item.id)
                        ? customTheme === 'monochrome'
                          ? 'bg-slate-600 hover:bg-slate-700 text-white'
                          : customTheme === 'rainbow'
                            ? `${rainbowNavColors[sectionName]} text-white`
                            : customTheme === 'temperature'
                              ? `${rainbowNavColors[sectionName]} text-white`
                              : customTheme === 'pastel'
                                ? `${pastelNavColors[sectionName]} text-white`
                                : `${accentClasses[accentColor]} text-white`
                        : customTheme === 'rainbow'
                          ? mode === 'light'
                            ? `text-slate-700 ${rainbowNavHoverClasses[sectionName]}`
                            : `text-slate-300 ${rainbowNavHoverClassesDark[sectionName]}`
                          : customTheme === 'temperature'
                            ? mode === 'light'
                              ? `text-slate-700 ${rainbowNavHoverClasses[sectionName]}`
                              : `text-slate-300 ${rainbowNavHoverClassesDark[sectionName]}`
                            : customTheme === 'pastel'
                              ? mode === 'light'
                                ? `text-slate-700 ${pastelNavHoverClasses[sectionName]}`
                                : `text-slate-300 ${pastelNavHoverClassesDark[sectionName]}`
                              : secondaryEnabled
                                ? mode === 'light'
                                  ? `text-slate-700 ${secondaryHoverClasses[secondaryColor]}`
                                  : `text-slate-300 ${secondaryHoverClassesDark[secondaryColor]}`
                                : mode === 'light'
                                  ? 'text-slate-700 hover:bg-slate-200'
                                  : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation