# API Configuration for Payload CMS

## Overview
This configuration provides a centralized way to fetch data from Payload CMS with proper error handling, caching, and fallbacks.

## Files Structure

### `src/lib/api.ts`
Main API utility with generic functions for fetching data from Payload CMS.

### `src/config/endpoints.ts`
Centralized configuration for all API endpoints.

### `src/types/index.ts`
TypeScript types for all data structures.

## Usage

### 1. Fetch Single Endpoint
```typescript
import { fetchFromPayload } from '@/lib/api';
import { ENDPOINTS } from '@/config/endpoints';

// Fetch skills data
const skills = await fetchFromPayload(ENDPOINTS.SKILL_CATEGORIES);

// Fetch with custom options
const projects = await fetchFromPayload(ENDPOINTS.PROJECTS, {
  revalidate: 7200, // 2 hours cache
  cache: 'no-store' // No cache
});
```

### 2. Fetch Multiple Endpoints
```typescript
import { fetchMultipleFromPayload } from '@/lib/api';
import { ENDPOINTS } from '@/config/endpoints';

const data = await fetchMultipleFromPayload([
  { key: 'skills', endpoint: ENDPOINTS.SKILL_CATEGORIES },
  { key: 'projects', endpoint: ENDPOINTS.PROJECTS },
  { key: 'experiences', endpoint: ENDPOINTS.EXPERIENCES },
]);
```

### 3. Using Specific Functions
```typescript
import { fetchSkills, fetchProjects } from '@/lib/api';

const skills = await fetchSkills();
const projects = await fetchProjects();
```

## Configuration

### Environment Variables
```env
# Production CMS URL
PAYLOAD_CMS_URL=https://your-cms-domain.com

# Development (defaults to localhost:3000)
# No additional config needed
```

### Endpoints Configuration
Add new endpoints in `src/config/endpoints.ts`:
```typescript
export const ENDPOINTS = {
  // ... existing endpoints
  NEW_ENDPOINT: 'new-endpoint',
} as const;
```

## Error Handling
- All functions return empty arrays `[]` on error
- Errors are logged to console
- Fallback data is provided in components
- Graceful degradation in all scenarios

## Caching
- Default cache: 1 hour (3600 seconds)
- Configurable per request
- Uses Next.js `revalidate` for ISR
- Proper cache headers for production

## Type Safety
- Full TypeScript support
- Generic types for flexibility
- Proper interface definitions
- Type-safe endpoint configuration
