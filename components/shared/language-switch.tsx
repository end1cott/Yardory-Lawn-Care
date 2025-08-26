'use client'
import { useI18n } from './i18n-provider'
import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import { localizedPath } from '@/src/lib/i18n'

export default function LanguageSwitch() {
  const { lang, setLang } = useI18n()
  const pathname = usePathname()
  const router = useRouter()
  
  const handleLanguageChange = () => {
    const newLang = lang === 'en' ? 'ru' : 'en'
    const newPath = localizedPath(pathname, newLang)
    setLang(newLang)
    router.push(newPath)
  }

  return (
    <button
      aria-label="Change language"
      onClick={handleLanguageChange}
      className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm shadow-soft hover:bg-muted-100"
    >
      <Globe className="h-4 w-4" /> {lang === 'en' ? 'EN' : 'RU'}
    </button>
  )
}


