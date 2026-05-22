import { useState, useEffect, useRef, useCallback } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { ExternalLink, Github, ChevronDown, ChevronLeft, ChevronRight, Monitor, Construction } from 'lucide-react'
import GradientText from './GradientText'

function Projects() {
  const { mode, primaryColor, primaryColorRGB, secondaryEnabled, secondaryColor, secondaryColorRGB, gradientEnabled, animationSpeedValue, customTheme, customThemeData } = useTheme()
  const [expandedId, setExpandedId] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)
  const SWIPE_THRESHOLD = 50

  // Unified animation timing
  const ANIM = '0.5s cubic-bezier(0.4, 0, 0.2, 1)'

  // Track screen size for responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const TOTAL_PAGES = 2

  const goToPage = useCallback((page) => {
    if (page === currentPage) return
    setExpandedId(null)
    setCurrentPage(page)
  }, [currentPage])

  const nextPage = useCallback(() => {
    if (currentPage < TOTAL_PAGES - 1) goToPage(currentPage + 1)
  }, [currentPage, goToPage])

  const prevPage = useCallback(() => {
    if (currentPage > 0) goToPage(currentPage - 1)
  }, [currentPage, goToPage])

  // Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = null
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        nextPage()
      } else {
        prevPage()
      }
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevPage()
      if (e.key === 'ArrowRight') nextPage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextPage, prevPage])

  const projectsPage1 = [
    {
      id: 1,
      title: "GDPulse",
      description: "ML nowcasting and forecasting system for G7 countries. Trained 6 models on 40+ years of economic data from FRED, Bloomberg, and Yahoo Finance with ensemble stacking and bootstrap confidence intervals.",
      image: "/Portfolio/GDPulseProjectScreenshot.png",
      tags: ["React", "FastAPI", "XGBoost", "FRED API", "HuggingFace"],
      github: "https://github.com/cbyington1/GDP_Prediction_Group42",
      demo: "https://gdpulse-ten.vercel.app/",
      featured: true,
      desktopOnly: false,
      wakeUpUrl: "https://gdpulse-api-production.up.railway.app/health"
    },
    {
      id: 2,
      title: "NHL Predictor",
      description: "A data-driven NHL game prediction application that forecasts game outcomes with visual presentation of prediction confidence and key factors.",
      image: "/Portfolio/NHLProjectScreenshot.png",
      tags: ["React", "React Native", "Expo", "Redux", "Express", "Prisma", "MongoDB"],
      github: "https://github.com/cbyington1/NHL-Predictor",
      demo: "https://nhl-predictor.up.railway.app/dashboard",
      featured: true,
      desktopOnly: false
    },
    {
      id: 3,
      title: "Texas Explorer",
      description: "Interactive map visualizing demographic, economic, and housing data for 1,800+ Texas cities from 2012-2024. Filter by any metric, compare trends across years.",
      image: "/Portfolio/TexasExplorerProjectScreenshot.png",
      tags: ["Angular", "Spring Boot", "PostgreSQL", "Leaflet.js", "AWS"],
      github: "https://github.com/cbyington1/TexasExplorer",
      demo: "https://dleqhwum800of.cloudfront.net/",
      featured: true,
      desktopOnly: false
    },
    {
      id: 4,
      title: "CometScraper",
      description: "Real-time sentiment analysis tool for S&P 500 stock news from Yahoo Finance with trend tracking and visualization.",
      image: "/Portfolio/CometScraperProjectScreenshot.png",
      tags: ["React", "Sentiment Analysis", "Yahoo Finance API"],
      github: "https://github.com/cbyington1/CometScraper",
      demo: "https://comet-scraper-pi.vercel.app/",
      featured: false,
      desktopOnly: true
    }
  ]

  const projectsPage2 = [
    {
      id: 5,
      title: "Keyboard Trumpet",
      description: "Interactive web-based trumpet simulator with realistic valve controls and sound synthesis using the Web Audio API.",
      image: "/Portfolio/KeyboardTrumpetProjectScreenshot.png",
      tags: ["Angular", "Web Audio API", "TypeScript"],
      github: "https://github.com/cbyington1/KeyboardTrumpet",
      demo: "https://keyboard-trumpet.vercel.app/",
      featured: true,
      desktopOnly: true
    },
    {
      id: 6,
      title: "Coming Soon",
      description: "A new project is in the works. Stay tuned for updates!",
      comingSoon: true,
    },
    {
      id: 7,
      title: "Coming Soon",
      description: "More projects on the way. Check back later!",
      comingSoon: true,
    },
    {
      id: 8,
      title: "Coming Soon",
      description: "Something exciting is being built. Watch this space!",
      comingSoon: true,
    },
  ]

  const pages = [projectsPage1, projectsPage2]

  // Button color classes for primary color
  const buttonClasses = {
    red: 'bg-red-600 hover:bg-red-700',
    orange: 'bg-orange-500 hover:bg-orange-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
    green: 'bg-green-500 hover:bg-green-600',
    cyan: 'bg-cyan-500 hover:bg-cyan-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    pink: 'bg-pink-500 hover:bg-pink-600',
  }

  const borderClasses = {
    red: 'border-red-600 hover:border-red-700',
    orange: 'border-orange-500 hover:border-orange-600',
    yellow: 'border-yellow-500 hover:border-yellow-600',
    green: 'border-green-500 hover:border-green-600',
    cyan: 'border-cyan-500 hover:border-cyan-600',
    blue: 'border-blue-500 hover:border-blue-600',
    purple: 'border-purple-500 hover:border-purple-600',
    pink: 'border-pink-500 hover:border-pink-600',
  }

  const secondaryBorderClasses = {
    red: 'border-red-600 hover:border-red-700',
    orange: 'border-orange-500 hover:border-orange-600',
    yellow: 'border-yellow-500 hover:border-yellow-600',
    green: 'border-green-500 hover:border-green-600',
    cyan: 'border-cyan-500 hover:border-cyan-600',
    blue: 'border-blue-500 hover:border-blue-600',
    purple: 'border-purple-500 hover:border-purple-600',
    pink: 'border-pink-500 hover:border-pink-600',
  }

  // Rainbow colors for each project - solid button, border button
  const rainbowProjectColors = [
    { solid: 'bg-orange-500 hover:bg-orange-600', border: 'border-purple-600 hover:border-purple-700', borderBg: 'lg:hover:bg-purple-50', borderBgDark: 'lg:hover:bg-purple-950' },
    { solid: 'bg-green-500 hover:bg-green-600', border: 'border-pink-500 hover:border-pink-600', borderBg: 'lg:hover:bg-pink-50', borderBgDark: 'lg:hover:bg-pink-950' },
    { solid: 'bg-cyan-500 hover:bg-cyan-600', border: 'border-red-600 hover:border-red-700', borderBg: 'lg:hover:bg-red-50', borderBgDark: 'lg:hover:bg-red-950' },
    { solid: 'bg-blue-600 hover:bg-blue-700', border: 'border-yellow-500 hover:border-yellow-600', borderBg: 'lg:hover:bg-yellow-50', borderBgDark: 'lg:hover:bg-yellow-950' },
  ]

  // Temperature colors for each project (warm to cool, no green/yellow)
  const temperatureProjectColors = [
    { solid: 'bg-orange-600 hover:bg-orange-700', border: 'border-indigo-600 hover:border-indigo-700', borderBg: 'lg:hover:bg-indigo-50', borderBgDark: 'lg:hover:bg-indigo-950' },
    { solid: 'bg-red-600 hover:bg-red-700', border: 'border-blue-700 hover:border-blue-800', borderBg: 'lg:hover:bg-blue-50', borderBgDark: 'lg:hover:bg-blue-950' },
    { solid: 'bg-orange-700 hover:bg-orange-800', border: 'border-violet-600 hover:border-violet-700', borderBg: 'lg:hover:bg-violet-50', borderBgDark: 'lg:hover:bg-violet-950' },
    { solid: 'bg-sky-700 hover:bg-sky-800', border: 'border-orange-600 hover:border-orange-700', borderBg: 'lg:hover:bg-orange-50', borderBgDark: 'lg:hover:bg-orange-950' },
  ]

  // Pastel colors for each project
  const pastelProjectColors = [
    { solid: 'bg-purple-300 hover:bg-purple-400', border: 'border-green-300 hover:border-green-400', borderBg: 'lg:hover:bg-green-50', borderBgDark: 'lg:hover:bg-green-950' },
    { solid: 'bg-pink-300 hover:bg-pink-400', border: 'border-blue-300 hover:border-blue-400', borderBg: 'lg:hover:bg-blue-50', borderBgDark: 'lg:hover:bg-blue-950' },
    { solid: 'bg-yellow-300 hover:bg-yellow-400', border: 'border-purple-300 hover:border-purple-400', borderBg: 'lg:hover:bg-purple-50', borderBgDark: 'lg:hover:bg-purple-950' },
    { solid: 'bg-blue-300 hover:bg-blue-400', border: 'border-pink-300 hover:border-pink-400', borderBg: 'lg:hover:bg-pink-50', borderBgDark: 'lg:hover:bg-pink-950' },
  ]

  const handleCardClick = (project, e) => {
    if (project.comingSoon) return
    if (isMobile) {
      setExpandedId(expandedId === project.id ? null : project.id)
    } else {
      if (project.demo) {
        window.open(project.demo, '_blank', 'noopener,noreferrer')
      }
    }
  }

  const handleButtonClick = (e) => {
    e.stopPropagation()
  }

  // Calculate grid template based on which card is expanded
  const getGridTemplate = () => {
    if (!isMobile || expandedId === null) {
      return {
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
      }
    }

    const expandedSize = '3fr'
    const collapsedSize = '1fr'

    // Find the position of the expanded card within the current page (0-3)
    const currentPageProjects = pages[currentPage]
    const expandedIndex = currentPageProjects.findIndex(p => p.id === expandedId)
    
    if (expandedIndex === -1) {
      return {
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
      }
    }

    // Position 0 = top-left, 1 = top-right, 2 = bottom-left, 3 = bottom-right
    const isLeft = expandedIndex % 2 === 0
    const isTop = expandedIndex < 2

    return {
      gridTemplateColumns: isLeft ? `${expandedSize} ${collapsedSize}` : `${collapsedSize} ${expandedSize}`,
      gridTemplateRows: isTop ? `${expandedSize} ${collapsedSize}` : `${collapsedSize} ${expandedSize}`,
    }
  }

  const gridTemplate = getGridTemplate()

  // Compute gradient style for a card
  const getGradientStyle = () => {
    if (customTheme && customThemeData) {
      if (customThemeData.type === 'multi-color') {
        const colors = customThemeData.colors
        return {
          '--grad-0': colors[0],
          '--grad-1': colors[1],
          '--grad-2': colors[2],
          '--grad-3': colors[3],
          '--grad-4': colors[4],
          '--grad-5': colors[5],
          '--grad-6': colors[6],
          '--grad-7': colors[7],
          '--grad-8': colors[0],
        }
      } else {
        return {
          '--grad-0': customThemeData.primaryRGB,
          '--grad-1': customThemeData.primaryRGB,
          '--grad-2': customThemeData.secondaryRGB,
          '--grad-3': customThemeData.secondaryRGB,
          '--grad-4': customThemeData.primaryRGB,
          '--grad-5': customThemeData.primaryRGB,
          '--grad-6': customThemeData.secondaryRGB,
          '--grad-7': customThemeData.secondaryRGB,
          '--grad-8': customThemeData.primaryRGB,
        }
      }
    }
    if (secondaryEnabled) {
      return {
        '--grad-0': primaryColorRGB,
        '--grad-1': primaryColorRGB,
        '--grad-2': secondaryColorRGB,
        '--grad-3': secondaryColorRGB,
        '--grad-4': primaryColorRGB,
        '--grad-5': primaryColorRGB,
        '--grad-6': secondaryColorRGB,
        '--grad-7': secondaryColorRGB,
        '--grad-8': primaryColorRGB,
      }
    }
    if (gradientEnabled) {
      const [r, g, b] = primaryColorRGB.split(',').map(n => parseInt(n.trim()))
      const light = `${Math.round(r + (255 - r) * 0.5)}, ${Math.round(g + (255 - g) * 0.5)}, ${Math.round(b + (255 - b) * 0.5)}`
      const dark = `${Math.round(r * 0.6)}, ${Math.round(g * 0.6)}, ${Math.round(b * 0.6)}`
      return {
        '--grad-0': light,
        '--grad-1': primaryColorRGB,
        '--grad-2': dark,
        '--grad-3': primaryColorRGB,
        '--grad-4': light,
        '--grad-5': primaryColorRGB,
        '--grad-6': dark,
        '--grad-7': primaryColorRGB,
        '--grad-8': light,
      }
    }
    return {
      '--grad-0': primaryColorRGB,
      '--grad-1': primaryColorRGB,
      '--grad-2': primaryColorRGB,
      '--grad-3': primaryColorRGB,
      '--grad-4': primaryColorRGB,
      '--grad-5': primaryColorRGB,
      '--grad-6': primaryColorRGB,
      '--grad-7': primaryColorRGB,
      '--grad-8': primaryColorRGB,
    }
  }

  const gradientVars = getGradientStyle()

  const renderProjectCard = (project, index) => {
    const rainbowColors = rainbowProjectColors[index % rainbowProjectColors.length]
    const tempColors = temperatureProjectColors[index % temperatureProjectColors.length]
    const pastelColors = pastelProjectColors[index % pastelProjectColors.length]
    const isExpanded = expandedId === project.id

    // Coming soon placeholder card
    if (project.comingSoon) {
      return (
        <div
          key={project.id}
          className={`group relative rounded-xl overflow-hidden flex flex-col items-center justify-center ${
            gradientEnabled ? 'animated-gradient-border' : 'static-gradient-border'
          } ${
            customTheme === 'rainbow' ? 'rainbow-border' : ''
          } ${
            mode === 'light'
              ? 'bg-white/60 shadow-lg'
              : 'bg-slate-800/60 shadow-xl'
          }`}
          style={{
            '--bg-color': mode === 'light' ? 'white' : '#1e293b',
            '--animation-speed': `${animationSpeedValue}s`,
            ...gradientVars,
            opacity: 0.6,
          }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-2 lg:gap-4 p-4">
            <Construction 
              size={isMobile ? 24 : 48} 
              className={mode === 'light' ? 'text-slate-400' : 'text-slate-500'}
            />
            <h3 className={`font-bold text-sm lg:text-xl ${
              mode === 'light' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Coming Soon
            </h3>
            <p className={`text-[10px] lg:text-sm text-center ${
              mode === 'light' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Under Construction
            </p>
          </div>
        </div>
      )
    }

    // Regular project card (identical to original)
    return (
      <div
        key={project.id}
        onClick={(e) => handleCardClick(project, e)}
        className={`group relative rounded-xl overflow-hidden flex flex-col ${
          gradientEnabled ? 'animated-gradient-border' : 'static-gradient-border'
        } ${
          customTheme === 'rainbow' ? 'rainbow-border' : ''
        } ${
          mode === 'light' 
            ? 'bg-white shadow-lg' 
            : 'bg-slate-800 shadow-xl'
        } cursor-pointer lg:hover:scale-[1.02] lg:hover:shadow-2xl`}
        style={{
          '--bg-color': mode === 'light' ? 'white' : '#1e293b',
          '--animation-speed': `${animationSpeedValue}s`,
          ...gradientVars,
        }}
      >
        {/* Project Image */}
        <div 
          className="relative overflow-hidden bg-slate-700"
          style={{
            height: isMobile ? '40%' : '256px',
            minHeight: isMobile ? '50px' : '256px',
            flexShrink: 0,
          }}
        >
          <img 
            src={project.image} 
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-300 lg:group-hover:scale-105 ${
              customTheme === 'monochrome' ? 'grayscale' : ''
            }`}
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.style.backgroundColor = mode === 'light' ? '#e2e8f0' : '#334155'
            }}
          />
          
          {/* Desktop only badge */}
          {project.desktopOnly && (
            <div 
              className={`absolute top-2 left-2 px-2 py-1 rounded-md text-[10px] font-medium flex items-center gap-1 ${
                mode === 'light' ? 'bg-white/90 text-slate-700' : 'bg-slate-800/90 text-slate-300'
              }`}
            >
              <Monitor size={10} />
              Desktop
            </div>
          )}
          
          {/* Mobile tap indicator */}
          <div 
            className={`lg:hidden absolute bottom-2 right-2 rounded-full p-1.5 ${
              mode === 'light' ? 'bg-white/90' : 'bg-slate-800/90'
            }`}
            style={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: `transform ${ANIM}`,
            }}
          >
            <ChevronDown 
              size={16} 
              className={mode === 'light' ? 'text-slate-900' : 'text-white'}
            />
          </div>
        </div>

        {/* Project Content */}
        <div className="flex flex-col flex-1 p-2 lg:p-6 overflow-hidden">
          {/* Title */}
          <h3 
            className={`font-bold text-center mb-1 lg:mb-3 text-sm lg:text-2xl shrink-0 ${
              mode === 'light' ? 'text-slate-900' : 'text-white'
            }`}
          >
            {project.title}
          </h3>

          {/* Collapsed preview - truncated description with ellipsis */}
          {isMobile && !isExpanded && (
            <p className={`text-[10px] leading-relaxed line-clamp-2 ${
              mode === 'light' ? 'text-slate-500' : 'text-slate-400'
            }`}>
              {project.description}
            </p>
          )}
          
          {/* Expandable content */}
          <div 
            className="flex flex-col flex-1 min-h-0"
            style={{
              opacity: isMobile ? (isExpanded ? 1 : 0) : 1,
              visibility: isMobile ? (isExpanded ? 'visible' : 'hidden') : 'visible',
              transition: `opacity ${ANIM}`,
              position: isMobile && !isExpanded ? 'absolute' : 'relative',
              pointerEvents: isMobile && !isExpanded ? 'none' : 'auto',
            }}
          >
            {/* Description */}
            <p className={`text-xs lg:text-base mb-2 lg:mb-4 leading-relaxed shrink-0 ${
              mode === 'light' ? 'text-slate-600' : 'text-slate-300'
            }`}>
              {project.description}
            </p>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-1 lg:gap-2 mb-2 lg:mb-4 shrink-0">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className={`px-1.5 lg:px-3 py-0.5 lg:py-1 text-[10px] lg:text-xs font-medium rounded-full ${
                    mode === 'light' 
                      ? 'bg-slate-100 text-slate-700' 
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1.5 lg:gap-3 mt-auto shrink-0">
              {/* Demo button */}
              {project.demo && (
                <button
                  onClick={(e) => {
                    handleButtonClick(e)
                    if (isMobile && project.desktopOnly) {
                      const btn = e.currentTarget
                      btn.classList.remove('animate-shake')
                      void btn.offsetWidth
                      btn.classList.add('animate-shake')
                    } else {
                      if (project.wakeUpUrl) {
                        fetch(project.wakeUpUrl, { mode: 'no-cors' }).catch(() => {})
                      }
                      window.open(project.demo, '_blank', 'noopener,noreferrer')
                    }
                  }}
                  className={`flex-1 inline-flex items-center justify-center gap-1 px-2 lg:px-4 py-1.5 lg:py-2.5 rounded-lg transition-colors font-medium text-[10px] lg:text-base ${
                    isMobile && project.desktopOnly
                      ? 'bg-slate-400 text-slate-200 cursor-not-allowed'
                      : customTheme === 'monochrome'
                        ? 'bg-slate-600 hover:bg-slate-700 text-white'
                        : customTheme === 'rainbow'
                          ? `${rainbowColors.solid} text-white`
                          : customTheme === 'temperature'
                            ? `${tempColors.solid} text-white`
                            : customTheme === 'pastel'
                              ? `${pastelColors.solid} text-white`
                              : `${buttonClasses[primaryColor]} text-white`
                  }`}
                >
                  <ExternalLink size={12} className="lg:w-[18px] lg:h-[18px]" />
                  Demo
                </button>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleButtonClick}
                  className={`flex-1 inline-flex items-center justify-center gap-1 px-2 lg:px-4 py-1.5 lg:py-2.5 border-2 rounded-lg transition-colors font-medium text-[10px] lg:text-base ${
                    customTheme === 'monochrome'
                      ? mode === 'light'
                        ? 'border-slate-400 text-slate-900 lg:hover:bg-slate-100'
                        : 'border-slate-500 text-white lg:hover:bg-slate-800'
                      : customTheme === 'rainbow'
                        ? mode === 'light'
                          ? `${rainbowColors.border} text-slate-900 ${rainbowColors.borderBg}`
                          : `${rainbowColors.border} text-white ${rainbowColors.borderBgDark}`
                        : customTheme === 'temperature'
                          ? mode === 'light'
                            ? `${tempColors.border} text-slate-900 ${tempColors.borderBg}`
                            : `${tempColors.border} text-white ${tempColors.borderBgDark}`
                          : customTheme === 'pastel'
                            ? mode === 'light'
                              ? `${pastelColors.border} text-slate-900 ${pastelColors.borderBg}`
                              : `${pastelColors.border} text-white ${pastelColors.borderBgDark}`
                            : mode === 'light' 
                              ? `${secondaryEnabled ? secondaryBorderClasses[secondaryColor] : borderClasses[primaryColor]} text-slate-900 lg:hover:bg-slate-50` 
                              : `${secondaryEnabled ? secondaryBorderClasses[secondaryColor] : borderClasses[primaryColor]} text-white lg:hover:bg-slate-700`
                  }`}
                >
                  <Github size={12} className="lg:w-[18px] lg:h-[18px]" />
                  Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section 
      id="projects" 
      className={`relative py-20 px-4 sm:px-6 ${
        mode === 'light' ? 'bg-[rgb(252,250,247)]' : 'bg-slate-900'
      }`}
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <h2 className={`text-4xl sm:text-5xl font-bold mb-12 text-center ${
          mode === 'light' ? 'text-slate-900' : 'text-white'
        }`}>
          <GradientText>Featured Projects</GradientText>
        </h2>

        {/* Projects Container with Navigation */}
        <div className="relative">
          {/* Desktop Arrow - Left (minimal, no circle) */}
          <button
            onClick={prevPage}
            className={`hidden lg:flex absolute -left-12 top-1/2 -translate-y-1/2 z-20 items-center justify-center p-2 transition-all duration-200 ${
              currentPage === 0
                ? 'opacity-0 pointer-events-none'
                : mode === 'light'
                  ? 'text-slate-400 hover:text-slate-700'
                  : 'text-slate-500 hover:text-slate-200'
            }`}
            aria-label="Previous projects"
          >
            <ChevronLeft size={28} strokeWidth={1.5} />
          </button>

          {/* Desktop Arrow - Right (minimal, no circle) */}
          <button
            onClick={nextPage}
            className={`hidden lg:flex absolute -right-12 top-1/2 -translate-y-1/2 z-20 items-center justify-center p-2 transition-all duration-200 ${
              currentPage === TOTAL_PAGES - 1
                ? 'opacity-0 pointer-events-none'
                : mode === 'light'
                  ? 'text-slate-400 hover:text-slate-700'
                  : 'text-slate-500 hover:text-slate-200'
            }`}
            aria-label="Next projects"
          >
            <ChevronRight size={28} strokeWidth={1.5} />
          </button>

          {/* Sliding carousel - both pages rendered, translated */}
          <div 
            className="overflow-x-clip"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ padding: '4px' }} 
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentPage * 100}%)`,
              }}
            >
              {/* Page 1 */}
              <div 
                className="w-full flex-shrink-0"
                style={{ paddingRight: '4px' }}
              >
                <div
                  className="grid gap-3 lg:gap-8 lg:grid-cols-2"
                  style={{
                    ...(currentPage === 0 ? gridTemplate : {
                      gridTemplateColumns: '1fr 1fr',
                      gridTemplateRows: '1fr 1fr',
                    }),
                    transition: `grid-template-columns ${ANIM}, grid-template-rows ${ANIM}`,
                    height: isMobile ? '500px' : 'auto',
                  }}
                >
                  {projectsPage1.map((project, index) => renderProjectCard(project, index))}
                </div>
              </div>

              {/* Page 2 */}
              <div 
                className="w-full flex-shrink-0"
                style={{ paddingLeft: '4px' }}
              >
                <div
                  className="grid gap-3 lg:gap-8 lg:grid-cols-2"
                  style={{
                    ...(currentPage === 1 ? gridTemplate : {
                      gridTemplateColumns: '1fr 1fr',
                      gridTemplateRows: '1fr 1fr',
                    }),
                    transition: `grid-template-columns ${ANIM}, grid-template-rows ${ANIM}`,
                    height: isMobile ? '500px' : 'auto',
                  }}
                >
                  {projectsPage2.map((project, index) => renderProjectCard(project, index))}
                </div>
              </div>
            </div>
          </div>

          {/* Page Dots (mobile only) */}
          <div className="flex lg:hidden justify-center gap-2 mt-4">
            {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentPage
                    ? `w-6 h-2`
                    : `w-2 h-2 ${mode === 'light' ? 'bg-slate-300' : 'bg-slate-600'}`
                }`}
                style={i === currentPage ? {
                  backgroundColor: `rgb(${primaryColorRGB})`,
                } : {}}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
