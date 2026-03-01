import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import WaveDivider from '@/components/ui/WaveDivider'

export const metadata: Metadata = {
  title: 'Events & Feiern',
  description:
    'Kindergeburtstag, Baby Shower oder Familienfest im Zwerghain Berlin-Lichterfelde. Entdeckt unsere Pakete und bucht eure exklusive Feier.',
}

const geburtstagsPakete = [
  {
    image: '/images/eichhoernchen.png',
    imageAlt: 'Paket Eichhörnchen – Kindergeburtstag im Zwerghain während des Cafébetriebs',
    title: 'Eichhörnchen',
    subtitle: 'Geburtstag während des Cafébetriebs',
    description: 'Für bis zu 5 Kinder – der perfekte Einstieg ins Zwerghain-Geburtstagserlebnis.',
    items: [
      'Reservierter, bunt dekorierter Kindertisch',
      'Zwerghain-Waffeln (mit Wunsch-Toppings), frische Gemüse-Sticks und Dip, Milchreis oder belegte Bagels',
      '1 Getränk pro Kind (Kakao, Schorle oder „Kies"-Saft)',
      'Kleine Geburtstagsüberraschung fürs Geburtstagskind',
    ],
    price: '16,00 € pro Kind',
    note: 'Mindestumsatz auf den Tisch: 55,00 € · Montagvormittag-Special (bis 12:00 Uhr): 10 % Rabatt auf das Gesamtpaket!',
    ariaLabel: 'Jetzt anfragen: Paket Eichhörnchen',
    kontaktHref: '/kontakt?anlass=eichhoernchen',
  },
  {
    image: '/images/fuchseule.png',
    imageAlt: 'Paket Fuchs & Eule – Exklusive Geburtstagsfeier im Zwerghain Berlin',
    title: 'Fuchs & Eule',
    subtitle: 'Exklusive Geburtstagsfeier im Zwerghain',
    description: 'Ab 6 Kindern und auf Anfrage – das gesamte Zwerghain exklusiv für euch.',
    items: [
      'Das gesamte Zwerghain-Café exklusiv für euch (2 Stunden)',
      'Individuelle Deko inklusive',
      'Zwerghain-Waffeln (mit Wunsch-Toppings), frische Gemüse-Sticks und Dip, Milchreis oder belegte Bagels',
      'Getränkeflatrate für Kinder',
      'Kleine Geburtstagsüberraschung fürs Geburtstagskind',
    ],
    price: 'ab 185,00 € für bis zu 6 Kinder',
    note: 'Jedes weitere Kind +17,00 € · Erwachsene nach Verzehr oder zubuchbares Kaffeepaket',
    ariaLabel: 'Jetzt anfragen: Paket Fuchs & Eule',
    kontaktHref: '/kontakt?anlass=fuchseule',
  },
]

const addons = [
  { label: 'Kinderschminken', price: '35,00 € pauschal' },
  { label: 'Schatzsuche', price: '39,00 € pauschal' },
  { label: 'Kinderdisco mit Musik & Licht', price: '28,00 € pauschal' },
  { label: 'Kinderanimation (Spiele & Bastelspaß, 45 Min.)', price: '55,00 €' },
  { label: 'Helden-Besuch (Prinzessin, Paw Patrol, Spider-Man u.v.m.)', price: 'auf Anfrage' },
]

const gradientBg = {
  background: 'radial-gradient(ellipse at 20% 50%, #079171 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #025a45 0%, transparent 50%)',
}

