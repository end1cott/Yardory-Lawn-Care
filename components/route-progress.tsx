'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function RouteProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Start loading on route change
    setIsLoading(true)
    setProgress(0)
    setShowOverlay(false)

    // Fast progress to 80%
    const fastProgress = setTimeout(() => {
      setProgress(80)
    }, 100)

    // Show overlay if loading takes longer than 450ms
    const overlayTimer = setTimeout(() => {
      setShowOverlay(true)
    }, 450)

    // Complete progress and hide after route change
    const completeProgress = setTimeout(() => {
      setProgress(100)
      
      // Hide progress bar and overlay after completion
      setTimeout(() => {
        setIsLoading(false)
        setShowOverlay(false)
        setProgress(0)
      }, 200)
    }, 300)

    return () => {
      clearTimeout(fastProgress)
      clearTimeout(overlayTimer)
      clearTimeout(completeProgress)
    }
  }, [pathname, searchParams])

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  if (!isLoading && !showOverlay) return null

  return (
    <>
      {/* Progress Bar */}
      {isLoading && (
        <div 
          className="fixed top-0 left-0 right-0 z-[60] h-1 bg-brand shadow-lg"
          style={{
            width: `${progress}%`,
            transition: prefersReducedMotion ? 'none' : 'width 200ms ease-out',
          }}
          aria-hidden="true"
        />
      )}

      {/* Loading Overlay */}
      {showOverlay && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl backdrop-saturate-150 bg-white/20 dark:bg-neutral-900/20 will-change-backdrop-filter will-change-opacity animate-glass-in"
          role="status"
          aria-live="polite"
        >
          <div className="text-center">
            <div className="mb-4">
              <div className="w-12 h-12 mx-auto mb-3 text-brand animate-pulse-soft">
                🌱
              </div>
              <div className="text-lg font-medium text-muted-800 dark:text-muted-200">
                Loading...
              </div>
            </div>
            <div className="sr-only">Loading page content</div>
          </div>
        </div>
      )}
    </>
  )
}
