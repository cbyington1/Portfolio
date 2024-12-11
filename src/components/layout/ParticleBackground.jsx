import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';

const ParticleBackground = ({ settings }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef();
  const contextRef = useRef(null);

  // Memoize the Particle class to prevent recreation
  const Particle = useMemo(() => {
    return class {
      constructor(canvas, settings) {
        this.canvas = canvas;
        this.settings = settings;
        this.lastColorMode = settings.colorMode;
        this.reset();
        this.color = this.getInitialColor();
      }

      reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.vx = (Math.random() - 0.5) * this.settings.particleSpeed;
        this.vy = (Math.random() - 0.5) * this.settings.particleSpeed;
        this.radius = 1;
        this.life = Math.random() * 100 + 100;
      }

      getInitialColor() {
        switch (this.settings.colorMode) {
          case 'rainbow':
            const randomHue = Math.random() * 360;
            return `hsla(${randomHue}, 70%, 50%, 0.8)`;
          case 'gradient':
            const progress = this.y / this.canvas.height;
            const hue1 = 200;
            const hue2 = 300;
            const gradientHue = hue1 + (hue2 - hue1) * progress;
            return `hsla(${gradientHue}, 70%, 50%, 0.8)`;
          case 'sunset':
            const sunsetProgress = this.y / this.canvas.height;
            const sunsetHue = 360 + (40 - 360) * sunsetProgress;
            return `hsla(${sunsetHue}, 80%, 50%, 0.8)`;
          case 'forest':
            const forestProgress = this.y / this.canvas.height;
            // Create wider range of hues from yellow-green to deep forest green
            const forestHue = 85 + (150 - 85) * forestProgress;
            // Vary saturation and lightness based on position for more depth
            const forestSat = 60 + (Math.random() * 20); // 60-80% saturation
            const forestLight = 25 + (Math.random() * 20); // 25-45% lightness
            return `hsla(${forestHue}, ${forestSat}%, ${forestLight}%, 0.8)`;
          case 'ocean':
            const oceanProgress = this.y / this.canvas.height;
            const oceanHue = 180 + (220 - 180) * oceanProgress;
            return `hsla(${oceanHue}, 70%, 45%, 0.8)`;
          case 'fire':
            const fireProgress = this.y / this.canvas.height;
            const fireHue = 0 + (60 - 0) * fireProgress;
            return `hsla(${fireHue}, 80%, 50%, 0.8)`;
          default: // blue
            return 'rgba(74, 144, 226, 0.8)';
        }
      }

      // Rest of the Particle class methods remain the same
      update(mousePos) {
        const dx = mousePos.x - this.x;
        const dy = mousePos.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.settings.connectionDistance) {
          const force = 0.02;
          this.vx += dx / distance * force;
          this.vy += dy / distance * force;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;

        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > this.settings.particleSpeed * 3) {
          this.vx = (this.vx / speed) * this.settings.particleSpeed * 3;
          this.vy = (this.vy / speed) * this.settings.particleSpeed * 3;
        }

        this.life -= 0.1;
        if (this.life <= 0) {
          this.reset();
          this.color = this.getInitialColor();
        }
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    };
  }, []);

  // Rest of the component remains the same
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    contextRef.current = canvas.getContext('2d');
  }, []);

  const updateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !settings) return;

    if (particlesRef.current.length === 0) {
      particlesRef.current = Array(settings.particleCount)
        .fill(null)
        .map(() => new Particle(canvas, settings));
      return;
    }

    const currentCount = particlesRef.current.length;
    const targetCount = settings.particleCount;

    if (targetCount > currentCount) {
      const newParticles = Array(targetCount - currentCount)
        .fill(null)
        .map(() => new Particle(canvas, settings));
      particlesRef.current = [...particlesRef.current, ...newParticles];
    } else if (targetCount < currentCount) {
      particlesRef.current = particlesRef.current.slice(0, targetCount);
    }

    particlesRef.current.forEach(particle => {
      particle.settings = settings;
      if (particle.lastColorMode !== settings.colorMode) {
        particle.color = particle.getInitialColor();
        particle.lastColorMode = settings.colorMode;
      }
    });
  }, [Particle, settings]);

  const animate = useCallback(() => {
    const ctx = contextRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.fillStyle = 'rgba(3, 3, 3, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const particles = particlesRef.current;
    
    particles.forEach(particle => {
      particle.update(mousePosition);
      particle.draw(ctx);
    });

    particles.forEach((particle, i) => {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[j].x - particle.x;
        const dy = particles[j].y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < settings.connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          
          if (settings.colorMode === 'rainbow' || 
             settings.colorMode === 'gradient' || 
             settings.colorMode === 'sunset' || 
             settings.colorMode === 'forest' || 
             settings.colorMode === 'ocean' || 
             settings.colorMode === 'fire') {
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, particles[j].color);
            ctx.strokeStyle = gradient;
          } else {
            const particleColor = particle.color;
            const matches = particleColor.match(/[\d.]+/g);
            if (matches && matches.length >= 3) {
              const [r, g, b] = matches;
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${1 - distance / settings.connectionDistance})`;
            }
          }
          
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [settings, mousePosition]);

  useEffect(() => {
    if (!settings) return;
    
    initCanvas();
    updateParticles();
    animate();

    const handleResize = () => {
      initCanvas();
      updateParticles();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initCanvas, updateParticles, animate, settings]);

  const handleMouseMove = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <div className="fixed inset-0 bg-[#030303]" style={{ zIndex: -1 }}>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        className="w-full h-full"
      />
    </div>
  );
};

export default ParticleBackground;