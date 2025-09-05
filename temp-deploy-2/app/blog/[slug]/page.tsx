import { MDXRemote } from 'next-mdx-remote/rsc'
import gfm from 'remark-gfm'
import { getPostBySlug, getPostSlugs } from '@/src/lib/posts'
import { CTA } from '@/components/CTA'
import { Callout } from '@/components/Callout'
import { Toc } from '@/components/Toc'
import { ImageModal } from '@/components/ImageModal'
import { getBaseUrl } from '@/src/lib/seo'

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { frontmatter } = await getPostBySlug(slug)
  const base = getBaseUrl()
  const url = `${base}/blog/${slug}`
  
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.keywords || 'lawn care philadelphia, lawn care tips, philadelphia lawn service, professional lawn care',
    authors: [{ name: 'MowJet Lawn Care' }],
    category: 'Lawn Care',
    alternates: { canonical: frontmatter.canonical ?? url },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url,
      type: 'article',
      siteName: 'MowJet Lawn Care',
      images: frontmatter.cover ? [{ 
        url: frontmatter.cover,
        width: 1200,
        height: 630,
        alt: frontmatter.title
      }] : undefined,
      locale: 'en_US',
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.updated || frontmatter.date,
      section: 'Lawn Care',
      tags: frontmatter.tags || ['lawn care', 'philadelphia', 'professional service'],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.cover ? [frontmatter.cover] : undefined,
    },
    other: {
      'article:published_time': frontmatter.date,
      'article:modified_time': frontmatter.updated || frontmatter.date,
      'article:section': 'Lawn Care',
      'article:tag': (frontmatter.tags || ['lawn care', 'philadelphia']).join(', '),
    }
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { content, frontmatter } = await getPostBySlug(slug)
  const base = getBaseUrl()
  const url = `${base}/blog/${slug}`

  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updated ?? frontmatter.date,
    image: frontmatter.cover ? [frontmatter.cover] : undefined,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: {
      '@type': 'Organization',
      name: 'MowJet Lawn Care',
      url: base
    },
    publisher: {
      '@type': 'Organization',
      name: 'MowJet Lawn Care',
      logo: {
        '@type': 'ImageObject',
        url: `${base}/logo.svg`
      }
    },
    keywords: frontmatter.keywords,
    articleSection: 'Lawn Care',
    wordCount: content.split(' ').length,
  }

  const jsonLdFAQ = frontmatter.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: frontmatter.faq.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      }
    : null

  return (
    <article className="prose lg:prose-lg dark:prose-invert mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
        <p className="text-sm opacity-70">
          {new Date(frontmatter.date).toLocaleDateString('en-US', { dateStyle: 'long' })}
        </p>
      </header>

      <MDXRemote source={content} options={{ mdxOptions: { remarkPlugins: [gfm] } }} components={{ CTA, Callout, Toc, ImageModal }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }} />
      {jsonLdFAQ && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }} />
      )}
    </article>
  )
}
