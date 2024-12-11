import React from 'react';

const Navigation = ({ activeSection, setActiveSection, navigationItems }) => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="bg-gray-800/70 backdrop-blur-lg px-6 py-3 rounded-full border border-gray-700/50">
        <div className="flex items-center gap-2">
          {navigationItems.map((section) => (
            <button
              key={section}
              onClick={() => {
                setActiveSection(section);
                document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`
                relative px-4 py-2 rounded-full transition-all duration-300 capitalize
                ${activeSection === section 
                  ? 'text-white bg-blue-500/20'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }
              `}
            >
              {/* Active section indicator */}
              {activeSection === section && (
                <span 
                  className="absolute inset-0 rounded-full bg-blue-500/20 animate-scale-up"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10">{section}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navigation;