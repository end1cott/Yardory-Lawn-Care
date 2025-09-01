import { z } from 'zod'

export const LeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(7, 'Phone number must be at least 7 digits'),
  email: z.string().email('Please enter a valid email address'),
  address: z.string().min(3, 'Address must be at least 3 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  zip: z.string().min(3, 'ZIP code must be at least 3 characters'),
  lot: z.enum(['0.1','0.25','0.5']),
  freq: z.enum(['weekly','bi-weekly','one-time']),
  services: z.array(z.enum(['mow','edge','hedge','bagging'])).min(1, 'Please select at least one service'),
  contactPreference: z.enum(['phone', 'email']),
  phonePreference: z.enum(['call', 'sms']).optional(),
  notes: z.string().optional(),
})

export type LeadInput = z.infer<typeof LeadSchema>

export function calcPriceRange(input: LeadInput) {
  const baseByLot = { '0.1': 35, '0.25': 45, '0.5': 60 } as const
  let price = baseByLot[input.lot]
  if (input.freq === 'weekly') price *= 0.9
  if (input.freq === 'one-time') price *= 1.15
  if (input.services.includes('edge')) price += 5
  if (input.services.includes('hedge')) price += 15
  if (input.services.includes('bagging')) price += 8
  const from = Math.round(price)
  const to = Math.round(price * 1.2)
  return { from, to }
}
