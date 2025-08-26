'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/components/shared/i18n-provider'
import { PHONE_E164 } from '@/src/config/brand'
import en from '@/locales/en'
import ru from '@/locales/ru'

export default function Hero() {
  const { lang } = useI18n()
  const t = lang === 'ru' ? ru : en

  return (
    <section className="section bg-gradient-to-br from-muted-50 to-white">
      <div className="container grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-muted-800 to-muted-600 bg-clip-text text-transparent">
            {t.heroH1}
          </h1>
          <p className="text-lg text-muted-600 leading-relaxed">{t.sub}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/quote">
              <Button 
                className="w-full sm:w-auto"
                aria-label={lang === 'ru' ? 'Получить мгновенный расчёт' : 'Get instant quote'}
              >
                {t.ctaQuote}
              </Button>
            </a>
            <a href={`tel:${PHONE_E164}`}>
              <Button variant="outline" className="w-full sm:w-auto">
                {t.ctaCall}
              </Button>
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-soft">
          <Image
            src="/hero-image.jpg"
            alt="Professional lawn care service"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
            priority
            onError={(e) => {
              // Fallback to gradient background if image doesn't exist
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                parent.classList.add('bg-gradient-to-br', 'from-brand/20', 'to-brand/10', 'flex', 'items-center', 'justify-center', 'border', 'border-brand/10')
                parent.innerHTML = `
                  <div class="text-center text-muted-600">
                    <div class="text-4xl mb-3">🌱</div>
                    <div class="text-lg font-medium">Add your hero image</div>
                    <div class="text-sm opacity-60">Place hero-image.svg in public/</div>
                  </div>
                `
              }
            }}
          />
        </div>
      </div>
    </section>
  )
}
