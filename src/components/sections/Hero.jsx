import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Hero = () => {
  return (
    <section className="h-screen flex items-center justify-center">
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
};

export default Hero;