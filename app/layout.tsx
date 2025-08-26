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
  openGraph: {
    title: SITE.defaultTitle,
    description: SITE.defaultDesc,
    siteName: SITE.name,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    title: SITE.defaultTitle,
    description: SITE.defaultDesc,
  },
  icons: {
    icon: '/mowjet/apple-touch-icon.png',
    apple: '/mowjet/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const base = getBaseUrl()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: NAME,
    telephone: PHONE_E164,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Philadelphia',
      addressRegion: 'PA',
      postalCode: '191xx',
      streetAddress: 'Northeast, Philadelphia',
    },
    areaServed: ADDRESS_CITY,
    priceRange: '$$',
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
