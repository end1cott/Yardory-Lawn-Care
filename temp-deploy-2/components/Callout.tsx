import { ReactNode } from 'react'
import { cn } from '@/components/ui/utils'

interface CalloutProps {
  type?: 'warning' | 'note' | 'info'
  children: ReactNode
  className?: string
}

export function Callout({ type = 'note', children, className }: CalloutProps) {
  const styles = {
    warning: 'border-amber-200 bg-amber-50 text-amber-900',
    note: 'border-blue-200 bg-blue-50 text-blue-900',
    info: 'border-gray-200 bg-gray-50 text-gray-900'
  }

  const icons = {
    warning: '⚠️',
    note: 'ℹ️',
    info: '💡'
  }

  return (
    <div className={cn(
      'my-6 rounded-lg border p-4',
      styles[type],
      className
    )}>
      <div className="flex items-start gap-3">
        <span className="text-lg">{icons[type]}</span>
        <div className="prose prose-sm max-w-none">
          {children}
        </div>
      </div>
    </div>
  )
}
