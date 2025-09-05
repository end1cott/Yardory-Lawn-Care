import type { Metadata } from 'next'
import Hero from '@/components/sections/hero'
import Services from '@/components/sections/services'
import Plans from '@/components/sections/plans'
import HowItWorks from '@/components/sections/how-it-works'
import About from '@/components/sections/about'
import Contact from '@/components/sections/contact'
import GalleryBeforeAfter from '@/components/sections/gallery-before-after'
import Reviews from '@/components/sections/reviews'
import AreaWrapper from '@/components/sections/area-wrapper'
import FAQ from '@/components/sections/faq'
import Blog from '@/components/sections/blog'
import { buildMetadata } from '@/src/lib/seo'
import { getLocaleFromPath } from '@/src/lib/i18n'
import en from '@/src/i18n/seo/en'
import ru from '@/src/i18n/seo/ru'
import JsonLd from '@/src/components/JsonLd'

export async function generateMetadata(): Promise<Metadata> {
  const pathname = '/'
  const locale = getLocaleFromPath(pathname)
  const dict = locale === 'ru' ? ru : en
  
  return buildMetadata({
    locale,
    pathname,
    title: dict.home.title,
    description: dict.home.desc,
  })
}

export default function Page() {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MowJet',
    potentialAction: {
      '@type': 'SearchAction',
      target: '/quote?address={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <>
      <JsonLd json={websiteJsonLd} />
      <Hero />
      <Services />
      <Plans />
      <HowItWorks />
      <About />
      <GalleryBeforeAfter
        items={[
          { before: '/gallery/before1.webp', after: '/gallery/after1.webp', caption: 'Mow + Edge' },
          { before: '/gallery/before2.webp', after: '/gallery/after2.webp', caption: 'Hedge Trim' },
        ]}
      />
      <Reviews />
      <AreaWrapper showFullListLink={true} />
      <FAQ />
      <Blog />
      <Contact />
    </>
  )
}
