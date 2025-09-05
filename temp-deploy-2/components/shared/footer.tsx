import Link from 'next/link'
import { NAME, PHONE_DISPLAY, PHONE_E164, ADDRESS_CITY, EMAIL_GENERAL } from '@/src/config/brand'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t bg-muted-50/50">
      {/* Main Footer Content */}
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <div className="text-xl font-bold text-muted-900">{NAME}</div>
              <div className="mt-2 text-sm text-muted-600">
                Professional lawn care services in Northeast Philadelphia
              </div>
            </div>
            <div className="space-y-2 text-sm text-muted-600">
              <div className="flex items-center gap-2">
                <span className="text-brand">📍</span>
                <span>{ADDRESS_CITY}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand">🕒</span>
                <span>Mon–Sat 8:00–19:00</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand">📞</span>
                <a href={`tel:${PHONE_E164}`} className="hover:text-brand transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand">✉️</span>
                <a href={`mailto:${EMAIL_GENERAL}`} className="hover:text-brand transition-colors">
                  {EMAIL_GENERAL}
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-muted-900">Our Services</h3>
            <ul className="space-y-2 text-sm text-muted-600">
              <li>
                <Link href="/#services" className="hover:text-brand transition-colors">
                  Lawn Mowing
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-brand transition-colors">
                  Edging & Trimming
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-brand transition-colors">
                  Hedge Trimming
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-brand transition-colors">
                  Leaf Cleanup
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-brand transition-colors">
                  Seasonal Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-muted-900">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-600">
              <li>
                <Link href="/quote" className="hover:text-brand transition-colors">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link href="/area" className="hover:text-brand transition-colors">
                  Service Areas
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-brand transition-colors">
                  Pricing & Plans
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-brand transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-brand transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-brand transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-muted-900">Contact & Support</h3>
            <div className="space-y-3 text-sm text-muted-600">
              <div>
                <div className="font-medium text-muted-800">Emergency Service</div>
                <a href={`tel:${PHONE_E164}`} className="text-brand hover:text-brand-hover transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div>
                <div className="font-medium text-muted-800">General Inquiries</div>
                <a href={`mailto:${EMAIL_GENERAL}`} className="text-brand hover:text-brand-hover transition-colors">
                  {EMAIL_GENERAL}
                </a>
              </div>
              <div>
                <div className="font-medium text-muted-800">Service Hours</div>
                <div>Monday - Saturday</div>
                <div>8:00 AM - 7:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-muted-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-muted-600">
              © {currentYear} {NAME}. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm text-muted-600">
              <Link href="/privacy" className="hover:text-brand transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-brand transition-colors">
                Terms of Service
              </Link>
            </div>


          </div>
        </div>
      </div>
    </footer>
  )
}
