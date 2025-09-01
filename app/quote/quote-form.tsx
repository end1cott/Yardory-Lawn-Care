'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { LeadSchema, type LeadInput, calcPriceRange } from '@/lib/validators'

export default function QuoteForm({ initialFreq }: { initialFreq?: string }) {
  // Validate and set initial frequency
  const getInitialFreq = () => {
    if (initialFreq && ['weekly', 'bi-weekly', 'one-time'].includes(initialFreq)) {
      return initialFreq as 'weekly' | 'bi-weekly' | 'one-time'
    }
    return 'bi-weekly'
  }

  const [data, setData] = useState<LeadInput>({
    name: '', phone: '', email: '', address: '', city: 'Philadelphia', zip: '',
    lot: '0.1', freq: getInitialFreq(), services: ['mow'], contactPreference: 'phone', phonePreference: 'call', notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { push } = useToast()

  function handleChange<K extends keyof LeadInput>(k: K, v: LeadInput[K]) {
    setData((d) => ({ ...d, [k]: v }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

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
      setIsSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/lead', { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsed.data) 
      })
      
      const result = await res.json()
      
      if (res.ok && result.ok) {
        push({ 
          title: 'Quote Request Sent! 🌱', 
          description: 'We\'ll contact you within 1 hour with your personalized quote.',
          status: 'success'
        })
        
        // Reset form after successful submission
        setData({
          name: '', phone: '', email: '', address: '', city: 'Philadelphia', zip: '',
          lot: '0.1', freq: getInitialFreq(), services: ['mow'], contactPreference: 'phone', phonePreference: 'call', notes: ''
        })
      } else {
        push({ 
          title: 'Submission Error', 
          description: result.error || 'Please try again later.',
          status: 'error'
        })
      }
    } catch (error) {
      push({ 
        title: 'Connection Error', 
        description: 'Please check your internet connection and try again.',
        status: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleService = (s: 'mow'|'edge'|'hedge'|'bagging') => {
    setData(d => ({ ...d, services: d.services.includes(s) ? d.services.filter(x=>x!==s) : [...d.services, s] }))
  }

  return (
    <>
      <form onSubmit={onSubmit} className="grid gap-4 rounded-xl border bg-white p-6 shadow-soft animate-fade-in-up">
        <div className="grid gap-4 md:grid-cols-2 animate-fade-in-up delay-100">
          <Input placeholder="Name" value={data.name} onChange={e=>handleChange('name', e.target.value)} className="transition-all duration-300 focus:scale-105" />
          <Input placeholder="Phone" value={data.phone} onChange={e=>handleChange('phone', e.target.value)} className="transition-all duration-300 focus:scale-105" />
          <Input placeholder="Email" value={data.email} onChange={e=>handleChange('email', e.target.value)} className="transition-all duration-300 focus:scale-105" />
          <Input placeholder="Address" value={data.address} onChange={e=>handleChange('address', e.target.value)} className="transition-all duration-300 focus:scale-105" />
          <div className="flex items-center px-3 py-2 bg-muted-50 border border-gray-200 rounded-xl text-muted-600">
            <span className="text-sm">Philadelphia</span>
          </div>
          <Input placeholder="ZIP" value={data.zip} onChange={e=>handleChange('zip', e.target.value)} className="transition-all duration-300 focus:scale-105" />
        </div>
        
        {/* Contact Preference */}
        <div className="space-y-3 animate-fade-in-up delay-150">
          <label className="text-sm font-medium text-muted-700">How would you like us to contact you?</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="contactPreference"
                value="phone"
                checked={data.contactPreference === 'phone'}
                onChange={(e) => handleChange('contactPreference', e.target.value as 'phone' | 'email')}
                className="w-4 h-4"
              />
              <span className="text-sm">Phone</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="contactPreference"
                value="email"
                checked={data.contactPreference === 'email'}
                onChange={(e) => handleChange('contactPreference', e.target.value as 'phone' | 'email')}
                className="w-4 h-4"
              />
              <span className="text-sm">Email</span>
            </label>
          </div>
          
          {/* Phone Preference (only show if phone is selected) */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            data.contactPreference === 'phone' 
              ? 'max-h-32 opacity-100' 
              : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-700">Do you prefer SMS or Call?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="phonePreference"
                    value="call"
                    checked={data.phonePreference === 'call'}
                    onChange={(e) => handleChange('phonePreference', e.target.value as 'call' | 'sms')}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Call</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="phonePreference"
                    value="sms"
                    checked={data.phonePreference === 'sms'}
                    onChange={(e) => handleChange('phonePreference', e.target.value as 'call' | 'sms')}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">SMS</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3 animate-fade-in-up delay-200">
          <Select value={data.lot} onChange={e=>handleChange('lot', e.target.value as LeadInput['lot'])} className="transition-all duration-300 focus:scale-105">
            <option value="0.1">Small (≤ 0.1 acre)</option>
            <option value="0.25">Medium (≤ 0.25 acre)</option>
            <option value="0.5">Large (≤ 0.5 acre)</option>
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



        <div className="flex justify-end animate-fade-in-up delay-400">
          <Button 
            type="submit" 
            aria-label="Submit quote request"
            className="hover:scale-105 transition-transform duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </Button>
        </div>
      </form>
      
      {/* Lot Size Examples */}
      <div className="mt-6 p-4 bg-muted-50 rounded-lg animate-fade-in-up delay-500">
        <h4 className="text-sm font-medium text-muted-800 mb-3">Not sure about your lot size?</h4>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
            <div className="w-8 h-6 bg-green-200 rounded-sm flex-shrink-0"></div>
            <div>
              <div className="font-medium text-sm">Small</div>
              <div className="text-xs text-muted-600">City lot, townhouse, small backyard</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
            <div className="w-10 h-6 bg-green-300 rounded-sm flex-shrink-0"></div>
            <div>
              <div className="font-medium text-sm">Medium</div>
              <div className="text-xs text-muted-600">Typical suburban home yard</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
            <div className="w-12 h-6 bg-green-400 rounded-sm flex-shrink-0"></div>
            <div>
              <div className="font-medium text-sm">Large</div>
              <div className="text-xs text-muted-600">Large suburban or rural property</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
