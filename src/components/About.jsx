import { useTheme } from '../contexts/ThemeContext'
import GradientText from './GradientText'

function About() {
  const { mode, primaryColor, secondaryColor, secondaryEnabled, primaryColorRGB, secondaryColorRGB, customTheme, customThemeData } = useTheme()
  
  // Tech stack data with devicon classes
  const techStack = [
    // Languages
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    // Frontend
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    // Backend
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
    // Data/ML
    { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
    { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
    // Tools
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  ]
  
  return (
    <section id="about" className={`relative py-16 sm:py-20 md:py-32 ${
      mode === 'light' ? 'bg-white' : 'bg-slate-900'
    }`}>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${
            mode === 'light' ? 'text-slate-900' : 'text-white'
          }`}>
            <GradientText>About Me</GradientText>
          </h2>
        </div>

        {/* Side by side layout */}
        <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-start">
          
          {/* Left side - Bio */}
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <p className={`text-lg sm:text-xl leading-relaxed text-center lg:text-left ${
              mode === 'light' ? 'text-slate-700' : 'text-slate-300'
            }`}>
              I'm a senior at UTD pursuing a bachelors in Computer Science. I've been coding for 7 years, 
              starting back in my sophomore year of high school. Through my projects I've learned a lot 
              of skills—building full-stack applications, experimenting with ML models, practicing with 
              cloud platforms, and sometimes doing hardware and systems-level work.
            </p>
          </div>

          {/* Right side - Tech Stack */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-5 gap-4">
              {techStack.map((tech) => (
                <div 
                  key={tech.name}
                  className="flex flex-col items-center gap-2"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 p-2 rounded-lg ${
                    mode === 'light' 
                      ? 'bg-slate-100' 
                      : 'bg-slate-800'
                  }`}>
                    <img 
                      src={tech.icon} 
                      alt={tech.name}
                      className={`w-full h-full object-contain ${
                        // Invert icons that don't show well in dark mode
                        mode === 'dark' && ['Express', 'Next.js', 'Flask'].includes(tech.name) 
                          ? 'invert' 
                          : ''
                      }`}
                    />
                  </div>
                  <span className={`text-[9px] sm:text-[10px] text-center font-medium ${
                    mode === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About