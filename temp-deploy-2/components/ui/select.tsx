import { cn } from './utils'
export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn('w-full rounded-xl border px-3 py-2 outline-none ring-brand/40 focus:ring-2', className)} />
}


