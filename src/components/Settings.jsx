import { useState, useRef, useEffect } from 'react'
import { Palette, Sun, Moon } from 'lucide-react'
import { useTheme, ACCENT_COLORS, CUSTOM_THEMES } from '../contexts/ThemeContext'

function Settings({ isOpen: externalIsOpen, onToggle }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  
  // Use external control if provided, otherwise use internal state
  const isOpenState = externalIsOpen !== undefined ? externalIsOpen : isOpen
  const toggleOpen = onToggle || (() => setIsOpen(!isOpen))
  const { 
    mode, 
    primaryColor,
    primaryColorRGB,
    secondaryEnabled, 
    secondaryColor,
    secondaryColorRGB,
    gradientEnabled,
    animationSpeed,
    customTheme,
    customThemeData,
    invertColors,
    toggleMode, 
    changePrimaryColor, 
    changeSecondaryColor,
    toggleSecondary,
    toggleGradient,
    applyPresetTheme,
    applyCustomTheme,
    randomizeColors,
    changeAnimationSpeed,
    toggleInvertColors,
    getSecondaryOptions
  } = useTheme()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (onToggle && externalIsOpen) {
          onToggle()
        } else {
          setIsOpen(false)
        }
      }
    }

    if (isOpenState) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpenState, onToggle, externalIsOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Palette Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          toggleOpen()
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        className={`p-2 rounded-lg transition-colors ${
          customTheme === 'monochrome'
            ? mode === 'light'
              ? 'text-slate-900 hover:bg-slate-200'
              : 'text-slate-100 hover:bg-slate-700'
            : mode === 'light' 
              ? 'text-slate-700 hover:bg-slate-200' 
              : 'text-slate-300 hover:bg-slate-700'
        }`}
        aria-label="Theme & Color Settings"
      >
        {/* Palette icon - gradient for normal themes, solid for monochrome, rainbow for rainbow */}
        <Palette 
          size={20} 
          style={
            customTheme === 'monochrome' 
              ? {} // No gradient styling for monochrome - inherit text color from button
              : customTheme && customThemeData
                ? { stroke: `url(#paletteGradient${customTheme.charAt(0).toUpperCase() + customTheme.slice(1)})` }
                : {
                    stroke: `url(#paletteGradient${secondaryEnabled ? 'Two' : 'Shades'})`
                  }
          }
        />
        
        {/* SVG Gradient Definitions */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            {/* Rainbow gradient */}
            {customTheme === 'rainbow' && customThemeData && (
              <linearGradient id="paletteGradientRainbow" x1="0%" y1="0%" x2="100%" y2="100%">
                {customThemeData.colors.map((color, i) => (
                  <stop key={i} offset={`${(i / (customThemeData.colors.length - 1)) * 100}%`} style={{ stopColor: `rgb(${color})`, stopOpacity: 1 }} />
                ))}
              </linearGradient>
            )}

            {/* Temperature gradient */}
            {customTheme === 'temperature' && customThemeData && (
              <linearGradient id="paletteGradientTemperature" x1="0%" y1="0%" x2="100%" y2="100%">
                {customThemeData.colors.map((color, i) => (
                  <stop key={i} offset={`${(i / (customThemeData.colors.length - 1)) * 100}%`} style={{ stopColor: `rgb(${color})`, stopOpacity: 1 }} />
                ))}
              </linearGradient>
            )}

            {/* Pastel gradient */}
            {customTheme === 'pastel' && customThemeData && (
              <linearGradient id="paletteGradientPastel" x1="0%" y1="0%" x2="100%" y2="100%">
                {customThemeData.colors.map((color, i) => (
                  <stop key={i} offset={`${(i / (customThemeData.colors.length - 1)) * 100}%`} style={{ stopColor: `rgb(${color})`, stopOpacity: 1 }} />
                ))}
              </linearGradient>
            )}
            
            {!customTheme && (
              <>
                {/* Two-color gradient (when secondary enabled) */}
                <linearGradient id="paletteGradientTwo" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: `rgb(${primaryColorRGB})`, stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: `rgb(${secondaryColorRGB})`, stopOpacity: 1 }} />
                </linearGradient>
                
                {/* Shades gradient (when secondary disabled) */}
                <linearGradient id="paletteGradientShades" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: `rgb(${primaryColorRGB})`, stopOpacity: 0.5 }} />
                  <stop offset="50%" style={{ stopColor: `rgb(${primaryColorRGB})`, stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: `rgb(${primaryColorRGB})`, stopOpacity: 0.6 }} />
                </linearGradient>
              </>
            )}
          </defs>
        </svg>
      </button>

      {/* Dropdown */}
      {isOpenState && (
        <div 
          className={`absolute right-0 mt-2 w-72 border rounded-lg shadow-lg p-4 z-[200] ${
            mode === 'light' 
              ? 'bg-white border-slate-200' 
              : 'bg-slate-800 border-slate-700'
          }`}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          {/* Theme Toggle */}
          <div className="mb-4">
            <label className={`block text-sm font-semibold mb-2 ${
              mode === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              Theme
            </label>
            <button
              onClick={toggleMode}
              className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                mode === 'light' 
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-900' 
                  : 'bg-slate-700 hover:bg-slate-600 text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                {mode === 'light' ? (
                  <>
                    <Sun size={16} />
                    <span className="text-sm">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={16} />
                    <span className="text-sm">Dark Mode</span>
                  </>
                )}
              </span>
              <span className={`text-xs ${
                mode === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}>Click to toggle</span>
            </button>
          </div>

          {/* Primary Color Picker */}
          <div className="mb-4">
            <label className={`block text-sm font-semibold mb-2 ${
              mode === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              Primary Color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(ACCENT_COLORS).map(([key, color]) => (
                <button
                  key={key}
                  onClick={() => changePrimaryColor(key)}
                  className={`w-14 h-14 rounded-lg transition-all ${
                    primaryColor === key && !customTheme
                      ? `ring-2 ${mode === 'light' ? 'ring-slate-900' : 'ring-white'} ring-offset-2 scale-110`
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                />
              ))}
            </div>
          </div>

          {/* Secondary Color Toggle */}
          <div className="mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={secondaryEnabled}
                onChange={toggleSecondary}
                className="w-4 h-4 rounded accent-blue-500"
              />
              <span className={`text-sm font-semibold ${
                mode === 'light' ? 'text-slate-900' : 'text-white'
              }`}>
                Enable Secondary Color
              </span>
            </label>
          </div>

          {/* Secondary Color Picker - Always show but grey out when disabled */}
          <div className={`mb-4 transition-opacity ${secondaryEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
            <label className={`block text-sm font-semibold mb-2 ${
              mode === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              Secondary Color
              <span className={`text-xs font-normal ml-2 ${
                mode === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}>
                (Curated for {ACCENT_COLORS[primaryColor].name})
              </span>
            </label>
            <div className="flex gap-2">
              {getSecondaryOptions().map((key) => {
                const color = ACCENT_COLORS[key]
                return (
                  <button
                    key={key}
                    onClick={() => changeSecondaryColor(key)}
                    className={`w-14 h-14 rounded-lg transition-all ${
                      secondaryColor === key && !customTheme && secondaryEnabled
                        ? `ring-2 ${mode === 'light' ? 'ring-slate-900' : 'ring-white'} ring-offset-2 scale-110`
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                    aria-label={`Select ${color.name}`}
                  />
                )
              })}
            </div>
          </div>

          {/* Custom Themes (Monochrome, Temperature, Pastel, Rainbow) */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              mode === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              Special Themes
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['monochrome', 'temperature', 'pastel', 'rainbow'].map((themeName) => (
                <button
                  key={themeName}
                  onClick={(e) => {
                    e.stopPropagation()
                    applyCustomTheme(themeName)
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    customTheme === themeName
                      ? mode === 'light'
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-slate-900'
                      : mode === 'light'
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Gradient/Shading Animation Toggle */}
          <div className="mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={gradientEnabled}
                onChange={toggleGradient}
                className="w-4 h-4 rounded accent-blue-500"
              />
              <span className={`text-sm font-semibold ${
                mode === 'light' ? 'text-slate-900' : 'text-white'
              }`}>
                {secondaryEnabled ? 'Animated Gradients' : 'Animated Shading'}
              </span>
            </label>
            <p className={`text-xs mt-1 ml-6 ${
              mode === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {secondaryEnabled 
                ? 'Animate gradient between colors'
                : 'Animate through color shades'
              }
            </p>
          </div>

          {/* Invert Colors Toggle */}
          <div className="mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={invertColors}
                onChange={toggleInvertColors}
                className="w-4 h-4 rounded accent-blue-500"
              />
              <span className={`text-sm font-semibold ${
                mode === 'light' ? 'text-slate-900' : 'text-white'
              }`}>
                Invert Colors
              </span>
            </label>
            <p className={`text-xs mt-1 ml-6 ${
              mode === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Color inversion effect 
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings