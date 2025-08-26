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
    <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur animate-slide-down">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold animate-fade-in-left">
          {/* Logo */}
          <div className="relative w-8 h-8 shrink-0 hover:scale-110 transition-transform duration-200">
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
              <span className="text-brand font-bold text-sm">M</span>
              <span className="sr-only">MowJet logo placeholder</span>
            </div>
          </div>
          <span>{NAME}</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden gap-6 md:flex animate-fade-in-up">
          {[
            { href: "/#services", label: t.nav.services, delay: "delay-100" },
            { href: "/#pricing", label: t.nav.pricing, delay: "delay-200" },
            { href: "/#how-it-works", label: "How it works", delay: "delay-300" },
            { href: "/#reviews", label: t.nav.reviews, delay: "delay-400" },
            { href: "/#service-area", label: t.nav.area, delay: "delay-500" },
            { href: "/#faq", label: t.nav.faq, delay: "delay-600" }
          ].map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105 ${link.delay}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex animate-fade-in-right">
          <Link href="/quote">
            <Button size="sm" className="hover:scale-105 transition-transform duration-200">
              {t.ctaQuote}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-3 md:hidden animate-fade-in-right">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`p-2 transition-all duration-200 hover:scale-110 ${isOpen ? 'invisible pointer-events-none' : ''}`}
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
                        <span className="text-brand font-bold text-sm">M</span>
                        <span className="sr-only">MowJet logo placeholder</span>
                      </div>
                    </div>
                    <span className="text-lg font-semibold">{NAME}</span>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-1 p-6">
                  {[
                    { href: "/#services", label: t.nav.services },
                    { href: "/#pricing", label: t.nav.pricing },
                    { href: "/#how-it-works", label: "How it works" },
                    { href: "/#reviews", label: t.nav.reviews },
                    { href: "/#service-area", label: t.nav.area },
                    { href: "/#faq", label: t.nav.faq }
                  ].map((link, index) => (
                    <Link 
                      key={link.href}
                      href={link.href} 
                      className="flex h-11 items-center px-3 text-base font-medium text-muted-800 hover:bg-muted-100 hover:text-muted-900 rounded-lg transition-all duration-300 hover:translate-x-2"
                      onClick={handleNavClick}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* CTA Section */}
                <div className="border-t p-6 space-y-3">
                  <Link href="/quote" className="w-full" onClick={handleNavClick}>
                    <Button className="w-full h-11 text-base font-medium hover:scale-105 transition-transform duration-200">
                      {t.ctaQuote}
                    </Button>
                  </Link>
                  <a 
                    href={`tel:${PHONE_E164}`}
                    className="flex h-11 items-center justify-center px-3 text-base font-medium text-muted-800 hover:bg-muted-100 hover:text-muted-900 rounded-lg transition-all duration-300 hover:scale-105"
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
