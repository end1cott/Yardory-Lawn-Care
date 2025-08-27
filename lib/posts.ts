import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

export type FAQ = { q: string; a: string }
export type Frontmatter = {
  title: string
  description?: string
  date: string
  updated?: string
  cover?: string
  tags?: string[]
  keywords?: string
  canonical?: string
  faq?: FAQ[]
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog')

export async function getPostSlugs() {
  await fs.mkdir(POSTS_DIR, { recursive: true })
  const files = await fs.readdir(POSTS_DIR)
  return files.filter(f => f.endsWith('.mdx')).map(f => f.replace(/\.mdx$/, ''))
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`)
  const file = await fs.readFile(fullPath, 'utf8')
  const { content, data } = matter(file)
  return { slug, content, frontmatter: data as Frontmatter }
}

export async function getAllPosts() {
  const slugs = await getPostSlugs()
  const posts = await Promise.all(slugs.map(getPostBySlug))
  return posts.sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1))
}

