'use client'

import { useState } from 'react'
import Link from 'next/link'

const faqs = [
  {
    question: 'Was ist das Zwerghain?',
    answer: 'Das Zwerghain ist ein Kinder- und Familiencafé in Berlin-Lichterfelde mit integriertem Spielraum und Eventlocation. Bei uns treffen freies Spiel, bewusster Genuss und liebevoll gestaltete Feiern aufeinander.',
  },
  {
    question: 'Für welches Alter ist das Café geeignet?',
    answer: 'Unser Spielbereich richtet sich vor allem an Babys, Kleinkinder und Kinder im Vorschulalter. Ältere Geschwister sind natürlich ebenfalls willkommen, solange das gemeinsame Spielen respektvoll und altersgerecht gestaltet ist.',
  },
  {
    question: 'Muss ich einen Platz reservieren?',
    answer: 'Für den regulären Cafébesuch ist keine Reservierung notwendig. Für Kindergeburtstage, Baby Shower, Taufen oder andere besondere Anlässe empfehlen wir jedoch eine frühzeitige Anfrage über unser Kontaktformular, telefonisch oder direkt vor Ort im Café.',
  },
  {
    question: 'Welche Geburtstagspakete gibt es?',
    answer: 'Ihr könnt zwischen zwei Geburtstagsmodellen wählen: Eichhörnchen – Feiern während des Cafébetriebs für bis zu 5 Kinder, und Fuchs & Eule – Exklusive Geburtstagsfeier mit kompletter Raummiete. Beide Pakete beinhalten Verpflegung, Dekoration und eine kleine Überraschung für das Geburtstagskind.',
  },
  {
    question: 'Können Add-ons dazugebucht werden?',
    answer: 'Ja, ihr könnt eure Feier individuell erweitern – zum Beispiel mit Kinderschminken, Schatzsuche, Kinderdisco, Kinderanimation, Helden-Besuch oder einer individuell gestalteten Torte. Wir beraten euch gerne persönlich.',
  },
  {
    question: 'Kann ich das Zwerghain exklusiv mieten?',
    answer: 'Ja, für größere Feiern wie Kindergeburtstage, Taufen, Baby Shower oder Familienfeste ist eine exklusive Raummiete möglich. Dabei gestalten wir Dekoration, Speisen und Ablauf ganz nach euren Wünschen.',
  },
  {
    question: 'Gibt es Essen für Erwachsene?',
    answer: 'Natürlich. Neben kinderfreundlichen Speisen bieten wir frisch gebrühten Kaffee, Cappuccino, Bio-Tee, Matcha, Bagels, Quiches, Porridge, Kuchen und vegane Leckereien. Am Wochenende gibt es zudem unser Familienfrühstück von 10:00 bis 14:00 Uhr.',
  },
  {
    question: 'Gibt es spezielle Angebote für Babys?',
    answer: 'Ja. Für die Kleinsten gibt es unter anderem eine Mini-Waffel ohne Zucker, Babyccino, Kakao oder Saft sowie altersgerechte Spielmöglichkeiten.',
  },
  {
    question: 'Wie funktioniert das Spielkonzept?',
    answer: 'Im Zwerghain steht freies, selbstbestimmtes Spielen im Mittelpunkt. Kinder entdecken in ihrem eigenen Tempo verschiedene Spielbereiche, fördern Motorik, Kreativität und soziale Kompetenzen, während Eltern eine entspannte Auszeit genießen können.',
  },
  {
    question: 'Wie hoch ist der Eintrittspreis?',
    answer: 'Montag bis Freitag: 3,00 € pro Stunde · Samstag, Sonntag & Feiertage: 4,00 € pro Stunde · Kleinkinder bis 1 Jahr: 2,00 € · Jede weitere Stunde: 1,00 €',
  },
  {
    question: 'Wo befindet sich das Zwerghain?',
    answer: 'Baseler Straße 2, 12205 Berlin-Lichterfelde. Gut erreichbar mit der S1 und dem Bus M11 bis Bahnhof Lichterfelde West.',
  },
  {
    question: 'Wie kann ich euch kontaktieren?',
    answer: 'Ihr erreicht uns telefonisch, per E-Mail, über unser Kontaktformular oder direkt vor Ort im Café. Wir beraten euch persönlich und unverbindlich.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  const id = question.replace(/\s+/g, '-').toLowerCase()

  return (
    <div className="border-b border-brand-green/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-answer-${id}`}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 rounded-lg"
      >
        <span className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-brand-green transition-colors">
          {question}
        </span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green transition-transform motion-reduce:transition-none ${open ? 'rotate-45' : ''}`}
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
        aria-labelledby={`faq-question-${id}`}
        hidden={!open}
        className="pb-5"
      >
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="text-center mb-10">
        <h2
          id="faq-heading"
          className="text-2xl sm:text-3xl font-bold text-gray-900"
        >
          Häufige Fragen zum Zwerghain
        </h2>
      </div>

      <div className="bg-white rounded-3xl shadow-sm px-6 sm:px-8 py-2">
        {faqs.map((faq) => (
          <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>

      {/* Abschluss CTA */}
      <div className="mt-10 text-center">
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
          Noch Fragen offen? Sprecht uns im Café an, ruft uns an oder sendet uns eine
          unverbindliche Anfrage über das Kontaktformular. Wir freuen uns auf euch!
        </p>
        <Link
          href="/kontakt"
          className="inline-block bg-brand-green text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-brand-green/90 transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
        >
          Kontakt aufnehmen
        </Link>
      </div>
    </section>
  )
}