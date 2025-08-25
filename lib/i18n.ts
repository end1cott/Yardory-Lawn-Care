'use server'
import { cookies } from 'next/headers'

export const LANG_COOKIE = 'lang'
export type Lang = 'en' | 'ru'

export async function getLang(): Promise<Lang> {
  const c = (await cookies()).get(LANG_COOKIE)?.value
  return (c === 'ru' || c === 'en') ? c : 'en'
}
