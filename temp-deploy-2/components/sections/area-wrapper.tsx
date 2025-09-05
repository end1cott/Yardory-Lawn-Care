import { Suspense } from 'react'
import AreaSection from './area'

interface AreaWrapperProps {
  defaultOpen?: boolean
  syncQueryParam?: string
  autoFocus?: boolean
  showFullListLink?: boolean
}

export default function AreaWrapper(props: AreaWrapperProps) {
  return (
    <Suspense fallback={<div className="animate-pulse">Loading service areas...</div>}>
      <AreaSection {...props} />
    </Suspense>
  )
}
