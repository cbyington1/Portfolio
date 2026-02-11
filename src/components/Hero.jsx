import { useEffect, useRef, useState } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import GradientText from './GradientText'
import Settings from './Settings'
import ParticleSettings from './ParticleSettings'

function Hero() {
  const canvasRef = useRef(null)
  const heroRef = useRef(null)
  const mousePosRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef([])
  const [isMobile, setIsMobile] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null) // 'settings' | 'particles' | null
  
  // Hold state tracking
  const holdStateRef = useRef({
    isHolding: false,
    holdStartTime: 0,
    trappedParticles: new Set(),
    isDragging: false
  })
  const { 
    primaryColorRGB, 
    secondaryColorRGB, 
    secondaryEnabled, 
    mode, 
    accentColor,
    primaryColor,
    secondaryColor,
    customTheme,
    customThemeData,
    particlesConfined,
    particleSpeed,
    particleHoverSize,
    particleSize,
    particleCount,
    particleWeb,
    hoverRange,
    clickAction,
    holdAction,
    particleShape
  } = useTheme()
  
  // Store theme values in refs so particles can access them without causing re-creation
  const themeRef = useRef({ primaryColorRGB, secondaryColorRGB, secondaryEnabled, customTheme, customThemeData, particlesConfined, particleSpeed, particleHoverSize, particleSize, particleWeb, hoverRange, holdAction, particleShape })
  
  // Update ref when theme changes (but don't recreate particles)
  useEffect(() => {
    themeRef.current = { primaryColorRGB, secondaryColorRGB, secondaryEnabled, customTheme, customThemeData, particlesConfined, particleSpeed, particleHoverSize, particleSize, particleWeb, hoverRange, holdAction, particleShape }
  }, [primaryColorRGB, secondaryColorRGB, secondaryEnabled, customTheme, customThemeData, particlesConfined, particleSpeed, particleHoverSize, particleSize, particleWeb, hoverRange, holdAction, particleShape])

  // Button color classes
  const accentButtonClasses = {
    red: 'bg-red-600 hover:bg-red-700',
    orange: 'bg-orange-500 hover:bg-orange-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
    green: 'bg-green-500 hover:bg-green-600',
    cyan: 'bg-cyan-500 hover:bg-cyan-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    pink: 'bg-pink-500 hover:bg-pink-600',
  }

  const accentBorderClasses = {
    red: 'border-red-600 hover:border-red-700 hover:bg-red-50',
    orange: 'border-orange-500 hover:border-orange-600 hover:bg-orange-50',
    yellow: 'border-yellow-500 hover:border-yellow-600 hover:bg-yellow-50',
    green: 'border-green-500 hover:border-green-600 hover:bg-green-50',
    cyan: 'border-cyan-500 hover:border-cyan-600 hover:bg-cyan-50',
    blue: 'border-blue-500 hover:border-blue-600 hover:bg-blue-50',
    purple: 'border-purple-500 hover:border-purple-600 hover:bg-purple-50',
    pink: 'border-pink-500 hover:border-pink-600 hover:bg-pink-50',
  }

  const accentBorderClassesDark = {
    red: 'border-red-600 hover:border-red-700 hover:bg-red-950',
    orange: 'border-orange-500 hover:border-orange-600 hover:bg-orange-950',
    yellow: 'border-yellow-500 hover:border-yellow-600 hover:bg-yellow-950',
    green: 'border-green-500 hover:border-green-600 hover:bg-green-950',
    cyan: 'border-cyan-500 hover:border-cyan-600 hover:bg-cyan-950',
    blue: 'border-blue-500 hover:border-blue-600 hover:bg-blue-950',
    purple: 'border-purple-500 hover:border-purple-600 hover:bg-purple-950',
    pink: 'border-pink-500 hover:border-pink-600 hover:bg-pink-950',
  }

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Non-passive touch move handler to prevent scrolling while holding
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const handleTouchMoveNonPassive = (e) => {
      const canvas = canvasRef.current
      if (!canvas) return
      
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      if (!touch) return
      
      const newX = touch.clientX - rect.left
      const newY = touch.clientY - rect.top
      mousePosRef.current = { x: newX, y: newY }
      
      // Prevent scrolling when holding
      if (holdStateRef.current.isHolding) {
        const holdDuration = Date.now() - holdStateRef.current.holdStartTime
        
        if (holdDuration >= 200) {
          holdStateRef.current.isDragging = true
          e.preventDefault() // This works because listener is non-passive
        }
      }
    }

    // Add with passive: false so preventDefault works
    hero.addEventListener('touchmove', handleTouchMoveNonPassive, { passive: false })
    
    return () => {
      hero.removeEventListener('touchmove', handleTouchMoveNonPassive)
    }
  }, [])

  const ParticleClassRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    const particles = particlesRef.current

    // Set canvas size
    const resizeCanvas = () => {
      const oldWidth = canvas.width
      const oldHeight = canvas.height
      
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      
      // Scale particle positions proportionally (only if we had previous dimensions)
      if (oldWidth > 0 && oldHeight > 0) {
        const scaleX = canvas.width / oldWidth
        const scaleY = canvas.height / oldHeight
        
        particles.forEach(particle => {
          particle.x = particle.x * scaleX
          particle.y = particle.y * scaleY
        })
      }
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle class
    class Particle {
      constructor(index, totalParticles) {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.baseSize = Math.random() * 2 + 1 // Store base size
        this.size = this.baseSize
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.hoverAmount = 0 // 0 = normal, 1 = fully hovered
        this.isInGravityWell = false // Track if particle is captured by gravity well
        
        // Blob wobble (for blob shape)
        this.blobPhase = Math.random() * Math.PI * 2
        
        // Rotation for shapes (based on velocity direction)
        this.rotation = Math.random() * Math.PI * 2
        
        // Assign this particle to a specific color based on theme
        this.colorIndex = index
        this.totalParticles = totalParticles
        
        // Calculate initial color
        this.updateColor()
      }
      
      updateColor() {
        const theme = themeRef.current
        
        if (theme.customTheme && theme.customThemeData) {
          if (theme.customThemeData.type === 'multi-color') {
            // Rainbow: Each particle gets ONE of the 8 colors
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
        const speed = themeRef.current.particleSpeed || 1
        const holdState = holdStateRef.current
        const currentHoverRange = themeRef.current.hoverRange || 150
        
        // Check for hold/drag actions
        if (holdState.isHolding) {
          const dx = this.x - mousePosRef.current.x
          const dy = this.y - mousePosRef.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          const holdActionType = themeRef.current.holdAction || 'gravity'
          
          // For trap: check if already trapped OR in range
          // For gravity: check if already captured OR in range
          const isAlreadyTrapped = holdActionType === 'trap' && holdState.trappedParticles.has(this)
          const shouldCapture = distance < currentHoverRange || this.isInGravityWell || isAlreadyTrapped
          
          if (shouldCapture) {
            const holdDuration = Date.now() - holdState.holdStartTime
            
            if (holdDuration >= 200) { // Only apply after hold threshold
              
              if (holdActionType === 'gravity') {
                // Cap max particles in gravity well - more on mobile since no web lines
                const MAX_GRAVITY_PARTICLES = isMobile ? 30 : 15
                
                // Check if this particle should be in the gravity well
                let shouldBeInGravityWell = this.isInGravityWell // Already captured? Keep it
                
                if (!this.isInGravityWell && distance < currentHoverRange) {
                  // New particle entering range - check if we have room
                  let gravityCount = 0
                  for (let i = 0; i < particles.length; i++) {
                    if (particles[i].isInGravityWell) gravityCount++
                  }
                  
                  if (gravityCount < MAX_GRAVITY_PARTICLES) {
                    shouldBeInGravityWell = true
                  }
                  // If at cap, shouldBeInGravityWell stays false, particle continues normally
                }
                
                if (shouldBeInGravityWell) {
                  // Mark particle as captured
                  this.isInGravityWell = true
                  
                  // GRAVITY WELL: Pull toward cursor with soft boundary (3x slower)
                  const pullStrength = 0.15 // Reduced from 0.5
                  
                  // Soft boundary - exponentially increasing inward force near edge
                  const maxDistance = currentHoverRange * 0.92
                  const boundaryStart = maxDistance * 0.7 // Start pushing back at 70% of max
                  
                  // Use distance squared to avoid sqrt when possible
                  const distSq = dx * dx + dy * dy
                  const maxDistSq = maxDistance * maxDistance
                  
                  // Normalize direction (only need sqrt once)
                  const invDist = distance > 0.001 ? 1 / distance : 0
                  const dirX = -dx * invDist // toward cursor
                  const dirY = -dy * invDist
                  
                  // Base pull toward cursor
                  this.speedX += dirX * pullStrength
                  this.speedY += dirY * pullStrength
                  
                  // Soft boundary push - gets stronger as particle approaches edge
                  if (distance > boundaryStart) {
                    const overshoot = (distance - boundaryStart) / (maxDistance - boundaryStart)
                    const pushStrength = overshoot * overshoot * 0.7 // Reduced from 2
                    
                    // Push back toward cursor (opposite of dx/dy direction)
                    this.speedX += dirX * pushStrength
                    this.speedY += dirY * pushStrength
                    
                    // Dampen outward velocity
                    this.speedX *= 0.9 // Less aggressive damping
                    this.speedY *= 0.9
                  }
                  
                  // Apply movement (slower)
                  this.x += this.speedX * speed * 0.5
                  this.y += this.speedY * speed * 0.5
                  
                  // Hard clamp as safety net (rarely needed with soft boundary)
                  if (distSq > maxDistSq * 1.1) {
                    const clampDist = maxDistance * 0.95
                    this.x = mousePosRef.current.x + (-dx * invDist) * -clampDist
                    this.y = mousePosRef.current.y + (-dy * invDist) * -clampDist
                  }
                  
                  // Canvas boundary handling
                  const confined = themeRef.current.particlesConfined
                  if (this.x > canvas.width) {
                    this.x = confined ? canvas.width : canvas.width
                    this.speedX *= -0.5
                  }
                  if (this.x < 0) {
                    this.x = 0
                    this.speedX *= -0.5
                  }
                  if (this.y > canvas.height) {
                    this.y = confined ? canvas.height : canvas.height
                    this.speedY *= -0.5
                  }
                  if (this.y < 0) {
                    this.y = 0
                    this.speedY *= -0.5
                  }
                  
                  return // Skip normal update logic
                }
                // If not in gravity well, fall through to normal movement
                
              } else if (holdActionType === 'trap') {
                // TRAP: Freeze particles in place, collect more as you drag
                holdState.trappedParticles.add(this)
                
                // Completely stop movement (not just slow down)
                this.speedX = 0
                this.speedY = 0
                
                // Vibration intensity based on total trapped count
                const trappedCount = holdState.trappedParticles.size
                const baseVibration = Math.min(3, (holdDuration / 300))
                const countMultiplier = Math.min(2, 1 + (trappedCount / 100))
                const vibrationIntensity = baseVibration * countMultiplier
                
                this.x += (Math.random() - 0.5) * vibrationIntensity
                this.y += (Math.random() - 0.5) * vibrationIntensity
                
                // Skip normal movement
                return
              }
            }
          }
        } else {
          // Not holding - release captured particles
          this.isInGravityWell = false
        }
        
        // Calculate total speed (magnitude)
        const totalSpeed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY)
        const baseSpeed = 0.5 // Maximum base speed from initialization
        
        // Only apply damping if speed is above base speed (particle was pushed)
        if (totalSpeed > baseSpeed) {
          const damping = 0.95
          this.speedX *= damping
          this.speedY *= damping
        }
        
        // Apply movement with speed multiplier
        this.x += this.speedX * speed
        this.y += this.speedY * speed

        const confined = themeRef.current.particlesConfined
        
        if (confined) {
          // BOUNCE off edges
          if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX
            this.x = Math.max(0, Math.min(canvas.width, this.x))
          }
          if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY
            this.y = Math.max(0, Math.min(canvas.height, this.y))
          }
        } else {
          // WRAP around edges (original behavior)
          if (this.x > canvas.width) this.x = 0
          if (this.x < 0) this.x = canvas.width
          if (this.y > canvas.height) this.y = 0
          if (this.y < 0) this.y = canvas.height
        }
        
        // Update color dynamically based on current theme
        this.updateColor()
        
        // Update size based on particleSize setting
        const sizeMultiplier = themeRef.current.particleSize || 1
        this.size = this.baseSize * sizeMultiplier
        
        // Update rotation based on velocity direction
        const velocity = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY)
        if (velocity > 0.1) {
          this.rotation = Math.atan2(this.speedY, this.speedX)
        }
      }

      draw() {
        const theme = themeRef.current
        const hoverSizeMultiplier = theme.particleHoverSize !== undefined ? theme.particleHoverSize : 1
        const shape = theme.particleShape || 'circle'
        const [r, g, b] = this.colorRGB.split(',').map(n => parseInt(n.trim()))
        
        // Base opacity
        const baseOpacity = 0.8
        
        // Calculate size with hover effect
        let size = this.size
        if (this.hoverAmount > 0 && hoverSizeMultiplier > 0) {
          size = this.size * (1 + 0.2 * this.hoverAmount * hoverSizeMultiplier)
        }
        
        // Calculate color adjustments for hover
        let finalR = r, finalG = g, finalB = b
        let finalOpacity = baseOpacity
        
        if (this.hoverAmount > 0) {
          if (mode === 'light') {
            // Light mode: Darken
            finalR = Math.round(r * (1 - 0.3 * this.hoverAmount))
            finalG = Math.round(g * (1 - 0.3 * this.hoverAmount))
            finalB = Math.round(b * (1 - 0.3 * this.hoverAmount))
          }
          finalOpacity = baseOpacity + 0.2 * this.hoverAmount
        }
        
        // Dark mode hover glow
        if (this.hoverAmount > 0.1 && mode === 'dark' && hoverSizeMultiplier > 0) {
          const glowSize = size * (1 + 0.6 * this.hoverAmount * hoverSizeMultiplier)
          
          const glowGradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowSize)
          glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.hoverAmount})`)
          glowGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${this.hoverAmount * 0.5})`)
          glowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          
          ctx.fillStyle = glowGradient
          ctx.beginPath()
          ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2)
          ctx.fill()
        }
        
        // Draw the particle shape
        ctx.fillStyle = `rgba(${finalR}, ${finalG}, ${finalB}, ${finalOpacity})`
        
        switch (shape) {
          case 'circle':
            ctx.beginPath()
            ctx.arc(this.x, this.y, size, 0, Math.PI * 2)
            ctx.fill()
            break
            
          case 'blob':
            // Organic blob with wobble
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
            // 5-pointed star
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
            ctx.moveTo(size, 0) // Point in direction of movement
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

    // Store Particle class in ref so other effects can use it
    ParticleClassRef.current = Particle

    // Create particles for both mobile and desktop (only if not already created)
    if (particles.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(i, particleCount))
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const currentHoverRange = themeRef.current.hoverRange || 150
      const webEnabled = themeRef.current.particleWeb !== false
      const holdState = holdStateRef.current
      const holdActionType = themeRef.current.holdAction || 'gravity'
      const holdDuration = holdState.isHolding ? Date.now() - holdState.holdStartTime : 0
      
      // Detect particles in the web (within hoverRange of cursor)
      const webParticles = new Set()
      
      particles.forEach(particle => {
        const dx = mousePosRef.current.x - particle.x
        const dy = mousePosRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < currentHoverRange) {
          webParticles.add(particle)
        }
      })
      
      // Smooth transition for hoverAmount
      particles.forEach(particle => {
        if (webParticles.has(particle)) {
          // In web - increase hoverAmount
          particle.hoverAmount = Math.min(1, particle.hoverAmount + 0.15)
        } else {
          // Not in web - decrease hoverAmount
          particle.hoverAmount = Math.max(0, particle.hoverAmount - 0.1)
        }
      })
      
      // Change cursor if any particles are in web
      if (webParticles.size > 0) {
        canvas.style.cursor = 'pointer'
      } else {
        canvas.style.cursor = 'default'
      }
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Only draw interactive web on desktop and if enabled
      if (!isMobile && webEnabled) {
        const connectedParticles = []
        const isTrapping = holdState.isHolding && holdActionType === 'trap' && holdDuration >= 200
        
        // For trapped particles, we'll use a Set for O(1) lookups
        const trappedSet = isTrapping ? holdState.trappedParticles : null
        const trappedCount = trappedSet ? trappedSet.size : 0
        
        particles.forEach(particle => {
          const dx = mousePosRef.current.x - particle.x
          const dy = mousePosRef.current.y - particle.y
          const distSq = dx * dx + dy * dy
          const hoverRangeSq = currentHoverRange * currentHoverRange

          if (distSq < hoverRangeSq) {
            // If we're trapping, only connect to particles that are actually trapped
            if (isTrapping && !trappedSet.has(particle)) {
              return // Skip non-trapped particles in hover range
            }
            
            const distance = Math.sqrt(distSq)
            const baseOpacity = 0.4 * (1 - distance / currentHoverRange)
            const lineOpacity = baseOpacity * (1 + particle.hoverAmount * 0.8)
            const lineWidth = 1.5 + particle.hoverAmount * 1.5
            
            // Line from mouse to particle (animated based on hoverAmount)
            ctx.strokeStyle = `rgba(${particle.colorRGB}, ${lineOpacity})`
            ctx.lineWidth = lineWidth
            ctx.beginPath()
            ctx.moveTo(mousePosRef.current.x, mousePosRef.current.y)
            ctx.lineTo(particle.x, particle.y)
            ctx.stroke()
            
            connectedParticles.push(particle)
          }
        })
        
        // If trapping, draw lines from cursor to trapped particles outside hover range
        if (isTrapping && trappedCount > 0) {
          trappedSet.forEach(particle => {
            // Skip if already in connectedParticles (use hoverAmount as proxy - it's > 0 if recently in range)
            const dx = mousePosRef.current.x - particle.x
            const dy = mousePosRef.current.y - particle.y
            const distSq = dx * dx + dy * dy
            const hoverRangeSq = currentHoverRange * currentHoverRange
            
            if (distSq >= hoverRangeSq) {
              ctx.strokeStyle = `rgba(${particle.colorRGB}, 0.3)`
              ctx.lineWidth = 1.5
              ctx.beginPath()
              ctx.moveTo(mousePosRef.current.x, mousePosRef.current.y)
              ctx.lineTo(particle.x, particle.y)
              ctx.stroke()
            }
          })
        }

        // Draw lines between connected particles (within hover range)
        const connectedLen = connectedParticles.length
        for (let i = 0; i < connectedLen; i++) {
          const p1 = connectedParticles[i]
          for (let j = i + 1; j < connectedLen; j++) {
            const p2 = connectedParticles[j]
            const dx = p1.x - p2.x
            const dy = p1.y - p2.y
            const distSq = dx * dx + dy * dy

            if (distSq < 10000) { // 100^2
              const distance = Math.sqrt(distSq)
              const baseOpacity = 0.3 * (1 - distance / 100)
              const maxHover = Math.max(p1.hoverAmount, p2.hoverAmount)
              const opacity = baseOpacity * (1 + maxHover * 1.2)
              const lineWidth = 1 + maxHover * 1.5
              
              const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
              gradient.addColorStop(0, `rgba(${p1.colorRGB}, ${opacity})`)
              gradient.addColorStop(1, `rgba(${p2.colorRGB}, ${opacity})`)
              ctx.strokeStyle = gradient
              
              ctx.lineWidth = lineWidth
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        }
        
        // Draw nearest-neighbor web between trapped particles (optimized)
        if (isTrapping && trappedCount > 1) {
          const MAX_NEIGHBORS = 6 // Each particle connects to up to 6 nearest neighbors
          const MAX_DIST_SQ = 160000 // 400^2 max connection distance
          
          // Convert to array only once per frame
          const trappedArray = Array.from(trappedSet)
          const trappedLen = trappedArray.length
          
          // For small counts, just do simple n^2 (faster than sorting overhead)
          if (trappedLen <= 20) {
            for (let i = 0; i < trappedLen; i++) {
              const p1 = trappedArray[i]
              for (let j = i + 1; j < trappedLen; j++) {
                const p2 = trappedArray[j]
                const dx = p1.x - p2.x
                const dy = p1.y - p2.y
                const distSq = dx * dx + dy * dy
                
                if (distSq < MAX_DIST_SQ) {
                  const distance = Math.sqrt(distSq)
                  const opacity = 0.25 * (1 - distance / 400)
                  
                  const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
                  gradient.addColorStop(0, `rgba(${p1.colorRGB}, ${opacity})`)
                  gradient.addColorStop(1, `rgba(${p2.colorRGB}, ${opacity})`)
                  ctx.strokeStyle = gradient
                  ctx.lineWidth = 1
                  ctx.beginPath()
                  ctx.moveTo(p1.x, p1.y)
                  ctx.lineTo(p2.x, p2.y)
                  ctx.stroke()
                }
              }
            }
          } else {
            // For larger counts, use nearest-neighbor approach
            // Track drawn connections to avoid duplicates
            const drawnConnections = new Set()
            
            for (let i = 0; i < trappedLen; i++) {
              const p1 = trappedArray[i]
              
              // Find nearest neighbors by collecting distances
              const neighbors = []
              for (let j = 0; j < trappedLen; j++) {
                if (i === j) continue
                const p2 = trappedArray[j]
                const dx = p1.x - p2.x
                const dy = p1.y - p2.y
                const distSq = dx * dx + dy * dy
                
                if (distSq < MAX_DIST_SQ) {
                  neighbors.push({ idx: j, distSq, particle: p2 })
                }
              }
              
              // Sort by distance and take closest MAX_NEIGHBORS
              neighbors.sort((a, b) => a.distSq - b.distSq)
              const nearestCount = Math.min(MAX_NEIGHBORS, neighbors.length)
              
              for (let k = 0; k < nearestCount; k++) {
                const n = neighbors[k]
                // Create unique connection key (smaller index first)
                const key = i < n.idx ? `${i}-${n.idx}` : `${n.idx}-${i}`
                
                if (!drawnConnections.has(key)) {
                  drawnConnections.add(key)
                  
                  const p2 = n.particle
                  const distance = Math.sqrt(n.distSq)
                  const opacity = 0.25 * (1 - distance / 400)
                  
                  const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
                  gradient.addColorStop(0, `rgba(${p1.colorRGB}, ${opacity})`)
                  gradient.addColorStop(1, `rgba(${p2.colorRGB}, ${opacity})`)
                  ctx.strokeStyle = gradient
                  ctx.lineWidth = 1
                  ctx.beginPath()
                  ctx.moveTo(p1.x, p1.y)
                  ctx.lineTo(p2.x, p2.y)
                  ctx.stroke()
                }
              }
            }
          }
        }
      }

      // Mobile: Draw chain connections for trapped particles (not a web, just nearest neighbor chains)
      if (isMobile) {
        const isTrapping = holdState.isHolding && holdActionType === 'trap' && holdDuration >= 200
        const trappedSet = isTrapping ? holdState.trappedParticles : null
        const trappedCount = trappedSet ? trappedSet.size : 0
        
        if (isTrapping && trappedCount > 1) {
          const trappedArray = Array.from(trappedSet)
          const trappedLen = trappedArray.length
          const drawnConnections = new Set()
          
          // Each particle connects to its 1-2 nearest neighbors only (chain, not web)
          for (let i = 0; i < trappedLen; i++) {
            const p1 = trappedArray[i]
            
            // Find the nearest neighbor
            let nearestIdx = -1
            let nearestDistSq = Infinity
            
            for (let j = 0; j < trappedLen; j++) {
              if (i === j) continue
              const p2 = trappedArray[j]
              const dx = p1.x - p2.x
              const dy = p1.y - p2.y
              const distSq = dx * dx + dy * dy
              
              if (distSq < nearestDistSq) {
                nearestDistSq = distSq
                nearestIdx = j
              }
            }
            
            // Draw line to nearest neighbor if found and not already drawn
            if (nearestIdx !== -1 && nearestDistSq < 90000) { // 300^2 max distance
              const key = i < nearestIdx ? `${i}-${nearestIdx}` : `${nearestIdx}-${i}`
              
              if (!drawnConnections.has(key)) {
                drawnConnections.add(key)
                
                const p2 = trappedArray[nearestIdx]
                const distance = Math.sqrt(nearestDistSq)
                const opacity = 0.4 * (1 - distance / 300)
                
                ctx.strokeStyle = `rgba(${p1.colorRGB}, ${opacity})`
                ctx.lineWidth = 1.5
                ctx.beginPath()
                ctx.moveTo(p1.x, p1.y)
                ctx.lineTo(p2.x, p2.y)
                ctx.stroke()
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile, primaryColorRGB, secondaryColorRGB, mode, accentColor, primaryColor, secondaryColor, customTheme, customThemeData])

  // Dynamically adjust particle count without resetting
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !ParticleClassRef.current) return

    const Particle = ParticleClassRef.current
    const particles = particlesRef.current
    const currentCount = particles.length
    const targetCount = particleCount

    if (currentCount === targetCount) return

    if (currentCount < targetCount) {
      // ADD particles
      for (let i = currentCount; i < targetCount; i++) {
        particles.push(new Particle(i, targetCount))
      }
      // Update totalParticles for all existing particles
      particles.forEach((p, idx) => {
        p.colorIndex = idx
        p.totalParticles = targetCount
        p.updateColor()
      })
    } else {
      // REMOVE particles
      particles.splice(targetCount)
      // Update totalParticles for remaining particles
      particles.forEach((p, idx) => {
        p.colorIndex = idx
        p.totalParticles = targetCount
        p.updateColor()
      })
    }
  }, [particleCount])

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const newX = e.clientX - rect.left
    const newY = e.clientY - rect.top
    
    mousePosRef.current = { x: newX, y: newY }
    
    // Detect dragging
    if (holdStateRef.current.isHolding) {
      const holdDuration = Date.now() - holdStateRef.current.holdStartTime
      
      if (holdDuration >= 200) { // After hold threshold
        holdStateRef.current.isDragging = true
      }
    }
  }

  const handleMouseLeave = () => {
    mousePosRef.current = { x: -1000, y: -1000 }
  }

  const handleMouseDown = (e) => {
    holdStateRef.current.isHolding = true
    holdStateRef.current.holdStartTime = Date.now()
    holdStateRef.current.trappedParticles.clear()
  }

  const handleMouseUp = (e) => {
    const holdDuration = Date.now() - holdStateRef.current.holdStartTime
    const HOLD_THRESHOLD = 200 // ms - anything less is a click
    
    if (holdDuration < HOLD_THRESHOLD && clickAction) {
      // Quick click - execute click action
      const particles = particlesRef.current
      const actionStrength = 8
      
      particles.forEach(particle => {
        const dx = particle.x - mousePosRef.current.x
        const dy = particle.y - mousePosRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < hoverRange && distance > 0) {
          const force = (1 - distance / hoverRange) * actionStrength
          const angle = Math.atan2(dy, dx)
          
          if (clickAction === 'repel') {
            particle.speedX += Math.cos(angle) * force
            particle.speedY += Math.sin(angle) * force
          } else if (clickAction === 'attract') {
            particle.speedX -= Math.cos(angle) * force
            particle.speedY -= Math.sin(angle) * force
          }
        }
      })
    } else if (holdDuration >= HOLD_THRESHOLD && holdAction === 'trap') {
      // Trap & Release - explode all trapped particles
      const trappedCount = holdStateRef.current.trappedParticles.size
      
      // Explosion strength scales with trapped count
      const baseStrength = 8
      const countBonus = Math.min(15, trappedCount / 10) // +1.5 per 10 particles, max +15
      const burstStrength = baseStrength + countBonus
      
      holdStateRef.current.trappedParticles.forEach(particle => {
        const dx = particle.x - mousePosRef.current.x
        const dy = particle.y - mousePosRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance > 0) {
          // Explode from their current position (not from cursor)
          const angle = Math.atan2(dy, dx)
          particle.speedX = Math.cos(angle) * burstStrength
          particle.speedY = Math.sin(angle) * burstStrength
        } else {
          // If particle is exactly at cursor, random direction
          const randomAngle = Math.random() * Math.PI * 2
          particle.speedX = Math.cos(randomAngle) * burstStrength
          particle.speedY = Math.sin(randomAngle) * burstStrength
        }
      })
    }
    // Gravity well: particles keep their momentum naturally on release
    
    // Reset hold state
    holdStateRef.current.isHolding = false
    holdStateRef.current.isDragging = false
    holdStateRef.current.trappedParticles.clear()
  }

  const handleTouchStartHold = (e) => {
    // Set touch position immediately on touch start
    const canvas = canvasRef.current
    if (canvas && e.touches[0]) {
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      mousePosRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      }
    }
    
    holdStateRef.current.isHolding = true
    holdStateRef.current.holdStartTime = Date.now()
    holdStateRef.current.trappedParticles.clear()
  }

  const handleTouchEndHold = (e) => {
    const holdDuration = Date.now() - holdStateRef.current.holdStartTime
    const HOLD_THRESHOLD = 200
    
    if (holdDuration < HOLD_THRESHOLD && clickAction) {
      // Quick tap - execute click action
      const particles = particlesRef.current
      const actionStrength = 8
      
      particles.forEach(particle => {
        const dx = particle.x - mousePosRef.current.x
        const dy = particle.y - mousePosRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < hoverRange && distance > 0) {
          const force = (1 - distance / hoverRange) * actionStrength
          const angle = Math.atan2(dy, dx)
          
          if (clickAction === 'repel') {
            particle.speedX += Math.cos(angle) * force
            particle.speedY += Math.sin(angle) * force
          } else if (clickAction === 'attract') {
            particle.speedX -= Math.cos(angle) * force
            particle.speedY -= Math.sin(angle) * force
          }
        }
      })
    } else if (holdDuration >= HOLD_THRESHOLD && holdAction === 'trap') {
      // Trap & Release - explode all trapped particles
      const trappedCount = holdStateRef.current.trappedParticles.size
      
      // Explosion strength scales with trapped count
      const baseStrength = 8
      const countBonus = Math.min(15, trappedCount / 10)
      const burstStrength = baseStrength + countBonus
      
      holdStateRef.current.trappedParticles.forEach(particle => {
        const dx = particle.x - mousePosRef.current.x
        const dy = particle.y - mousePosRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance > 0) {
          const angle = Math.atan2(dy, dx)
          particle.speedX = Math.cos(angle) * burstStrength
          particle.speedY = Math.sin(angle) * burstStrength
        } else {
          const randomAngle = Math.random() * Math.PI * 2
          particle.speedX = Math.cos(randomAngle) * burstStrength
          particle.speedY = Math.sin(randomAngle) * burstStrength
        }
      })
    }
    // Gravity well: particles keep their momentum naturally on release
    
    holdStateRef.current.isHolding = false
    holdStateRef.current.isDragging = false
    holdStateRef.current.trappedParticles.clear()
  }

  const handleTouchEnd = () => {
    mousePosRef.current = { x: -1000, y: -1000 }
  }

  // Handler to stop all events from propagating (for settings panels)
  const stopAllEvents = (e) => {
    e.stopPropagation()
  }

  return (
    <section 
      id="hero"
      ref={heroRef}
      className={`relative select-none ${mode === 'light' ? 'bg-[rgb(250,248,245)]' : 'bg-slate-900'}`}
      style={{ minHeight: 'calc(100vh + 20px)', paddingTop: '20vh', paddingBottom: '20px', touchAction: 'pan-x pan-y' }}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStartHold}
      onTouchEnd={handleTouchEndHold}
    >
      {/* Particle Canvas - Both Mobile & Desktop */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Settings Buttons - Top Right */}
      <div 
        className="absolute top-8 right-8 z-[60] flex gap-2"
        onClick={stopAllEvents}
        onMouseDown={stopAllEvents}
        onMouseUp={stopAllEvents}
        onTouchStart={stopAllEvents}
        onTouchMove={stopAllEvents}
        onTouchEnd={stopAllEvents}
      >
        <ParticleSettings 
          isOpen={openDropdown === 'particles'} 
          onToggle={() => setOpenDropdown(openDropdown === 'particles' ? null : 'particles')}
        />
        <Settings 
          isOpen={openDropdown === 'settings'}
          onToggle={() => setOpenDropdown(openDropdown === 'settings' ? null : 'settings')}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h1 className={`text-5xl sm:text-6xl md:text-7xl font-bold mb-6 sm:mb-8 ${
          mode === 'light' ? 'text-slate-900' : 'text-white'
        }`}>
          Hi! I'm <GradientText>Camden</GradientText>.
        </h1>
        <p className={`text-xl sm:text-2xl md:text-3xl mb-12 sm:mb-16 ${
          mode === 'light' ? 'text-slate-700' : 'text-slate-300'
        }`}>
          Computer Science student and full-stack developer.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 sm:justify-center max-w-md mx-auto sm:max-w-none px-4 sm:px-0">
          {/* Mobile: First row with 2 buttons */}
          <div className="flex gap-3 sm:contents">
            <a
              href="https://github.com/cbyington1"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg transition-colors ${
                customTheme === 'monochrome'
                  ? 'bg-slate-600 hover:bg-slate-700'
                  : customTheme === 'rainbow'
                    ? 'bg-red-600 hover:bg-red-700'
                    : customTheme === 'temperature'
                      ? 'bg-orange-600 hover:bg-orange-700'
                      : customTheme === 'pastel'
                        ? 'bg-purple-400 hover:bg-purple-500'
                        : mode === 'light' ? 'bg-slate-900 hover:bg-slate-800' : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              <Github size={20} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/camden-byington-bbbb71220"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg transition-colors ${
                customTheme === 'monochrome'
                  ? 'bg-slate-500 hover:bg-slate-600'
                  : customTheme === 'rainbow'
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : customTheme === 'temperature'
                      ? 'bg-indigo-500 hover:bg-indigo-600'
                      : customTheme === 'pastel'
                        ? 'bg-pink-300 hover:bg-pink-400'
                        : accentButtonClasses[primaryColor]
              }`}
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>
          
          {/* Mobile: Second row with centered button */}
          <a
            href="mailto:camden.byington1@gmail.com"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border-2 rounded-lg transition-colors ${
              customTheme === 'monochrome'
                ? mode === 'light'
                  ? 'border-slate-400 text-slate-900 hover:bg-slate-100'
                  : 'border-slate-500 text-white hover:bg-slate-800'
                : customTheme === 'rainbow'
                  ? mode === 'light'
                    ? 'border-cyan-500 hover:border-cyan-600 text-slate-900 hover:bg-cyan-50'
                    : 'border-cyan-500 hover:border-cyan-600 text-white hover:bg-cyan-950'
                  : customTheme === 'temperature'
                    ? mode === 'light'
                      ? 'border-sky-500 hover:border-sky-600 text-slate-900 hover:bg-sky-50'
                      : 'border-sky-500 hover:border-sky-600 text-white hover:bg-sky-950'
                    : customTheme === 'pastel'
                      ? mode === 'light'
                        ? 'border-blue-300 hover:border-blue-400 text-slate-900 hover:bg-blue-50'
                        : 'border-blue-300 hover:border-blue-400 text-white hover:bg-blue-950'
                      : secondaryEnabled 
                        ? mode === 'light' 
                          ? `${accentBorderClasses[secondaryColor]} text-slate-900` 
                          : `${accentBorderClassesDark[secondaryColor]} text-white`
                        : mode === 'light' 
                          ? `${accentBorderClasses[primaryColor]} text-slate-900` 
                          : `${accentBorderClassesDark[primaryColor]} text-white`
            }`}
          >
            <Mail size={20} />
            Contact
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero