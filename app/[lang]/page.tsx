/* eslint react/no-unescaped-entities: "off" */
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'
import { use } from 'react'

export const runtime = 'edge'

export default function LangPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params)
  
  // Only handle 'ru' for now, redirect others to 404
  if (lang !== 'ru') {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted-50 to-white flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-2xl text-center px-6">
          {/* Language Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-brand/10 rounded-full flex items-center justify-center">
              <span className="text-4xl">🌱</span>
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-muted-800 mb-4">
              Russian Language Coming Soon!
            </h1>
            <p className="text-lg text-muted-600 leading-relaxed mb-4">
              We&apos;re working hard to bring you our lawn care services in Russian. 
              Stay tuned for updates!
            </p>
            <p className="text-base text-muted-500">
              Пока что мы работаем только на английском языке. Скоро добавим поддержку русского!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                Continue in English
              </Button>
            </Link>
            <Link href="/quote">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-2xl border shadow-soft p-6">
            <h3 className="text-lg font-semibold text-muted-800 mb-4">
              Need help? Contact us!
            </h3>
            <p className="text-muted-600 mb-4">
              Our team can assist you in English. Don&apos;t hesitate to reach out!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+19297044141" className="text-brand hover:text-brand-hover font-medium">
                📞 (929) 704-4141
              </a>
                      <a href="mailto:info@mowjet.com" className="text-brand hover:text-brand-hover font-medium">
          ✉️ info@mowjet.com
        </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
