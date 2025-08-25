import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://example.com'
  return [
    { url: base + '/', lastModified: new Date() },
    { url: base + '/quote', lastModified: new Date() },
    { url: base + '/area', lastModified: new Date() },
    { url: base + '/privacy', lastModified: new Date() },
    { url: base + '/terms', lastModified: new Date() },
  ]
}


