'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import WaveDivider from '@/components/ui/WaveDivider'

const gradientBg = {
  background:
    'radial-gradient(ellipse at 20% 50%, rgb(212, 212, 190) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgb(212, 212, 190) 0%, transparent 50%)',
}

const geburtstagsPackete = [
  {
    image: '/images/eichhoernchenfeier.png',
    name: 'Eichhörnchen-Feier',
    paketKey: 'eichhoernchen',
    preis: '329 €',
    dauer: '2,5 Stunden',
    beschreibung: 'Die entspannte Basis für einen schönen Kindergeburtstag im kleinen Kreis.',
    items: [
      '2,5 Stunden exklusive Nutzung des Cafés',
      'Dekoration in einer Wunschfarbe: Rosa, Blau, Grün oder Gelb',
      'Passende Luftballons',
      'Wasser & Apfelschorle für die Kinder',
      'Frische & süße Etagere mit Gemüsesticks & Obst',
      'Himbeer-Vanille-Geburtstagstorte',
    ],
    hinweis: 'Ihr möchtet ein bestimmtes Motto? Auch bei der Eichhörnchen-Feier könnt ihr statt der farblichen Gestaltung eine Mottodekoration für zusätzlich 50 € buchen.',
  },
  {
    image: '/images/fuchsfeier.png',
    name: 'Fuchs-Feier',
    paketKey: 'fuchs',
    preis: '429 €',
    dauer: '2,5 Stunden',
    beschreibung: 'Für alle, die sich zum Geburtstag ein bisschen mehr wünschen.',
    items: [
      '2,5 Stunden exklusive Nutzung des Cafés',
      'Liebevoll gestaltete Mottodekoration nach Wahl',
      'Passende Tischdekoration & Geschirr',
      'Luftballons passend zum Motto',
      'Aufblasbare Geburtstagszahl',
      'Wasser & Apfelschorle für die Kinder',
      'Frische & süße Etagere mit Gemüsesticks & Obst',
      'Himbeer-Vanille-Geburstagstorte passend zum Motto dekoriert',
      'Warmes Essen: Pizza Margherita oder Nudeln mit Tomatensoße in Bio-Qualität',
    ],
    hinweis: null,
  },
]

const brunchPakete = [
  {
    name: 'Private Brunch Small',
    paketKey: 'small',
    preis: '329 €',
    kapazitaet: 'bis zu 6 Erwachsene + 3 Kinder',
    items: [
      '2,5 Stunden Zwerghain exklusiv für euch',
      '3 große Zwerghain-Frühstücksetageren',
      'Brötchen & Croissants',
      'Käse- & Wurstauswahl',
      'Butter, Frischkäse & süße Aufstriche',
      'Frisches Obst & Gemüse',
      'Wasser auf den Tischen',
      'Komplette Nutzung unserer Spielbereiche',
    ],
  },
  {
    name: 'Private Brunch Large',
    paketKey: 'large',
    preis: '469 €',
    kapazitaet: 'bis zu 10 Erwachsene + 5 Kinder',
    items: [
      '2,5 Stunden Zwerghain exklusiv für euch',
      '5 große Zwerghain-Frühstücksetageren',
      'Brötchen & Croissants',
      'Käse- & Wurstauswahl',
      'Butter, Frischkäse & süße Aufstriche',
      'Frisches Obst & Gemüse',
      'Wasser auf den Tischen',
      'Komplette Nutzung unserer Spielbereiche',
    ],
  },
]

type Tab = 'geburtstag' | 'brunch'

const cardClass = 'bg-white border border-white shadow-sm rounded-3xl overflow-hidden flex flex-col'
const checkClass = 'text-brand-green'
const titleClass = 'text-gray-900'
const bodyClass = 'text-gray-700'
const subtleClass = 'text-gray-500'
const priceClass = 'text-brand-green'
const priceBgClass = 'bg-brand-green/5'
const ctaClass = 'bg-brand-green text-white hover:bg-brand-green/90 focus-visible:ring-brand-green focus-visible:ring-offset-white'
const hintBgClass = 'bg-brand-green/5 text-gray-600'

