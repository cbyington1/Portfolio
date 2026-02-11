import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

// Available accent colors (spectrum, no white/black/grays)
export const ACCENT_COLORS = {
  red: { name: 'Red', value: 'rgba(220, 20, 60, 1)', rgb: '220, 20, 60' },
  orange: { name: 'Orange', value: 'rgba(255, 127, 0, 1)', rgb: '255, 127, 0' },
  yellow: { name: 'Yellow', value: 'rgba(255, 215, 0, 1)', rgb: '255, 215, 0' },
  green: { name: 'Green', value: 'rgba(34, 197, 94, 1)', rgb: '34, 197, 94' },
  cyan: { name: 'Cyan', value: 'rgba(6, 182, 212, 1)', rgb: '6, 182, 212' },
  blue: { name: 'Blue', value: 'rgba(59, 130, 246, 1)', rgb: '59, 130, 246' },
  purple: { name: 'Purple', value: 'rgba(168, 85, 247, 1)', rgb: '168, 85, 247' },
  pink: { name: 'Pink', value: 'rgba(236, 72, 153, 1)', rgb: '236, 72, 153' },
}

// Curated secondary colors for each primary
export const SECONDARY_COLOR_SUGGESTIONS = {
  red: ['purple', 'orange', 'pink'],
  orange: ['yellow', 'red', 'pink'],
  yellow: ['orange', 'green', 'cyan'],
  green: ['cyan', 'blue', 'yellow'],
  cyan: ['blue', 'green', 'purple'],
  blue: ['cyan', 'purple', 'pink'],
  purple: ['pink', 'blue', 'red'],
  pink: ['purple', 'red', 'orange'],
}

// Custom visual themes with direct RGB values
export const CUSTOM_THEMES = {
  rainbow: {
    type: 'multi-color',
    colors: [
      '220, 38, 38',    // red-600
      '234, 88, 12',    // orange-600
      '202, 138, 4',    // yellow-600
      '22, 163, 74',    // green-600
      '14, 165, 233',   // sky-500
      '37, 99, 235',    // blue-600
      '124, 58, 237',   // violet-600
      '219, 39, 119',   // pink-600
    ]
  },
  temperature: {
    type: 'multi-color',
    colors: [
      '220, 38, 38',    // red-600 (HOT)
      '234, 88, 12',    // orange-600 (warm)
      '194, 65, 12',    // orange-800 (deep warm)
      '120, 53, 15',    // orange-950 (warm-neutral)
      '3, 105, 161',    // sky-700 (neutral-cool)
      '29, 78, 216',    // blue-700 (cool)
      '67, 56, 202',    // indigo-700 (deeper cool)
      '109, 40, 217',   // violet-700 (COLD)
    ]
  },
  pastel: {
    type: 'multi-color',
    colors: [
      '196, 181, 253',  // lavender
      '167, 243, 208',  // mint
      '253, 186, 116',  // peach
      '191, 219, 254',  // baby blue
      '252, 165, 165',  // blush pink
      '253, 224, 71',   // soft yellow
    ]
  },
  monochrome: {
    type: 'gradient',
    primaryRGB: '30, 41, 59',      // slate-800
    secondaryRGB: '226, 232, 240', // slate-200
  },
}

// Simple preset theme combinations (using existing color system)
export const PRESET_THEMES = {
  sunset: { primary: 'orange', secondary: 'pink', secondaryEnabled: true },
  ocean: { primary: 'cyan', secondary: 'blue', secondaryEnabled: true },
  forest: { primary: 'green', secondary: 'cyan', secondaryEnabled: true },
}

// Animation speed options (in seconds)
export const ANIMATION_SPEEDS = {
  slow: 60,
  medium: 30,
  fast: 10,
}

