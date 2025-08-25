'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronDown, Search, X, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SERVICE_AREAS } from '@/data/service-areas'

interface AreaSectionProps {
  defaultOpen?: boolean
  syncQueryParam?: string
  autoFocus?: boolean
  showFullListLink?: boolean
}

export default function AreaSection({ 
  defaultOpen = false, 
  syncQueryParam,
  autoFocus = false,
  showFullListLink = false
}: AreaSectionProps) {
  // Check if we should auto-open based on hash
  const shouldAutoOpen = typeof window !== 'undefined' && window.location.hash === '#service-area'
  const [isOpen, setIsOpen] = useState(shouldAutoOpen || defaultOpen)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const toggleSection = () => {
    setIsOpen(!isOpen)
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  // Initialize search from URL query parameter
  useEffect(() => {
    if (syncQueryParam && searchParams.has(syncQueryParam)) {
      const urlQuery = searchParams.get(syncQueryParam) || ''
      setSearchQuery(urlQuery)
      setDebouncedQuery(urlQuery)
    }
  }, [syncQueryParam, searchParams])

  // Auto-focus on search input
  useEffect(() => {
    if ((autoFocus || shouldAutoOpen) && isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [autoFocus, shouldAutoOpen, isOpen])

  // Debounced search query
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery)
      
      // Update URL with query parameter
      if (syncQueryParam) {
        const params = new URLSearchParams(searchParams.toString())
        if (searchQuery.trim()) {
          params.set(syncQueryParam, searchQuery)
        } else {
          params.delete(syncQueryParam)
        }
        const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
        router.replace(newUrl, { scroll: false })
      }
    }, 200)
    
    return () => clearTimeout(timeoutId)
  }, [searchQuery, syncQueryParam, searchParams, pathname, router])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  // Filter and highlight logic
  const filteredAreas = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return SERVICE_AREAS
    }

    const query = debouncedQuery.toLowerCase().replace(/[\s\-–—]/g, ' ')
    
    return SERVICE_AREAS.map(area => {
      // Check if area title matches
      const titleMatch = area.title.toLowerCase().replace(/[\s\-–—]/g, ' ').includes(query)
      
      // Filter groups within this area
      const filteredGroups = area.groups.map(group => {
        const subtitleMatch = group.subtitle?.toLowerCase().replace(/[\s\-–—]/g, ' ').includes(query) || false
        
        const filteredItems = group.items.filter(item => 
          item.toLowerCase().replace(/[\s\-–—]/g, ' ').includes(query)
        )
        
        return {
          ...group,
          items: filteredItems,
          hasMatches: subtitleMatch || filteredItems.length > 0
        }
      }).filter(group => group.hasMatches)
      
      return {
        ...area,
        groups: filteredGroups,
        hasMatches: titleMatch || filteredGroups.length > 0
      }
    }).filter(area => area.hasMatches)
  }, [debouncedQuery])

  // Count total matches
  const matchCount = useMemo(() => {
    if (!debouncedQuery.trim()) return 0
    
    let count = 0
    filteredAreas.forEach(area => {
      if (area.title.toLowerCase().replace(/[\s\-–—]/g, ' ').includes(debouncedQuery.toLowerCase().replace(/[\s\-–—]/g, ' '))) {
        count++
      }
      area.groups.forEach(group => {
        if (group.subtitle?.toLowerCase().replace(/[\s\-–—]/g, ' ').includes(debouncedQuery.toLowerCase().replace(/[\s\-–—]/g, ' '))) {
          count++
        }
        count += group.items.length
      })
    })
    return count
  }, [filteredAreas, debouncedQuery])

  // Highlight text function
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? <mark key={index} className="bg-green-200 px-0.5 rounded">{part}</mark> : part
    )
  }

  return (
    <section id="service-area" className="section scroll-mt-24 md:scroll-mt-28 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand" aria-labelledby="service-area-title" tabIndex={-1} data-section-anchor>
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 id="service-area-title" className="text-2xl font-semibold">Service Area</h2>
          <div className="flex items-center gap-4">
            {showFullListLink && (
              <Link 
                href="/area" 
                className="text-sm text-brand hover:text-brand-hover flex items-center gap-1 transition-colors"
              >
                View full list
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
            <button
              onClick={toggleSection}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-600 hover:text-muted-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand/40 rounded-lg"
              aria-expanded={isOpen}
              aria-controls="service-area-content"
            >
              {isOpen ? 'Hide' : 'Show'}
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>

        <div
          id="service-area-content"
          aria-hidden={!isOpen}
          className={`overflow-hidden transition-all duration-300 ${
            isOpen 
              ? 'max-h-[4000px] opacity-100' 
              : 'max-h-0 opacity-0'
          }`}
        >
          {/* Search Input */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search neighborhoods or suburbs..."
                aria-label="Service area search"
                className="w-full pl-10 pr-10 py-2 border border-muted-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-400 hover:text-muted-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand/40 rounded"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Match Counter */}
            {debouncedQuery.trim() && (
              <div className="text-right mt-2">
                <span className="text-sm text-muted-500">
                  {matchCount === 0 ? (
                    <span className="flex items-center justify-center gap-2">
                      <span>No matches</span>
                      <button
                        onClick={clearSearch}
                        className="text-brand hover:text-brand-hover underline focus:outline-none focus:ring-2 focus:ring-brand/40 rounded px-1"
                      >
                        Clear
                      </button>
                    </span>
                  ) : (
                    `${matchCount} match${matchCount === 1 ? '' : 'es'}`
                  )}
                </span>
              </div>
            )}
          </div>

          <div className="text-center mb-8">
            <p className="text-muted-600 mb-2">We serve the following neighborhoods:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAreas.map((area) => (
              <Card key={area.title} className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {debouncedQuery.trim() ? highlightText(area.title, debouncedQuery) : area.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {area.groups.map((group, idx) => (
                    <div key={(group.subtitle || '') + idx}>
                      {group.subtitle ? (
                        <h4 className="font-medium text-muted-800 mb-2">
                          {debouncedQuery.trim() ? highlightText(group.subtitle, debouncedQuery) : group.subtitle}
                        </h4>
                      ) : null}
                      <ul className="space-y-1">
                        {group.items.map((item) => (
                          <li key={item} className="text-sm text-muted-600">
                            {debouncedQuery.trim() ? highlightText(item, debouncedQuery) : item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
