import Image from 'next/image'
import Link from 'next/link'

export default function EventHighlight() {
  return (
      <section
        aria-labelledby="event-highlight-heading"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-3xl overflow-hidden shadow-lg bg-white grid grid-cols-1 md:grid-cols-2">

          {/* Bild */}
          <div className="relative w-full h-64 md:h-auto min-h-64">
            <Image
              src="/images/event.jpg"
              alt="Kindergeburtstag feiern im Zwerghain – Eventlocation in Berlin-Lichterfelde"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10">
            <p className="text-sm font-semibold text-brand-green uppercase tracking-widest mb-3">
              Feiern im Zwerghain
            </p>
            <h2
              id="event-highlight-heading"
              className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug"
            >
              Kindergeburtstag, Baby Shower oder Familienfest – bei uns wird jeder Anlass besonders.
            </h2>
            <ul className="mt-5 flex flex-col gap-2 text-gray-700 text-sm sm:text-base" role="list">
              {[
                'Feiern während des Cafébetriebs möglich',
                'Exklusive Raummiete für private Feste',
                'Individuelle Dekoration & liebevolle Details',
                'Animation, Kinderschminken & mehr zubuchbar',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-brand-green shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/events"
                className="inline-block bg-brand-green text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-brand-green/90 transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
              >
                Pakete entdecken
              </Link>
            </div>
          </div>

        </div>
      </section>
  )
}