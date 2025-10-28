import { Code, Database, Server, Palette } from "lucide-react";
import { SkillCategory, SkillCategoriesProps } from "@/types/skills";

// Icon mapping for dynamic icons
const iconMap = {
  Code: Code,
  Database: Database,
  Server: Server,
  Palette: Palette,
};

export default function Skills({ skillCategories }: SkillCategoriesProps) {
  // Fallback data if no data is provided
  const fallbackCategories: SkillCategory[] = [
    {
      id: "1",
      title: "Frontend Development",
      icon: "Code",
      color: "from-blue-500 to-indigo-600",
      slug: "frontend-development",
      skills: [
        {
          id: "1",
          name: "React.js",
          experience: "Expert",
          years: "3 years",
          projects: "15+ projects",
          description: "Building scalable web applications",
          category: "1",
        },
        {
          id: "2",
          name: "Next.js",
          experience: "Advanced",
          years: "3 years",
          projects: "12+ projects",
          description: "Full-stack React framework",
          category: "1",
        },
        {
          id: "3",
          name: "TypeScript",
          experience: "Advanced",
          years: "3 years",
          projects: "10+ projects",
          description: "Type-safe development",
          category: "1",
        },
        {
          id: "4",
          name: "Angular",
          experience: "Advanced",
          years: "2 years",
          projects: "5+ projects",
          description: "Enterprise applications with .NET backend",
          category: "1",
        },
        {
          id: "5",
          name: "HTML/CSS/JS",
          experience: "Expert",
          years: "4+ years",
          projects: "20+ projects",
          description: "Core web technologies",
          category: "1",
        },
        {
          id: "6",
          name: "GraphQL",
          experience: "Advanced",
          years: "2 years",
          projects: "8+ projects",
          description: "API query language",
          category: "1",
        },
      ],
    },
    {
      id: "2",
      title: "Backend Development",
      icon: "Server",
      color: "from-emerald-500 to-teal-600",
      slug: "backend-development",
      skills: [
        {
          id: "7",
          name: ".NET",
          experience: "Advanced",
          years: "1 year",
          projects: "3+ projects",
          description: "Microsoft ecosystem for backend services",
          category: "2",
        },
        {
          id: "8",
          name: "Node.js",
          experience: "Advanced",
          years: "2 years",
          projects: "8+ projects",
          description: "Server-side JavaScript",
          category: "2",
        },
        {
          id: "9",
          name: "Express.js",
          experience: "Advanced",
          years: "2 years",
          projects: "6+ projects",
          description: "Web application framework",
          category: "2",
        },
        {
          id: "10",
          name: "NestJS",
          experience: "Intermediate",
          years: "1 year",
          projects: "3+ projects",
          description: "Scalable server applications",
          category: "2",
        },
        {
          id: "11",
          name: "RESTful API",
          experience: "Advanced",
          years: "3 years",
          projects: "10+ projects",
          description: "API design and development",
          category: "2",
        },
        {
          id: "12",
          name: "Strapi",
          experience: "Intermediate",
          years: "1 year",
          projects: "3+ projects",
          description: "Headless CMS",
          category: "2",
        },
      ],
    },
    {
      id: "3",
      title: "Database & Storage",
      icon: "Database",
      color: "from-violet-500 to-purple-600",
      slug: "database-storage",
      skills: [
        {
          id: "11",
          name: "MySQL",
          experience: "Intermediate",
          years: "1 year",
          projects: "6+ projects",
          description: "Relational database management",
          category: "3",
        },
        {
          id: "12",
          name: "MongoDB",
          experience: "Intermediate",
          years: "8 months",
          projects: "4+ projects",
          description: "NoSQL document database",
          category: "3",
        },
        {
          id: "13",
          name: "PostgreSQL",
          experience: "Beginner",
          years: "6 months",
          projects: "2+ projects",
          description: "Advanced SQL database",
          category: "3",
        },
      ],
    },
    {
      id: "4",
      title: "UI/UX & Tools",
      icon: "Palette",
      color: "from-amber-500 to-orange-600",
      slug: "ui-ux-tools",
      skills: [
        {
          id: "14",
          name: "PrimeNG",
          experience: "Advanced",
          years: "2 years",
          projects: "8+ projects",
          description: "Angular UI component library",
          category: "4",
        },
        {
          id: "15",
          name: "Material-UI",
          experience: "Advanced",
          years: "1.5 years",
          projects: "6+ projects",
          description: "React component library",
          category: "4",
        },
        {
          id: "16",
          name: "Ant Design",
          experience: "Intermediate",
          years: "1 year",
          projects: "4+ projects",
          description: "Enterprise UI design",
          category: "4",
        },
        {
          id: "17",
          name: "Figma",
          experience: "Intermediate",
          years: "1 year",
          projects: "5+ projects",
          description: "UI/UX design tool",
          category: "4",
        },
        {
          id: "18",
          name: "Git",
          experience: "Advanced",
          years: "3 years",
          projects: "20+ projects",
          description: "Version control system",
          category: "4",
        },
      ],
    },
  ];

  // Use provided data or fallback
  const categories =
    skillCategories && skillCategories.length > 0
      ? skillCategories
      : fallbackCategories;

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
          
          .delay-1300 {
            animation-delay: 1.3s;
          }
          
          .delay-1400 {
            animation-delay: 1.4s;
          }
          
          .delay-1500 {
            animation-delay: 1.5s;
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
          
          .professional-card {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(51, 65, 85, 0.2) 100%);
            border: 1px solid rgba(148, 163, 184, 0.1);
            backdrop-filter: blur(10px);
          }
        `,
        }}
      />

      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-slide-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
                  Technical Skills
                </span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Technologies and tools I&apos;ve gained expertise in over the
                past 4+ years
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map((category, index) => {
                const IconComponent =
                  iconMap[category.icon as keyof typeof iconMap] || Code;

                return (
                  <div
                    key={category.id || index}
                    className={`professional-card rounded-2xl p-4 md:p-8 hover-lift group animate-slide-in-up`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex items-center mb-4 md:mb-6">
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white mr-3 md:mr-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                        {category.title}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {category.skills.map((skill, skillIndex) => {
                        const getExperienceColor = (experience: string) => {
                          switch (experience) {
                            case "Expert":
                              return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
                            case "Advanced":
                              return "text-blue-400 bg-blue-400/10 border-blue-400/20";
                            case "Intermediate":
                              return "text-amber-400 bg-amber-400/10 border-amber-400/20";
                            case "Beginner":
                              return "text-slate-400 bg-slate-400/10 border-slate-400/20";
                            default:
                              return "text-slate-400 bg-slate-400/10 border-slate-400/20";
                          }
                        };

                        const getExperienceIcon = (experience: string) => {
                          switch (experience) {
                            case "Expert":
                              return "⭐⭐⭐";
                            case "Advanced":
                              return "⭐⭐";
                            case "Intermediate":
                              return "⭐";
                            case "Beginner":
                              return "🌱";
                            default:
                              return "⭐";
                          }
                        };

                        return (
                          <div
                            key={skillIndex}
                            className="group/skill p-3 md:p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 hover:bg-slate-800/40"
                          >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="text-sm md:text-base text-slate-200 font-semibold group-hover/skill:text-white transition-colors">
                                    {skill.name}
                                  </h4>
                                  <span className="text-sm md:text-lg">
                                    {getExperienceIcon(skill.experience)}
                                  </span>
                                </div>
                                <p className="text-xs md:text-sm text-slate-400 mb-2">
                                  {skill.description}
                                </p>
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
                              <span
                                className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium border ${getExperienceColor(
                                  skill.experience
                                )} self-start md:self-auto`}
                              >
                                {skill.experience}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Skills */}
            <div
              className={`mt-8 md:mt-12 professional-card rounded-2xl p-4 md:p-8 hover-lift animate-fade-in delay-500`}
            >
              <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-4 md:mb-6 text-center">
                Additional Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  "Responsive Design",
                  "Performance Optimization",
                  "SEO",
                  "Testing (Jest, Cypress)",
                  "CI/CD",
                  "Docker",
                  "RESTful APIs",
                  "GraphQL",
                ].map((skill, index) => (
                  <div
                    key={index}
                    className="bg-slate-800/40 rounded-lg p-3 md:p-4 text-center hover:bg-slate-700/50 transition-all duration-300 hover-scale group animate-bounce-in border border-slate-700/30 hover:border-slate-600/50"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <span className="text-sm md:text-base text-slate-300 font-medium group-hover:text-slate-100 transition-colors">
                      {skill}
                    </span>
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
