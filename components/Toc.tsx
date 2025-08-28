'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/components/ui/utils'

interface TocItem {
  id: string
  text: string
  level: number
}

export function Toc() {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3'))
    const items: TocItem[] = elements.map((element) => ({
      id: element.id,
      text: element.textContent || '',
      level: parseInt(element.tagName.charAt(1))
    }))
    setHeadings(items)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -35% 0px' }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <nav className="mb-8 rounded-lg border bg-gray-50 p-4 lg:mb-12">
      <h2 className="mb-3 text-sm font-semibold text-gray-900">Table of Contents</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                'block text-sm text-gray-600 hover:text-gray-900 transition-colors',
                heading.level === 3 && 'ml-4',
                activeId === heading.id && 'text-blue-600 font-medium'
              )}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth'
                })
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
