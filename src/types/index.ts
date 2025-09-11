// Re-export all types from individual files
export * from './skills';

// Common types for all components
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  category?: string;
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
}

export interface ProjectCategory {
  id: string;
  title: string;
  slug: string;
  description?: string;
}

// Experience types
export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location: string;
  technologies: string[];
  achievements: string[];
  companyLogo?: string;
  companyUrl?: string;
}

// About types
export interface About {
  id: string;
  title: string;
  content: string;
  image?: string;
  resumeUrl?: string;
  personalInfo: {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    website?: string;
  };
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

// Contact types
export interface Contact {
  id: string;
  title: string;
  content: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    message: string;
  };
}

// Component props types
export interface AboutProps {
  aboutData?: About[];
}

export interface ProjectsProps {
  projects?: Project[];
}

export interface ExperienceProps {
  experiences?: Experience[];
}

export interface ContactProps {
  contactData?: Contact[];
}
