import type { Metadata } from 'next'
import AreaSection from '@/components/sections/area'
import { NAME } from '@/src/config/brand'

export const metadata: Metadata = {
  title: `Service Area — ${NAME}`,
  description: 'Neighborhoods we serve within ~30 minutes of 1780 Tomlinson Rd. Browse our service areas in Northeast Philly and surrounding suburbs.',
  alternates: {
    canonical: '/area',
  },
}

export default function AreaPage() {
  return (
    <div className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Service Area</h1>
          <p className="text-lg text-muted-600">Browse neighborhoods and suburbs we serve.</p>
        </div>
        
        <AreaSection defaultOpen={true} syncQueryParam="q" autoFocus={true} />
      </div>
    </div>
  )
}
