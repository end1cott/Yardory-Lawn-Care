import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticleBySlug } from '@/lib/posts'
import { JsonLd } from '@/components/JsonLd'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Callout } from '@/components/Callout'
import { Toc } from '@/components/Toc'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getArticleBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.'
    }
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updated,
      images: [
        {
          url: post.frontmatter.cover || '/og.jpg',
          width: 1200,
          height: 630,
          alt: post.frontmatter.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [post.frontmatter.cover || '/og.jpg']
    }
  }
}

export default async function BlogPost({ params }: PageProps) {
  const post = await getArticleBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">
          {post.frontmatter.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <time dateTime={post.frontmatter.date}>
            {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          {post.frontmatter.readingTime && (
            <span>{post.frontmatter.readingTime} read</span>
          )}
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <MDXRemote 
          source={post.content} 
          components={{
            Callout,
            Toc
          }}
        />
      </div>

      <footer className="mt-12 border-t pt-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Need professional help?
          </h2>
          <p className="text-gray-600 mb-6">
            We can handle overseeding/aeration, set up irrigation schedules, and build a fertilizer plan matched to your soil test.
          </p>
          <a
            href="/quote"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
          >
            Get a free estimate
          </a>
        </div>
      </footer>

      {/* JSON-LD для SEO */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.frontmatter.title,
          description: post.frontmatter.description,
          image: post.frontmatter.cover,
          datePublished: post.frontmatter.date,
          dateModified: post.frontmatter.updated,
          author: {
            '@type': 'Organization',
            name: 'Yardory Lawn Care'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Yardory Lawn Care',
            logo: {
              '@type': 'ImageObject',
              url: '/logo.svg'
            }
          }
        }}
      />
    </article>
  )
}
