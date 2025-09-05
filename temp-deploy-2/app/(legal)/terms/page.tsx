import type { Metadata } from 'next'
import { NAME, PHONE_DISPLAY, PHONE_E164, EMAIL_GENERAL, ADDRESS_CITY } from '@/src/config/brand'
import { buildMetadata } from '@/src/lib/seo'
import { getLocaleFromPath } from '@/src/lib/i18n'
import en from '@/src/i18n/seo/en'
import ru from '@/src/i18n/seo/ru'
import JsonLd from '@/src/components/JsonLd'

export async function generateMetadata(): Promise<Metadata> {
  const pathname = '/terms'
  const locale = getLocaleFromPath(pathname)
  const dict = locale === 'ru' ? ru : en
  
  return buildMetadata({
    locale,
    pathname,
    title: dict.terms.title,
    description: dict.terms.desc,
  })
}

export default function Terms() {
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
        name: 'Terms of Service',
        item: '/terms'
      }
    ]
  }

  return (
    <>
      <JsonLd json={breadcrumbJsonLd} />
      <div className="section">
        <div className="container">
          <article aria-labelledby="terms-title" className="space-y-8">
            <header className="mb-2">
              <h1 id="terms-title" className="text-3xl font-semibold mb-2">Terms of Service</h1>
              <p className="opacity-80">Effective date: August 24, 2025</p>
              <p className="text-sm text-muted-500">
                These Terms of Service (&quot;Terms&quot;) govern your use of the {NAME} website and services. By requesting a
                quote, booking, or receiving services, you agree to these Terms.
              </p>
            </header>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">1) Scope of Services</h2>
              <p className="text-muted-600">
                We provide residential and light commercial lawn care and related services as described on our site or in
                your estimate. Any work not expressly listed in your estimate is excluded unless added in writing.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">2) Estimates & Quotes</h2>
              <ul className="list-disc pl-6 space-y-1 text-muted-600">
                <li>Quotes are based on information you provide (property size, access, conditions) and are valid for 30 days.</li>
                <li>If site conditions differ materially (e.g., excessive overgrowth, debris, pet waste, hazards), we may
                    revise the price or decline service.</li>
                <li>Fixed-price packages include only the items stated; add-ons are billed separately.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">3) Scheduling, Rescheduling & Cancellations</h2>
              <ul className="list-disc pl-6 space-y-1 text-muted-600">
                <li>Appointment windows are estimates and may vary due to traffic, weather, and prior jobs.</li>
                <li>Please provide at least 24 hours&apos; notice to reschedule or cancel. Missed/late cancellations may incur a reasonable fee.</li>
                <li>Weather delays: for safety, we may postpone service (heavy rain, lightning, saturated ground). We&apos;ll offer the next available time.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">4) Access & Safety</h2>
              <ul className="list-disc pl-6 space-y-1 text-muted-600">
                <li>You are responsible for providing safe access to the service area (unlocked gates, secured pets, clear debris).</li>
                <li>We may refuse or stop work if conditions are unsafe (aggressive animals, exposed wiring, hazardous materials).</li>
                <li>Please mark sprinkler heads, irrigation lines, invisible fences, and other buried/hidden items. We are not liable for unmarked or hidden conditions.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">5) Pricing & Payment</h2>
              <ul className="list-disc pl-6 space-y-1 text-muted-600">
                <li>Unless otherwise stated, payment is due upon completion of each visit.</li>
                <li>We may require a deposit for large projects or first-time services.</li>
                <li>Late balances may accrue a reasonable late fee and collection costs.</li>
                <li>Taxes and disposal fees (if applicable) are added to the invoice.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">6) Satisfaction & Re-do Policy</h2>
              <p className="text-muted-600">
                If something was missed, notify us within 24 hours and we&apos;ll review and, if warranted, return to address the issue.
                This policy does not cover scope changes, natural regrowth, or damage from weather/third parties after service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">7) Photos & Marketing</h2>
              <p className="text-muted-600">
                We may take before/after photos for quality control and scheduling. With your permission, we may use non-identifying
                photos for marketing. You can opt out by telling us in writing before service begins.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">8) Limited Warranty</h2>
              <p className="text-muted-600">
                We warrant services will be performed in a workmanlike manner consistent with industry standards. Except as
                required by law, we disclaim all other warranties (express or implied), including fitness for a particular purpose.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">9) Liability Limits</h2>
              <p className="text-muted-600">
                To the maximum extent permitted by law, our total liability for any claim arising from the services is limited
                to the amount you paid for the specific visit giving rise to the claim. We are not liable for indirect, incidental,
                special, or consequential damages. You are responsible for securing valuables and marking hidden utilities.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">10) Customer Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-1 text-muted-600">
                <li>Provide accurate property information and timely instructions.</li>
                <li>Remove obstacles (toys, cables, large debris) prior to arrival.</li>
                <li>Keep people and pets away from equipment during service.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">11) Service Area</h2>
              <p className="text-muted-600">
                We primarily serve neighborhoods within ~30 minutes of 1780 Tomlinson Rd (typical traffic). Availability may vary.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">12) Communications</h2>
              <p className="text-muted-600">
                By providing your contact information, you consent to receive service-related emails, calls, and text messages.
                Message/data rates may apply. You may opt out of marketing texts at any time by replying <strong>STOP</strong>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">13) Termination</h2>
              <p className="text-muted-600">
                Either party may terminate ongoing service packages at any time with reasonable notice. You remain responsible
                for charges incurred through the termination date and for any non-refundable materials already purchased.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">14) Disputes & Governing Law</h2>
              <p className="text-muted-600">
                These Terms are governed by the laws of the Commonwealth of Pennsylvania, without regard to conflict-of-law rules.
                The parties will first attempt to resolve disputes informally. If unresolved, either party may bring a claim in
                small-claims court or a court of competent jurisdiction in Philadelphia County, PA.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">15) Changes to Terms</h2>
              <p className="text-muted-600">
                We may update these Terms from time to time. Continued use of our website or services after an update constitutes
                acceptance of the revised Terms. The effective date above will reflect the latest update.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">16) Contact</h2>
              <address className="not-italic text-muted-600">
                {NAME}<br />
                {ADDRESS_CITY}<br />
                Email: <a className="underline" href={`mailto:${EMAIL_GENERAL}`}>{EMAIL_GENERAL}</a><br />
                Phone: <a className="underline" href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
              </address>
            </section>

            <p className="text-xs text-muted-500">
              These Terms are provided for general informational purposes and do not constitute legal advice.
            </p>
          </article>
        </div>
      </div>
    </>
  )
}
