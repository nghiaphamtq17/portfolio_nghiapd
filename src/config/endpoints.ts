/**
 * Configuration for all Payload CMS endpoints
 */

export const ENDPOINTS = {
  // Skills
  SKILL_CATEGORIES: 'skills/formatted',
  
  // Projects
  PROJECTS: 'projects',
  PROJECT_CATEGORIES: 'project-categories',
  
  // Experience
  EXPERIENCES: 'experiences',
  
  // About
  ABOUT: 'about',
  
  // Contact
  CONTACT: 'contact',
  
  // Blog (if needed)
  BLOG_POSTS: 'blog-posts',
  BLOG_CATEGORIES: 'blog-categories',
  
  // Media
  MEDIA: 'media',
  
  // Users
  USERS: 'users',
} as const;

export type EndpointKey = keyof typeof ENDPOINTS;
export type EndpointValue = typeof ENDPOINTS[EndpointKey];

/**
 * Get endpoint by key
 */
export function getEndpoint(key: EndpointKey): EndpointValue {
  return ENDPOINTS[key];
}

/**
 * Get all endpoints as array
 */
export function getAllEndpoints(): EndpointValue[] {
  return Object.values(ENDPOINTS);
}

/**
 * Check if endpoint exists
 */
export function isValidEndpoint(endpoint: string): endpoint is EndpointValue {
  return Object.values(ENDPOINTS).includes(endpoint as EndpointValue);
}