// Particle shape options
export const PARTICLE_SHAPES = ['circle', 'blob', 'star', 'square', 'diamond', 'triangle']

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light')
  const [primaryColor, setPrimaryColor] = useState('red')
  const [secondaryEnabled, setSecondaryEnabled] = useState(false)
  const [secondaryColor, setSecondaryColor] = useState('purple') // Default complement to red
  const [gradientEnabled, setGradientEnabled] = useState(true) // Animated gradient borders
  const [animationSpeed, setAnimationSpeed] = useState('medium') // slow, medium, fast
  const [particlesConfined, setParticlesConfined] = useState(false) // Confine particles to hero section
  const [particleSpeed, setParticleSpeed] = useState(1) // Particle movement speed multiplier (0.5 to 3)
  const [particleHoverSize, setParticleHoverSize] = useState(1) // Particle hover size multiplier (0 to 3)
  const [particleSize, setParticleSize] = useState(1) // Base particle size multiplier (0.5 to 3)
  const [particleCount, setParticleCount] = useState(180) // Number of particles (50 to 500)
  const [particleWeb, setParticleWeb] = useState(true) // Show connection web on hover
  const [hoverRange, setHoverRange] = useState(150) // Hover detection range in pixels (50 to 300)
  const [invertColors, setInvertColors] = useState(false) // Invert all colors on page
  const [clickAction, setClickAction] = useState('repel') // 'repel' or 'attract'
  const [holdAction, setHoldAction] = useState('trap') // 'trap' or 'gravity' - works for both hold and drag
  const [customTheme, setCustomTheme] = useState(null) // null or theme name (rainbow, monochrome, neon)
  
  // Shape setting
  const [particleShape, setParticleShape] = useState('circle') // circle, blob, star, square, diamond, triangle

  // Load from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode')
    const savedPrimary = localStorage.getItem('primary-color')
    const savedSecondaryEnabled = localStorage.getItem('secondary-enabled')
    const savedSecondary = localStorage.getItem('secondary-color')
    const savedGradientEnabled = localStorage.getItem('gradient-enabled')
    const savedAnimationSpeed = localStorage.getItem('animation-speed')
    const savedParticlesConfined = localStorage.getItem('particles-confined')
    const savedParticleSpeed = localStorage.getItem('particle-speed')
    const savedParticleHoverSize = localStorage.getItem('particle-hover-size')
    const savedParticleCount = localStorage.getItem('particle-count')
    const savedParticleWeb = localStorage.getItem('particle-web')
    const savedHoverRange = localStorage.getItem('hover-range')
    const savedInvertColors = localStorage.getItem('invert-colors')
    const savedClickAction = localStorage.getItem('click-action')
    const savedHoldAction = localStorage.getItem('hold-action')
    const savedCustomTheme = localStorage.getItem('custom-theme')
    const savedParticleShape = localStorage.getItem('particle-shape')
    const savedParticleSize = localStorage.getItem('particle-size')
    
    if (savedMode) setMode(savedMode)
    if (savedPrimary && ACCENT_COLORS[savedPrimary]) setPrimaryColor(savedPrimary)
    if (savedSecondaryEnabled) setSecondaryEnabled(savedSecondaryEnabled === 'true')
    if (savedSecondary && ACCENT_COLORS[savedSecondary]) setSecondaryColor(savedSecondary)
    if (savedGradientEnabled !== null) setGradientEnabled(savedGradientEnabled === 'true')
    if (savedAnimationSpeed && ANIMATION_SPEEDS[savedAnimationSpeed]) setAnimationSpeed(savedAnimationSpeed)
    if (savedParticlesConfined !== null) setParticlesConfined(savedParticlesConfined === 'true')
    if (savedParticleSpeed) setParticleSpeed(parseFloat(savedParticleSpeed))
    if (savedParticleHoverSize) setParticleHoverSize(parseFloat(savedParticleHoverSize))
    if (savedParticleCount) setParticleCount(parseInt(savedParticleCount))
    if (savedParticleWeb !== null) setParticleWeb(savedParticleWeb === 'true')
    if (savedHoverRange) setHoverRange(parseInt(savedHoverRange))
    if (savedInvertColors !== null) setInvertColors(savedInvertColors === 'true')
    if (savedClickAction && ['repel', 'attract'].includes(savedClickAction)) setClickAction(savedClickAction)
    if (savedHoldAction && ['trap', 'gravity'].includes(savedHoldAction)) setHoldAction(savedHoldAction)
    if (savedCustomTheme && CUSTOM_THEMES[savedCustomTheme]) setCustomTheme(savedCustomTheme)
    if (savedParticleShape && PARTICLE_SHAPES.includes(savedParticleShape)) setParticleShape(savedParticleShape)
    if (savedParticleSize) setParticleSize(parseFloat(savedParticleSize))
  }, [])

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem('theme-mode', mode)
    localStorage.setItem('primary-color', primaryColor)
    localStorage.setItem('secondary-enabled', secondaryEnabled.toString())
    localStorage.setItem('secondary-color', secondaryColor)
    localStorage.setItem('gradient-enabled', gradientEnabled.toString())
    localStorage.setItem('animation-speed', animationSpeed)
    localStorage.setItem('particles-confined', particlesConfined.toString())
    localStorage.setItem('particle-speed', particleSpeed.toString())
    localStorage.setItem('particle-hover-size', particleHoverSize.toString())
    localStorage.setItem('particle-count', particleCount.toString())
    localStorage.setItem('particle-web', particleWeb.toString())
    localStorage.setItem('hover-range', hoverRange.toString())
    localStorage.setItem('invert-colors', invertColors.toString())
    localStorage.setItem('click-action', clickAction)
    localStorage.setItem('hold-action', holdAction)
    localStorage.setItem('custom-theme', customTheme || '')
    localStorage.setItem('particle-shape', particleShape)
    localStorage.setItem('particle-size', particleSize.toString())
  }, [mode, primaryColor, secondaryEnabled, secondaryColor, gradientEnabled, animationSpeed, particlesConfined, particleSpeed, particleHoverSize, particleSize, particleCount, particleWeb, hoverRange, invertColors, clickAction, holdAction, customTheme, particleShape])

  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light')
  }

  const changePrimaryColor = (color) => {
    if (ACCENT_COLORS[color]) {
      setPrimaryColor(color)
      // Auto-suggest a complementary secondary
      const suggestions = SECONDARY_COLOR_SUGGESTIONS[color]
      if (suggestions && suggestions.length > 0) {
        setSecondaryColor(suggestions[0])
      }
      setCustomTheme(null) // Disable custom theme when manually picking colors
    }
  }

  const changeSecondaryColor = (color) => {
    if (ACCENT_COLORS[color]) {
      setSecondaryColor(color)
      setCustomTheme(null) // Disable custom theme when manually picking colors
    }
  }

  const toggleSecondary = () => {
    setSecondaryEnabled(prev => !prev)
    setCustomTheme(null) // Disable custom theme
  }

  const toggleGradient = () => {
    setGradientEnabled(prev => !prev)
  }

  const toggleParticlesConfined = () => {
    setParticlesConfined(prev => !prev)
  }

  const updateParticleSpeed = (speed) => {
    setParticleSpeed(speed)
  }

  const updateParticleHoverSize = (size) => {
    setParticleHoverSize(size)
  }

  const updateParticleCount = (count) => {
    setParticleCount(count)
  }

  const toggleParticleWeb = () => {
    setParticleWeb(prev => !prev)
  }

  const updateHoverRange = (range) => {
    setHoverRange(range)
  }

  const toggleInvertColors = () => {
    setInvertColors(prev => !prev)
  }

  const changeClickAction = (action) => {
    setClickAction(action)
  }

  const changeHoldAction = (action) => {
    setHoldAction(action)
  }

  const changeParticleShape = (shape) => {
    if (PARTICLE_SHAPES.includes(shape)) {
      setParticleShape(shape)
    }
  }

  const updateParticleSize = (size) => {
    setParticleSize(size)
  }

  const applyPresetTheme = (themeName) => {
    const theme = PRESET_THEMES[themeName]
    if (theme) {
      setPrimaryColor(theme.primary)
      setSecondaryColor(theme.secondary)
      setSecondaryEnabled(theme.secondaryEnabled)
      setCustomTheme(null) // Regular preset, not custom
    }
  }

  const applyCustomTheme = (themeName) => {
    if (CUSTOM_THEMES[themeName]) {
      setCustomTheme(themeName)
    }
  }

  const randomizeColors = () => {
    const colors = Object.keys(ACCENT_COLORS)
    const randomPrimary = colors[Math.floor(Math.random() * colors.length)]
    const randomSecondary = colors[Math.floor(Math.random() * colors.length)]
    
    setPrimaryColor(randomPrimary)
    setSecondaryColor(randomSecondary)
    setSecondaryEnabled(Math.random() > 0.5) // 50% chance of secondary enabled
    setCustomTheme(null) // Disable custom theme
  }

  const changeAnimationSpeed = (speed) => {
    if (ANIMATION_SPEEDS[speed]) {
      setAnimationSpeed(speed)
    }
  }

  const getSecondaryOptions = () => {
    return SECONDARY_COLOR_SUGGESTIONS[primaryColor] || []
  }

  const value = {
    mode,
    primaryColor,
    secondaryEnabled,
    secondaryColor,
    gradientEnabled,
    animationSpeed,
    particlesConfined,
    particleSpeed,
    particleHoverSize,
    particleCount,
    particleWeb,
    hoverRange,
    invertColors,
    clickAction,
    holdAction,
    customTheme,
    particleShape,
    particleSize,
    primaryColorValue: ACCENT_COLORS[primaryColor].value,
    primaryColorRGB: customTheme && CUSTOM_THEMES[customTheme] 
      ? (CUSTOM_THEMES[customTheme].type === 'gradient' ? CUSTOM_THEMES[customTheme].primaryRGB : ACCENT_COLORS[primaryColor].rgb)
      : ACCENT_COLORS[primaryColor].rgb,
    secondaryColorValue: ACCENT_COLORS[secondaryColor].value,
    secondaryColorRGB: customTheme && CUSTOM_THEMES[customTheme]
      ? (CUSTOM_THEMES[customTheme].type === 'gradient' ? CUSTOM_THEMES[customTheme].secondaryRGB : ACCENT_COLORS[secondaryColor].rgb)
      : ACCENT_COLORS[secondaryColor].rgb,
    animationSpeedValue: ANIMATION_SPEEDS[animationSpeed],
    customThemeData: customTheme ? CUSTOM_THEMES[customTheme] : null,
    toggleMode,
    changePrimaryColor,
    changeSecondaryColor,
    toggleSecondary,
    toggleGradient,
    toggleParticlesConfined,
    updateParticleSpeed,
    updateParticleHoverSize,
    updateParticleCount,
    toggleParticleWeb,
    updateHoverRange,
    toggleInvertColors,
    changeClickAction,
    changeHoldAction,
    changeParticleShape,
    updateParticleSize,
    applyPresetTheme,
    applyCustomTheme,
    randomizeColors,
    changeAnimationSpeed,
    getSecondaryOptions,
    // Legacy support - accentColor maps to primaryColor
    accentColor: primaryColor,
    accentColorValue: ACCENT_COLORS[primaryColor].value,
    accentColorRGB: ACCENT_COLORS[primaryColor].rgb,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}