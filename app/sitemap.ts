import { MetadataRoute } from 'next'
import { getAllPosts } from '@/src/lib/posts'
import { getBaseUrl } from '@/src/lib/seo'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl()
  const posts = await getAllPosts()
  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1.0, lastModified: new Date() },
    { url: `${base}/quote`, changeFrequency: 'monthly', priority: 0.9, lastModified: new Date() },
    { url: `${base}/services`, changeFrequency: 'monthly', priority: 0.8, lastModified: new Date() },
    { url: `${base}/pricing`, changeFrequency: 'monthly', priority: 0.8, lastModified: new Date() },
    { url: `${base}/how-it-works`, changeFrequency: 'monthly', priority: 0.7, lastModified: new Date() },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.7, lastModified: new Date() },
    { url: `${base}/gallery`, changeFrequency: 'monthly', priority: 0.6, lastModified: new Date() },
    { url: `${base}/reviews`, changeFrequency: 'weekly', priority: 0.7, lastModified: new Date() },
    { url: `${base}/area`, changeFrequency: 'monthly', priority: 0.7, lastModified: new Date() },
    { url: `${base}/faq`, changeFrequency: 'monthly', priority: 0.6, lastModified: new Date() },
    { url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.8, lastModified: new Date() },
    { url: `${base}/contact`, changeFrequency: 'monthly', priority: 0.6, lastModified: new Date() },
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3, lastModified: new Date() },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.3, lastModified: new Date() },
  ]
  const blog = posts.map(p => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.frontmatter.updated ?? p.frontmatter.date,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  return [...routes, ...blog]
}


