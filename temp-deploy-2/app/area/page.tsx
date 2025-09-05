import type { Metadata } from 'next'
import AreaWrapper from '@/components/sections/area-wrapper'
import { buildMetadata } from '@/src/lib/seo'
import { getLocaleFromPath } from '@/src/lib/i18n'
import en from '@/src/i18n/seo/en'
import ru from '@/src/i18n/seo/ru'
import JsonLd from '@/src/components/JsonLd'

export async function generateMetadata(): Promise<Metadata> {
  const pathname = '/area'
  const locale = getLocaleFromPath(pathname)
  const dict = locale === 'ru' ? ru : en
  
  return buildMetadata({
    locale,
    pathname,
    title: dict.area.title,
    description: dict.area.desc,
  })
}

export default function AreaPage() {
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
        name: 'Service Area',
        item: '/area'
      }
    ]
  }

  return (
    <>
      <JsonLd json={breadcrumbJsonLd} />
      <div className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Service Area</h1>
            <p className="text-lg text-muted-600">Browse neighborhoods and suburbs we serve.</p>
          </div>
          
          <AreaWrapper defaultOpen={true} syncQueryParam="q" autoFocus={true} />
        </div>
      </div>
    </>
  )
}
