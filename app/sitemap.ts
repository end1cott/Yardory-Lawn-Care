import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { getBaseUrl } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl()
  const posts = await getAllPosts()
  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/quote`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/area`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ]
  const blog = posts.map(p => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.frontmatter.updated ?? p.frontmatter.date,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  return [...routes, ...blog]
}


