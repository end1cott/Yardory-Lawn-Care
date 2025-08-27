import Link from 'next/link'

export function CTA({
  href = '/quote',
  children = 'Get an instant quote',
}: { href?: string; children?: React.ReactNode }) {
  return (
    <div className="my-8">
      <Link
        href={href}
        className="inline-flex items-center rounded-2xl px-5 py-3 text-base font-semibold shadow hover:shadow-md
                   bg-green-600 text-white transition"
      >
        {children}
      </Link>
    </div>
  )
}

