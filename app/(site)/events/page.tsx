import type { Metadata } from 'next'
import Link from 'next/link'
import WaveDivider from '@/components/ui/WaveDivider'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Events & Feiern',
  description:
    'Kindergeburtstag, Baby Shower oder Familienfest im Zwerghain Berlin-Lichterfelde. Entdeckt unser Geburtstagspaket und fragt eure Feier unverbindlich an.',
}

const includedGroups = [
  {
    title: 'Raum & Atmosphäre',
    items: [
      'Exklusive Nutzung des Cafés',
      'Nutzung des Spielbereichs',
      'Geburtstagstafel',
    ],
  },
  {
    title: 'Für die Kinder',
    items: [
      'Getränke für die Kinder',
      'Geburtstagskuchen',
      'Kleine Snacks',
    ],
  },
  {
    title: 'Dekoration & Rahmen',
    items: [
      'Liebevolle Waldtier-Grunddekoration',
      'Für bis zu 10 Kinder',
      'Ruhige, persönliche Feieratmosphäre',
    ],
  },
]

const gradientBg = {
  background:
    'radial-gradient(ellipse at 20% 50%,rgb(212, 212, 190) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%,rgb(212, 212, 190) 0%, transparent 50%)',
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
            Kindergeburtstage haben wir ein klares Paket vorbereitet. Baby Shower, Taufen und
            Familienfeste sind auf Anfrage ebenfalls möglich.
          </p>
          </div>
      </section>

      {/* Hauptbereich – grün */}
      <section
        className="relative bg-brand-green py-12 sm:py-16 overflow-hidden"
        aria-labelledby="geburtstag-heading"
      >
        <div className="absolute inset-0 opacity-30" aria-hidden="true" style={gradientBg} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">

          {/* Überschrift */}
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-3">
              Unser Hauptangebot
            </p>
            <h2
              id="geburtstag-heading"
              className="text-2xl sm:text-3xl font-bold text-white"
            >
              Kindergeburtstag im Zwerghain
            </h2>
            <p className="mt-4 text-white/80 text-sm sm:text-base leading-relaxed">
              Für euch vorbereitet: ein exklusiver Geburtstagsrahmen, in dem Kinder frei spielen
              und feiern dürfen, während ihr euch ganz auf den besonderen Tag konzentrieren könnt.
            </p>
          </div>

          {/* Hauptcard */}
          <article className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col gap-6 max-w-4xl mx-auto w-full">

          {/* Oberer Bereich mit Bild rechts */}
          <div className="relative">
            {/* Bild absolut rechts – nur ab sm */}
          <div className="absolute top-0 right-0 w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden hidden sm:block">
            <Image
              src="/images/event1.jpg"
              alt="Kindergeburtstag im Zwerghain"
              width={176}
              height={176}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Padding rechts entsprechend anpassen */}
          <div className="sm:pr-52 flex flex-col gap-4">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {['3 Stunden', 'exklusive Nutzung', 'bis zu 10 Kinder'].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Titel + Text */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Das Geburtstagspaket
                </h3>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Feiert euren Kindergeburtstag in ruhiger, liebevoll gestalteter Atmosphäre. Das
                  Café gehört in dieser Zeit ganz euch – für unbeschwertes Spielen, gemeinsames
                  Feiern und entspannte Familienmomente.
                </p>
              </div>
            </div>

          </div>

            {/* Preis */}
            <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Paketpreis</p>
                <p className="text-4xl font-bold text-white">300 €</p>
              </div>
              <p className="text-sm text-white/70 leading-relaxed sm:max-w-[280px]">
                Inkl. Grundpaket für eure Feier. Speisen & Getränke für Erwachsene werden nach
                Verbrauch abgerechnet.
              </p>
            </div>

            {/* Inklusive */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {includedGroups.map((group) => (
                <div
                  key={group.title}
                  className="rounded-2xl border border-white/20 bg-white/5 px-4 py-4"
                >
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-3">
                    {group.title}
                  </p>
                  <ul className="flex flex-col gap-2 text-sm text-white/90" role="list">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-white/60 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Individuell erweiterbar */}
            <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 flex flex-col gap-2">
              <p className="text-sm font-semibold text-white">Individuell erweiterbar</p>
              <p className="text-sm text-white/80 leading-relaxed">
                Auf Wunsch könnt ihr eure Feier mit zusätzlichen Angeboten ergänzen – zum Beispiel
                mit Motto-Dekoration, Kinderschminken, Animation, Bastelaktionen, Geburtstagstorte
                oder passendem Essen für die Kinder.
              </p>
              <p className="text-sm text-white/80 leading-relaxed">
                Alle Extras und Zusatzwünsche könnt ihr ganz unkompliziert direkt im
                Anfrageformular auswählen. So erstellen wir gemeinsam eine Feier, die zu eurem
                Kind und euren Wünschen passt.
              </p>
            </div>

            {/* Hinweise */}
            <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 flex flex-col gap-2">
              <p className="text-sm text-white/90 leading-relaxed">
                <span className="font-semibold text-white">Gut zu wissen:</span> Auch kleinere
                Gruppen mit weniger als 5 Kindern sind willkommen. Sprecht uns einfach an –
                wir beraten euch gern individuell.
              </p>
              <p className="text-sm text-white/90 leading-relaxed">
                <span className="font-semibold text-white">Für Erwachsene:</span> Eltern,
                Großeltern und weitere Gäste sind herzlich willkommen. Speisen und Getränke
                werden nach Verbrauch vor Ort abgerechnet.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex justify-center">
              <Link
                href="/kontakt?anlass=geburtstag"
                aria-label="Jetzt anfragen: Kindergeburtstag im Zwerghain"
                className="inline-block bg-white text-brand-green px-8 py-3 rounded-2xl text-sm font-medium hover:bg-white/90 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green"
              >
                Jetzt Geburtstag anfragen
              </Link>
            </div>
          </article>


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
            persönlich und schnüren ein Paket, das zu eurer Familie und eurer Feier passt.
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