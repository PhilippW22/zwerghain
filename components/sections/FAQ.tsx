'use client'

import { useState } from 'react'
import Link from 'next/link'
import WaveDivider from '@/components/ui/WaveDivider'

const faqs = [
  {
    question: 'Was ist das Zwerghain?',
    answer: (
      <>
        Das Zwerghain ist ein Kinder- und Familiencafé in Berlin-Lichterfelde mit integriertem
        Spielraum und Eventlocation. Bei uns treffen freies Spiel, bewusster Genuss und liebevoll
        gestaltete Feiern aufeinander.
      </>
    ),
  },
  {
    question: 'Für welches Alter ist das Café geeignet?',
    answer: (
      <>
        Unser Spielbereich richtet sich vor allem an Babys, Kleinkinder und Kinder im Vorschulalter.
        Ältere Geschwister sind natürlich ebenfalls willkommen, solange das gemeinsame Spielen
        respektvoll und altersgerecht gestaltet ist.
      </>
    ),
  },
  {
    question: 'Muss ich einen Platz reservieren?',
    answer: (
      <>
        Für den regulären Cafébesuch ist keine Reservierung notwendig. Für Kindergeburtstage,
        Baby Shower, Taufen oder andere besondere Anlässe empfehlen wir jedoch eine frühzeitige
        Anfrage über unser{' '}
        <Link href="/kontakt" className="underline text-white/80 hover:text-white transition-colors">
          Kontaktformular
        </Link>
        , telefonisch oder direkt vor Ort im Café.
      </>
    ),
  },
  {
    question: 'Welche Geburtstagspakete gibt es?',
    answer: (
      <>
        Wir bieten ein zentrales{' '}
        <Link href="/events#geburtstag-heading" className="underline text-white/80 hover:text-white transition-colors">
          Geburtstagspaket
        </Link>{' '}
        mit 3 Stunden exklusiver Nutzung für bis zu 10 Kinder. Enthalten sind Verpflegung,
        Dekoration und eine kleine Überraschung für das Geburtstagskind.
      </>
    ),
  },
  {
    question: 'Können Add-ons dazugebucht werden?',
    answer: (
      <>
        Ja, ihr könnt eure Feier individuell erweitern – zum Beispiel mit Kinderschminken,
        Kinderanimation, Bastelaktionen, Gastgeschenk-Tütchen oder einer individuell gestalteten
        Torte. Eine vollständige Übersicht findet ihr auf unserer{' '}
        <Link href="/events" className="underline text-white/80 hover:text-white transition-colors">
          Events-Seite
        </Link>
        . Wir beraten euch gerne persönlich.
      </>
    ),
  },
  {
    question: 'Kann ich das Zwerghain exklusiv mieten?',
    answer: (
      <>
        Ja, für größere Feiern wie Kindergeburtstage, Taufen, Baby Shower oder Familienfeste ist
        eine exklusive Raummiete möglich. Schreibt uns einfach über unser{' '}
        <Link href="/kontakt?anlass=familienfest" className="underline text-white/80 hover:text-white transition-colors">
          Kontaktformular
        </Link>
        .
      </>
    ),
  },
  {
    question: 'Gibt es Essen für Erwachsene?',
    answer: (
      <>
        Natürlich. Neben kinderfreundlichen Speisen bieten wir frisch gebrühten Kaffee, Cappuccino,
        Bio-Tee, Matcha, Bagels, Quiches, Porridge, Kuchen und vegane Leckereien. Am Wochenende
        gibt es zudem unser Familienfrühstück von 10:00 bis 14:00 Uhr. Alle Angebote findet ihr
        auf unserer{' '}
        <Link href="/speisekarte" className="underline text-white/80 hover:text-white transition-colors">
          Speisekarte
        </Link>
        .
      </>
    ),
  },
  {
    question: 'Gibt es spezielle Angebote für Babys?',
    answer: (
      <>
        Ja. Für die Kleinsten gibt es unter anderem eine Mini-Waffel ohne Zucker, Babyccino, Kakao
        oder Saft sowie altersgerechte Spielmöglichkeiten. Mehr dazu auf unserer{' '}
        <Link href="/speisekarte" className="underline text-white/80 hover:text-white transition-colors">
          Speisekarte
        </Link>
        .
      </>
    ),
  },
  {
    question: 'Wie funktioniert das Spielkonzept?',
    answer: (
      <>
        Im Zwerghain steht freies, selbstbestimmtes Spielen im Mittelpunkt. Kinder entdecken in
        ihrem eigenen Tempo verschiedene Spielbereiche, fördern Motorik, Kreativität und soziale
        Kompetenzen, während Eltern eine entspannte Auszeit genießen können. Mehr erfahrt ihr in
        unserem{' '}
        <Link href="/#about-us" className="underline text-white/80 hover:text-white transition-colors">
          Über-uns-Bereich
        </Link>
        .
      </>
    ),
  },
  {
    question: 'Wie hoch ist der Eintrittspreis?',
    answer: (
      <>
        Montag bis Freitag: 3,00 € pro Stunde · Samstag, Sonntag & Feiertage: 4,00 € pro Stunde ·
        Kleinkinder bis 1 Jahr: 2,00 € · Jede weitere Stunde: 1,00 €
      </>
    ),
  },
  {
    question: 'Wo befindet sich das Zwerghain?',
    answer: (
      <>
        Baseler Straße 2, 12205 Berlin-Lichterfelde. Gut erreichbar mit der S1 und dem Bus M11 bis
        Bahnhof Lichterfelde West.{' '}
        <a
          href="https://maps.google.com/?q=Baseler+Straße+2,+12205+Berlin"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-white/80 hover:text-white transition-colors"
        >
          Auf Google Maps anzeigen
        </a>
        .
      </>
    ),
  },
  {
    question: 'Wie kann ich euch kontaktieren?',
    answer: (
      <>
        Ihr erreicht uns telefonisch unter{' '}
        <a href="tel:+493012345678" className="underline text-white/80 hover:text-white transition-colors">
          030 / 12 345 678
        </a>
        , per{' '}
        <a href="mailto:hallo@zwerghain.com" className="underline text-white/80 hover:text-white transition-colors">
          E-Mail
        </a>
        , über unser{' '}
        <Link href="/kontakt" className="underline text-white/80 hover:text-white transition-colors">
          Kontaktformular
        </Link>{' '}
        oder direkt vor Ort im Café. Wir beraten euch persönlich und unverbindlich.
      </>
    ),
  },
]

function FAQItem({ question, answer }: { question: string; answer: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const id = question.replace(/\s+/g, '-').toLowerCase()

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-answer-${id}`}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green rounded-lg"
      >
        <span className="text-sm sm:text-base font-medium text-white group-hover:text-white/80 transition-colors">
          {question}
        </span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white transition-transform motion-reduce:transition-none ${open ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M8 3v10M3 8h10" />
          </svg>
        </span>
      </button>
      <div
        id={`faq-answer-${id}`}
        role="region"
        hidden={!open}
        className="pb-5"
      >
        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
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

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl px-6 sm:px-8 py-2">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>

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