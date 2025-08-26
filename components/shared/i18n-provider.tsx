'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import type { Lang } from '@/src/lib/i18n'
import { getLocaleFromPath } from '@/src/lib/i18n'

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'en', setLang: () => {} })

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [lang, setLangState] = useState<Lang>('en')
  
  useEffect(() => {
    // First try to get locale from path
    const pathLocale = getLocaleFromPath(pathname)
    if (pathLocale) {
      setLangState(pathLocale)
      return
    }
    
    // Fallback to cookie if no locale in path
    const saved = (document.cookie.match(/(?:^|; )lang=(ru|en)/)?.[1] as Lang) || 'en'
    setLangState(saved)
  }, [pathname])
  
  const setLang = (l: Lang) => {
    document.cookie = `lang=${l}; path=/; max-age=31536000`
    setLangState(l)
  }
  
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>
}

export function useI18n() { return useContext(Ctx) }
