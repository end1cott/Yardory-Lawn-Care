import type { Metadata } from 'next'
import { localizedPath, type Lang } from './i18n'

export const SITE = {
  name: 'MowJet',
  phone: '+1 (929) 704-4141',
  ogImage: '/mowjet/og.jpg',   // local 1200x630
  defaultTitle: 'Reliable Lawn Care in Northeast Philly — Book in 45s',
  defaultDesc: 'Professional lawn mowing, edging & hedge trimming in Philadelphia. Save $5 with route-day discount. Get instant quote in 45 seconds.',
  keywords: 'lawn care philadelphia, lawn mowing philadelphia, hedge trimming philadelphia, lawn edging philadelphia, professional lawn service, northeast philadelphia lawn care',
  author: 'MowJet Lawn Care',
  category: 'Lawn Care Services',
  geo: {
    region: 'PA',
    placename: 'Philadelphia',
    position: '39.9526;-75.1652'
  }
} as const

export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || null // null on localhost
}

export function buildMetadata(opts: {
  locale: Lang
  pathname: string
  title?: string
  description?: string
  ogLocale?: string  // 'en_US' | 'ru_RU'
  keywords?: string
  noindex?: boolean
}): Metadata {
  const { locale, pathname, title, description, keywords, noindex } = opts
  const base = getBaseUrl()
  const langs: Record<string,string> = {
    en: localizedPath(pathname, 'en'),
    ru: localizedPath(pathname, 'ru'),
  }

  return {
    title: title ? `${title} | MowJet` : `${SITE.defaultTitle} | MowJet`,
    description: description ?? SITE.defaultDesc,
    keywords: keywords ?? SITE.keywords,
    authors: [{ name: SITE.author }],
    category: SITE.category,
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      // only language alternates; do NOT set canonical when base is null
      languages: langs,
    },
    openGraph: {
      type: 'website',
      title: title ?? SITE.defaultTitle,
      description: description ?? SITE.defaultDesc,
      siteName: SITE.name,
      images: [{ 
        url: SITE.ogImage, 
        width: 1200, 
        height: 630,
        alt: 'MowJet Lawn Care - Professional lawn service in Philadelphia'
      }],
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      alternateLocale: locale === 'ru' ? ['en_US'] : ['ru_RU'],
      ...(base ? { url: `${base}${langs[locale]}` } : {}),
    },
    twitter: { 
      card: 'summary_large_image',
      title: title ?? SITE.defaultTitle,
      description: description ?? SITE.defaultDesc,
      images: [SITE.ogImage]
    },
    other: {
      'geo.region': SITE.geo.region,
      'geo.placename': SITE.geo.placename,
      'geo.position': SITE.geo.position,
      'ICBM': SITE.geo.position,
    }
  }
}
