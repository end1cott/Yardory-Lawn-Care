import { cn } from './utils'
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'w-full rounded-xl border px-3 py-2 outline-none ring-brand/40 placeholder:text-muted-600 focus:ring-2',
        props.className
      )}
    />
  )
}


