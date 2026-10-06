import Link from 'next/link'
import { getFaqItems } from '@/lib/sanity'
import FAQClient from './FAQClient'

export default async function FAQ() {
  const faqItems = await getFaqItems()

  return (
    <>
      <section
        aria-labelledby="faq-heading"
        className="relative bg-brand-green py-16 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-30"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse at 20% 50%, #F5F5DC 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #F5F5DC 0%, transparent 50%)',
          }}
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2
              id="faq-heading"
              className="text-2xl sm:text-3xl font-bold text-white"
            >
              Häufige Fragen zum Zwerghain
            </h2>
          </div>

          <FAQClient items={faqItems} />

          <div className="mt-10 text-center">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6">
              Noch Fragen offen? Sprecht uns im Café an, ruft uns an oder sendet uns eine
              unverbindliche Anfrage über das{' '}
              <Link href="/kontakt" className="underline text-white hover:text-white/80 transition-colors">
                Kontaktformular
              </Link>
              . Wir freuen uns auf euch!
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-white text-brand-green px-6 py-3 rounded-2xl text-sm font-medium hover:bg-white/90 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}