export default function EventsTabs() {
  const [activeTab, setActiveTab] = useState<Tab>('geburtstag')

  return (
    <>
      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div
          role="tablist"
          aria-label="Angebote"
          className="flex rounded-2xl bg-gray-100 p-1 max-w-sm mx-auto"
        >
          <button
            role="tab"
            aria-selected={activeTab === 'geburtstag'}
            aria-controls="panel-geburtstag"
            id="tab-geburtstag"
            onClick={() => setActiveTab('geburtstag')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'geburtstag'
                ? 'bg-white text-brand-green shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🐿️ Kindergeburtstage
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'brunch'}
            aria-controls="panel-brunch"
            id="tab-brunch"
            onClick={() => setActiveTab('brunch')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'brunch'
                ? 'bg-white text-brand-green shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🥐 Private Brunch
          </button>
        </div>
      </div>

      {/* ── KINDERGEBURTSTAGE ── */}
      <div
        role="tabpanel"
        id="panel-geburtstag"
        aria-labelledby="tab-geburtstag"
        hidden={activeTab !== 'geburtstag'}
      >
        <section
          className="relative bg-brand-green py-12 sm:py-16 overflow-hidden"
          aria-labelledby="geburtstag-heading"
        >
          <div className="absolute inset-0 opacity-30" aria-hidden="true" style={gradientBg} />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">

            <div className="text-center">
              <h2 id="geburtstag-heading" className="text-2xl sm:text-3xl font-bold text-white">
                Unsere Kindergeburtstagspakete
              </h2>
              <p className="mt-2 text-white/70 text-sm sm:text-base">
                Für bis zu 10 Kinder · exklusive Nutzung des Cafés
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
              {geburtstagsPackete.map((paket) => (
                <article key={paket.name} className={cardClass}>
                  <div className="flex justify-center pt-6 pb-2">
                    <div className="w-32 h-32 relative">
                      <Image
                        src={paket.image}
                        alt={paket.name}
                        fill
                        className="object-contain"
                        sizes="128px"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 px-6 pb-6 sm:px-8 sm:pb-8 flex-1">
                    <div className="text-center">
                      <h3 className={`text-xl font-bold ${titleClass}`}>{paket.name}</h3>
                      <p className={`mt-1 text-sm leading-relaxed ${subtleClass}`}>{paket.beschreibung}</p>
                    </div>

                    <div className={`rounded-2xl px-4 py-4 ${priceBgClass}`}>
                      <p className={`text-3xl font-bold ${priceClass}`}>{paket.preis}</p>
                      <p className={`text-xs mt-0.5 ${subtleClass}`}>{paket.dauer} · exklusiv</p>
                    </div>

                    <ul className="flex flex-col gap-2.5 flex-1" role="list">
                      {paket.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <svg
                            className={`w-4 h-4 mt-0.5 shrink-0 ${checkClass}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className={`text-sm leading-relaxed ${bodyClass}`}>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {paket.hinweis && (
                      <p className={`text-xs leading-relaxed rounded-2xl px-4 py-3 ${hintBgClass}`}>
                        {paket.hinweis}
                      </p>
                    )}

                    <Link
                      href={`/kontakt?anlass=geburtstag&paket=${paket.paketKey}`}
                      aria-label={`${paket.name} anfragen`}
                      className={`mt-2 block text-center px-5 py-3 rounded-2xl text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 ${ctaClass}`}
                    >
                      Jetzt anfragen
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="max-w-4xl mx-auto w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl px-6 sm:px-8 py-6 flex flex-col gap-3">
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
            </div>

          </div>
        </section>
      </div>

      {/* ── PRIVATE BRUNCH ── */}
      <div
        role="tabpanel"
        id="panel-brunch"
        aria-labelledby="tab-brunch"
        hidden={activeTab !== 'brunch'}
      >
        <section
          className="relative bg-brand-green py-12 sm:py-16 overflow-hidden"
          aria-labelledby="brunch-heading"
        >
          <div className="absolute inset-0 opacity-30" aria-hidden="true" style={gradientBg} />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">

            {/* Einleitung */}
            <div className="max-w-3xl mx-auto w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl px-6 sm:px-8 py-8 flex flex-col gap-4">
              <h2 id="brunch-heading" className="text-2xl sm:text-3xl font-bold text-white">
                Das ganze Zwerghain. Nur für euch. 🤍
              </h2>
              <div className="flex flex-col gap-3 text-white/90 text-sm sm:text-base leading-relaxed">
                <p>
                Ein entspannter Samstagvormittag mit euren Lieblingsmenschen: Für 2,5 Stunden gehört das gesamte Zwerghain exklusiv euch. Ihr frühstückt gemeinsam an eurer eigenen großen Tafel, während die Kleinen unsere Spielbereiche entdecken und nach Herzenslust spielen können.
                </p>
                <p>
                Perfekt für Babyshowers, Taufen, Baby-Welcomes, Geburtstage oder einfach einen besonderen Vormittag mit Familie und Freunden.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                {['🥐 Samstagvormittags', '⏰ 9:30–12:00 Uhr', '🔑 2,5 Std. exklusiv', '🛝 Spielbereiche inklusive'].map(tag => (
                  <span key={tag} className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs text-white font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Brunch-Pakete */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
              {brunchPakete.map((paket) => (
                <article key={paket.name} className={cardClass}>
                  <div className="flex flex-col gap-5 p-6 sm:p-8 flex-1">
                    <div>
                      <h3 className={`text-xl font-bold ${titleClass}`}>{paket.name}</h3>
                      <p className={`mt-1 text-sm ${subtleClass}`}>{paket.kapazitaet}</p>
                    </div>

                    <div className={`rounded-2xl px-4 py-4 ${priceBgClass}`}>
                      <p className={`text-3xl font-bold ${priceClass}`}>{paket.preis}</p>
                      <p className={`text-xs mt-0.5 ${subtleClass}`}>2,5 Stunden · exklusiv</p>
                    </div>

                    <ul className="flex flex-col gap-2.5 flex-1" role="list">
                      {paket.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <svg
                            className={`w-4 h-4 mt-0.5 shrink-0 ${checkClass}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className={`text-sm leading-relaxed ${bodyClass}`}>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/kontakt?anlass=brunch&paket=${paket.paketKey}`}
                      className={`mt-2 block text-center px-5 py-3 rounded-2xl text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 ${ctaClass}`}
                    >
                      Jetzt anfragen
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Getränke */}
            <div className="max-w-4xl mx-auto w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl px-6 sm:px-8 py-6">
              <h3 className="text-base font-bold text-white mb-2">☕ Kaffee & Lieblingsgetränke</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Cappuccino, Latte Macchiato, Café Crème, Säfte und weitere Getränke könnt ihr
                ganz unkompliziert nach Verbrauch dazu bestellen.
              </p>
            </div>

            {/* Noch mehr Gäste */}
            <div className="max-w-4xl mx-auto w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl px-6 sm:px-8 py-6 flex flex-col gap-4">
              <h3 className="text-base font-bold text-white">Noch mehr Gäste? Kein Problem.</h3>
              <ul className="flex flex-col gap-2" role="list">
                {[
                  { label: 'Weitere Frühstücksetagere für 2 Erwachsene + 1 Kind', preis: '38 €' },
                  { label: 'Zusätzlicher Kinder-Frühstücksteller', preis: '8 €' },
                ].map(extra => (
                  <li key={extra.label} className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-white/80">{extra.label}</span>
                    <span className="font-semibold text-white whitespace-nowrap">{extra.preis}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tischstyling */}
            <div className="max-w-4xl mx-auto w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl px-6 sm:px-8 py-6 flex flex-col gap-4">
              <h3 className="text-base font-bold text-white">🌸 Ein bisschen hübscher?</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Auf Wunsch decken und dekorieren wir eure Tafel passend zu eurem Anlass oder
                eurer Lieblingsfarbe – mit passenden Servietten, kleinen Dekoelementen und
                frischen Blümchen.
              </p>
              <ul className="flex flex-col gap-2" role="list">
                {[
                  { label: 'Tischstyling Small', preis: '29 €' },
                  { label: 'Tischstyling Large', preis: '39 €' },
                ].map(extra => (
                  <li key={extra.label} className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-white/80">{extra.label}</span>
                    <span className="font-semibold text-white whitespace-nowrap">{extra.preis}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Besondere Tage */}
            <div className="max-w-4xl mx-auto w-full bg-white rounded-3xl shadow-sm px-6 sm:px-8 py-6 flex flex-col gap-4">
  <h3 className="text-base font-bold text-brand-green">🤍 Für die ganz besonderen Tage</h3>
  <div className="flex flex-wrap gap-2">
    {['🍼 Babyshower', '✝️ Taufe', '👶 Baby-Welcome'].map(tag => (
      <span key={tag} className="bg-brand-green/10 text-brand-green rounded-full px-4 py-1.5 text-sm font-medium">
        {tag}
      </span>
    ))}
  </div>
  <p className="text-sm text-gray-600 leading-relaxed">
    Auf Wunsch richten wir euch einen kleinen Gästebuch-Platz ein. Eure Gäste können
    dort Wünsche und persönliche Worte für das Baby oder Taufkind hinterlassen –
    und ihr nehmt das Gästebuch anschließend als Erinnerung mit nach Hause.
  </p>
</div>

            {/* Abschluss */}
            <div className="max-w-3xl mx-auto w-full text-center flex flex-col gap-4">
              <p className="text-white font-bold text-lg">
                Schickt uns einfach Wunschdatum + Personenzahl + Anlass – wir schauen, ob euer Samstag noch frei ist.
              </p>
              <Link
                href="/kontakt"
                className="inline-block bg-white text-brand-green px-8 py-4 rounded-2xl text-base font-bold hover:bg-white/90 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green mx-auto"
              >
                Jetzt anfragen
              </Link>
            </div>

          </div>
        </section>
      </div>

      <WaveDivider fromColor="#83A17D" toColor="#F5F5DC" />

      {/* Individuelle Anfrage */}
      <section aria-labelledby="events-individuell-heading" className="py-16 text-center bg-brand-beige">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-sm font-semibold text-brand-green uppercase tracking-widest mb-3">
            Eure Idee ist noch nicht dabei?
          </p>
          <h2
            id="events-individuell-heading"
            className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
          >
            Dann erzählt uns davon!
          </h2>
          <p className="text-gray-700 text-base sm:text-lg mb-8 leading-relaxed">
            Nicht jede Feier passt in ein fertiges Paket – und das muss sie auch nicht.
            Wenn ihr einen besonderen Anlass plant, eigene Ideen habt oder noch nicht das
            passende Angebot gefunden habt, schreibt uns einfach. Erzählt uns, was ihr euch
            vorstellt, und wir schauen gemeinsam, welche Möglichkeiten wir im Zwerghain für
            euch umsetzen können.
          </p>
          <Link
            href="/kontakt?anlass=individuell"
            className="inline-block bg-brand-green text-white px-8 py-4 rounded-2xl text-base font-bold hover:bg-brand-green/90 transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
          >
            Individuelle Anfrage stellen
          </Link>
        </div>
      </section>
    </>
  )
}