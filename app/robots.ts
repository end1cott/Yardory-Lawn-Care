import type { MetadataRoute } from 'next'
import { getBaseUrl } from '@/src/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl()
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}


