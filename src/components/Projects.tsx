import { ExternalLink, Github, Eye, Star, Zap } from "lucide-react";

export default function Projects() {
  const featuredProjects = [
    {
      title: "Plevia City",
      description:
        "Fullstack Developer - Optimize website SEO by adding title tags, meta, content, images. Convert pages from Client Side Rendering to Server Side Rendering and Incremental Static Regeneration for better performance.",
      image: "/api/placeholder/600/400",
      technologies: [
        "Next.js",
        "React.js",
        "SSR",
        "ISR",
        "SEO Optimization",
      ],
      liveUrl: "https://pleviacity.vn/",
      githubUrl: null,
      features: [
        "SEO optimization with meta tags and content",
        "Client Side to Server Side Rendering conversion",
        "Incremental Static Regeneration implementation",
        "Performance optimization",
      ],
    },
    {
      title: "TOPSS TOYOTA Management System",
      description:
        "Fullstack Developer - Web-based management system for warehouses, storage yards, taxation, and distribution channels. Built with .NET for backend services and Angular for frontend, providing secure APIs, real-time data processing, and user-friendly dashboards.",
      image: "/api/placeholder/600/400",
      technologies: [
        ".NET",
        "Angular",
        "SQL Server",
        "RESTful API",
        "Management System",
      ],
      liveUrl: null,
      githubUrl: null,
      features: [
        "Warehouse and storage yard management",
        "Taxation and distribution channel tracking",
        "Real-time data processing",
        "Secure APIs and user-friendly dashboards",
      ],
    },
    {
      title: "Carma Australia",
      description:
        "Frontend Developer - Build interfaces and connect content with Contentful. Build filters with more than a dozen fields to query data with backend to get data. Successfully developed car e-commerce system as part of 10-member team.",
      image: "/api/placeholder/600/400",
      technologies: [
        "React.js",
        "Next.js",
        "GraphQL",
        "Contentful",
        "E-commerce",
      ],
      liveUrl: "https://carma.com.au/",
      githubUrl: null,
      features: [
        "Contentful CMS integration",
        "Advanced filtering system with multiple fields",
        "Car e-commerce functionality",
        "Team collaboration in 10-member team",
      ],
    },
  ];

  const otherProjects = [
    {
      title: "Recoin",
      description: "Fullstack Developer - Create project to introduce company specializing in selling electrical products. Product management, article management",
      technologies: ["React.js", "TypeScript", "Product Management", "Article Management"],
      liveUrl: "https://recoin.vn/",
    },
    {
      title: "Central Thailand",
      description: "Frontend Developer - Improved product interface and user information management interfaces. Participate in upgrade process from version 1 to version 2",
      technologies: ["React.js", "Next.js", "GraphQL", "E-commerce"],
      liveUrl: "https://www.central.co.th/",
    },
    {
      title: "PowerBuy Thailand",
      description: "Frontend Developer - Improved product interface and user information management interfaces",
      technologies: ["React.js", "Node.js", "MongoDB", "E-commerce"],
      liveUrl: "https://powerbuy.co.th/th/",
    },
    {
      title: "KB Fina WebAdmin",
      description: "Frontend Developer - Manage customer e-wallet information, transaction information, and customer activities. Manage event streams and application tasks",
      technologies: ["React.js", "Angular", "PrimeNG", "MySQL"],
      liveUrl: null,
    },
    {
      title: "KB ILSANG",
      description: "Frontend Developer - Same as KBFina Web Admin but version for Indonesia. Built from scratch and improved management sections. Build new features suitable for Indonesian market",
      technologies: ["React.js", "Angular", "PrimeNG", "MySQL"],
      liveUrl: null,
    },
    {
      title: "Motel Manager",
      description: "Fullstack Developer - Build logic flow to manage motel rooms and manage building costs. Build backend and frontend code base using ReactJs, ExpressJs and MySql",
      technologies: ["React.js", "Express.js", "MySQL", "Full-stack"],
      liveUrl: null,
    },
  ];

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
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
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
          
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
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
          
          .delay-500 {
            animation-delay: 0.5s;
          }
          
          .delay-600 {
            animation-delay: 0.6s;
          }
          
          .delay-700 {
            animation-delay: 0.7s;
          }
          
          .delay-800 {
            animation-delay: 0.8s;
          }
          
          .delay-900 {
            animation-delay: 0.9s;
          }
          
          .delay-1000 {
            animation-delay: 1.0s;
          }
          
          .delay-1100 {
            animation-delay: 1.1s;
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

      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-slide-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
                  Featured Projects
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                The projects I&apos;m most proud of over the past 5+ years
              </p>
            </div>

            {/* Featured Projects */}
            <div className="space-y-16 mb-20">
              {featuredProjects.map((project, index) => (
                <div
                  key={index}
                  className={`grid lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  } animate-slide-in-up`}
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <div className="bg-slate-800/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover-lift group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">
                            {project.title}
                          </h3>
                          <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
                        </div>

                        <p className="text-gray-300 mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            Key Features:
                          </h4>
                          <ul className="space-y-2">
                            {project.features.map((feature, featureIndex) => (
                              <li
                                key={featureIndex}
                                className="flex items-start text-gray-300 group-hover:text-white transition-colors"
                              >
                                <span className="text-purple-400 mr-2 animate-pulse">
                                  •
                                </span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-white mb-3">
                            Technologies:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-3 py-1 rounded-full text-sm hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 hover-scale"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-4">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover-glow relative overflow-hidden"
                            >
                              <span className="relative z-10">View Website</span>
                              <Eye className="w-5 h-5 relative z-10" />
                              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn flex items-center gap-2 border-2 border-purple-500 text-purple-400 px-6 py-3 rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300 hover-scale relative overflow-hidden"
                            >
                              <span className="relative z-10">Source Code</span>
                              <Github className="w-5 h-5 relative z-10" />
                              <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-500/30 hover-lift group">
                      <div className="aspect-video bg-slate-700/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                        <div className="text-center group-hover:scale-110 transition-transform duration-300">
                          <ExternalLink className="w-16 h-16 text-purple-400 mx-auto mb-4 group-hover:text-purple-300 transition-colors" />
                          <p className="text-gray-400 group-hover:text-white transition-colors">
                            Project Screenshot
                          </p>
                          <p className="text-sm text-gray-500 mt-2 group-hover:text-gray-400 transition-colors">
                            {project.title}
                          </p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Other Projects */}
            <div className="animate-fade-in delay-500">
              <h3 className="text-3xl font-bold text-white mb-12 text-center">
                Other Projects
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-slate-700/50 rounded-2xl p-6 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group hover-lift animate-bounce-in"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h4>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    </div>

                    <p className="text-gray-400 mb-4 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                      {project.description}
                    </p>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-slate-600/50 text-gray-300 px-2 py-1 rounded text-xs hover:bg-slate-500/50 hover:text-white transition-all duration-300 hover-scale"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm group/link"
                      >
                        <ExternalLink className="w-4 h-4 group-hover/link:rotate-12 transition-transform duration-300" />
                        View Website
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}