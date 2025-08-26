export type Lang = 'en' | 'ru'
export const SUPPORTED_LOCALES = ['en','ru'] as const
export const DEFAULT_LOCALE: Lang = 'en'

export function getLocaleFromPath(pathname: string): Lang {
  if (pathname.startsWith('/ru/')) return 'ru'
  if (pathname === '/ru') return 'ru'
  return 'en'
}

export function stripLocale(path: string) {
  return path.replace(/^\/(ru)(?=\/|$)/, '') || '/'
}

export function localizedPath(pathname: string, locale: Lang) {
  const clean = stripLocale(pathname)
  return locale === 'en' ? clean : `/ru${clean === '/' ? '' : clean}`
}
