import { Suspense } from 'react'
import RouteProgress from './route-progress'

export default function RouteProgressWrapper() {
  return (
    <Suspense fallback={null}>
      <RouteProgress />
    </Suspense>
  )
}
