'use client'

import { useEffect, useState, useRef } from 'react'
import { Calendar, MapPin, GraduationCap, Heart, Sparkles, Target, Zap, Users } from 'lucide-react'

export default function About() {
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
  return (
    <section ref={sectionRef} id="about" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
                About Me
              </span>
              <Sparkles className="inline-block w-8 h-8 md:w-12 md:h-12 text-blue-400 ml-4 animate-pulse" />
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A young, dynamic developer with a passion for technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Personal Info */}
            <div className="space-y-8">
              <div className={`bg-slate-700/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20 hover-lift group ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
                <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center group-hover:text-blue-400 transition-colors">
                  <Heart className="w-6 h-6 text-blue-400 mr-3 animate-pulse" />
                  Personal Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center text-slate-300 group-hover:text-slate-100 transition-colors">
                    <Calendar className="w-5 h-5 text-blue-400 mr-3 group-hover:scale-110 transition-transform" />
                    <span>Born: January 13, 2001</span>
                  </div>
                  
                  <div className="flex items-center text-slate-300 group-hover:text-slate-100 transition-colors">
                    <MapPin className="w-5 h-5 text-blue-400 mr-3 group-hover:scale-110 transition-transform" />
                    <span>Vietnam</span>
                  </div>
                  
                  <div className="flex items-center text-slate-300 group-hover:text-slate-100 transition-colors">
                    <GraduationCap className="w-5 h-5 text-blue-400 mr-3 group-hover:scale-110 transition-transform" />
                    <span>FPT Polytechnic College</span>
                  </div>
                </div>
              </div>

              <div className={`bg-slate-700/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20 hover-lift ${isVisible ? 'animate-slide-in-left delay-200' : 'opacity-0'}`}>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Target className="w-6 h-6 text-blue-400 mr-3 animate-pulse" />
                  Personality
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 hover-scale group">
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🎯</div>
                    <div className="text-sm text-gray-300 group-hover:text-white transition-colors">Goal-oriented</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 hover-scale group">
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🚀</div>
                    <div className="text-sm text-gray-300 group-hover:text-white transition-colors">Dynamic</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300 hover-scale group">
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💡</div>
                    <div className="text-sm text-gray-300 group-hover:text-white transition-colors">Creative</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg hover:from-yellow-500/30 hover:to-orange-500/30 transition-all duration-300 hover-scale group">
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🤝</div>
                    <div className="text-sm text-gray-300 group-hover:text-white transition-colors">Collaborative</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Story */}
            <div className="space-y-8">
              <div className={`bg-slate-700/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20 hover-lift group ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center group-hover:text-purple-400 transition-colors">
                  <Zap className="w-6 h-6 text-yellow-400 mr-3 animate-pulse" />
                  My Story
                </h3>
                <div className="space-y-4 text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                  <p className="group-hover:translate-x-2 transition-transform duration-300">
                    I started my programming journey in 2020 as a student at FPT Polytechnic. 
                    From the first lines of code, I was captivated by the ability to create amazing web applications.
                  </p>
                  <p className="group-hover:translate-x-2 transition-transform duration-300 delay-100">
                    With 4 years of experience in frontend development, I have had the opportunity to work with several 
                    large companies such as SmartOSC, KBFina, and currently Nexus Frontier Tech. Each project has provided 
                    me with valuable lessons and opportunities for self-development.
                  </p>
                  <p className="group-hover:translate-x-2 transition-transform duration-300 delay-200">
                    I believe that technology is not just a tool but also an art. Every line of code reflects 
                    the creativity and dedication of the writer.
                  </p>
                </div>
              </div>

              <div className={`bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-purple-500/30 hover-lift group ${isVisible ? 'animate-slide-in-right delay-300' : 'opacity-0'}`}>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center group-hover:text-purple-400 transition-colors">
                  <Users className="w-5 h-5 text-green-400 mr-3 animate-pulse" />
                  Goals
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                  To become a professional Senior Frontend Developer, contributing to building 
                  technology products that have a positive impact on people&apos;s lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
