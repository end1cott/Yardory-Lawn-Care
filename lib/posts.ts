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
  slug?: string
  published?: boolean
  readingTime?: string
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog')
const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles')

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

// Новые функции для статей
export async function getArticleSlugs() {
  await fs.mkdir(ARTICLES_DIR, { recursive: true })
  const files = await fs.readdir(ARTICLES_DIR)
  return files.filter(f => f.endsWith('.mdx')).map(f => f.replace(/\.mdx$/, ''))
}

export async function getArticleBySlug(slug: string) {
  const fullPath = path.join(ARTICLES_DIR, `${slug}.mdx`)
  try {
    const file = await fs.readFile(fullPath, 'utf8')
    const { content, data } = matter(file)
    return { slug, content, frontmatter: data as Frontmatter }
  } catch (error) {
    return null
  }
}

export async function getAllArticles() {
  const slugs = await getArticleSlugs()
  const articles = await Promise.all(slugs.map(getArticleBySlug))
  return articles.filter(Boolean).sort((a, b) => (a!.frontmatter.date > b!.frontmatter.date ? -1 : 1))
}

