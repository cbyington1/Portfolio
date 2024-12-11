// src/components/sections/Experience.jsx
import React from 'react';
import { experienceData } from '../../data/experienceData';

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
        {experienceData.map((experience, index) => (
          <div 
            key={index}
            className="mb-12 bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-bold text-blue-400">{experience.position}</h3>
              <span className="text-gray-400">{experience.duration}</span>
            </div>
            <h4 className="text-lg font-semibold mb-4">{experience.company}</h4>
            <p className="text-gray-300 mb-4">{experience.description}</p>
            <ul className="list-disc list-inside mb-4 text-gray-300">
              {experience.achievements.map((achievement, i) => (
                <li key={i} className="mb-2">{achievement}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;