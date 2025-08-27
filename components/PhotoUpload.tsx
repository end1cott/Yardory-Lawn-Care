'use client'
import { useState, useRef } from 'react'
import { X, Camera, Image as ImageIcon } from 'lucide-react'

interface PhotoUploadProps {
  photos: string[]
  onPhotosChange: (photos: string[]) => void
  maxPhotos?: number
}

export default function PhotoUpload({ photos, onPhotosChange, maxPhotos = 5 }: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const newPhotos: string[] = []
    const remainingSlots = maxPhotos - photos.length

    Array.from(files).slice(0, remainingSlots).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          if (result) {
            newPhotos.push(result)
            if (newPhotos.length === Math.min(files.length, remainingSlots)) {
              onPhotosChange([...photos, ...newPhotos])
            }
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index)
    onPhotosChange(newPhotos)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Camera className="w-4 h-4 text-muted-600" />
        <label className="text-sm font-medium text-muted-700">
          Upload Photos of Your Lawn ({photos.length}/{maxPhotos})
        </label>
      </div>
      
      {/* Upload Area */}
      {photos.length < maxPhotos && (
        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer hover:border-brand/50 hover:bg-brand/5 ${
            isDragging ? 'border-brand bg-brand/10' : 'border-muted-300'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="w-8 h-8 mx-auto mb-2 text-muted-500" />
          <p className="text-sm text-muted-600 mb-1">
            Drop photos here or click to browse
          </p>
          <p className="text-xs text-muted-500">
            JPG, PNG, WebP up to 5MB each
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
        </div>
      )}

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((photo, index) => (
            <div key={index} className="relative group">
              <img
                src={photo}
                alt={`Lawn photo ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Help Text */}
      <p className="text-xs text-muted-500">
        Photos help us provide more accurate quotes. Include shots of your lawn, any problem areas, or access points.
      </p>
    </div>
  )
}
