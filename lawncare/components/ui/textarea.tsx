import { cn } from './utils'
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn('w-full rounded-xl border px-3 py-2 outline-none ring-brand/40 focus:ring-2', props.className)} />
}


