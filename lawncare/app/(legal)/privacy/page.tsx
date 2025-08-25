import { NAME, PHONE_DISPLAY, PHONE_E164, EMAIL_PRIVACY, ADDRESS_CITY } from '@/src/config/brand'

export const metadata = { title: `Privacy Policy — ${NAME}` }

export default function Privacy() {
  return (
    <div className="section">
      <div className="container">
        <article aria-labelledby="privacy-title" className="space-y-8">
          <header className="mb-2">
            <h1 id="privacy-title" className="text-3xl font-semibold mb-2">Privacy Policy</h1>
            <p className="opacity-80">Effective date: August 24, 2025</p>
            <p className="text-sm text-muted-500">
              This Privacy Policy explains how {NAME} ("we", "us", "our") collects, uses, and shares your information
              when you visit our website, request a quote, or use our services.
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-600">
              <li><strong>Contact details</strong> (name, email, phone, address) when you submit forms or book service.</li>
              <li><strong>Service details</strong> (property size/location, preferred dates, notes, photos you upload).</li>
              <li><strong>Payment info</strong> processed by our payment partners; we do not store full card numbers.</li>
              <li><strong>Usage data</strong> (IP, device, pages viewed) collected via cookies and similar tech.</li>
              <li><strong>Communications</strong> (calls, emails, SMS) for scheduling and support.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">How We Use Information</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-600">
              <li>Provide, schedule, and improve lawn care services.</li>
              <li>Send quotes, invoices, updates, and customer support messages.</li>
              <li>Process payments and prevent fraud.</li>
              <li>Analyze site performance and marketing effectiveness.</li>
              <li>Comply with legal, tax, and safety obligations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Sharing of Information</h2>
            <p className="text-muted-600">
              We share information with trusted vendors only as needed to run our business—for example:
              payment processors, scheduling/CRM tools, email/SMS providers, analytics, and on-site technicians.
              We do <strong>not</strong> sell your personal information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Cookies & Analytics</h2>
            <p className="text-muted-600">
              We use cookies and similar technologies to keep the site secure, remember preferences, and measure traffic.
              You can control cookies in your browser settings. If we use analytics (e.g., Google Analytics),
              they may set cookies to help us understand usage trends.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Text Messages & Calls</h2>
            <p className="text-muted-600">
              By providing your phone number, you agree we may contact you for scheduling, estimates, and service updates.
              Message/data rates may apply. You can opt out of marketing texts at any time by replying <strong>STOP</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Data Retention</h2>
            <p className="text-muted-600">
              We keep information only as long as necessary for the purposes described above, including record-keeping and
              legal obligations. When no longer needed, we securely delete or anonymize data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Your Privacy Rights</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted-600">
              <li>Access, update, or delete certain personal information.</li>
              <li>Opt out of marketing emails via the unsubscribe link.</li>
              <li>Opt out of marketing texts by replying <strong>STOP</strong>.</li>
            </ul>
            <p className="text-sm text-muted-500">
              California residents: you have rights to know, delete, and correct personal information. We do not "sell"
              or "share" personal information as defined by the CCPA/CPRA. EEA/UK residents: where applicable, our legal
              bases include contract necessity, legitimate interests, and consent; you may have rights to access, rectify,
              erase, restrict or object to processing, and data portability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Security</h2>
            <p className="text-muted-600">
              We use reasonable administrative, technical, and physical safeguards to protect personal information.
              No method of transmission or storage is 100% secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Children's Privacy</h2>
            <p className="text-muted-600">
              Our services are not directed to children under 13. If you believe a child provided us personal information,
              contact us and we will delete it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Third-Party Links</h2>
            <p className="text-muted-600">
              We may link to third-party websites. Their privacy practices are governed by their own policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Changes to This Policy</h2>
            <p className="text-muted-600">
              We may update this Privacy Policy from time to time. We will post the new effective date when changes are made.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <address className="not-italic text-muted-600">
              {NAME}<br />
              {ADDRESS_CITY}<br />
              Email: <a className="underline" href={`mailto:${EMAIL_PRIVACY}`}>{EMAIL_PRIVACY}</a><br />
              Phone: <a className="underline" href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
            </address>
          </section>

          <p className="text-xs text-muted-500">
            This policy is provided for general information and is not legal advice.
          </p>
        </article>
      </div>
    </div>
  )
}
