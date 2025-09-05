import type { Metadata } from 'next'
import { buildMetadata } from '@/src/lib/seo'
import { getLocaleFromPath } from '@/src/lib/i18n'
import en from '@/src/i18n/seo/en'
import ru from '@/src/i18n/seo/ru'
import JsonLd from '@/src/components/JsonLd'
import QuoteForm from './quote-form'

export async function generateMetadata(): Promise<Metadata> {
  const pathname = '/quote'
  const locale = getLocaleFromPath(pathname)
  const dict = locale === 'ru' ? ru : en
  
  return buildMetadata({
    locale,
    pathname,
    title: dict.quote.title,
    description: dict.quote.desc,
  })
}

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ freq?: string }>
}) {
  const params = await searchParams
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: '/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Get Quote',
        item: '/quote'
      }
    ]
  }

  return (
    <>
      <JsonLd json={breadcrumbJsonLd} />
      <div className="section">
        <div className="container max-w-3xl">
          <h1 className="text-3xl font-semibold mb-4">Get your quote</h1>
          <p className="text-gray-600 mb-6">Response in 5–10 minutes. No spam. Get an accurate estimate for your lawn care needs.</p>
          <QuoteForm initialFreq={params.freq} />
        </div>
      </div>
    </>
  )
}
