import React, { useState } from 'react';
import { Code, Server, Cpu } from 'lucide-react';
import SkillCard from '../ui/SkillCard';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const skillCategories = {
    frontend: {
      icon: <Code size={28} />,
      title: "Frontend Development",
      description: "Building modern web applications with React and Next.js",
      color: "from-blue-400 to-indigo-500",
      skills: [
        { 
          name: "React/Next.js", 
          experience: "Advanced",
          details: "Built full-stack applications including BeatBond and CometScraper" 
        },
        { 
          name: "TypeScript", 
          experience: "Intermediate",
          details: "Implemented type-safe features in BeatBond and KeyboardTrumpet" 
        },
        { 
          name: "Angular", 
          experience: "Intermediate",
          details: "Developed Keyboard Trumpet web simulator" 
        },
        { 
          name: "Tailwind CSS", 
          experience: "Beginner",
          details: "Designed responsive UIs for multiple web applications" 
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
          name: "Python", 
          experience: "Advanced",
          details: "Developed automation tools, encryption systems" 
        },
        { 
          name: "Flask", 
          experience: "Intermediate",
          details: "Created REST APIs for BeatBond and Comet Scrpaer backend" 
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
          name: "Arduino/Electronics", 
          experience: "Intermediate",
          details: "Built GPS-guided parachute system with custom PCB" 
        },
        { 
          name: "GUI Automation", 
          experience: "Intermediate",
          details: "Created enterprise automation tools for OpenText DM" 
        },
        { 
          name: "Firebase", 
          experience: "Intermediate",
          details: "Implemented real-time database features for Comet Scraper" 
        },
         { 
          name: "Convex DB", 
          experience: "Beginner",
          details: "Implemented real-time database features in BeatBond" 
        }
      ]
    }
  };

  return (
    <section id="skills" className="py-20 relative z-10 bg-gray-800 bg-opacity-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12">Technical Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(skillCategories).map(([key, category]) => (
            <SkillCard
              key={key}
              category={category}
              isActive={activeCategory === key}
              onMouseEnter={() => setActiveCategory(key)}
              onMouseLeave={() => setActiveCategory(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;