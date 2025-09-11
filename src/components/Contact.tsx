import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  MessageCircle,
  Sparkles,
  Facebook,
} from "lucide-react";

export default function Contact() {
  return (
    <>
      {/* CSS animations for SSR */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.3);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
            70% {
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes gradientShift {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          
          .animate-slide-in-up {
            animation: slideInUp 0.8s ease-out forwards;
          }
          
          .animate-slide-in-left {
            animation: slideInLeft 0.8s ease-out forwards;
          }
          
          .animate-slide-in-right {
            animation: slideInRight 0.8s ease-out forwards;
          }
          
          .animate-bounce-in {
            animation: bounceIn 0.6s ease-out forwards;
          }
          
          .animate-gradient-shift {
            background-size: 200% 200%;
            animation: gradientShift 3s ease infinite;
          }
          
          .delay-200 {
            animation-delay: 0.2s;
          }
          
          .delay-300 {
            animation-delay: 0.3s;
          }
          
          .hover-lift {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .hover-lift:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          }
          
          .hover-scale {
            transition: transform 0.3s ease;
          }
          
          .hover-scale:hover {
            transform: scale(1.05);
          }
          
          .hover-glow {
            transition: box-shadow 0.3s ease;
          }
          
          .hover-glow:hover {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
          }
        `,
        }}
      />

      <section id="contact" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-slide-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
                Contact
              </span>
              <Sparkles className="inline-block w-8 h-8 md:w-12 md:h-12 text-yellow-400 ml-4 animate-pulse" />
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Let&apos;s connect to discuss collaboration opportunities
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
                <div className="bg-slate-700/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20 hover-lift group animate-slide-in-left">
                  <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors">
                    Contact Information
                  </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center group/item">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4 group-hover/item:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white font-medium group-hover/item:text-purple-400 transition-colors">
                          nghiaphamtq17@gmail.com
                        </p>
                    </div>
                  </div>

                  <div className="flex items-center group/item">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4 group-hover/item:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                        <p className="text-white font-medium group-hover/item:text-blue-400 transition-colors">
                          +84 82 4144 695
                        </p>
                    </div>
                  </div>

                  <div className="flex items-center group/item">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4 group-hover/item:scale-110 transition-transform">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                        <p className="text-white font-medium group-hover/item:text-green-400 transition-colors">
                          Vietnam
                        </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
                <div className="bg-slate-700/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20 hover-lift animate-slide-in-left delay-200">
                <h3 className="text-2xl font-bold text-white mb-6">Social Media</h3>
                
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/nghiaphamtq17"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center hover:bg-purple-500 transition-all duration-300 hover-scale group"
                  >
                    <Github className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
                  </a>
                  
                  <a
                    href="https://linkedin.com/in/dainghia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover-scale group"
                  >
                    <Linkedin className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
                  </a>
                  
                  <a
                    href="https://www.facebook.com/nghiapham17/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover-scale group"
                  >
                    <Facebook className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
                  </a>
                  
                  <a
                    href="mailto:nghiaphamtq17@gmail.com"
                    className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center hover:bg-green-500 transition-all duration-300 hover-scale group"
                  >
                    <MessageCircle className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Availability */}
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-8 border border-green-500/30 hover-lift animate-slide-in-left delay-300">
                <h3 className="text-xl font-bold text-white mb-4">Status</h3>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-green-400 font-medium">
                      Looking for new opportunities
                    </span>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  Available for freelance and full-time projects
                </p>
              </div>
            </div>

              {/* Contact Form - Static version for SSR */}
              <div className="bg-slate-700/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20 hover-lift animate-slide-in-right">
              <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>
              
                <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-300 text-sm font-medium mb-2"
                      >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                        className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-300 text-sm font-medium mb-2"
                      >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                        className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                    <label
                      htmlFor="subject"
                      className="block text-gray-300 text-sm font-medium mb-2"
                    >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                      className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300"
                    placeholder="Enter subject"
                  />
                </div>

                <div>
                    <label
                      htmlFor="message"
                      className="block text-gray-300 text-sm font-medium mb-2"
                    >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                      className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300 resize-none"
                    placeholder="Enter your message"
                    ></textarea>
                </div>

                  <a
                    href="mailto:nghiaphamtq17@gmail.com?subject=Hello from Portfolio&body=Hi Nghia, I'd like to discuss..."
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 hover-glow relative overflow-hidden group"
                  >
                    <span className="relative z-10">Send Message</span>
                    <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
