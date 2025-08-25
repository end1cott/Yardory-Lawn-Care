'use client'
import { useState } from 'react'
import Image from 'next/image'

type Item = { before: string; after: string; caption?: string }
export default function GalleryBeforeAfter({ items }: { items: Item[] }) {
  return (
    <section id="gallery" className="section scroll-mt-24 md:scroll-mt-28 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand" tabIndex={-1} data-section-anchor>
      <div className="container">
        <h2 className="text-2xl font-semibold mb-6">Before / After</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((it, i) => (
            <BA key={i} {...it} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BA({ before, after, caption }: Item) {
  const [pos, setPos] = useState(50)
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border shadow-soft">
      <div className="relative aspect-[1/1] w-full">
        {/* Before image */}
        <Image
          src={before}
          alt="Before lawn care"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            const parent = target.parentElement
            if (parent) {
              parent.innerHTML = `
                <div class="absolute inset-0 bg-gradient-to-br from-red-100 to-red-100 flex items-center justify-center">
                  <div class="text-center text-red-600">
                    <div class="text-2xl mb-2">🌿</div>
                    <div class="text-sm font-medium">Before</div>
                    <div class="text-xs opacity-60">Add ${before} to public/</div>
                  </div>
                </div>
              `
            }
          }}
        />
        {/* After image with clip path */}
        <Image
          src={after}
          alt="After lawn care"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            const parent = target.parentElement
            if (parent) {
              parent.innerHTML = `
                <div class="absolute inset-0 bg-gradient-to-br from-green-100 to-green-100 flex items-center justify-center" style="clip-path: inset(0 ${100 - pos}% 0 0)">
                  <div class="text-center text-green-600">
                    <div class="text-2xl mb-2">✨</div>
                    <div class="text-sm font-medium">After</div>
                    <div class="text-xs opacity-60">Add ${after} to public/</div>
                  </div>
                </div>
              `
            }
          }}
        />
        {/* Slider control */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3">
          <input
            type="range" 
            min={0} 
            max={100} 
            value={pos}
            onChange={(e) => setPos(parseInt(e.target.value))}
            className="w-full h-2 bg-white/50 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, transparent 0%, transparent ${pos}%, rgba(255,255,255,0.8) ${pos}%, rgba(255,255,255,0.8) 100%)`
            }}
          />
        </div>
      </div>
      {caption && <div className="p-3 text-sm opacity-80">{caption}</div>}
    </div>
  )
}
