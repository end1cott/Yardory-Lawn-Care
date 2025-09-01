import Link from 'next/link'
import { getAllPosts } from '@/src/lib/posts'

export default async function Blog() {
  const posts = await getAllPosts()
  const recentPosts = posts.slice(0, 3) // Show only the 3 most recent posts

  if (recentPosts.length === 0) {
    return null // Don't render if no posts
  }

  return (
    <section id="blog" className="py-16 bg-muted-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Latest from Our Blog</h2>
          <p className="text-muted-600 max-w-2xl mx-auto">
            Get practical tips, pricing guides, and seasonal lawn care advice from our experts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recentPosts.map((post) => (
            <article key={post.slug} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              {post.frontmatter.cover && (
                <div className="aspect-video bg-muted-100 overflow-hidden">
                  <img
                    src={post.frontmatter.cover}
                    alt={post.frontmatter.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {post.frontmatter.tags?.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium bg-brand/10 text-brand rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-brand transition-colors">
                    {post.frontmatter.title}
                  </Link>
                </h3>
                {post.frontmatter.description && (
                  <p className="text-muted-600 text-sm mb-4 line-clamp-3">
                    {post.frontmatter.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <time className="text-xs text-muted-500">
                    {new Date(post.frontmatter.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </time>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-brand hover:text-brand/80 text-sm font-medium transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand/90 transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}

