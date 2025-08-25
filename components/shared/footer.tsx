import Link from 'next/link'
import { NAME, PHONE_DISPLAY, PHONE_E164, ADDRESS_CITY } from '@/src/config/brand'

export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="container grid gap-6 py-10 md:grid-cols-3">
        <div>
          <div className="text-lg font-semibold">{NAME}</div>
          <div className="mt-2 text-sm opacity-80">{ADDRESS_CITY} • Mon–Sat 8:00–19:00</div>
          <div className="text-sm"><a href={`tel:${PHONE_E164}`} className="underline">{PHONE_DISPLAY}</a></div>
        </div>
        <div className="text-sm">
          <div className="font-medium">Legal</div>
          <ul className="mt-2 space-y-1">
            <li><Link href="/privacy" className="underline">Privacy</Link></li>
            <li><Link href="/terms" className="underline">Terms</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          © {new Date().getFullYear()} {NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
