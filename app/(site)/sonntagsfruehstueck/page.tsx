import Link from 'next/link'

export default function BreakfastPage() {
  return (
    <>
      <section
        aria-labelledby="breakfast-heading"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-brand-green uppercase tracking-widest mb-3 text-center">
            Jeden Sonntag
          </p>
          <h1
            id="breakfast-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug text-center mb-6"
          >
            Sonntagsfrühstück im Zwerghain – gemeinsam genießen.
          </h1>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-center mb-12">
            Startet entspannt in den Sonntag und lasst euch bei uns verwöhnen. Während die Kinder
            spielen und entdecken, genießt ihr eine liebevoll zusammengestellte Frühstücks-Etagere
            für die ganze Familie.
          </p>

          {/* Kombinierte Card */}
          <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 mb-8 flex flex-col gap-6">

            {/* Slots */}
            <div>
              <h2 className="text-lg font-bold text-brand-green mb-4">
                Unsere Frühstückszeiten
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Jeden Sonntag bieten wir zwei feste Frühstücks-Slots an:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { slot: '9:00 – 10:30 Uhr', label: 'Erster Slot' },
                  { slot: '11:00 – 12:30 Uhr', label: 'Zweiter Slot' },
                ].map((item) => (
                  <div key={item.slot} className="flex items-center gap-3 bg-brand-green/5 rounded-2xl px-5 py-4">
                    <span className="w-2 h-2 rounded-full bg-brand-green shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-xs text-gray-500">{item.label}</p>
                      <p className="font-semibold text-brand-green">{item.slot}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trennlinie */}
            <div className="border-t border-gray-100" />

            {/* Was euch erwartet */}
            <div>
              <h2 className="text-lg font-bold text-brand-green mb-4">
                Was euch erwartet
              </h2>
              <ul className="flex flex-col gap-2" role="list">
                {[
                  'Liebevoll zusammengestellte Frühstücks-Etagere',
                  'Frische Brötchen',
                  'Herzhafte und süße Aufschnitte',
                  'Familienfreundliche Atmosphäre',
                  'Raum zum Spielen für die Kinder',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-brand-green shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trennlinie */}
            <div className="border-t border-gray-100" />

            {/* Preise */}
            <div>
              <h2 className="text-lg font-bold text-brand-green mb-4">Preise</h2>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between bg-brand-green/5 rounded-2xl px-5 py-4">
                  <div>
                    <p className="text-xs text-gray-500">Familien-Etagere</p>
                    <p className="font-bold text-brand-green text-lg">38,00 €</p>
                  </div>
                  <p className="text-sm text-gray-600 text-right">2 Erwachsene + 1 Kind</p>
                </div>
                <div className="flex items-center justify-between bg-brand-green/5 rounded-2xl px-5 py-4">
                  <div>
                    <p className="text-xs text-gray-500">Jedes weitere Kind ab 3 Jahren</p>
                    <p className="font-bold text-brand-green text-lg">+ 8,00 €</p>
                  </div>
                  <p className="text-sm text-gray-600 text-right">Aufpreis</p>
                </div>
                <p className="text-xs text-gray-500 px-1 leading-relaxed">
                  Getränke sind nicht im Preis enthalten und werden separat bestellt.
                </p>
              </div>
            </div>

            {/* Trennlinie */}
            <div className="border-t border-gray-100" />

            {/* CTA */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  <p className="text-sm text-gray-600 leading-relaxed">
    Das Sonntagsfrühstück ist nur mit vorheriger Reservierung möglich.
    Meldet euch einfach über unser Kontaktformular – wir melden uns zeitnah zurück.
  </p>
  <Link
    href="/kontakt?anlass=fruehstueck"
    className="shrink-0 inline-block bg-brand-green text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-brand-green/90 transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
  >
    Jetzt reservieren
  </Link>
</div>

          </div>

        </div>
      </section>
    </>
  )
}