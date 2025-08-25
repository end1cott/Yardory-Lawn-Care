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

  // Function to handle anchor scrolling
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
        // Scroll to element with smooth behavior (or instant if reduced motion)
        element.scrollIntoView({ 
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        })
        
        // Focus the element for accessibility
        element.focus()
        
        // Clear hash after scroll completion
        const clearDelay = isInitialLoad ? 800 : 600 // Longer delay for initial load
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
