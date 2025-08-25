import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function Plans() {
  const plans = [
    { name: 'One‑time', desc: 'Perfect for overgrown or listing prep.', tag: null },
    { name: 'Bi‑weekly', desc: 'Balanced schedule for most lawns.', tag: 'Popular' },
    { name: 'Weekly', desc: 'Best look with route-day discount.', tag: 'Save $5' },
  ]
  return (
    <section id="pricing" className="section scroll-mt-24 md:scroll-mt-28 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand" tabIndex={-1} data-section-anchor>
      <div className="container">
        <h2 className="text-2xl font-semibold mb-6">Plans & Frequency</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map(p => (
            <Card key={p.name} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {p.name}
                  {p.tag && <Badge className="border-brand/30">{p.tag}</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="opacity-90">{p.desc}</p>
                <div className="mt-auto pt-8 md:pt-6">
                  <a href="/quote">
                    <Button className="w-full h-11">Get Instant Quote</Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
