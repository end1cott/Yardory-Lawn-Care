import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const QA = [
  { q: 'Do you work in rain?', a: 'Light rain — yes. Heavy rain — we reschedule to the next route-day.' },
  { q: 'Gates & dogs?', a: 'Please ensure access to the yard and secure pets before we arrive.' },
  { q: 'Grass height fee?', a: 'Overgrown lawns may include a one-time surcharge due to extra time.' },
  { q: 'Bagging clippings?', a: 'Available as an add-on. Otherwise we mulch/disperse.' },
  { q: 'Water/Electricity?', a: 'Not required for mowing/edging. Please ensure access if needed for other tasks.' },
  { q: 'Payment options?', a: 'Cash or mobile pay. Card payment coming soon! Invoices available upon request.' },
]

export default function FAQ() {
  return (
    <section id="faq" className="section bg-white scroll-mt-24 md:scroll-mt-28 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand" tabIndex={-1} data-section-anchor>
      <div className="container">
        <h2 className="text-2xl font-semibold mb-6 animate-fade-in-up">FAQ</h2>
        <Accordion type="single" collapsible className="rounded-xl border bg-white shadow-soft animate-fade-in-up delay-200">
          {QA.map((x, i) => (
            <AccordionItem 
              key={i} 
              value={`item-${i}`} 
              className="border-b last:border-b-0 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <AccordionTrigger className="px-4 py-4 text-left font-medium hover:no-underline transition-all duration-300 hover:bg-muted-50">
                {x.q}
              </AccordionTrigger>
              <AccordionContent className="px-4 opacity-90">
                {x.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
