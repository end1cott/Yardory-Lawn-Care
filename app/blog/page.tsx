import Link from 'next/link'
import { getAllPosts } from '@/src/lib/posts'
import Image from 'next/image'

export const metadata = {
  title: 'Philadelphia Lawn Care Blog',
  description: 'Practical tips, prices, and checklists for mowing, edging, hedges, aeration, and seasonal care.',
}

export default async function BlogIndex() {
  const posts = await getAllPosts()
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <h1 className="text-2xl lg:text-3xl font-bold">Blog</h1>
      <ul className="space-y-6">
        {posts.map(p => (
          <li key={p.slug} className="border rounded-xl p-5 hover:shadow-md transition-shadow">
            <Link href={`/blog/${p.slug}`} className="block">
              {p.frontmatter.cover && (
                <div className="mb-4 relative h-48 w-full overflow-hidden rounded-lg">
                  <Image
                    src={p.frontmatter.cover}
                    alt={p.frontmatter.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="text-lg font-semibold mb-2 leading-tight">
                {p.frontmatter.title}
              </div>
              <p className="text-sm opacity-70 mb-2">
                {new Date(p.frontmatter.date).toLocaleDateString('en-US', { dateStyle: 'medium' })}
              </p>
              {p.frontmatter.description && <p className="text-base opacity-80 leading-relaxed">{p.frontmatter.description}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

