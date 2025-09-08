'use client'

import { useEffect, useState, useRef } from 'react'
import { Code, Database, Server, Palette } from 'lucide-react'

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Code className="w-8 h-8" />,
      color: 'from-blue-500 to-indigo-600',
      skills: [
        { name: 'React.js', experience: 'Expert', years: '4 years', projects: '15+ projects', description: 'Building scalable web applications' },
        { name: 'Next.js', experience: 'Advanced', years: '3.5 years', projects: '12+ projects', description: 'Full-stack React framework' },
        { name: 'TypeScript', experience: 'Advanced', years: '3 years', projects: '10+ projects', description: 'Type-safe development' },
        { name: 'Tailwind CSS', experience: 'Advanced', years: '2.5 years', projects: '8+ projects', description: 'Utility-first CSS framework' },
        { name: 'HTML/CSS/JS', experience: 'Expert', years: '4 years', projects: '20+ projects', description: 'Core web technologies' },
        { name: 'Angular', experience: 'Intermediate', years: '1 year', projects: '3+ projects', description: 'Enterprise applications' },
      ]
    },
    {
      title: 'Backend Development',
      icon: <Server className="w-8 h-8" />,
      color: 'from-emerald-500 to-teal-600',
      skills: [
        { name: 'Node.js', experience: 'Intermediate', years: '1 year', projects: '5+ projects', description: 'Server-side JavaScript' },
        { name: 'Express.js', experience: 'Intermediate', years: '1 year', projects: '4+ projects', description: 'Web application framework' },
        { name: 'NestJS', experience: 'Intermediate', years: '1 year', projects: '3+ projects', description: 'Scalable server applications' },
        { name: '.NET', experience: 'Beginner', years: '6 months', projects: '2+ projects', description: 'Microsoft ecosystem' },
      ]
    },
    {
      title: 'Database & Storage',
      icon: <Database className="w-8 h-8" />,
      color: 'from-violet-500 to-purple-600',
      skills: [
        { name: 'MySQL', experience: 'Intermediate', years: '1 year', projects: '6+ projects', description: 'Relational database management' },
        { name: 'MongoDB', experience: 'Intermediate', years: '8 months', projects: '4+ projects', description: 'NoSQL document database' },
        { name: 'PostgreSQL', experience: 'Beginner', years: '6 months', projects: '2+ projects', description: 'Advanced SQL database' },
      ]
    },
    {
      title: 'UI/UX & Tools',
      icon: <Palette className="w-8 h-8" />,
      color: 'from-amber-500 to-orange-600',
      skills: [
        { name: 'PrimeNG', experience: 'Advanced', years: '2 years', projects: '8+ projects', description: 'Angular UI component library' },
        { name: 'Material-UI', experience: 'Advanced', years: '1.5 years', projects: '6+ projects', description: 'React component library' },
        { name: 'Ant Design', experience: 'Intermediate', years: '1 year', projects: '4+ projects', description: 'Enterprise UI design' },
        { name: 'Figma', experience: 'Intermediate', years: '1 year', projects: '5+ projects', description: 'UI/UX design tool' },
        { name: 'Git', experience: 'Advanced', years: '3 years', projects: '20+ projects', description: 'Version control system' },
      ]
    }
  ]

  return (
    <section ref={sectionRef} id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 ${isVisible ? 'animate-slide-in-up' : 'opacity-100 md:opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
                Technical Skills
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Technologies and tools I&apos;ve gained expertise in over the past 4 years
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className={`professional-card rounded-2xl p-4 md:p-8 hover-lift group ${isVisible ? 'animate-slide-in-up' : 'opacity-100 md:opacity-0'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4 md:mb-6">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white mr-3 md:mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">{category.title}</h3>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => {
                    const getExperienceColor = (experience: string) => {
                      switch (experience) {
                        case 'Expert': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
                        case 'Advanced': return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
                        case 'Intermediate': return 'text-amber-400 bg-amber-400/10 border-amber-400/20'
                        case 'Beginner': return 'text-slate-400 bg-slate-400/10 border-slate-400/20'
                        default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20'
                      }
                    }
                    
                    const getExperienceIcon = (experience: string) => {
                      switch (experience) {
                        case 'Expert': return '⭐⭐⭐'
                        case 'Advanced': return '⭐⭐'
                        case 'Intermediate': return '⭐'
                        case 'Beginner': return '🌱'
                        default: return '⭐'
                      }
                    }
                    
                    return (
                      <div key={skillIndex} className="group/skill p-3 md:p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 hover:bg-slate-800/40">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm md:text-base text-slate-200 font-semibold group-hover/skill:text-white transition-colors">{skill.name}</h4>
                              <span className="text-sm md:text-lg">{getExperienceIcon(skill.experience)}</span>
                            </div>
                            <p className="text-xs md:text-sm text-slate-400 mb-2">{skill.description}</p>
                            <div className="flex items-center gap-3 md:gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full"></span>
                                {skill.years}
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-indigo-400 rounded-full"></span>
                                {skill.projects}
                              </span>
                            </div>
                          </div>
                          <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium border ${getExperienceColor(skill.experience)} self-start md:self-auto`}>
                            {skill.experience}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Skills */}
          <div className={`mt-8 md:mt-12 professional-card rounded-2xl p-4 md:p-8 hover-lift ${isVisible ? 'animate-fade-in delay-500' : 'opacity-100 md:opacity-0'}`}>
            <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-4 md:mb-6 text-center">Additional Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                'Responsive Design',
                'Performance Optimization',
                'SEO',
                'Testing (Jest, Cypress)',
                'CI/CD',
                'Docker',
                'RESTful APIs',
                'GraphQL'
              ].map((skill, index) => (
                <div
                  key={index}
                  className="bg-slate-800/40 rounded-lg p-3 md:p-4 text-center hover:bg-slate-700/50 transition-all duration-300 hover-scale group animate-bounce-in border border-slate-700/30 hover:border-slate-600/50"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <span className="text-sm md:text-base text-slate-300 font-medium group-hover:text-slate-100 transition-colors">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
