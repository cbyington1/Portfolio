import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm a junior at The University of Texas at Dallas pursuing a B.S. in Computer Science with a focus on full-stack development. 
              Through my projects, I've gained experience across different areas of software development, from algorithms to web applications. 
              I'm currently exploring fintech as a member of UTD Fintech while continuing to expand my skills in full-stack development
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Experience</h3>
              <p className="text-gray-300">6+ years</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Projects</h3>
              <p className="text-gray-300">7 major</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Education</h3>
              <p className="text-gray-300">UTD '26</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Technologies</h3>
              <p className="text-gray-300">12+ mastered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;