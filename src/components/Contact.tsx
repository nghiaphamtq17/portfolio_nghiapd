'use client'

import { useState, useEffect, useRef } from 'react'
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageCircle, CheckCircle, AlertCircle, Sparkles, Facebook } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<{[key: string]: string}>({})
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

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a subject'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setErrors({})
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
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
              <div className={`bg-slate-700/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20 hover-lift group ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
                <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center group/item">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4 group-hover/item:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-medium group-hover/item:text-purple-400 transition-colors">nghiaphamtq17@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center group/item">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4 group-hover/item:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white font-medium group-hover/item:text-blue-400 transition-colors">+84 82 4144 695</p>
                    </div>
                  </div>

                  <div className="flex items-center group/item">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4 group-hover/item:scale-110 transition-transform">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white font-medium group-hover/item:text-green-400 transition-colors">Vietnam</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className={`bg-slate-700/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20 hover-lift ${isVisible ? 'animate-slide-in-left delay-200' : 'opacity-0'}`}>
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
              <div className={`bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-8 border border-green-500/30 hover-lift ${isVisible ? 'animate-slide-in-left delay-300' : 'opacity-0'}`}>
                <h3 className="text-xl font-bold text-white mb-4">Status</h3>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-green-400 font-medium">Looking for new opportunities</span>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  Available for freelance and full-time projects
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`bg-slate-700/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20 hover-lift ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3 animate-bounce-in">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400">Message sent successfully!</span>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-3 animate-bounce-in">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400">An error occurred. Please try again!</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-slate-600/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-300 ${
                        errors.name 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-slate-500 focus:border-purple-500 focus:ring-purple-500'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1 animate-slide-in-up">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-slate-600/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-300 ${
                        errors.email 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-slate-500 focus:border-purple-500 focus:ring-purple-500'
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 animate-slide-in-up">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gray-300 text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-slate-600/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-300 ${
                      errors.subject 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                        : 'border-slate-500 focus:border-purple-500 focus:ring-purple-500'
                    }`}
                    placeholder="Enter subject"
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-1 animate-slide-in-up">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 bg-slate-600/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-300 resize-none ${
                      errors.message 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                        : 'border-slate-500 focus:border-purple-500 focus:ring-purple-500'
                    }`}
                    placeholder="Enter your message"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1 animate-slide-in-up">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover-glow relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10"></div>
                  ) : (
                    <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  )}
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
