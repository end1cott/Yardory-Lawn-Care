'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { LeadSchema, type LeadInput, calcPriceRange } from '@/lib/validators'

export default function QuoteForm() {
  const [data, setData] = useState<LeadInput>({
    name: '', phone: '', email: '', address: '', city: '', zip: '',
    lot: '0.1', freq: 'bi-weekly', services: ['mow'], notes: ''
  })
  const [range, setRange] = useState<{from:number;to:number}|null>(null)
  const { push } = useToast()

  function handleChange<K extends keyof LeadInput>(k: K, v: LeadInput[K]) {
    setData((d) => ({ ...d, [k]: v }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = LeadSchema.safeParse(data)
    if (!parsed.success) {
      // Get the first error message
      const firstError = parsed.error.issues[0]
      const fieldName = firstError?.path[0] || 'field'
      
      // Create a more user-friendly error message
      let errorMessage = firstError?.message || 'Please check your input'
      
      // If it's a generic message, make it more specific
      if (errorMessage.includes('String must contain')) {
        errorMessage = `Please enter a valid ${fieldName}`
      }
      
      push({ 
        title: `Please fix ${fieldName}`, 
        description: errorMessage,
        status: 'error'
      })
      return
    }
    setRange(calcPriceRange(parsed.data))
    const res = await fetch('/api/lead', { method: 'POST', body: JSON.stringify(parsed.data) })
    if (res.ok) {
      push({ 
        title: 'Request received', 
        description: 'We will contact you shortly.',
        status: 'success'
      })
    } else {
      push({ 
        title: 'Server error', 
        description: 'Please try again later.',
        status: 'error'
      })
    }
  }

  const toggleService = (s: 'mow'|'edge'|'hedge'|'bagging') => {
    setData(d => ({ ...d, services: d.services.includes(s) ? d.services.filter(x=>x!==s) : [...d.services, s] }))
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-xl border bg-white p-6 shadow-soft animate-fade-in-up">
      <div className="grid gap-4 md:grid-cols-2 animate-fade-in-up delay-100">
        <Input placeholder="Name" value={data.name} onChange={e=>handleChange('name', e.target.value)} className="transition-all duration-300 focus:scale-105" />
        <Input placeholder="Phone" value={data.phone} onChange={e=>handleChange('phone', e.target.value)} className="transition-all duration-300 focus:scale-105" />
        <Input placeholder="Email" value={data.email} onChange={e=>handleChange('email', e.target.value)} className="transition-all duration-300 focus:scale-105" />
        <Input placeholder="Address" value={data.address} onChange={e=>handleChange('address', e.target.value)} className="transition-all duration-300 focus:scale-105" />
        <Input placeholder="City" value={data.city} onChange={e=>handleChange('city', e.target.value)} className="transition-all duration-300 focus:scale-105" />
        <Input placeholder="ZIP" value={data.zip} onChange={e=>handleChange('zip', e.target.value)} className="transition-all duration-300 focus:scale-105" />
      </div>
      <div className="grid gap-4 md:grid-cols-3 animate-fade-in-up delay-200">
        <Select value={data.lot} onChange={e=>handleChange('lot', e.target.value as LeadInput['lot'])} className="transition-all duration-300 focus:scale-105">
          <option value="0.1">Lot ≤ 0.1 acre</option>
          <option value="0.25">Lot ≤ 0.25 acre</option>
          <option value="0.5">Lot ≤ 0.5 acre</option>
        </Select>
        <Select value={data.freq} onChange={e=>handleChange('freq', e.target.value as LeadInput['freq'])} className="transition-all duration-300 focus:scale-105">
          <option value="weekly">Weekly</option>
          <option value="bi-weekly">Bi-weekly</option>
          <option value="one-time">One-time</option>
        </Select>
        <div className="flex flex-wrap items-center gap-2">
          {(['mow','edge','hedge','bagging'] as const).map(s => (
            <button
              type="button"
              key={s}
              onClick={()=>toggleService(s)}
              className={`rounded-full border px-3 py-1 text-sm transition-all duration-300 hover:scale-110 active:scale-95 ${data.services.includes(s)?'bg-brand text-white border-brand animate-bounce-in':'hover:bg-muted-100'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="animate-fade-in-up delay-300">
        <Textarea placeholder="Notes (gate code, dogs, slopes)" value={data.notes} onChange={e=>handleChange('notes', e.target.value)} className="transition-all duration-300 focus:scale-105" />
      </div>
      {range && (
        <div className="rounded-xl bg-muted-50 p-4 animate-bounce-in">
          Estimated: <b>${range.from}–${range.to}</b>
        </div>
      )}
      <div className="flex justify-end animate-fade-in-up delay-400">
        <Button 
          type="submit" 
          aria-label="Submit quote request"
          className="hover:scale-105 transition-transform duration-200"
        >
          Submit
        </Button>
      </div>
    </form>
  )
}
