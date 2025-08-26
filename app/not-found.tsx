'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NAME, PHONE_E164 } from '@/src/config/brand'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted-50 to-white flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-2xl text-center px-6">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-brand to-brand/70 bg-clip-text text-transparent leading-none">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-muted-800 mb-4">
              Oops! Page not found
            </h2>
            <p className="text-lg text-muted-600 leading-relaxed">
              The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                Go to Homepage
              </Button>
            </Link>
            <Link href="/quote">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Get a Quote
              </Button>
            </Link>
            <a href={`tel:${PHONE_E164}`}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Call Us
              </Button>
            </a>
          </div>

          {/* Helpful Links */}
          <div className="bg-white rounded-2xl border shadow-soft p-6">
            <h3 className="text-lg font-semibold text-muted-800 mb-4">
              Looking for something specific?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="space-y-2">
                <Link href="/area" className="block text-brand hover:text-brand-hover transition-colors">
                  Service Areas
                </Link>
                <Link href="/#services" className="block text-muted-600 hover:text-muted-800 transition-colors">
                  Our Services
                </Link>
                <Link href="/#pricing" className="block text-muted-600 hover:text-muted-800 transition-colors">
                  Pricing & Plans
                </Link>
              </div>
              <div className="space-y-2">
                <Link href="/#reviews" className="block text-muted-600 hover:text-muted-800 transition-colors">
                  Customer Reviews
                </Link>
                <Link href="/#faq" className="block text-muted-600 hover:text-muted-800 transition-colors">
                  FAQ
                </Link>
                <Link href="/#how-it-works" className="block text-muted-600 hover:text-muted-800 transition-colors">
                  How It Works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
