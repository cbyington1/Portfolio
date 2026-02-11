import { useTheme } from '../contexts/ThemeContext'
import { useState } from 'react'

function GradientText({ children, className = '' }) {
  const { primaryColorRGB, secondaryColorRGB, secondaryEnabled, mode, gradientEnabled, animationSpeedValue, customTheme, customThemeData } = useTheme()
  const [fontSize, setFontSize] = useState(40)
  const [textWidth, setTextWidth] = useState(300)
  
  // Callback ref - measures when element mounts
  const measureRef = (element) => {
    if (element && element.parentElement) {
      const computedStyle = window.getComputedStyle(element.parentElement)
      const size = parseFloat(computedStyle.fontSize) || 40
      
      // Create temp element to measure text width
      const temp = document.createElement('span')
      temp.style.font = computedStyle.font
      temp.style.fontSize = computedStyle.fontSize
      temp.style.fontWeight = computedStyle.fontWeight
      temp.style.fontFamily = computedStyle.fontFamily
      temp.style.visibility = 'hidden'
      temp.style.position = 'absolute'
      temp.style.whiteSpace = 'nowrap'
      temp.textContent = children
      document.body.appendChild(temp)
      const width = temp.offsetWidth
      document.body.removeChild(temp)
      
      if (size !== fontSize) {
        setFontSize(size)
      }
      if (width !== textWidth) {
        setTextWidth(width + 4) // Small padding
      }
    }
  }
  
  // Generate lighter and darker shades of primary color
  const generateShades = (rgbString) => {
    const [r, g, b] = rgbString.split(',').map(n => parseInt(n.trim()))
    
    // Lighter shade (interpolate 50% toward white)
    const lighterR = Math.round(r + (255 - r) * 0.5)
    const lighterG = Math.round(g + (255 - g) * 0.5)
    const lighterB = Math.round(b + (255 - b) * 0.5)
    
    // Darker shade (multiply by 0.6)
    const darkerR = Math.round(r * 0.6)
    const darkerG = Math.round(g * 0.6)
    const darkerB = Math.round(b * 0.6)
    
    return {
      lighter: `${lighterR}, ${lighterG}, ${lighterB}`,
      base: rgbString,
      darker: `${darkerR}, ${darkerG}, ${darkerB}`
    }
  }
  
  const primaryShades = generateShades(primaryColorRGB)
  
  // Always use SVG for consistent layout
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <svg 
      ref={measureRef}
      width={textWidth} 
      height={fontSize * 1.2} 
      className={className}
      style={{ 
        display: 'inline-block',
        verticalAlign: 'baseline',
        overflow: 'visible'
      }}
      viewBox={`0 0 ${textWidth} ${fontSize * 1.2}`}
    >
      <defs>
        <linearGradient 
          id={gradientId} 
          x1="0%" 
          y1="0%" 
          x2={gradientEnabled ? "200%" : "100%"}
          y2="0%"
        >
          {customTheme && customThemeData ? (
            // Custom theme
            customThemeData.type === 'multi-color' ? (
              // Rainbow/Temperature/Pastel: Always show all colors
              gradientEnabled ? (
                <>
                  {/* First loop: 0-50% */}
                  {customThemeData.colors.map((color, i) => (
                    <stop key={`first-${i}`} offset={`${(i / customThemeData.colors.length) * 50}%`} style={{ stopColor: `rgb(${color})` }} />
                  ))}
                  {/* Second loop: 50-100% */}
                  {customThemeData.colors.map((color, i) => (
                    <stop key={`second-${i}`} offset={`${50 + (i / customThemeData.colors.length) * 50}%`} style={{ stopColor: `rgb(${color})` }} />
                  ))}
                  <stop offset="100%" style={{ stopColor: `rgb(${customThemeData.colors[0]})` }} />
                </>
              ) : (
                // Static: show all colors across gradient
                <>
                  {customThemeData.colors.map((color, i) => (
                    <stop key={i} offset={`${(i / (customThemeData.colors.length - 1)) * 100}%`} style={{ stopColor: `rgb(${color})` }} />
                  ))}
                </>
              )
            ) : (
              // Gradient theme (monochrome, neon)
              gradientEnabled ? (
                <>
                  <stop offset="0%" style={{ stopColor: `rgb(${customThemeData.primaryRGB})` }} />
                  <stop offset="12.5%" style={{ stopColor: `rgb(${customThemeData.secondaryRGB})` }} />
                  <stop offset="25%" style={{ stopColor: `rgb(${customThemeData.primaryRGB})` }} />
                  <stop offset="37.5%" style={{ stopColor: `rgb(${customThemeData.secondaryRGB})` }} />
                  <stop offset="50%" style={{ stopColor: `rgb(${customThemeData.primaryRGB})` }} />
                  <stop offset="62.5%" style={{ stopColor: `rgb(${customThemeData.secondaryRGB})` }} />
                  <stop offset="75%" style={{ stopColor: `rgb(${customThemeData.primaryRGB})` }} />
                  <stop offset="87.5%" style={{ stopColor: `rgb(${customThemeData.secondaryRGB})` }} />
                  <stop offset="100%" style={{ stopColor: `rgb(${customThemeData.primaryRGB})` }} />
                </>
              ) : (
                <>
                  <stop offset="0%" style={{ stopColor: `rgb(${customThemeData.primaryRGB})` }} />
                  <stop offset="100%" style={{ stopColor: `rgb(${customThemeData.secondaryRGB})` }} />
                </>
              )
            )
          ) : secondaryEnabled ? (
            // Two-color gradient: Primary → Secondary
            gradientEnabled ? (
              // Animated: repeats at 50% for seamless loop
              <>
                <stop offset="0%" style={{ stopColor: `rgb(${primaryColorRGB})` }} />
                <stop offset="12.5%" style={{ stopColor: `rgb(${secondaryColorRGB})` }} />
                <stop offset="25%" style={{ stopColor: `rgb(${primaryColorRGB})` }} />
                <stop offset="37.5%" style={{ stopColor: `rgb(${secondaryColorRGB})` }} />
                <stop offset="50%" style={{ stopColor: `rgb(${primaryColorRGB})` }} />
                <stop offset="62.5%" style={{ stopColor: `rgb(${secondaryColorRGB})` }} />
                <stop offset="75%" style={{ stopColor: `rgb(${primaryColorRGB})` }} />
                <stop offset="87.5%" style={{ stopColor: `rgb(${secondaryColorRGB})` }} />
                <stop offset="100%" style={{ stopColor: `rgb(${primaryColorRGB})` }} />
              </>
            ) : (
              // Static: simple gradient
              <>
                <stop offset="0%" style={{ stopColor: `rgb(${primaryColorRGB})` }} />
                <stop offset="100%" style={{ stopColor: `rgb(${secondaryColorRGB})` }} />
              </>
            )
          ) : (
            // Single-color mode
            gradientEnabled ? (
              // WITH shading animation: Lighter → Base → Darker
              <>
                <stop offset="0%" style={{ stopColor: `rgb(${primaryShades.lighter})` }} />
                <stop offset="12.5%" style={{ stopColor: `rgb(${primaryShades.base})` }} />
                <stop offset="25%" style={{ stopColor: `rgb(${primaryShades.darker})` }} />
                <stop offset="37.5%" style={{ stopColor: `rgb(${primaryShades.base})` }} />
                <stop offset="50%" style={{ stopColor: `rgb(${primaryShades.lighter})` }} />
                <stop offset="62.5%" style={{ stopColor: `rgb(${primaryShades.base})` }} />
                <stop offset="75%" style={{ stopColor: `rgb(${primaryShades.darker})` }} />
                <stop offset="87.5%" style={{ stopColor: `rgb(${primaryShades.base})` }} />
                <stop offset="100%" style={{ stopColor: `rgb(${primaryShades.lighter})` }} />
              </>
            ) : (
              // WITHOUT shading: Solid color
              <>
                <stop offset="0%" style={{ stopColor: `rgb(${primaryColorRGB})` }} />
                <stop offset="100%" style={{ stopColor: `rgb(${primaryColorRGB})` }} />
              </>
            )
          )}
          
          {/* Animation - always present but freezes when gradientEnabled is false */}
          <animate
            attributeName="x1"
            values={gradientEnabled ? "0%;-100%" : "0%;0%"}
            dur={`${animationSpeedValue / 6}s`}
            repeatCount="indefinite"
            begin="0s"
          />
          <animate
            attributeName="x2"
            values={gradientEnabled ? "200%;100%" : "200%;200%"}
            dur={`${animationSpeedValue / 6}s`}
            repeatCount="indefinite"
            begin="0s"
          />
        </linearGradient>
      </defs>
      <text 
        x="0" 
        y={fontSize * 1.2} 
        fill={`url(#${gradientId})`}
        fontSize={fontSize}
      >
        {children}
      </text>
    </svg>
  )
}

export default GradientText