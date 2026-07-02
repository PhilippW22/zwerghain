import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import WaveDivider from '@/components/ui/WaveDivider'

export const metadata: Metadata = {
  title: 'Events & Feiern',
  description:
    'Kindergeburtstag, Baby Shower oder Familienfest im Zwerghain Berlin-Lichterfelde. Drei Geburtstagsangebote – von entspannt bis unvergesslich.',
}

const pakete: {
  image: string
  name: string
  paketKey: string
  preis: string
  dauer: string
  beschreibung: string
  highlight: boolean
  badge?: string
  items: string[]
  anlass: string
}[] = [
  {
    image: '/images/eichhoernchenfeier.png',
    paketKey: 'eichhoernchen',
    name: 'Eichhörnchen-Feier',
    preis: '329 €',
    dauer: '2,5 Stunden',
    beschreibung: 'Die entspannte Basis für einen schönen Geburtstag im kleinen Kreis.',
    highlight: false,
    items: [
      'Exklusive Nutzung des Cafés',
      'Dekoration in Wunschfarbe (pink, lila, gelb, grün oder blau)',
      'Wasser & Apfelschorle für die Kinder',
      'Frische & süße Etagere für die Kinder (Gemüsesticks & Obst)',
      'Geburtstagskuchen',
    ],
    anlass: 'geburtstag',
  },
  {
    image: '/images/fuchsfeier.png',
    paketKey: 'fuchs',
    name: 'Fuchs-Feier',
    preis: '399 €',
    dauer: '2,5 Stunden',
    beschreibung: 'Mehr Atmosphäre & ein rundes Geburtstagskonzept.',
    highlight: true,
    badge: 'Beliebt',
    items: [
      'Alles aus der Eichhörnchen-Feier',
      'Motto-Dekoration nach Wunsch (z. B. Prinzessin, Dino, Paw Patrol, Waldtiere)',
      '4 Helium-Ballons',
      'Tischdeko & Geschirr im passenden Motto',
      'Geburtstagskuchen im jeweiligen Motto',
    ],
    anlass: 'geburtstag',
  },
  {
    image: '/images/eulenfeier.png',
    paketKey: 'eule',
    name: 'Eulen-Feier',
    preis: '499 €',
    dauer: '2,5 Stunden',
    beschreibung: 'Das Rundum-sorglos-Erlebnis für einen unvergesslichen Tag.',
    highlight: false,
    items: [
      'Alles aus der Fuchs-Feier',
      'Erweiterte, liebevoll gestaltete Motto-Dekoration',
      '1 Stunde betreute Kinderaktion (Basteln)',
      'Warmes Essen: Pizza Margherita, Nudeln mit Tomatensoße oder Kartoffelecken mit Kräuterquark',
    ],
    anlass: 'geburtstag',
  },
]

const gradientBg = {
  background:
    'radial-gradient(ellipse at 20% 50%, rgb(212, 212, 190) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgb(212, 212, 190) 0%, transparent 50%)',
}

