import Hero from '@/components/sections/hero'
import Services from '@/components/sections/services'
import Plans from '@/components/sections/plans'
import HowItWorks from '@/components/sections/how-it-works'
import GalleryBeforeAfter from '@/components/sections/gallery-before-after'
import Reviews from '@/components/sections/reviews'
import AreaSection from '@/components/sections/area'
import FAQ from '@/components/sections/faq'

export default function Page() {
  return (
    <>
      <Hero />
      <Services />
      <Plans />
      <HowItWorks />
      <GalleryBeforeAfter
        items={[
          { before: '/gallery/before1.webp', after: '/gallery/after1.webp', caption: 'Mow + Edge' },
          { before: '/gallery/before2.webp', after: '/gallery/after2.webp', caption: 'Hedge Trim' },
        ]}
      />
      <Reviews />
      <AreaSection showFullListLink={true} />
      <FAQ />
    </>
  )
}
