'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useI18n } from './i18n-provider'
import { NAME, PHONE_DISPLAY, PHONE_E164 } from '@/src/config/brand'
import en from '@/locales/en'
import ru from '@/locales/ru'

export default function Header() {
  const { lang } = useI18n()
  const t = lang === 'ru' ? ru : en
  const [isOpen, setIsOpen] = useState(false)

  const handleNavClick = () => {
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold">
          {/* Logo */}
          <div className="relative w-8 h-8 shrink-0">
            <Image
              src="/logo.svg"
              alt={`${NAME} logo`}
              width={32}
              height={32}
              className="rounded-full"
              onError={(e) => {
                // Fallback to placeholder if logo doesn't exist
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.nextElementSibling?.classList.remove('hidden')
              }}
            />
            {/* Placeholder logo */}
            <div className="hidden w-8 h-8 rounded-full border-2 border-brand flex items-center justify-center bg-brand/10">
              <span className="text-brand font-bold text-sm">Y</span>
              <span className="sr-only">Yardory logo placeholder</span>
            </div>
          </div>
          <span>{NAME}</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden gap-6 md:flex">
          <Link href="/#services" className="opacity-80 hover:opacity-100">{t.nav.services}</Link>
          <Link href="/#pricing" className="opacity-80 hover:opacity-100">{t.nav.pricing}</Link>
          <Link href="/#how-it-works" className="opacity-80 hover:opacity-100">How it works</Link>
          <Link href="/#reviews" className="opacity-80 hover:opacity-100">{t.nav.reviews}</Link>
          <Link href="/#service-area" className="opacity-80 hover:opacity-100">{t.nav.area}</Link>
          <Link href="/#faq" className="opacity-80 hover:opacity-100">{t.nav.faq}</Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/quote"><Button size="sm">{t.ctaQuote}</Button></Link>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-3 md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`p-2 transition-opacity ${isOpen ? 'invisible pointer-events-none' : ''}`}
                aria-expanded={isOpen}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[90vw] max-w-[20rem] p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex h-16 items-center justify-center border-b px-6">
                  <div className="flex items-center gap-3">
                    {/* Logo */}
                    <div className="relative w-8 h-8 shrink-0">
                      <Image
                        src="/logo.svg"
                        alt={`${NAME} logo`}
                        width={32}
                        height={32}
                        className="rounded-full"
                        onError={(e) => {
                          // Fallback to placeholder if logo doesn't exist
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          target.nextElementSibling?.classList.remove('hidden')
                        }}
                      />
                      {/* Placeholder logo */}
                      <div className="hidden w-8 h-8 rounded-full border-2 border-brand flex items-center justify-center bg-brand/10">
                        <span className="text-brand font-bold text-sm">Y</span>
                        <span className="sr-only">Yardory logo placeholder</span>
                      </div>
                    </div>
                    <span className="text-lg font-semibold">{NAME}</span>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-1 p-6">
                  <Link 
                    href="/#services" 
                    className="flex h-11 items-center px-3 text-base font-medium text-muted-800 hover:bg-muted-100 hover:text-muted-900 rounded-lg transition-colors"
                    onClick={handleNavClick}
                  >
                    {t.nav.services}
                  </Link>
                  <Link 
                    href="/#pricing" 
                    className="flex h-11 items-center px-3 text-base font-medium text-muted-800 hover:bg-muted-100 hover:text-muted-900 rounded-lg transition-colors"
                    onClick={handleNavClick}
                  >
                    {t.nav.pricing}
                  </Link>
                  <Link 
                    href="/#how-it-works" 
                    className="flex h-11 items-center px-3 text-base font-medium text-muted-800 hover:bg-muted-100 hover:text-muted-900 rounded-lg transition-colors"
                    onClick={handleNavClick}
                  >
                    How it works
                  </Link>
                  <Link 
                    href="/#reviews" 
                    className="flex h-11 items-center px-3 text-base font-medium text-muted-800 hover:bg-muted-100 hover:text-muted-900 rounded-lg transition-colors"
                    onClick={handleNavClick}
                  >
                    {t.nav.reviews}
                  </Link>
                  <Link 
                    href="/#service-area" 
                    className="flex h-11 items-center px-3 text-base font-medium text-muted-800 hover:bg-muted-100 hover:text-muted-900 rounded-lg transition-colors"
                    onClick={handleNavClick}
                  >
                    {t.nav.area}
                  </Link>
                  <Link 
                    href="/#faq" 
                    className="flex h-11 items-center px-3 text-base font-medium text-muted-800 hover:bg-muted-100 hover:text-muted-900 rounded-lg transition-colors"
                    onClick={handleNavClick}
                  >
                    {t.nav.faq}
                  </Link>
                </nav>

                {/* CTA Section */}
                <div className="border-t p-6 space-y-3">
                  <Link href="/quote" className="w-full" onClick={handleNavClick}>
                    <Button className="w-full h-11 text-base font-medium">
                      {t.ctaQuote}
                    </Button>
                  </Link>
                  <a 
                    href={`tel:${PHONE_E164}`}
                    className="flex h-11 items-center justify-center px-3 text-base font-medium text-muted-800 hover:bg-muted-100 hover:text-muted-900 rounded-lg transition-colors"
                    onClick={handleNavClick}
                  >
                    Call {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