export default function EventsPage() {
  return (
    <>
      {/* Intro */}
      <section
        aria-labelledby="events-heading"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-brand-green uppercase tracking-widest mb-3">
            Feiern im Zwerghain
          </p>
          <h1
            id="events-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug"
          >
            Kindergeburtstag, Baby Shower & besondere Familienmomente in Berlin-Lichterfelde
          </h1>
          <p className="mt-4 text-gray-700 text-base sm:text-lg leading-relaxed">
            Im Zwerghain entstehen Feiern mit Leichtigkeit: ein geschützter Raum zum Spielen,
            liebevolle Details, entspannte Abläufe und viel Zeit für schöne Erinnerungen. Für
            Kindergeburtstage haben wir drei Pakete vorbereitet. Baby Shower, Taufen oder
            Familienfeste sind auf Anfrage ebenfalls möglich.
           </p>
        </div>
      </section>

      {/* Pakete – grün */}
      <section
        className="relative bg-brand-green py-12 sm:py-16 overflow-hidden"
        aria-labelledby="pakete-heading"
      >
        <div className="absolute inset-0 opacity-30" aria-hidden="true" style={gradientBg} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">

          <div className="text-center">
            <h2 id="pakete-heading" className="text-2xl sm:text-3xl font-bold text-white">
              Unsere Geburtstagsangebote
            </h2>
            <p className="mt-2 text-white/70 text-sm sm:text-base">
              2,5 Stunde inklusive · Für bis zu 10 Kinder · Exklusive Nutzung des Cafés
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {pakete.map((paket) => (
              <article
                key={paket.name}
                className={`relative flex flex-col rounded-3xl overflow-hidden border transition-all ${
                  paket.highlight
                    ? 'bg-white border-white shadow-2xl md:scale-105'
                    : 'bg-white/10 backdrop-blur-sm border-white/20'
                }`}
              >
                {/* Badge */}
                {paket.highlight && paket.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center rounded-full bg-brand-green px-3 py-1 text-xs font-semibold text-white">
                      {paket.badge}
                    </span>
                  </div>
                )}

                <div className="flex flex-col gap-5 p-6 sm:p-8 flex-1">

                  {/* Illustration + Name */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 relative mb-3">
                      <Image
                        src={paket.image}
                        alt={paket.name}
                        fill
                        className="object-contain"
                        sizes="128px"
                      />
                    </div>
                    <h3 className={`text-xl font-bold ${paket.highlight ? 'text-gray-900' : 'text-white'}`}>
                      {paket.name}
                    </h3>
                    <p className={`mt-1 text-sm leading-relaxed ${paket.highlight ? 'text-gray-600' : 'text-white/70'}`}>
                      {paket.beschreibung}
                    </p>
                  </div>

                  {/* Preis */}
                  <div className={`rounded-2xl px-4 py-4 ${paket.highlight ? 'bg-brand-green/5' : 'bg-white/10'}`}>
                    <p className={`text-3xl font-bold ${paket.highlight ? 'text-brand-green' : 'text-white'}`}>
                      {paket.preis}
                    </p>
                    <p className={`text-xs mt-0.5 ${paket.highlight ? 'text-gray-500' : 'text-white/60'}`}>
                      {paket.dauer} · exklusiv
                    </p>
                  </div>

                  {/* Leistungen */}
                  <ul className="flex flex-col gap-2.5 flex-1" role="list">
                    {paket.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <svg
                          className={`w-4 h-4 mt-0.5 shrink-0 ${paket.highlight ? 'text-brand-green' : 'text-white/70'}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={`text-sm leading-relaxed ${paket.highlight ? 'text-gray-700' : 'text-white/90'}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={`/kontakt?anlass=geburtstag&paket=${paket.paketKey}`}
                    aria-label={`${paket.name} anfragen`}
                    className={`mt-2 block text-center px-5 py-3 rounded-2xl text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      paket.highlight
                        ? 'bg-brand-green text-white hover:bg-brand-green/90 focus-visible:ring-brand-green focus-visible:ring-offset-white'
                        : 'bg-white text-brand-green hover:bg-white/90 focus-visible:ring-white focus-visible:ring-offset-brand-green'
                    }`}
                  >
                    Jetzt anfragen
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Hinweise */}
          <div className="max-w-3xl mx-auto w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl px-6 sm:px-8 py-6 flex flex-col gap-3">
            <p className="text-sm font-semibold text-white mb-1">Gut zu wissen</p>
            <p className="text-sm text-white/80 leading-relaxed">
              <span className="font-medium text-white">Kleinere Gruppen:</span> Auch Feiern mit
              weniger als 5 Kindern sind herzlich willkommen – sprecht uns einfach an.
            </p>
            <p className="text-sm text-white/80 leading-relaxed">
              <span className="font-medium text-white">Für Erwachsene:</span> Eltern, Großeltern
              und weitere Gäste sind immer willkommen. Speisen und Getränke für Erwachsene werden
              nach Verbrauch abgerechnet.
            </p>
            <p className="text-sm text-white/80 leading-relaxed">
              <span className="font-medium text-white">Weitere Anlässe:</span> Baby Shower, Taufen
              oder Familienfeste sind auf Anfrage ebenfalls möglich.
            </p>
          </div>

        </div>
      </section>

      <WaveDivider fromColor="#83A17D" toColor="#F5F5DC" />

      {/* Abschluss CTA */}
      <section
        aria-labelledby="events-cta-heading"
        className="py-16 text-center"
      >
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-sm font-semibold text-brand-green uppercase tracking-widest mb-3">
            Unverbindlich anfragen
          </p>
          <h2
            id="events-cta-heading"
            className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
          >
            Lasst uns eure Feier gemeinsam planen
          </h2>
          <p className="text-gray-700 text-base sm:text-lg mb-8 leading-relaxed">
            Erzählt uns von eurem Anlass, eurem Wunschtermin und euren Ideen. Wir beraten euch
            persönlich und finden das passende Paket für eure Familie.
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