import type { MetadataRoute } from 'next'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // Only include canonical paths in sitemap (anchors are not valid entries)
  const canonicalRoutes = ['']

  const entries: MetadataRoute.Sitemap = canonicalRoutes.map((path) => ({
    url: `${siteUrl}/${path}`.replace(/\/$\//, '/'),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }))

  return entries
}


