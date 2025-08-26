import type { Metadata } from 'next'
import { localizedPath, type Lang } from './i18n'

export const SITE = {
  name: 'MowJet',
  phone: '+1 (929) 704-4141',
  ogImage: '/mowjet/og.jpg',   // local 1200x630
  defaultTitle: 'Reliable Lawn Care in Northeast Philly — Book in 45s',
  defaultDesc: 'Mow, edge & hedge trimming. Route-day discount if we service your area on our route day.',
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
}): Metadata {
  const { locale, pathname, title, description } = opts
  const base = getBaseUrl()
  const langs: Record<string,string> = {
    en: localizedPath(pathname, 'en'),
    ru: localizedPath(pathname, 'ru'),
  }

  return {
    title: title ? `${title} | MowJet` : `${SITE.defaultTitle} | MowJet`,
    description: description ?? SITE.defaultDesc,
    alternates: {
      // only language alternates; do NOT set canonical when base is null
      languages: langs,
    },
    openGraph: {
      type: 'website',
      title: title ?? SITE.defaultTitle,
      description: description ?? SITE.defaultDesc,
      images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      alternateLocale: locale === 'ru' ? ['en_US'] : ['ru_RU'],
      ...(base ? { url: `${base}${langs[locale]}` } : {}),
    },
    twitter: { card: 'summary_large_image' },
  }
}
