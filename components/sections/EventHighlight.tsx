import Image from 'next/image'
import Link from 'next/link'
import WaveDivider from '@/components/ui/WaveDivider'

export default function EventHighlight() {
  return (
    <>

      <section
        aria-labelledby="event-highlight-heading"
        className="relative bg-brand-green py-12 sm:py-16 overflow-hidden"
      >
        {/* Hintergrund-Gradient */}
        <div
          className="absolute inset-0 opacity-30"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse at 20% 50%, #F5F5DC 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #F5F5DC 0%, transparent 50%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">

          {/* Card 1 – Events & Feiern */}
          <div className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 grid grid-cols-1 md:grid-cols-2">
            <div className="relative w-full h-64 md:h-auto min-h-64">
              <Image
                src="/images/event1.jpg"
                alt="Kindergeburtstag feiern im Zwerghain – Eventlocation in Berlin-Lichterfelde"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10">
              <p className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-3">
                Feiern im Zwerghain
              </p>
              <h2
                id="event-highlight-heading"
                className="text-2xl sm:text-3xl font-bold text-white leading-snug"
              >
                Kindergeburtstag, Baby Shower oder Familienfest – bei uns wird jeder Anlass besonders.
              </h2>
              <ul className="mt-5 flex flex-col gap-2 text-white/90 text-sm sm:text-base" role="list">
                {[
                  'Feiern während des Cafébetriebs möglich',
                  'Exklusive Raummiete für private Feste',
                  'Individuelle Dekoration & liebevolle Details',
                  'Animation, Kinderschminken & mehr zubuchbar',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-white/60 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/events"
                  className="inline-block bg-white text-brand-green px-6 py-3 rounded-2xl text-sm font-medium hover:bg-white/90 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green"
                >
                  Pakete entdecken
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2 – Sonntagsfrühstück */}
          <div className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 order-2 md:order-1">
              <p className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-3">
                Jeden Sonntag
              </p>
              <h2
                id="breakfast-highlight-heading"
                className="text-2xl sm:text-3xl font-bold text-white leading-snug"
              >
                Sonntagsfrühstück im Zwerghain – gemeinsam entspannt in den Tag starten.
              </h2>
              <p className="mt-4 text-white/90 text-sm sm:text-base leading-relaxed">
                Startet entspannt in den Sonntag: Während die Kinder spielen und entdecken, genießt
                ihr ein liebevoll angerichtetes Frühstück mit frischen Brötchen, herzhaften und
                süßen Aufschnitten sowie einer reich gefüllten Etagere für Groß und Klein.
              </p>
              <ul className="mt-4 flex flex-col gap-2 text-white/90 text-sm sm:text-base" role="list">
                {[
                  'Zwei feste Slots: 9:00 – 10:30 Uhr & 11:00 – 12:30 Uhr',
                  'Liebevoll angerichtete Frühstücks-Etagere inklusive',
                  'Raum zum Spielen für die Kinder',
                  '36,00 € pro Person',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-white/60 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/breakfast"
                  aria-label="Weitere Informationen zum Sonntagsfrühstück im Zwerghain"
                  className="inline-block bg-white text-brand-green px-6 py-3 rounded-2xl text-sm font-medium hover:bg-white/90 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green"
                >
                  Weitere Informationen
                </Link>
              </div>
            </div>
            <div className="relative w-full h-64 md:h-auto min-h-64 order-1 md:order-2">
              <Image
                src="/images/hero_breakfast.png"
                alt="Sonntagsfrühstück im Zwerghain Eltern-Kind-Café in Berlin-Lichterfelde"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

        </div>
      </section>
            <WaveDivider fromColor="#83A17D" toColor="#F5F5DC" />
      
    </>
  )
}