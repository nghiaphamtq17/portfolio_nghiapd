import {
  Calendar,
  MapPin,
  Building,
  ExternalLink,
  Star,
  Award,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function Experience() {
  const experiences = [
    {
      company: "Nexus Frontier Tech",
      position: "Fullstack Engineer",
      period: "Current",
      duration: "2025 - Now",
      location: "Cầu Giấy - Hà Nội",
      description:
        "As a Fullstack Web Developer, I design, develop, and maintain web applications using .NET for the backend and Angular for the frontend. My responsibilities include implementing APIs, handling database integration, ensuring application performance, and delivering responsive, user-friendly interfaces.",
      technologies: [".NET", "Angular", "TypeScript", "SQL Server", "RESTful API"],
      achievements: [
        "Implementing APIs and database integration",
        "Ensuring application performance optimization",
        "Delivering responsive, user-friendly interfaces",
        "Collaborating with cross-functional teams",
      ],
    },
    {
      company: "KBFina",
      position: "Software Engineer",
      period: "2 years",
      duration: "2023 - 2025",
      location: "Cầu Giấy - Hà Nội",
      description:
        "Worked as a frontend developer in the software development team. Developed and maintained e-commerce systems and collaborated with other developers to deliver high-quality code and solutions.",
      technologies: ["React.js", "Angular", "PrimeNG", "MySQL", "JavaScript"],
      achievements: [
        "Managing customer e-wallet information and transaction data",
        "Managing event streams and application tasks",
        "Building KB ILSANG version for Indonesian market",
        "Developing new features suitable for Indonesian market",
      ],
    },
    {
      company: "SmartOSC",
      position: "Software Engineer",
      period: "2 years",
      duration: "2021 - 2023",
      location: "Cầu Giấy - Hà Nội",
      description:
        "Worked as a frontend developer in the software development team. Developed and maintained e-commerce systems and collaborated with other developers to deliver high-quality code and solutions.",
      technologies: ["React.js", "Next.js", "GraphQL", "Node.js", "Express.js"],
      achievements: [
        "Successfully developed car e-commerce system using ReactJS, NextJS, GraphQL, and Contentful",
        "Contributed to e-commerce ecosystem for Thailand client using ReactJS and GraphQL",
        "Planned and developed new features and refactored code",
        "Working in Agile environment",
      ],
    },
  ];

  const projects = [
    {
      name: "Plevia City",
      url: "https://pleviacity.vn/",
      description: "Fullstack Developer - Optimize website SEO and convert pages from Client Side Rendering to Server Side Rendering",
      technologies: ["Next.js", "React.js", "SSR", "ISR", "SEO"],
    },
    {
      name: "Recoin",
      url: "https://recoin.vn/",
      description: "Fullstack Developer - Create project to introduce company specializing in selling electrical products",
      technologies: ["React.js", "TypeScript", "Product Management", "Article Management"],
    },
    {
      name: "Central Thailand",
      url: "https://www.central.co.th/",
      description: "Frontend Developer - Improved product interface and participated in upgrade process from version 1 to version 2",
      technologies: ["React.js", "Next.js", "GraphQL", "E-commerce"],
    },
    {
      name: "PowerBuy Thailand",
      url: "https://powerbuy.co.th/th/",
      description: "Frontend Developer - Improved product interface and user information management interfaces",
      technologies: ["React.js", "Node.js", "MongoDB", "E-commerce"],
    },
    {
      name: "Carma Australia",
      url: "https://carma.com.au/",
      description: "Frontend Developer - Build interfaces and connect content with Contentful, build filters with multiple fields",
      technologies: ["React.js", "Next.js", "GraphQL", "Contentful"],
    },
    {
      name: "KB Fina WebAdmin",
      url: null,
      description: "Frontend Developer - Manage customer e-wallet information, transaction information, and customer activities",
      technologies: ["React.js", "Angular", "PrimeNG", "MySQL"],
    },
    {
      name: "KB ILSANG",
      url: null,
      description: "Frontend Developer - Same as KBFina Web Admin but version for Indonesia market",
      technologies: ["React.js", "Angular", "PrimeNG", "MySQL"],
    },
    {
      name: "Motel Manager",
      url: null,
      description: "Fullstack Developer - Build logic flow to manage motel rooms and building costs",
      technologies: ["React.js", "Express.js", "MySQL", "Full-stack"],
    },
    {
      name: "TOPSS TOYOTA",
      url: null,
      description: "Fullstack Developer - Web-based management system for warehouses, storage yards, taxation, and distribution channels",
      technologies: [".NET", "Angular", "SQL Server", "Management System"],
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
          
          .delay-400 {
            animation-delay: 0.4s;
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
          
          .delay-1200 {
            animation-delay: 1.2s;
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
        `,
        }}
      />

      <section id="experience" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-slide-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
                  Work Experience
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                5+ years of development journey with diverse and exciting projects
              </p>
            </div>

            {/* Work Experience Timeline */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3 animate-fade-in delay-200">
                <Award className="w-8 h-8 text-yellow-400 animate-pulse" />
                Work History
              </h3>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="bg-slate-700/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover-lift group relative overflow-hidden animate-slide-in-up"
                    style={{ animationDelay: `${0.3 + index * 0.2}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative z-10">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                              {exp.position}
                            </h4>
                            {index === 0 && (
                              <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
                            )}
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

                      <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-white transition-colors">
                        {exp.description}
                      </p>

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
                            <li
                              key={achIndex}
                              className="flex items-start text-gray-300 group-hover:text-white transition-colors"
                            >
                              <span className="text-purple-400 mr-2 animate-pulse">
                                •
                              </span>
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
            <div className="animate-fade-in delay-500">
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
                      <Link href={project.url || ""} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors group/link"
                      >
                   
                        <ExternalLink className="w-5 h-5 group-hover/link:rotate-12 transition-transform duration-300" />
                      </Link>
                    </div>

                    <p className="text-gray-400 mb-4 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                      {project.description}
                    </p>

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
    </>
  );
}