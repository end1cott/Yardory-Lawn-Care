import { Card, CardContent } from '@/components/ui/card'

const DATA = [
  { name: 'Alex R.', text: 'Perfect stripes and clean edges. Highly recommend!', stars: 5 },
  { name: 'Maria K.', text: 'On time, professional, fair price. Will book again.', stars: 5 },
  { name: 'John D.', text: 'Hedge trimming looks great. Yard feels new.', stars: 5 },
  { name: 'Olivia S.', text: 'Fast booking and great communication.', stars: 5 },
]

export default function Reviews() {
  return (
    <section id="reviews" className="section bg-muted-50 scroll-mt-24 md:scroll-mt-28 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand" tabIndex={-1} data-section-anchor>
      <div className="container">
        <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {DATA.map((r, i) => (
            <Card key={i}><CardContent>
              <div className="font-medium">{r.name}</div>
              <div className="text-yellow-500">{'★'.repeat(r.stars)}</div>
              <div className="opacity-90">{r.text}</div>
            </CardContent></Card>
          ))}
        </div>
      </div>
    </section>
  )
}
