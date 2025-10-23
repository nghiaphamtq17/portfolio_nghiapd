export interface Skill {
  id: string
  name: string
  experience: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  years: string
  projects: string
  description: string
  category: string | { id: string; title: string }
}

export interface SkillCategory {
  id: string
  title: string
  icon: string
  color: string
  slug: string
  skills: Skill[]
}

export interface PayloadSkillsResponse {
  docs: SkillCategory[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export interface SkillCategoriesProps {
  skillCategories?: SkillCategory[]
}
