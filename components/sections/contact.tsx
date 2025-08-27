/* eslint react/no-unescaped-entities: "off" */
import { Button } from '@/components/ui/button'
import { PHONE_DISPLAY, PHONE_E164 } from '@/src/config/brand'
import Link from 'next/link'

export default function Contact() {
  return (
    <section id="contact" className="section scroll-mt-24 md:scroll-mt-28 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand" tabIndex={-1} data-section-anchor>
      <div className="container">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
          <p className="text-lg text-muted-600 max-w-3xl mx-auto">
            Ready to transform your yard into a well-maintained oasis? Contact us in any convenient way
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-center animate-fade-in-up delay-100">
          {/* Left column - Contact information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Our Contacts</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Phone</h4>
                    <p className="text-muted-600 mb-2">{PHONE_DISPLAY}</p>
                    <a 
                      href={`tel:${PHONE_E164}`}
                      className="text-green-600 hover:text-green-700 font-medium transition-colors"
                    >
                      Call Now
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Service Area</h4>
                    <p className="text-muted-600 mb-2">Philadelphia, PA</p>
                    <p className="text-sm text-muted-500">We serve the entire city and suburbs</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Business Hours</h4>
                    <p className="text-muted-600 mb-2">Mon-Fri: 7:00 AM - 7:00 PM</p>
                    <p className="text-muted-600 mb-2">Sat-Sun: 8:00 AM - 6:00 PM</p>
                    <p className="text-sm text-muted-500">Emergency calls accepted 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h4 className="font-semibold mb-3 text-green-800">Quick Order</h4>
                <p className="text-sm text-green-700 mb-4">
                  Fill out the request form and we&apos;ll contact you within 1 hour
                </p>
                <Link href="/quote">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Get Free Estimate
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right column - Image/illustration */}
          <div className="relative flex justify-center">
            <div className="w-64 h-64 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
