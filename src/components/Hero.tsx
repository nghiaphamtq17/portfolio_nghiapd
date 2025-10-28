import { Code, Coffee, Rocket, Sparkles, Star, Download } from 'lucide-react'

export default function Hero() {
  // SSR: Không dùng useState/useEffect để lấy giá trị phía server
  // Hiển thị luôn nội dung đầy đủ, không animation typing hoặc hiệu ứng vào
  const fullText = "Fullstack Developer with 4+ years of experience"
  const isVisible = true

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-500/20 rounded-full animate-float delay-300"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-blue-500/20 rounded-full animate-float-slow delay-500"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-cyan-500/20 rounded-full animate-float delay-700"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-200"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-400"></div>
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-600"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Avatar with enhanced animation */}
          <div className={`w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-4xl font-bold text-white shadow-2xl relative group ${isVisible ? 'animate-bounce-in' : 'opacity-0'}`}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 animate-pulse-glow"></div>
            <div className="relative z-10">PDN</div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center animate-wiggle">
              <Star className="w-4 h-4 text-slate-900" />
            </div>
          </div>
          
          {/* Main heading with gradient animation */}
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
              Nghia Pham Dai
            </span>
            <Sparkles className="inline-block w-8 h-8 md:w-12 md:h-12 text-blue-400 ml-4 animate-pulse" />
          </h1>
          
          {/* Subtitle không typing animation, show luôn */}
          <div className="h-8 md:h-10 mb-8 flex items-center justify-center">
            <p className="text-xl md:text-2xl text-gray-300 font-light">
              {fullText}
              <span className="animate-pulse">|</span>
            </p>
          </div>
          
          {/* Description with fade in */}
          <p className={`text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed ${isVisible ? 'animate-fade-in delay-300' : 'opacity-0'}`}>
            Fullstack Developer specializing in React.js, Next.js, .NET, and Angular with a passion for creating exceptional web experiences. 
            Always seeking new challenges and continuously learning.
          </p>
          
          {/* Feature Icons with staggered animation */}
          <div className={`flex justify-center space-x-12 mb-12 ${isVisible ? 'animate-slide-in-up delay-500' : 'opacity-0'}`}>
            <div className="flex flex-col items-center group animate-bounce-in delay-600">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-300 hover-glow relative">
                <Code className="w-8 h-8 text-white" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <span className="text-sm text-gray-400 group-hover:text-blue-400 transition-colors">Clean Code</span>
            </div>
            
            <div className="flex flex-col items-center group animate-bounce-in delay-700">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-300 hover-glow relative">
                <Rocket className="w-8 h-8 text-white" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <span className="text-sm text-gray-400 group-hover:text-indigo-400 transition-colors">Performance</span>
            </div>
            
            <div className="flex flex-col items-center group animate-bounce-in delay-800">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-300 hover-glow relative">
                <Coffee className="w-8 h-8 text-white" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <span className="text-sm text-gray-400 group-hover:text-emerald-400 transition-colors">Innovation</span>
            </div>
          </div>
          
          {/* CTA Buttons with enhanced effects */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isVisible ? 'animate-slide-in-up delay-900' : 'opacity-0'}`}>
            <a
              href="#projects"
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover-lift relative overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href="/cv/Pham-Dai-Nghia-CV.pdf"
              download="Pham-Dai-Nghia-CV.pdf"
              className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover-lift relative overflow-hidden flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Download className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Download CV</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href="#contact"
              className="group px-8 py-4 border-2 border-blue-500 text-blue-400 font-semibold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105 hover-lift relative overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
