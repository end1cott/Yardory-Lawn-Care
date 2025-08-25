import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Scissors, Brush, Trees } from 'lucide-react'

export default function Services() {
  const items = [
    { icon: Scissors, title: 'Mowing', text: 'Sharp, even cut with clean stripes.' },
    { icon: Brush, title: 'Edging', text: 'Crisp lines along sidewalks & beds.' },
    { icon: Trees, title: 'Hedge Trimming', text: 'Shaped hedges and tidy bushes.' },
  ]
  return (
    <section id="services" className="section bg-muted-50 scroll-mt-24 md:scroll-mt-28 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand" tabIndex={-1} data-section-anchor>
      <div className="container">
        <h2 className="text-2xl font-semibold mb-6">Services</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, title, text }) => (
            <Card key={title}>
              <CardHeader><CardTitle className="flex items-center gap-2"><Icon className="h-5 w-5 text-brand"/> {title}</CardTitle></CardHeader>
              <CardContent className="opacity-90">{text}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
