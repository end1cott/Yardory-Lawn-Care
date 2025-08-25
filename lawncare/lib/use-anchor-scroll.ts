'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export function useAnchorScroll() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    const id = hash.substring(1)
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
  }, [searchParams])
}
