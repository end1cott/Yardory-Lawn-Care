'use client'
import { useI18n } from './i18n-provider'
import { Globe } from 'lucide-react'

export default function LanguageSwitch() {
  const { lang, setLang } = useI18n()
  return (
    <button
      aria-label="Change language"
      onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
      className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm shadow-soft hover:bg-muted-100"
    >
      <Globe className="h-4 w-4" /> {lang.toUpperCase()}
    </button>
  )
}


