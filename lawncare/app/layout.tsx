import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'
import { I18nProvider } from '@/components/shared/i18n-provider'
import { ToastProvider } from '@/components/ui/toast'
import AnchorScrollHandler from '@/components/shared/anchor-scroll-handler'
import RouteProgress from '@/components/route-progress'
import { NAME, PHONE_E164, ADDRESS_CITY } from '@/src/config/brand'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: `${NAME} - Lawn Care in Northeast Philly | Mow, Edge & Hedge`,
  description: 'Reliable lawn mowing, edging & hedge trimming. Book in 45 seconds. Route-day discount available.',
  openGraph: {
    title: `${NAME} - Lawn Care in Northeast Philly`,
    description: 'Mow, Edge & Hedge — Book in 45s',
    siteName: NAME,
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    title: `${NAME} - Lawn Care in Northeast Philly`,
    description: 'Mow, Edge & Hedge — Book in 45s',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
    url: 'https://example.com',
    sameAs: ['https://maps.google.com'],
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
            <RouteProgress />
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
