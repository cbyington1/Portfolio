import { useState, useRef, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

function ParticleSettings({ isOpen: externalIsOpen, onToggle }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('basics') // 'basics', 'hover', 'actions', 'shape'
  const [isMobile, setIsMobile] = useState(false)
  const dropdownRef = useRef(null)
  
  // Use external control if provided, otherwise use internal state
  const isOpenState = externalIsOpen !== undefined ? externalIsOpen : isOpen
  const toggleOpen = onToggle || (() => setIsOpen(!isOpen))
  const { 
    mode, 
    particlesConfined, 
    toggleParticlesConfined, 
    particleSpeed, 
    updateParticleSpeed, 
    particleHoverSize, 
    updateParticleHoverSize,
    particleSize,
    updateParticleSize,
    particleCount, 
    updateParticleCount, 
    particleWeb, 
    toggleParticleWeb, 
    hoverRange, 
    updateHoverRange, 
    clickAction, 
    changeClickAction, 
    holdAction, 
    changeHoldAction,
    particleShape,
    changeParticleShape
  } = useTheme()

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpenState, onToggle, externalIsOpen])

  const shapes = [
    { value: 'circle', label: 'Circle' },
    { value: 'blob', label: 'Blob' },
    { value: 'star', label: 'Star' },
    { value: 'square', label: 'Square' },
    { value: 'diamond', label: 'Diamond' },
    { value: 'triangle', label: 'Triangle' }
  ]

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Particles Button */}
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
          mode === 'light' 
            ? 'text-slate-700 hover:bg-slate-200' 
            : 'text-slate-300 hover:bg-slate-700'
        }`}
        aria-label="Particle Settings"
      >
        <Sparkles size={20} />
      </button>

      {/* Dropdown */}
      {isOpenState && (
        <div 
          className={`absolute top-full right-0 mt-2 w-72 rounded-xl shadow-2xl border z-[200] ${
            mode === 'light'
              ? 'bg-white border-slate-200'
              : 'bg-slate-800 border-slate-700'
          }`}
          style={{ maxHeight: '80vh', overflowY: 'auto', maxWidth: 'calc(100vw - 2rem)' }}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            {/* Tabs */}
            <div className="flex gap-1 mb-4 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
              <button
                onClick={() => setActiveTab('basics')}
                className={`px-3 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'basics'
                    ? mode === 'light'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-blue-400 border-b-2 border-blue-400'
                    : mode === 'light'
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Basics
              </button>
              <button
                onClick={() => setActiveTab('hover')}
                className={`px-3 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'hover'
                    ? mode === 'light'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-blue-400 border-b-2 border-blue-400'
                    : mode === 'light'
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Hover
              </button>
              <button
                onClick={() => setActiveTab('actions')}
                className={`px-3 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'actions'
                    ? mode === 'light'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-blue-400 border-b-2 border-blue-400'
                    : mode === 'light'
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Actions
              </button>
              <button
                onClick={() => setActiveTab('shape')}
                className={`px-3 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'shape'
                    ? mode === 'light'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-blue-400 border-b-2 border-blue-400'
                    : mode === 'light'
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Shape
              </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {/* BASICS TAB */}
              {activeTab === 'basics' && (
                <>
                  {/* Bounce Toggle */}
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={particlesConfined}
                        onChange={toggleParticlesConfined}
                        className="w-4 h-4 rounded accent-blue-500"
                      />
                      <span className={`text-sm font-semibold ${
                        mode === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>
                        Bounce off Edges
                      </span>
                    </label>
                    <p className={`text-xs mt-1 ml-6 ${
                      mode === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      Off = particles wrap around to the other side
                    </p>
                  </div>

                  {/* Particle Speed Slider */}
                  <div>
                    <label className={`text-sm font-semibold block mb-2 ${
                      mode === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>
                      Particle Speed: {particleSpeed.toFixed(1)}x
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="10"
                      step="0.1"
                      value={particleSpeed}
                      onChange={(e) => updateParticleSpeed(parseFloat(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                    <p className={`text-xs mt-1 ${
                      mode === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      Control how fast particles move
                    </p>
                  </div>

                  {/* Particle Count Slider */}
                  <div>
                    <label className={`text-sm font-semibold block mb-2 ${
                      mode === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>
                      Particle Count: {particleCount}
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="500"
                      step="10"
                      value={particleCount}
                      onChange={(e) => updateParticleCount(parseInt(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                    <p className={`text-xs mt-1 ${
                      mode === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      Number of particles in the hero section
                    </p>
                  </div>
                </>
              )}

              {/* HOVER TAB */}
              {activeTab === 'hover' && (
                <>
                  {/* Particle Web Toggle - Desktop only */}
                  {!isMobile && (
                    <div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={particleWeb}
                          onChange={toggleParticleWeb}
                          className="w-4 h-4 rounded accent-blue-500"
                        />
                        <span className={`text-sm font-semibold ${
                          mode === 'light' ? 'text-slate-900' : 'text-white'
                        }`}>
                          Show Particle Web
                        </span>
                      </label>
                      <p className={`text-xs mt-1 ml-6 ${
                        mode === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        Display connection lines between particles on hover
                      </p>
                    </div>
                  )}

                  {/* Hover Range Slider */}
                  <div>
                    <label className={`text-sm font-semibold block mb-2 ${
                      mode === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>
                      Hover Range: {hoverRange}px
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="300"
                      step="10"
                      value={hoverRange}
                      onChange={(e) => updateHoverRange(parseInt(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                    <p className={`text-xs mt-1 ${
                      mode === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      Distance for hover effects and interactions
                    </p>
                  </div>

                  {/* Particle Hover Size Slider */}
                  <div>
                    <label className={`text-sm font-semibold block mb-2 ${
                      mode === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>
                      Hover Growth: {particleHoverSize.toFixed(1)}x
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={particleHoverSize}
                      onChange={(e) => updateParticleHoverSize(parseFloat(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                    <p className={`text-xs mt-1 ${
                      mode === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      How much particles grow when hovered (0 = no growth)
                    </p>
                  </div>
                </>
              )}

              {/* ACTIONS TAB */}
              {activeTab === 'actions' && (
                <>
                  {/* Click Action */}
                  <div>
                    <label className={`block text-sm font-semibold mb-3 ${
                      mode === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>
                      {isMobile ? 'Tap Action' : 'Click Action'}
                    </label>
                    
                    <div className="space-y-2">
                      {/* Repel Option */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="clickAction"
                          value="repel"
                          checked={clickAction === 'repel'}
                          onChange={(e) => changeClickAction(e.target.value)}
                          className="w-4 h-4 accent-blue-500"
                        />
                        <div>
                          <span className={`text-sm font-medium ${
                            mode === 'light' ? 'text-slate-900' : 'text-white'
                          }`}>
                            Repel
                          </span>
                          <p className={`text-xs ${
                            mode === 'light' ? 'text-slate-600' : 'text-slate-400'
                          }`}>
                            Push particles away from {isMobile ? 'tap' : 'click'} point
                          </p>
                        </div>
                      </label>

                      {/* Attract Option */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="clickAction"
                          value="attract"
                          checked={clickAction === 'attract'}
                          onChange={(e) => changeClickAction(e.target.value)}
                          className="w-4 h-4 accent-blue-500"
                        />
                        <div>
                          <span className={`text-sm font-medium ${
                            mode === 'light' ? 'text-slate-900' : 'text-white'
                          }`}>
                            Attract
                          </span>
                          <p className={`text-xs ${
                            mode === 'light' ? 'text-slate-600' : 'text-slate-400'
                          }`}>
                            Pull particles toward {isMobile ? 'tap' : 'click'} point
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Hold Action */}
                  <div className="mt-6">
                    <label className={`block text-sm font-semibold mb-3 ${
                      mode === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>
                      Hold/Drag Action
                    </label>
                    
                    <div className="space-y-2">
                      {/* Trap & Release Option */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="holdAction"
                          value="trap"
                          checked={holdAction === 'trap'}
                          onChange={(e) => changeHoldAction(e.target.value)}
                          className="w-4 h-4 accent-blue-500"
                        />
                        <div>
                          <span className={`text-sm font-medium ${
                            mode === 'light' ? 'text-slate-900' : 'text-white'
                          }`}>
                            Trap & Release
                          </span>
                          <p className={`text-xs ${
                            mode === 'light' ? 'text-slate-600' : 'text-slate-400'
                          }`}>
                            Freeze particles in place, drag to collect more, release to explode
                          </p>
                        </div>
                      </label>

                      {/* Gravity Well Option */}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="holdAction"
                          value="gravity"
                          checked={holdAction === 'gravity'}
                          onChange={(e) => changeHoldAction(e.target.value)}
                          className="w-4 h-4 accent-blue-500"
                        />
                        <div>
                          <span className={`text-sm font-medium ${
                            mode === 'light' ? 'text-slate-900' : 'text-white'
                          }`}>
                            Gravity Well
                          </span>
                          <p className={`text-xs ${
                            mode === 'light' ? 'text-slate-600' : 'text-slate-400'
                          }`}>
                            Pull particles toward cursor (stationary or dragging)
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* SHAPE TAB (renamed from EFFECTS) */}
              {activeTab === 'shape' && (
                <>
                  {/* Particle Shape */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${
                      mode === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>
                      Particle Shape
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {shapes.map((shape) => (
                        <button
                          key={shape.value}
                          onClick={() => changeParticleShape(shape.value)}
                          className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                            particleShape === shape.value
                              ? mode === 'light'
                                ? 'bg-blue-500 text-white'
                                : 'bg-blue-600 text-white'
                              : mode === 'light'
                                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          }`}
                        >
                          {shape.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Particle Size Slider */}
                  <div className="mt-4">
                    <label className={`text-sm font-semibold block mb-2 ${
                      mode === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>
                      Particle Size: {particleSize.toFixed(1)}x
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={particleSize}
                      onChange={(e) => updateParticleSize(parseFloat(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                    <p className={`text-xs mt-1 ${
                      mode === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      Base size of all particles
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ParticleSettings