import React, { useEffect } from 'react';
import { Github, Linkedin, Settings, X, Wand2 } from 'lucide-react';

const Hero = ({ 
  particleSettings, 
  setParticleSettings, 
  showControls, 
  setShowControls,
  contentOnly = false,
  controlsOnly = false 
}) => {
  const [isHeroVisible, setIsHeroVisible] = React.useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('#hero');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        setIsHeroVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial visibility

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (contentOnly) {
    return (
      <section id="hero" className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">Hi, I'm Camden</h1>
          <p className="text-xl text-gray-300 mb-4">I'm a full-stack developer that likes to build things</p>
          <div className="mt-8 space-x-4">
            <a 
              href="https://github.com/cbyington1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg transform transition hover:scale-105"
            >
              <Github className="mr-2" size={20} />
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/camden-byington-bbbb71220" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center border border-blue-500 hover:bg-blue-500 hover:bg-opacity-20 px-6 py-2 rounded-lg transform transition hover:scale-105"
            >
              <Linkedin className="mr-2" size={20} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    );
  }

  if (controlsOnly) {
    return (
      <>
        {/* Floating Settings Button */}
        <button
          onClick={() => setShowControls(true)}
          className={`fixed top-6 right-6 z-[100] p-3 rounded-full bg-blue-500 bg-opacity-20 backdrop-blur-sm 
            border border-blue-400 border-opacity-20 shadow-lg transition-all duration-300
            flex items-center group ${showControls || !isHeroVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            hover:pr-8 hover:pl-4 cursor-pointer`}
        >
          <Wand2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <span className="text-blue-400 text-sm max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out ml-0 group-hover:ml-2">
            Customize particles
          </span>
        </button>

        {/* Settings Panel */}
        <div 
          className={`fixed inset-0 z-[100] transition-all duration-500 ease-in-out ${showControls ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-500 ease-in-out ${showControls ? 'opacity-30' : 'opacity-0'}`}
            onClick={() => setShowControls(false)}
          />

          {/* Panel */}
          <div 
            className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-gray-900 bg-opacity-40 backdrop-blur-sm 
              shadow-xl transition-all duration-500 ease-in-out border-l border-blue-500 border-opacity-20
              ${showControls ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
          >
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <Settings className="text-blue-400" size={20} />
                  <h2 className="text-xl font-semibold text-white">Particle Settings</h2>
                </div>
                <button
                  onClick={() => setShowControls(false)}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Particle Count */}
                <div>
                  <label className="block mb-2 text-gray-200">
                    Particle Count: {particleSettings.particleCount}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="300"
                    value={particleSettings.particleCount}
                    onChange={(e) => setParticleSettings(prev => ({
                      ...prev,
                      particleCount: parseInt(e.target.value)
                    }))}
                    className="w-full accent-blue-500"
                  />
                </div>

                {/* Color Mode */}
                <div>
                  <label className="block mb-2 text-gray-200">Color Mode</label>
                  <select
                    value={particleSettings.colorMode}
                    onChange={(e) => setParticleSettings(prev => ({
                      ...prev,
                      colorMode: e.target.value
                    }))}
                    className="w-full bg-gray-800 bg-opacity-50 text-gray-200 rounded-lg p-2 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  >
                    <option value="blue">Blue</option>
                    <option value="rainbow">Rainbow</option>
                    <option value="gradient">Gradient</option>
                    <option value="forest">Forest</option>
                    <option value="ocean">Ocean</option>
                    <option value="fire">Fire</option>
                  </select>
                </div>

                {/* Connection Distance */}
                <div>
                  <label className="block mb-2 text-gray-200">
                    Connection Distance: {particleSettings.connectionDistance}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={particleSettings.connectionDistance}
                    onChange={(e) => setParticleSettings(prev => ({
                      ...prev,
                      connectionDistance: parseInt(e.target.value)
                    }))}
                    className="w-full accent-blue-500"
                  />
                </div>

                {/* Particle Speed */}
                <div>
                  <label className="block mb-2 text-gray-200">
                    Particle Speed: {particleSettings.particleSpeed.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.1"
                    value={particleSettings.particleSpeed}
                    onChange={(e) => setParticleSettings(prev => ({
                      ...prev,
                      particleSpeed: parseFloat(e.target.value)
                    }))}
                    className="w-full accent-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default Hero;