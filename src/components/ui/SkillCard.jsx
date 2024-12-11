import React from 'react';

const SkillCard = ({ category, isActive, onMouseEnter, onMouseLeave }) => {
  const { icon, title, description, color, skills } = category;
  
  const getExperienceColor = (experience) => {
    switch (experience.toLowerCase()) {
      case 'advanced':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-blue-500';
      case 'beginner':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      className="relative h-full min-h-[32rem]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative p-[2px] rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] h-full">
        <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-75`} />
        <div className="relative bg-gray-900 bg-opacity-90 p-6 rounded-xl flex flex-col h-full backdrop-blur-sm">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${color}`}>
              {icon}
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
          <p className="text-gray-300 mb-6">{description}</p>
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index} className="min-h-[4rem] p-3 rounded-lg bg-gray-800 hover:bg-gray-750 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white">{skill.name}</span>
                  <span className={`px-2 py-1 rounded text-xs ${getExperienceColor(skill.experience)}`}>
                    {skill.experience}
                  </span>
                </div>
                <div className={`text-xs text-gray-400 transition-opacity duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}>
                  {skill.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;