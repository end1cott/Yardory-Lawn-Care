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
        <h2 className="text-2xl font-semibold mb-6 animate-fade-in-up">Reviews</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {DATA.map((r, i) => (
            <Card 
              key={i} 
              className="h-full cursor-pointer transition-all duration-500 hover:shadow-xl hover:border-brand/20 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <CardContent className="pt-6">
                <div className="font-medium animate-fade-in-up" style={{ animationDelay: `${i * 150 + 300}ms` }}>
                  {r.name}
                </div>
                <div className="text-yellow-500 my-2 animate-stars-in" style={{ animationDelay: `${i * 150 + 400}ms` }}>
                  {[...Array(r.stars)].map((_, starIndex) => (
                    <span
                      key={starIndex}
                      className="inline-block animate-star-bounce"
                      style={{ animationDelay: `${i * 150 + 400 + starIndex * 100}ms` }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="opacity-90 animate-fade-in-up" style={{ animationDelay: `${i * 150 + 600}ms` }}>
                  {r.text}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
