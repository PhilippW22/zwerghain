'use client'

import { useState } from 'react'
import Link from 'next/link'

const faqs = [
  {
    question: 'Was ist das Zwerghain?',
    answer: (
      <>
        Das Zwerghain ist ein liebevoll gestaltetes Kinder- und Familiencafé in Berlin-Lichterfelde
        mit Spielbereich und Eventlocation. Hier treffen freies Spiel, Genuss und entspannte
        Familienzeit aufeinander.
      </>
    ),
  },
  {
    question: 'Für welches Alter ist das Café geeignet?',
    answer: (
      <>
        Unser Angebot richtet sich vor allem an Babys, Kleinkinder und Vorschulkinder. Ältere
        Geschwister sind herzlich willkommen, solange das Miteinander respektvoll und altersgerecht
        bleibt.
      </>
    ),
  },
  {
    question: 'Muss ich reservieren?',
    answer: (
      <>
        Für einen spontanen Cafébesuch ist keine Reservierung zwingend notwendig, wir empfehlen sie
        jedoch. Für unser Sonntagsfrühstück sowie für Feiern ist eine Reservierung erforderlich.
      </>
    ),
  },
  {
    question: 'Kann ich bei euch feiern?',
    answer: (
      <>
        Ja! Ob Kindergeburtstag, Taufe oder Familienfest – auch eine exklusive Anmietung ist
        möglich. Geburtstagsanfragen stellt ihr bitte direkt über unser{' '}
        <Link href="/kontakt?anlass=geburtstag" className="underline text-white/80 hover:text-white transition-colors">
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
        Neben kinderfreundlichen Speisen bieten wir euch auch herzhafte und süße Waffeln, Bagels
        sowie eine wechselnde Auswahl an Kuchen an.
      </>
    ),
  },
  {
    question: 'Spielbereich & Konzept',
    answer: (
      <>
        Im Mittelpunkt steht freies, selbstbestimmtes Spielen. Kinder entdecken unsere Spielbereiche
        in ihrem eigenen Tempo, während ihr als Eltern entspannt genießen könnt.
      </>
    ),
  },
  {
    question: 'Preise & Ausstattung',
    answer: (
      <>
        Für den Spielbereich fällt eine einmalige Gebühr von 3,00 € pro Kind an. Wir legen großen
        Wert auf ein sauberes, gepflegtes und liebevoll ausgestattetes Café, damit ihr euch rundum
        wohlfühlen könnt. Hochstühle sowie ein Wickeltisch stehen selbstverständlich zur Verfügung.
      </>
    ),
  },
  {
    question: 'Adresse & Kontakt',
    answer: (
      <>
        Baseler Straße 2, 12205 Berlin-Lichterfelde. Gut erreichbar mit der S1 sowie dem Bus M11
        bis Bahnhof Lichterfelde West. Ihr erreicht uns telefonisch, per E-Mail, über unser{' '}
        <Link href="/kontakt" className="underline text-white/80 hover:text-white transition-colors">
          Kontaktformular
        </Link>{' '}
        oder direkt vor Ort.
      </>
    ),
  },
  {
    question: 'Wichtige Hinweise',
    answer: (
      <>
        Bitte bringt Stoppersocken oder Hausschuhe mit (bei Bedarf auch bei uns erhältlich). Eigene
        Speisen und Getränke müssen bitte draußen bleiben – wir versorgen euch sehr gerne mit allem,
        was ihr für eine entspannte und genussvolle Zeit bei uns braucht.
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