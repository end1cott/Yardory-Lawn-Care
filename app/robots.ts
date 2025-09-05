import type { MetadataRoute } from 'next'
import { getBaseUrl } from '@/src/lib/seo'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl()
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
      { userAgent: '*', disallow: '/_next/' },
      { userAgent: '*', disallow: '/admin/' },
      { userAgent: '*', disallow: '/private/' },
      { userAgent: '*', allow: '/blog/' },
      { userAgent: '*', allow: '/quote' },
      { userAgent: '*', allow: '/area' },
      { userAgent: '*', allow: '/services' },
      { userAgent: '*', allow: '/pricing' },
      { userAgent: '*', allow: '/reviews' },
      { userAgent: '*', allow: '/faq' },
      { userAgent: '*', allow: '/contact' },
      { userAgent: '*', allow: '/about' },
      { userAgent: '*', allow: '/how-it-works' },
      { userAgent: '*', allow: '/gallery' },
      { userAgent: '*', allow: '/privacy' },
      { userAgent: '*', allow: '/terms' },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base || 'https://mowjet.com',
  }
}