export default function EventsPage() {
  return (
    <>
      {/* Hero Intro */}
      <section
        aria-labelledby="events-heading"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center"
      >
        <h1
          id="events-heading"
          className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug max-w-5xl mx-auto"
        >
          Kindergeburtstag, Baby Shower & Familienfest in Berlin-Lichterfelde
        </h1>
        <p className="mt-4 text-gray-700 text-base sm:text-lg max-w-5xl mx-auto leading-relaxed">
          Wir machen euren besonderen Anlass unvergesslich, mit liebevoller Dekoration, leckerem Essen
          und einem Rahmen, der zu euch passt. Wählt aus unseren Geburtstagspaketen und ergänzt eure
          Feier ganz flexibel mit passenden Highlights wie Kinderschminken, Schatzsuche oder einer
          individuell gestalteten Torte. Ob Kindergeburtstag, Taufe, Baby Shower oder Familienfest –
          wir beraten euch gern persönlich und finden gemeinsam das passende Arrangement. Meldet euch
          telefonisch, sprecht uns direkt im Café an oder nutzt unser Kontaktformular.
        </p>
      </section>

      {/* Geburtstags-Pakete + Familienfeste – gemeinsamer grüner Bereich */}
      <section
        className="relative bg-brand-green py-12 sm:py-16 overflow-hidden"
      >
        {/* Hintergrund-Gradient */}
        <div className="absolute inset-0 opacity-30" aria-hidden="true" style={gradientBg} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">

          {/* Geburtstags-Pakete */}
          <div>
            <h2
              id="geburtstag-heading"
              className="text-2xl sm:text-3xl font-bold text-white text-center mb-10"
            >
              Geburtstagsspaß – feiert im Zwerghain!
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {geburtstagsPakete.map((paket) => (
                <article
                  key={paket.title}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden flex flex-col"
                >
                  <div className="w-full bg-white/5 flex items-start justify-center pt-4 pb-2">
                    <Image
                      src={paket.image}
                      alt={paket.imageAlt}
                      width={512}
                      height={512}
                      className="h-44 w-auto object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-6 sm:p-8 flex-1">
                    <div>
                      <h3 className="text-xl font-bold text-white">{paket.title}</h3>
                      <p className="text-sm font-medium text-white/60 mt-0.5">{paket.subtitle}</p>
                    </div>
                    <p className="text-white/90 text-sm">{paket.description}</p>
                    <ul className="flex flex-col gap-2 text-sm text-white/90" role="list">
                      {paket.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 w-2 h-2 rounded-full bg-white/60 shrink-0" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-4 border-t border-white/20">
                      <p className="text-base font-bold text-white">{paket.price}</p>
                      <p className="text-xs text-white/60 mt-1">{paket.note}</p>
                    </div>
                    <Link
                      href={paket.kontaktHref}
                      aria-label={paket.ariaLabel}
                      className="mt-2 block text-center bg-white text-brand-green px-5 py-3 rounded-2xl text-sm font-medium hover:bg-white/90 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green"
                    >
                      Jetzt anfragen
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Hausgemachter Geburtstagskuchen & Torten" variant="glass">
                <ul className="flex flex-col gap-2 text-sm" role="list">
                  {[
                    'Frischer Geburtstagskuchen für 10–12 Portionen (klassisch, Schoko oder vegan) – 28,00 €',
                    'Große, individuell gestaltete Torte nach Wunsch – ab 55,00 € (bitte frühzeitig anfragen)',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-white/60 shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/kontakt?anlass=kuchen"
                  aria-label="Jetzt anfragen: Geburtstagskuchen & Torten"
                  className="mt-4 inline-block bg-white text-brand-green px-5 py-3 rounded-2xl text-sm font-medium hover:bg-white/90 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green"
                >
                  Jetzt anfragen
                </Link>
              </Card>

              <Card title="Zubuchbare Highlights & Animation" variant="glass">
                <ul className="flex flex-col gap-3" role="list">
                  {addons.map((addon) => (
                    <li key={addon.label} className="flex items-start justify-between gap-4 text-sm">
                      <span className="flex items-start gap-2">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-white/60 shrink-0" aria-hidden="true" />
                        {addon.label}
                      </span>
                      <span className="font-medium text-white whitespace-nowrap">{addon.price}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/kontakt?anlass=allgemein"
                  aria-label="Jetzt anfragen: Zubuchbare Highlights & Animation"
                  className="mt-6 inline-block bg-white text-brand-green px-5 py-3 rounded-2xl text-sm font-medium hover:bg-white/90 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green"
                >
                  Jetzt anfragen
                </Link>
              </Card>
            </div>
          </div>

          {/* Familienfeste & Baby Shower */}
          <div>
            <h2
              id="familienfeste-heading"
              className="text-2xl sm:text-3xl font-bold text-white text-center mb-3"
            >
              Familienfeste, Taufe & Baby Shower
            </h2>
            <p className="text-center text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-10">
              Unverbindliche Anfrage und persönliche Beratung jederzeit –
              wir freuen uns darauf, mit euch zu feiern!
            </p>

            <div className="max-w-2xl mx-auto">
              <article className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden flex flex-col">
                <div className="w-full bg-white/5 flex items-start justify-center pt-4 pb-2">
                  <Image
                    src="/images/reh.png"
                    alt="Familienfest, Taufe oder Baby Shower im Zwerghain Berlin-Lichterfelde"
                    width={512}
                    height={512}
                    className="h-44 w-auto object-contain"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                </div>
                <div className="flex flex-col gap-3 p-6 sm:p-8 flex-1">
                  <div>
                    <h3 className="text-xl font-bold text-white">Besondere Momente</h3>
                    <p className="text-sm font-medium text-white/60 mt-0.5">
                      Familienfeste, Taufe & Baby Shower
                    </p>
                  </div>
                  <p className="text-white/90 text-sm">
                    Gebt besonderen Momenten einen liebevollen Rahmen.
                  </p>
                  <ul className="flex flex-col gap-2 text-sm text-white/90" role="list">
                    {[
                      'Exklusive Raumnutzung',
                      'Individuell dekorierter Tisch',
                      'Herzhafte und süße Speisen, Brunch-Etagere möglich',
                      'Personalisierte Torte auf Wunsch',
                      'Eigene Dekoration und Ablaufplanung',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-white/60 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4 border-t border-white/20">
                    <p className="text-base font-bold text-white">ab 225,00 € für bis zu 10 Gäste</p>
                    <p className="text-xs text-white/60 mt-1">Paket inkl. Basis-Deko & hausgebackenem Kuchen</p>
                  </div>
                  <Link
                    href="/kontakt?anlass=familienfest"
                    aria-label="Jetzt anfragen: Besondere Momente – Familienfeste, Taufe & Baby Shower"
                    className="mt-2 block text-center bg-white text-brand-green px-5 py-3 rounded-2xl text-sm font-medium hover:bg-white/90 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green"
                  >
                    Jetzt anfragen
                  </Link>
                </div>
              </article>
            </div>
          </div>

        </div>
      </section>
      <WaveDivider fromColor="#415F48" toColor="#F5F5DC" />

      {/* Abschluss CTA – beige, kein Wave nach unten */}
      <section
        aria-labelledby="events-cta-heading"
        className="py-16 text-center"
      >
        <div className="max-w-xl mx-auto px-4">
          <h2
            id="events-cta-heading"
            className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
          >
            Bereit zu feiern?
          </h2>
          <p className="text-gray-700 text-base sm:text-lg mb-8 leading-relaxed">
            Schreibt uns einfach – wir beraten euch gerne persönlich und
            schnüren ein Paket ganz nach euren Wünschen.
          </p>
          <Link
            href="/kontakt"
            aria-label="Jetzt unverbindlich anfragen – zur Kontaktseite"
            className="inline-block bg-brand-green text-white px-8 py-4 rounded-2xl text-base font-bold hover:bg-brand-green/90 transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
          >
            Jetzt unverbindlich anfragen
          </Link>
        </div>
      </section>
    </>
  )
}