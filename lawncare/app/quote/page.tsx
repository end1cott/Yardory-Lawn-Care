'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { LeadSchema, type LeadInput, calcPriceRange } from '@/lib/validators'

export default function QuotePage() {
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
      push({ title: 'Check the form', description: parsed.error.issues[0]?.message })
      return
    }
    setRange(calcPriceRange(parsed.data))
    const res = await fetch('/api/lead', { method: 'POST', body: JSON.stringify(parsed.data) })
    if (res.ok) push({ title: 'Request received', description: 'We will contact you shortly.' })
    else push({ title: 'Server error', description: 'Please try again later.' })
  }

  const toggleService = (s: 'mow'|'edge'|'hedge'|'bagging') => {
    setData(d => ({ ...d, services: d.services.includes(s) ? d.services.filter(x=>x!==s) : [...d.services, s] }))
  }

  return (
    <div className="section">
      <div className="container max-w-3xl">
        <h1 className="text-3xl font-semibold mb-4">Get your quote</h1>
        <form onSubmit={onSubmit} className="grid gap-4 rounded-xl border bg-white p-6 shadow-soft">
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Name" value={data.name} onChange={e=>handleChange('name', e.target.value)} />
            <Input placeholder="Phone" value={data.phone} onChange={e=>handleChange('phone', e.target.value)} />
            <Input placeholder="Email" value={data.email} onChange={e=>handleChange('email', e.target.value)} />
            <Input placeholder="Address" value={data.address} onChange={e=>handleChange('address', e.target.value)} />
            <Input placeholder="City" value={data.city} onChange={e=>handleChange('city', e.target.value)} />
            <Input placeholder="ZIP" value={data.zip} onChange={e=>handleChange('zip', e.target.value)} />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Select value={data.lot} onChange={e=>handleChange('lot', e.target.value as any)}>
              <option value="0.1">Lot ≤ 0.1 acre</option>
              <option value="0.25">Lot ≤ 0.25 acre</option>
              <option value="0.5">Lot ≤ 0.5 acre</option>
            </Select>
            <Select value={data.freq} onChange={e=>handleChange('freq', e.target.value as any)}>
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
                  className={`rounded-full border px-3 py-1 text-sm ${data.services.includes(s)?'bg-brand text-white border-brand':'hover:bg-muted-100'}`}
                >{s}</button>
              ))}
            </div>
          </div>
          <Textarea placeholder="Notes (gate code, dogs, slopes)" value={data.notes} onChange={e=>handleChange('notes', e.target.value)} />
          {range && <div className="rounded-xl bg-muted-50 p-4">Estimated: <b>${range.from}–${range.to}</b></div>}
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
