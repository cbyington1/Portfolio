import React, { useState } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const { title, description, tags, link, githubLink } = project;
  
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl overflow-hidden transform transition-all duration-300 h-full">
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 h-24 overflow-y-auto flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-sm px-3 py-1 bg-gray-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4 mt-auto">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-400 hover:text-blue-300"
            >
              Demo <ExternalLink size={16} className="ml-2" />
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-gray-400 hover:text-gray-300"
            >
              Code <Github size={16} className="ml-2" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Comet Scraper",
      description: "Real-time sentiment analysis tool for stock-related news articles, featuring personalized watchlists and trend tracking to enhance investment decisions.",
      tags: ["React", "JavaScript", "API Integration", "Data Analysis"],
      link: "https://comet-scraper.vercel.app",
      githubLink: "https://github.com/cbyington1/CometScraper"
    },
    {
      title: "Keyboard Trumpet",
      description: "Interactive web-based trumpet simulator with realistic valve combinations, visual feedback, and audio output.",
      tags: ["Angular", "Web Audio API", "Frontend"],
      link: "https://keyboard-trumpet.vercel.app",
      githubLink: "https://github.com/cbyington1/KeyboardTrumpet"
    },
    {
      title: "BeatBond",
      description: "A social music discovery platform combining personalized recommendations with social networking. Built with Next.js, TypeScript, Tailwind CSS, and integrated with Spotify and Last.fm APIs.",
      tags: ["Next.js", "TypeScript", "Tailwind", "Spotify API", "Convex DB"],
      githubLink: "https://github.com/cbyington1/beat-bond"
    },
    {
      title: "Peace Missile (GPS-Guided Parachute)",
      description: "Arduino-based automated parachute recovery system for model rockets, featuring custom PCB design, GPS tracking, and sensor integration for guided landing.",
      tags: ["Arduino", "GPS", "Electronics", "PCB Design"],
      githubLink: "https://github.com/cbyington1/GPS-Guided-Parachute"
    },

    {
      title: "Chaos Encryption",
      description: "Encryption system using chaos theory and dynamical systems for key generation. Implements multiple chaotic attractors for unique, deterministic encryption.",
      tags: ["Python", "Cryptography", "Mathematics"],
      githubLink: "https://github.com/cbyington1/ChaosEncryption"
    },
    {
      title: "OpenText eDOC DM Automator",
      description: "Python automation script for OpenText eDOC DM 16.7.0, featuring GUI automation and error handling for efficient file management.",
      tags: ["Python", "Automation", "GUI"],
      githubLink: "https://github.com/cbyington1/OpenText-eDOC-DM-16.7.0-Automated-Matter-Deleter"
    },
    {
      title: "LEAP Algorithm",
      description: "A* pathfinding algorithm optimized for finding lowest elevation paths on topographic maps, featuring interval systems and slope preferences.",
      tags: ["Java", "Algorithms", "Pathfinding"],
      githubLink: "https://github.com/cbyington1/LEAP"
    }
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const totalPages = Math.ceil(projects.length / 3);

  const nextPage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const previousPage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getVisibleProjects = () => {
    const startIndex = currentPage * 3;
    const visibleProjects = projects.slice(startIndex, startIndex + 3);
    while (visibleProjects.length < 3) {
      visibleProjects.push(null);
    }
    return visibleProjects;
  };

  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12">Featured Projects</h2>
        
        <div className="relative px-12">
          {/* Navigation buttons */}
          <button 
            onClick={previousPage}
            disabled={isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors z-20 disabled:opacity-50"
            aria-label="Previous projects"
          >
            <ChevronLeft size={24} />
          </button>

          <button 
            onClick={nextPage}
            disabled={isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors z-20 disabled:opacity-50"
            aria-label="Next projects"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel container with overflow hidden */}
          <div className="overflow-hidden">
            {/* Sliding container */}
            <div 
              className="transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentPage * 100}%)`,
                display: 'grid',
                gridTemplateColumns: `repeat(${totalPages}, 100%)`,
              }}
            >
              {/* Pages */}
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div key={pageIndex} className="grid grid-cols-3 gap-6 h-full" style={{ minHeight: '400px' }}>
                  {projects.slice(pageIndex * 3, pageIndex * 3 + 3).map((project, index) => (
                    <div key={`${pageIndex}-${index}`} className="h-full">
                      {project ? (
                        <ProjectCard project={project} />
                      ) : (
                        <div className="h-full" />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentPage === index ? 'bg-blue-500' : 'bg-gray-600'
              }`}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentPage(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
              disabled={isAnimating}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;