'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Supported anchor IDs
const SUPPORTED_ANCHORS = ['services', 'pricing', 'how-it-works', 'reviews', 'service-area', 'faq']

export default function AnchorScrollHandler() {
  const pathname = usePathname()

  // Function to clear hash from URL
  const clearHash = () => {
    if (typeof window === 'undefined') return
    
    const newUrl = window.location.pathname + window.location.search
    window.history.replaceState(null, '', newUrl)
  }

  // Function to handle anchor scrolling with enhanced animations
  const handleAnchorScroll = (hash: string, isInitialLoad = false) => {
    if (typeof window === 'undefined') return
    
    const id = hash.substring(1)
    
    // Check if it's a supported anchor
    if (!SUPPORTED_ANCHORS.includes(id)) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Retry mechanism to wait for element to appear in DOM
    let attempts = 0
    const maxAttempts = 20 // ~800ms with 40ms intervals
    
    const scrollToElement = () => {
      const element = document.getElementById(id)
      
      if (element) {
        // Add a subtle highlight animation to the target section
        const addHighlight = () => {
          element.style.transition = 'all 0.3s ease'
          element.style.transform = 'scale(1.02)'
          element.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.1)'
          
          setTimeout(() => {
            element.style.transform = 'scale(1)'
            element.style.boxShadow = 'none'
          }, 300)
        }

        // Calculate scroll position with offset for header
        const headerHeight = 80 // Approximate header height
        const elementTop = element.offsetTop - headerHeight - 20 // Extra 20px padding
        
        // Smooth scroll with easing
        if (prefersReducedMotion) {
          window.scrollTo({
            top: elementTop,
            behavior: 'auto'
          })
          addHighlight()
        } else {
          // Custom smooth scroll with easing
          const startPosition = window.pageYOffset
          const distance = elementTop - startPosition
          const duration = 800
          let start: number | null = null
          
          const easeInOutCubic = (t: number) => {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
          }
          
          const animation = (currentTime: number) => {
            if (start === null) start = currentTime
            const timeElapsed = currentTime - start
            const progress = Math.min(timeElapsed / duration, 1)
            const easedProgress = easeInOutCubic(progress)
            
            window.scrollTo(0, startPosition + distance * easedProgress)
            
            if (progress < 1) {
              requestAnimationFrame(animation)
            } else {
              // Add highlight after scroll completes
              setTimeout(addHighlight, 100)
            }
          }
          
          requestAnimationFrame(animation)
        }
        
        // Focus the element for accessibility
        element.focus()
        
        // Clear hash after scroll completion
        const clearDelay = isInitialLoad ? 1000 : 800
        setTimeout(clearHash, clearDelay)
        
        return true
      }
      
      attempts++
      if (attempts < maxAttempts) {
        // Retry with requestAnimationFrame for better performance
        requestAnimationFrame(() => {
          setTimeout(scrollToElement, 40)
        })
      }
      
      return false
    }

    // Start the retry mechanism
    scrollToElement()
  }

  useEffect(() => {
    // Only handle anchor scrolling on the home page
    if (pathname !== '/') return

    const hash = window.location.hash
    if (!hash) return

    // Handle initial load with hash
    handleAnchorScroll(hash, true)
  }, [pathname])

  useEffect(() => {
    // Handle hash changes (clicks on same page)
    const handleHashChange = () => {
      const hash = window.location.hash
      if (!hash) return
      
      handleAnchorScroll(hash, false)
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return null
}
