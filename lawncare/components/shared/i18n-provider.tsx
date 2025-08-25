'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import type { Lang } from '@/lib/i18n'

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'en', setLang: () => {} })

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  useEffect(() => {
    const saved = (document.cookie.match(/(?:^|; )lang=(ru|en)/)?.[1] as Lang) || 'en'
    setLangState(saved)
  }, [])
  const setLang = (l: Lang) => {
    document.cookie = `lang=${l}; path=/; max-age=31536000`
    setLangState(l)
  }
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>
}

export function useI18n() { return useContext(Ctx) }
