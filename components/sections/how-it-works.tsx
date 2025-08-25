export default function HowItWorks() {
  const steps = [
    { n: 1, t: 'Address', d: 'Tell us your address & lawn size.' },
    { n: 2, t: 'Quote', d: 'Pick frequency & extras, see a price range.' },
    { n: 3, t: 'Service', d: 'We arrive on your route-day. Pay online or cash.' },
  ]
  return (
    <section id="how-it-works" className="section bg-muted-50 scroll-mt-24 md:scroll-mt-28 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand" tabIndex={-1} data-section-anchor>
      <div className="container">
        <h2 className="text-2xl font-semibold mb-6">How it works</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(s => (
            <div key={s.n} className="rounded-xl border bg-white p-6 shadow-soft">
              <div className="text-brand text-3xl font-bold">{s.n}</div>
              <div className="mt-2 text-lg font-medium">{s.t}</div>
              <div className="opacity-90">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
