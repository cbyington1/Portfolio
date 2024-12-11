import React from 'react';
import { ExternalLink } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const { title, description, tags, link } = project;
  
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
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
        <a
          href={link}
          className="inline-flex items-center text-blue-400 hover:text-blue-300"
        >
          View Project <ExternalLink size={16} className="ml-2" />
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;