'use client'

import { useEffect, useState, useRef } from 'react'
import { Calendar, MapPin, Building, ExternalLink, Star, Award, TrendingUp } from 'lucide-react'

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])
  const experiences = [
    {
      company: 'Nexus Frontier Tech',
      position: 'Frontend Developer',
      period: 'Current',
      duration: 'Currently Working',
      location: 'Vietnam',
      description: 'Developing modern web applications with React.js and Next.js. Participating in large and complex projects.',
      technologies: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      achievements: [
        'Performance optimization for large applications',
        'Building reusable component library',
        'Mentoring junior developers'
      ]
    },
    {
      company: 'KBFina',
      position: 'Frontend Developer',
      period: '1.5 years',
      duration: '2022 - 2023',
      location: 'Vietnam',
      description: 'Developing financial and banking management systems. Working with enterprise projects.',
      technologies: ['React.js', 'Angular', 'PrimeNG', 'MySQL'],
      achievements: [
        'Building financial management dashboard',
        'Integrating with banking APIs',
        'Improving UX/UI for financial applications'
      ]
    },
    {
      company: 'SmartOSC',
      position: 'Frontend Developer',
      period: '1.5 years',
      duration: '2020 - 2022',
      location: 'Vietnam',
      description: 'Started programming career with e-commerce and web application projects.',
      technologies: ['React.js', 'HTML/CSS/JS', 'Node.js', 'Express.js'],
      achievements: [
        'Developing e-commerce websites',
        'Learning and applying best practices',
        'Working in Agile environment'
      ]
    }
  ]

  const projects = [
    {
      name: 'Plevia City',
      url: 'https://pleviacity.vn/',
      description: 'Premium real estate website with modern interface',
      technologies: ['Next.js', 'React.js', 'Tailwind CSS']
    },
    {
      name: 'Recoin',
      url: 'https://recoin.vn/',
      description: 'Cryptocurrency trading platform',
      technologies: ['React.js', 'TypeScript', 'Web3']
    },
    {
      name: 'Central Thailand',
      url: 'https://www.central.co.th/',
      description: 'Leading e-commerce website in Thailand',
      technologies: ['React.js', 'Next.js', 'Microservices']
    },
    {
      name: 'PowerBuy Thailand',
      url: 'https://powerbuy.co.th/th/',
      description: 'Electronics and technology retail website',
      technologies: ['React.js', 'Node.js', 'MongoDB']
    },
    {
      name: 'Carma Australia',
      url: 'https://carma.com.au/',
      description: 'Car sharing platform',
      technologies: ['React.js', 'Express.js', 'PostgreSQL']
    },
    {
      name: 'Omini Vietnam',
      url: 'https://omini.vn/',
      description: 'Service and utility website',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS']
    }
  ]

  return (
    <section ref={sectionRef} id="experience" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
                Work Experience
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              4 years of development journey with diverse and exciting projects
            </p>
          </div>

          {/* Work Experience Timeline */}
          <div className="mb-20">
            <h3 className={`text-3xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3 ${isVisible ? 'animate-fade-in delay-200' : 'opacity-0'}`}>
              <Award className="w-8 h-8 text-yellow-400 animate-pulse" />
              Work History
            </h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`bg-slate-700/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover-lift group relative overflow-hidden ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.3 + index * 0.2}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{exp.position}</h4>
                          {index === 0 && <Star className="w-5 h-5 text-yellow-400 animate-pulse" />}
                        </div>
                        <div className="flex items-center text-purple-400 mb-2">
                          <Building className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                          <span className="font-semibold">{exp.company}</span>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                          <span>{exp.duration}</span>
                          <span className="mx-2">•</span>
                          <MapPin className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold group-hover:scale-105 transition-transform">
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-white transition-colors">{exp.description}</p>

                    <div className="mb-6">
                      <h5 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        Technologies Used:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-slate-600/50 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-slate-500/50 hover:text-white transition-all duration-300 hover-scale"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        Key Achievements:
                      </h5>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start text-gray-300 group-hover:text-white transition-colors">
                            <span className="text-purple-400 mr-2 animate-pulse">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className={isVisible ? 'animate-fade-in delay-500' : 'opacity-0'}>
            <h3 className="text-3xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3">
              <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
              Participated Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-slate-700/50 rounded-2xl p-6 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group hover-lift animate-bounce-in"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                      {project.name}
                    </h4>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors group/link"
                    >
                      <ExternalLink className="w-5 h-5 group-hover/link:rotate-12 transition-transform duration-300" />
                    </a>
                  </div>
                  
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-2 py-1 rounded text-xs hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 hover-scale"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
