'use client'
import { Card, CardContent } from '@/components/ui/card'

const DATA = [
  { 
    name: 'Mariah L.', 
    text: 'Polite and easy to work with— showed up on time and did a fantastic job. We\'re really happy with this service and how he did exactly what we asked him to and did it well!', 
    stars: 5,
    location: 'Elkins Park, PA',
    link: 'https://nextdoor.com/p/BHr2gHgrC49k?utm_source=share&extras=MTEyNjg0MTU5&ne_link_preview_links=&utm_campaign=1756256421159&share_action_id=48ab122b-3c75-47e4-a0d2-42f715d96a05'
  },
  { 
    name: 'Kevin W.', 
    text: 'I must say this guy came and performed a job on my yard… 5 star service and he\'s punctual!!!', 
    stars: 5,
    location: 'Philadelphia, PA',
    link: 'https://nextdoor.com/p/_qpjtSP8WRnB?utm_source=share&extras=MTEyNjg0MTU5&ne_link_preview_links=&utm_campaign=1756256448225&share_action_id=486e072d-c836-44bf-9e8d-a739e2e6763f'
  },
]

export default function Reviews() {
  return (
    <section id="reviews" className="section bg-muted-50/60 scroll-mt-24 md:scroll-mt-28 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand" tabIndex={-1} data-section-anchor>
      <div className="container">
        <h2 className="text-2xl font-semibold mb-6 animate-fade-in-up">Reviews</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {DATA.map((r, i) => (
            <Card 
              key={i} 
              className="h-full cursor-pointer transition-all duration-500 hover:shadow-xl hover:border-brand/20 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${i * 150}ms` }}
              onClick={() => window.open(r.link, '_blank')}
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium animate-fade-in-up" style={{ animationDelay: `${i * 150 + 300}ms` }}>
                    {r.name}
                  </div>
                  <div className="text-sm text-muted-600 animate-fade-in-up" style={{ animationDelay: `${i * 150 + 300}ms` }}>
                    {r.location}
                  </div>
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
                <div className="mt-3 text-xs text-muted-500 animate-fade-in-up" style={{ animationDelay: `${i * 150 + 700}ms` }}>
                  Click to view on Nextdoor →
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
