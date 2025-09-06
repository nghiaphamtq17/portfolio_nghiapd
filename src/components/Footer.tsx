import { Heart, Github, Linkedin, Mail, Facebook } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 border-t border-slate-800/50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4">Phạm Đại Nghĩa</h3>
              <p className="text-gray-400 leading-relaxed">
                Frontend Developer with 4 years of experience, passionate about creating amazing web experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-400 hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#skills" className="text-gray-400 hover:text-blue-400 transition-colors">Skills</a></li>
                <li><a href="#experience" className="text-gray-400 hover:text-blue-400 transition-colors">Experience</a></li>
                <li><a href="#projects" className="text-gray-400 hover:text-blue-400 transition-colors">Projects</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 nghiaphamtq17@gmail.com</p>
                <p>📱 +84 82 4144 695 </p>
                <p>📍 Vietnam</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://github.com/nghiaphamtq17"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
            >
              <Github className="w-5 h-5 text-white" />
            </a>
            
            <a
              href="https://linkedin.com/in/dainghia"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </a>
            
            <a
              href="https://www.facebook.com/nghiapham17/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
            
            <a
              href="mailto:nghiaphamtq17@gmail.com"
              className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors duration-300"
            >
              <Mail className="w-5 h-5 text-white" />
            </a>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-gray-400 flex items-center justify-center gap-2">
              © {currentYear} Phạm Đại Nghĩa. Made with 
              <Heart className="w-4 h-4 text-red-500" />
              in Vietnam
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
