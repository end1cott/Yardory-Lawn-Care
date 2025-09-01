'use client'

import { useState, useEffect } from 'react'
import { X, Download } from 'lucide-react'

interface ImageModalProps {
  src: string
  alt: string
  children: React.ReactNode
}

export function ImageModal({ src, alt, children }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const openModal = () => {
    setIsOpen(true)
    // Small delay to allow mount before animation
    setTimeout(() => setShowContent(true), 10)
  }

  const closeModal = () => {
    setShowContent(false)
    // Wait for animation to complete before unmounting
    setTimeout(() => setIsOpen(false), 200)
  }

  const downloadImage = () => {
    const link = document.createElement('a')
    link.href = src
    link.download = alt.replace(/\s+/g, '-').toLowerCase() + '.webp'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <div onClick={openModal} className="cursor-pointer hover:opacity-90 transition-opacity">
        {children}
      </div>

      {isOpen && (
        <div 
          className={`fixed inset-0 z-50 flex items-start justify-center pt-8 pb-4 px-4 transition-all duration-200 ${
            showContent ? 'bg-black/80 opacity-100' : 'bg-black/0 opacity-0'
          }`}
          onClick={closeModal}
        >
          <div 
            className={`relative max-w-[95vw] max-h-[85vh] transition-all duration-200 ${
              showContent ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute -top-3 -right-3 z-10 p-2 bg-white/90 hover:bg-white text-gray-800 hover:text-gray-600 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Close image"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Download button */}
            <button
              onClick={downloadImage}
              className="absolute -top-3 -right-16 z-10 p-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Download image"
            >
              <Download className="w-5 h-5" />
            </button>

            <img
              src={src}
              alt={alt}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  )
}
