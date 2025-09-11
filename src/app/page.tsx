import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  SkillCategory, 
  Project, 
  Experience as ExperienceType, 
  About as AboutType, 
  Contact as ContactType 
} from "@/types";
import { fetchMultipleFromPayload } from "@/lib/api";
import { ENDPOINTS } from "@/config/endpoints";

// Define the data structure for all components
interface HomePageData {
  skillCategories: SkillCategory[];
  projects: Project[];
  experiences: ExperienceType[];
  about: AboutType[];
  contact: ContactType[];
}

export default async function Home() {
  // Fetch all data from Payload CMS in parallel using config endpoints
  const data = await fetchMultipleFromPayload<HomePageData>([
    { key: 'skillCategories', endpoint: ENDPOINTS.SKILL_CATEGORIES },
    // { key: 'projects', endpoint: ENDPOINTS.PROJECTS },
    // { key: 'experiences', endpoint: ENDPOINTS.EXPERIENCES },
    // { key: 'about', endpoint: ENDPOINTS.ABOUT },
    // { key: 'contact', endpoint: ENDPOINTS.CONTACT },
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <Hero />
      <About />
      <Skills skillCategories={data.skillCategories} />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
