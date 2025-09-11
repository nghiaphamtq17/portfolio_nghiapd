/**
 * Generic API fetch utility for Payload CMS
 */

export interface ApiResponse<T> {
  docs: T[]
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

export interface FetchOptions {
  revalidate?: number
  cache?: RequestCache
  headers?: Record<string, string>
}

/**
 * Generic function to fetch data from Payload CMS
 * @param endpoint - The API endpoint (e.g., 'skill-categories', 'projects', 'experiences')
 * @param options - Fetch options for caching and headers
 * @returns Promise with the fetched data
 */
export async function fetchFromPayload<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T[]> {
  const {
    revalidate = 3600, // Default 1 hour cache
    cache = 'force-cache',
    headers = {}
  } = options;

  try {
    // Determine base URL based on environment
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.PAYLOAD_CMS_URL || process.env.PAYLOAD_CMS_URL
      : 'http://localhost:3000';
    
    const url = `${baseUrl}/api/${endpoint}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      cache,
      next: { revalidate }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<T> = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error(`Error fetching ${endpoint} from Payload CMS:`, error);
    return [];
  }
}

/**
 * Fetch multiple endpoints in parallel
 * @param endpoints - Array of endpoint configurations
 * @returns Promise with all fetched data
 */
export async function fetchMultipleFromPayload<T extends Record<string, any>>(
  endpoints: Array<{ key: keyof T; endpoint: string; options?: FetchOptions }>
): Promise<T> {
  const promises = endpoints.map(({ key, endpoint, options }) =>
    fetchFromPayload(endpoint, options).then(data => ({ key, data }))
  );

  const results = await Promise.all(promises);
  
  return results.reduce((acc, { key, data }) => {
    (acc as Record<string, unknown>)[key as string] = data;
    return acc;
  }, {} as T);
}

/**
 * Specific function for fetching skills data
 */
export async function fetchSkills() {
  return fetchFromPayload('skill-categories');
}

/**
 * Specific function for fetching projects data
 */
export async function fetchProjects() {
  return fetchFromPayload('projects');
}

/**
 * Specific function for fetching experiences data
 */
export async function fetchExperiences() {
  return fetchFromPayload('experiences');
}

/**
 * Specific function for fetching about data
 */
export async function fetchAbout() {
  return fetchFromPayload('about');
}

/**
 * Specific function for fetching contact data
 */
export async function fetchContact() {
  return fetchFromPayload('contact');
}
