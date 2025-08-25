import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './utils'

const button = cva(
  'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand/40 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        solid: 'bg-brand text-white hover:bg-brand-hover shadow-soft hover:shadow-lg hover:-translate-y-0.5',
        outline: 'border border-muted-200 hover:bg-muted-100 hover:border-muted-300',
        ghost: 'hover:bg-muted-100',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: { variant: 'solid', size: 'md' },
  }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button>
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(button({ variant, size }), className)} {...props} />
}
