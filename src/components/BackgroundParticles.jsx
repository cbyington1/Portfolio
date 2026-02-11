import { useEffect, useRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'

function BackgroundParticles({ particleCount = 100, opacity = 0.8 }) {
  const canvasRef = useRef(null)
  const mousePosRef = useRef({ x: -1000, y: -1000 })
  const { primaryColorRGB, secondaryColorRGB, secondaryEnabled, mode, particleShape, particleSize, customTheme, customThemeData } = useTheme()
  
  // Store theme values in refs so particles can access them without causing re-creation
  const themeRef = useRef({ primaryColorRGB, secondaryColorRGB, secondaryEnabled, particleShape, particleSize, customTheme, customThemeData })
  
  // Update ref when theme changes
  useEffect(() => {
    themeRef.current = { primaryColorRGB, secondaryColorRGB, secondaryEnabled, particleShape, particleSize, customTheme, customThemeData }
  }, [primaryColorRGB, secondaryColorRGB, secondaryEnabled, particleShape, particleSize, customTheme, customThemeData])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []

    // Particle class - exists in document space
    class Particle {
      constructor(heroHeight, index, totalParticles) {
        this.x = Math.random() * canvas.width
        // Start particles below Hero
        this.y = heroHeight + Math.random() * (canvas.height - heroHeight)
        this.baseSize = Math.random() * 2 + 1
        this.size = this.baseSize
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        
        // Assign this particle to a specific color based on theme
        this.colorIndex = index
        this.totalParticles = totalParticles
        
        // Pick random position in gradient (0 to 1)
        this.gradientPosition = Math.random()
        
        // Blob wobble phase
        this.blobPhase = Math.random() * Math.PI * 2
        
        // Rotation for shapes
        this.rotation = Math.random() * Math.PI * 2
        
        // Calculate interpolated color
        this.updateColor()
      }
      
      updateColor() {
        const theme = themeRef.current
        
        if (theme.customTheme && theme.customThemeData) {
          if (theme.customThemeData.type === 'multi-color') {
            // Rainbow/Temperature/Pastel: Each particle gets ONE of the colors
            const colors = theme.customThemeData.colors
            const colorIndex = this.colorIndex % colors.length
            this.colorRGB = colors[colorIndex]
          } else {
            // Monochrome: Each particle gets a shade of grey
            // Distribute particles across grey spectrum
            const pos = this.colorIndex / this.totalParticles
            const [r1, g1, b1] = theme.customThemeData.primaryRGB.split(',').map(n => parseInt(n.trim()))
            const [r2, g2, b2] = theme.customThemeData.secondaryRGB.split(',').map(n => parseInt(n.trim()))
            
            const r = Math.round(r1 + (r2 - r1) * pos)
            const g = Math.round(g1 + (g2 - g1) * pos)
            const b = Math.round(b1 + (b2 - b1) * pos)
            
            this.colorRGB = `${r}, ${g}, ${b}`
          }
        } else if (theme.secondaryEnabled) {
          // Two-color: Distribute particles between primary and secondary
          const pos = this.colorIndex / this.totalParticles
          const [r1, g1, b1] = theme.primaryColorRGB.split(',').map(n => parseInt(n.trim()))
          const [r2, g2, b2] = theme.secondaryColorRGB.split(',').map(n => parseInt(n.trim()))
          
          const r = Math.round(r1 + (r2 - r1) * pos)
          const g = Math.round(g1 + (g2 - g1) * pos)
          const b = Math.round(b1 + (b2 - b1) * pos)
          
          this.colorRGB = `${r}, ${g}, ${b}`
        } else {
          // Single-color: Distribute through shades
          const pos = this.colorIndex / this.totalParticles
          const [r, g, b] = theme.primaryColorRGB.split(',').map(n => parseInt(n.trim()))
          
          // Generate shades
          const lighterR = Math.round(r + (255 - r) * 0.5)
          const lighterG = Math.round(g + (255 - g) * 0.5)
          const lighterB = Math.round(b + (255 - b) * 0.5)
          
          const darkerR = Math.round(r * 0.6)
          const darkerG = Math.round(g * 0.6)
          const darkerB = Math.round(b * 0.6)
          
          // Interpolate: lighter -> base -> darker
          let finalR, finalG, finalB
          if (pos < 0.5) {
            // Lighter to base
            const t = pos * 2
            finalR = Math.round(lighterR + (r - lighterR) * t)
            finalG = Math.round(lighterG + (g - lighterG) * t)
            finalB = Math.round(lighterB + (b - lighterB) * t)
          } else {
            // Base to darker
            const t = (pos - 0.5) * 2
            finalR = Math.round(r + (darkerR - r) * t)
            finalG = Math.round(g + (darkerG - g) * t)
            finalB = Math.round(b + (darkerB - b) * t)
          }
          
          this.colorRGB = `${finalR}, ${finalG}, ${finalB}`
        }
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Get hero height to avoid particles going into hero section
        const heroSection = document.getElementById('hero')
        const heroHeight = heroSection ? heroSection.offsetHeight : 0

        // Wrap around edges, but never go above hero section
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = heroHeight // Wrap to just below hero
        if (this.y < heroHeight) this.y = canvas.height // If somehow above hero, wrap to bottom
        
        // Update color dynamically
        this.updateColor()
        
        // Update size based on particleSize setting
        const sizeMultiplier = themeRef.current.particleSize || 1
        this.size = this.baseSize * sizeMultiplier
        
        // Update rotation based on velocity
        const velocity = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY)
        if (velocity > 0.1) {
          this.rotation = Math.atan2(this.speedY, this.speedX)
        }
      }

      draw(customOpacity = opacity, sizeMultiplier = 1) {
        const shape = themeRef.current.particleShape || 'circle'
        const size = this.size * sizeMultiplier
        
        ctx.fillStyle = `rgba(${this.colorRGB}, ${customOpacity})`
        
        switch (shape) {
          case 'circle':
            ctx.beginPath()
            ctx.arc(this.x, this.y, size, 0, Math.PI * 2)
            ctx.fill()
            break
            
          case 'blob':
            ctx.beginPath()
            for (let angle = 0; angle < Math.PI * 2; angle += 0.2) {
              const wobble = 1 + 0.15 * Math.sin(angle * 3 + this.blobPhase)
              const blobR = size * wobble
              const blobX = this.x + Math.cos(angle) * blobR
              const blobY = this.y + Math.sin(angle) * blobR
              if (angle === 0) {
                ctx.moveTo(blobX, blobY)
              } else {
                ctx.lineTo(blobX, blobY)
              }
            }
            ctx.closePath()
            ctx.fill()
            break
            
          case 'star':
            ctx.save()
            ctx.translate(this.x, this.y)
            ctx.rotate(this.rotation)
            ctx.beginPath()
            for (let i = 0; i < 5; i++) {
              const outerAngle = (i * 2 * Math.PI / 5) - Math.PI / 2
              const innerAngle = outerAngle + Math.PI / 5
              const outerX = Math.cos(outerAngle) * size
              const outerY = Math.sin(outerAngle) * size
              const innerX = Math.cos(innerAngle) * size * 0.4
              const innerY = Math.sin(innerAngle) * size * 0.4
              
              if (i === 0) {
                ctx.moveTo(outerX, outerY)
              } else {
                ctx.lineTo(outerX, outerY)
              }
              ctx.lineTo(innerX, innerY)
            }
            ctx.closePath()
            ctx.fill()
            ctx.restore()
            break
            
          case 'square':
            ctx.save()
            ctx.translate(this.x, this.y)
            ctx.rotate(this.rotation)
            ctx.fillRect(-size, -size, size * 2, size * 2)
            ctx.restore()
            break
            
          case 'diamond':
            // Proper rhombus - taller than wide
            ctx.save()
            ctx.translate(this.x, this.y)
            ctx.rotate(this.rotation)
            ctx.beginPath()
            ctx.moveTo(0, -size * 1.4)  // Top point (tall)
            ctx.lineTo(size * 0.7, 0)    // Right point (narrow)
            ctx.lineTo(0, size * 1.4)    // Bottom point (tall)
            ctx.lineTo(-size * 0.7, 0)   // Left point (narrow)
            ctx.closePath()
            ctx.fill()
            ctx.restore()
            break
            
          case 'triangle':
            ctx.save()
            ctx.translate(this.x, this.y)
            ctx.rotate(this.rotation)
            ctx.beginPath()
            ctx.moveTo(size, 0)
            ctx.lineTo(-size * 0.7, -size * 0.7)
            ctx.lineTo(-size * 0.7, size * 0.7)
            ctx.closePath()
            ctx.fill()
            ctx.restore()
            break
            
          default:
            ctx.beginPath()
            ctx.arc(this.x, this.y, size, 0, Math.PI * 2)
            ctx.fill()
        }
      }
    }

    // Set canvas to full document size
    const resizeCanvas = () => {
      const heroSection = document.getElementById('hero')
      const heroHeight = heroSection ? heroSection.offsetHeight : 0
      
      const oldWidth = canvas.width
      const oldHeight = canvas.height
      
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
      
      // Scale particle positions proportionally (only if we had previous dimensions)
      if (oldWidth > 0 && oldHeight > 0 && particles.length > 0) {
        const scaleX = canvas.width / oldWidth
        const scaleY = canvas.height / oldHeight
        
        particles.forEach(particle => {
          particle.x = particle.x * scaleX
          particle.y = particle.y * scaleY
        })
      } else {
        // Initial setup - create particles with index and totalParticles for color distribution
        particles = []
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(heroHeight, i, particleCount))
        }
      }
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Check which particles are hovered
      const hoveredParticles = []
      const hoverRadius = 30
      
      particles.forEach(particle => {
        const dx = mousePosRef.current.x - particle.x
        const dy = mousePosRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < hoverRadius) {
          hoveredParticles.push(particle)
        }
      })
      
      // Change cursor if hovering particles
      if (hoveredParticles.length > 0) {
        canvas.style.cursor = 'pointer'
      } else {
        canvas.style.cursor = 'default'
      }
      
      // Update and draw particles with hover effects
      particles.forEach(particle => {
        particle.update()
        
        const isHovered = hoveredParticles.includes(particle)
        
        if (isHovered) {
          // Hover effect based on mode
          if (mode === 'light') {
            // Light mode: Darken + Enlarge
            const [r, g, b] = particle.colorRGB.split(',').map(n => parseInt(n.trim()))
            const darkerR = Math.round(r * 0.7)
            const darkerG = Math.round(g * 0.7)
            const darkerB = Math.round(b * 0.7)
            
            // Temporarily override color for hover
            const originalColor = particle.colorRGB
            particle.colorRGB = `${darkerR}, ${darkerG}, ${darkerB}`
            particle.draw(opacity, 1.8)
            particle.colorRGB = originalColor
          } else {
            // Dark mode: Bright Glow with halo
            // Draw outer glow (always circle for glow effect)
            const glowGradient = ctx.createRadialGradient(
              particle.x, particle.y, 0,
              particle.x, particle.y, particle.size * 3
            )
            glowGradient.addColorStop(0, `rgba(${particle.colorRGB}, ${opacity})`)
            glowGradient.addColorStop(0.5, `rgba(${particle.colorRGB}, ${opacity * 0.5})`)
            glowGradient.addColorStop(1, `rgba(${particle.colorRGB}, 0)`)
            
            ctx.fillStyle = glowGradient
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
            ctx.fill()
            
            // Draw bright center with shape
            particle.draw(opacity, 1.5)
          }
        } else {
          // Normal draw
          particle.draw()
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()
    
    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top + window.scrollY
      }
    }
    
    const handleMouseLeave = () => {
      mousePosRef.current = { x: -1000, y: -1000 }
    }
    
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [particleCount, opacity, primaryColorRGB, secondaryColorRGB, mode, particleShape, particleSize, customTheme, customThemeData])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

export default BackgroundParticles