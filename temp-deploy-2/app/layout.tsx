import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'
import { I18nProvider } from '@/components/shared/i18n-provider'
import { ToastProvider } from '@/components/ui/toast'
import AnchorScrollHandler from '@/components/shared/anchor-scroll-handler'
import RouteProgressWrapper from '@/components/route-progress-wrapper'
import { NAME, PHONE_E164, ADDRESS_CITY } from '@/src/config/brand'
import { SITE, getBaseUrl } from '@/src/lib/seo'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: SITE.defaultTitle,
  description: SITE.defaultDesc,
  keywords: SITE.keywords,
  authors: [{ name: SITE.author }],
  category: SITE.category,
  robots: 'index, follow',
  openGraph: {
    title: SITE.defaultTitle,
    description: SITE.defaultDesc,
    siteName: SITE.name,
    images: [{ 
      url: SITE.ogImage, 
      width: 1200, 
      height: 630,
      alt: 'MowJet Lawn Care - Professional lawn service in Philadelphia'
    }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.defaultTitle,
    description: SITE.defaultDesc,
    images: [SITE.ogImage],
    site: '@mowjet',
    creator: '@mowjet',
  },
  icons: {
    icon: '/mowjet/apple-touch-icon.png',
    apple: '/mowjet/apple-touch-icon.png',
    shortcut: '/mowjet/apple-touch-icon.png',
  },
  other: {
    'geo.region': SITE.geo.region,
    'geo.placename': SITE.geo.placename,
    'geo.position': SITE.geo.position,
    'ICBM': SITE.geo.position,
    'theme-color': '#16a34a',
    'msapplication-TileColor': '#16a34a',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const base = getBaseUrl()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: NAME,
    telephone: PHONE_E164,
    email: 'info@mowjet.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Philadelphia',
      addressRegion: 'PA',
      postalCode: '191xx',
      streetAddress: 'Northeast, Philadelphia',
      addressCountry: 'US'
    },
    areaServed: ADDRESS_CITY,
    priceRange: '$$',
    description: 'Professional lawn care services in Philadelphia including mowing, edging, and hedge trimming. Save with route-day discount.',
    url: base || 'https://mowjet.com',
    sameAs: [
      'https://www.google.com/maps?cid=YOUR_GOOGLE_MY_BUSINESS_ID',
      'https://www.facebook.com/mowjet',
      'https://www.instagram.com/mowjet'
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 39.9526,
        longitude: -75.1652
      },
      geoRadius: '30000'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Lawn Care Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Lawn Mowing',
            description: 'Professional lawn mowing with clean stripes'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Lawn Edging',
            description: 'Crisp edging along sidewalks and beds'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hedge Trimming',
            description: 'Professional hedge trimming and bush maintenance'
          }
        }
      ]
    },
    openingHours: 'Mo-Fr 07:00-19:00; Sa-Su 08:00-18:00',
    paymentAccepted: ['Cash', 'Mobile Payment'],
    ...(base ? { url: base } : {}),
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <I18nProvider>
          <ToastProvider>
            <RouteProgressWrapper />
            <Header />
            <main>{children}</main>
            <Footer />
            <AnchorScrollHandler />
          </ToastProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
