'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RouteProgressWrapper() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleComplete = () => setIsLoading(false)

    // Listen for route changes
    window.addEventListener('beforeunload', handleStart)
    
    // Simulate loading completion after a short delay
    if (isLoading) {
      const timer = setTimeout(handleComplete, 500)
      return () => clearTimeout(timer)
    }
  }, [isLoading, pathname])

  return (
    <>
      {/* Page transition overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin" />
            <p className="text-muted-600 font-medium">Loading...</p>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div 
        className={`fixed top-0 left-0 right-0 h-1 bg-brand z-40 origin-left transition-transform duration-300 ${
          isLoading ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </>
  )
}
