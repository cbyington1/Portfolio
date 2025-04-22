import React, { useState } from 'react';
import { Code, Server, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';
import SkillCard from '../ui/SkillCard';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState({
    frontend: 0,
    backend: 0,
    tools: 0
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const skillCategories = {
    frontend: {
      icon: <Code size={28} />,
      title: "Frontend Development",
      description: "Building modern web and mobile applications",
      color: "from-blue-400 to-indigo-500",
      skills: [
        { 
          name: "React/Next.js", 
          experience: "Advanced",
          details: "Built full-stack applications including BeatBond and CometScraper" 
        },
        { 
          name: "Tailwind/NativeWind", 
          experience: "Advanced",
          details: "Designed responsive UIs for web and mobile applications" 
        },
        { 
          name: "TypeScript", 
          experience: "Intermediate",
          details: "Implemented type-safe features in multiple projects" 
        },
        { 
          name: "Angular", 
          experience: "Intermediate",
          details: "Developed Keyboard Trumpet web simulator" 
        },
        { 
          name: "React Native", 
          experience: "Intermediate",
          details: "Developed mobile applications including NHL Predictor" 
        },
        { 
          name: "Expo", 
          experience: "Intermediate",
          details: "Created cross-platform mobile applications" 
        },
        { 
          name: "Redux", 
          experience: "Intermediate",
          details: "Implemented state management for complex applications" 
        },
        { 
          name: "TanStack Query", 
          experience: "Beginner",
          details: "Managed server state in React applications" 
        }
      ]
    },
    backend: {
      icon: <Server size={28} />,
      title: "Backend & Systems",
      description: "Server-side development and systems programming",
      color: "from-emerald-400 to-teal-500",
      skills: [
        { 
          name: "Python/Flask", 
          experience: "Advanced",
          details: "Developed APIs, automation tools, and encryption systems" 
        },
        { 
          name: "Node.js/Express", 
          experience: "Advanced",
          details: "Created REST APIs for multiple applications" 
        },
        { 
          name: "Java", 
          experience: "Intermediate",
          details: "Implemented LEAP pathfinding algorithm" 
        },
        { 
          name: "API Integration", 
          experience: "Intermediate",
          details: "Worked with Spotify, Yahoo Finance, and other REST APIs" 
        },
        { 
          name: "GUI Automation", 
          experience: "Intermediate",
          details: "Created enterprise automation tools for OpenText DM" 
        },
        { 
          name: "Axios", 
          experience: "Intermediate",
          details: "HTTP client for backend services" 
        },
        { 
          name: "API Development", 
          experience: "Intermediate",
          details: "Created RESTful and GraphQL APIs" 
        },
        { 
          name: "Socket.io", 
          experience: "Beginner",
          details: "Implemented real-time communication features" 
        }
      ]
    },
    tools: {
      icon: <Cpu size={28} />,
      title: "Tools & Technologies",
      description: "Databases, hardware, and specialized tools",
      color: "from-amber-400 to-orange-500",
      skills: [
        { 
          name: "Git/GitHub", 
          experience: "Advanced",
          details: "Version control and collaborative development" 
        },
        { 
          name: "Arduino/Electronics", 
          experience: "Intermediate",
          details: "Built GPS-guided parachute system with custom PCB" 
        },
        { 
          name: "Firebase", 
          experience: "Intermediate",
          details: "Implemented real-time database features" 
        },
        { 
          name: "MongoDB/Mongoose", 
          experience: "Intermediate",
          details: "NoSQL database for NHL Predictor" 
        },
        { 
          name: "PostgreSQL/Prisma ORM", 
          experience: "Intermediate",
          details: "Type-safe database client for PostgreSQL" 
        },
        { 
          name: "Data Visualization", 
          experience: "Intermediate",
          details: "Interactive charts with Victory Native" 
        },
        { 
          name: "Convex DB", 
          experience: "Beginner",
          details: "Implemented real-time database features in BeatBond" 
        },
        { 
          name: "Supabase", 
          experience: "Beginner",
          details: "Backend-as-a-service for auth and database" 
        }
      ]
    }
  };

  const skillsPerPage = 4;

  const getPageCount = (categoryKey) => {
    return Math.ceil(skillCategories[categoryKey].skills.length / skillsPerPage);
  };

  const nextPage = (categoryKey) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPage(prev => ({
      ...prev,
      [categoryKey]: (prev[categoryKey] + 1) % getPageCount(categoryKey)
    }));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const previousPage = (categoryKey) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPage(prev => ({
      ...prev,
      [categoryKey]: (prev[categoryKey] - 1 + getPageCount(categoryKey)) % getPageCount(categoryKey)
    }));
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section id="skills" className="py-20 relative z-10 bg-gray-800 bg-opacity-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(skillCategories).map(([key, category]) => (
            <div key={key} className="relative">
              <div className="overflow-hidden relative">
                {getPageCount(key) > 1 && (
                  <>
                    <button 
                      onClick={() => previousPage(key)}
                      disabled={isAnimating}
                      className="absolute left-1 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                      aria-label={`Previous ${category.title} skills`}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button 
                      onClick={() => nextPage(key)}
                      disabled={isAnimating}
                      className="absolute right-1 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                      aria-label={`Next ${category.title} skills`}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
                
                <div 
                  className="transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(-${currentPage[key] * 100}%)`,
                    display: 'grid',
                    gridTemplateColumns: `repeat(${getPageCount(key)}, 100%)`,
                  }}
                >
                  {Array.from({ length: getPageCount(key) }).map((_, pageIndex) => (
                    <div key={pageIndex} className="w-full">
                      <SkillCard
                        category={{
                          ...category,
                          skills: skillCategories[key].skills.slice(pageIndex * skillsPerPage, (pageIndex + 1) * skillsPerPage)
                        }}
                        isActive={activeCategory === key}
                        onMouseEnter={() => setActiveCategory(key)}
                        onMouseLeave={() => setActiveCategory(null)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Page indicators */}
              {getPageCount(key) > 1 && (
                <div className="flex justify-center mt-2 gap-1">
                  {Array.from({ length: getPageCount(key) }).map((_, index) => (
                    <button
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        currentPage[key] === index ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                      onClick={() => {
                        if (!isAnimating) {
                          setIsAnimating(true);
                          setCurrentPage(prev => ({
                            ...prev,
                            [key]: index
                          }));
                          setTimeout(() => setIsAnimating(false), 500);
                        }
                      }}
                      disabled={isAnimating}
                      aria-label={`Go to page ${index + 1} of ${category.title} skills`}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;