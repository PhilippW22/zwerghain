import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum des Zwerghain Eltern-Kind-Cafés in Berlin-Lichterfelde.',
}

export default function ImpressumPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">Impressum</h1>

      <div className="flex flex-col gap-10 text-sm sm:text-base text-gray-700 leading-relaxed">

        {/* Pflichtangaben */}
        <section aria-labelledby="pflichtangaben">
          <h2 id="pflichtangaben" className="text-lg font-semibold text-gray-900 mb-3">
            Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)
          </h2>
          <p className="mb-2">
            Diese Internetseite sowie die Accounts bei Instagram und Google sind ein Angebot von:
          </p>
          <address className="not-italic flex flex-col gap-1">
            <span className="font-medium text-gray-900">Zwerghain Kindercafé & Partylocation</span>
            <span>Baseler Str. 2</span>
            <span>12205 Berlin</span>
            <span>
              Telefon:{' '}
              <a href="tel:+493012345678" className="text-brand-green hover:underline">
                +49 30 12 345 678
              </a>
            </span>
            <span>
              E-Mail:{' '}
              <a href="mailto:hallo@zwerghain.com" className="text-brand-green hover:underline">
                hallo@zwerghain.com
              </a>
            </span>
          </address>
          <div className="mt-4 flex flex-col gap-1">
            <p><span className="font-medium">Inhaberin:</span> Linda Fitzek</p>
            <p><span className="font-medium">Steuernummer:</span> XXX/XXX/XXXXX</p>
            <p><span className="font-medium">Finanzamt:</span> Steglitz von Berlin</p>
          </div>
        </section>

        {/* Redaktionell verantwortlich */}
        <section aria-labelledby="redaktion">
          <h2 id="redaktion" className="text-lg font-semibold text-gray-900 mb-3">
            Redaktionell verantwortlich
          </h2>
          <p>Linda Fitzek, Lea Roggemann</p>
        </section>

        {/* Gestaltung */}
        <section aria-labelledby="gestaltung">
          <h2 id="gestaltung" className="text-lg font-semibold text-gray-900 mb-3">
            Gestaltung
          </h2>
          <p>Philipp Winkler</p>
        </section>

        {/* Aufsichtsbehörde */}
        <section aria-labelledby="aufsicht">
          <h2 id="aufsicht" className="text-lg font-semibold text-gray-900 mb-3">
            Aufsichtsbehörde
          </h2>
          <address className="not-italic flex flex-col gap-1">
            <span>Bezirksamt Steglitz-Zehlendorf von Berlin</span>
            <span>Ordnungsamt – Gewerbeangelegenheiten</span>
            <span>Unter den Eichen 1</span>
            <span>12203 Berlin</span>
            <span>
              Telefon:{' '}
              <a href="tel:+4930902990" className="text-brand-green hover:underline">
                +49 30 90299-0
              </a>
            </span>
            <span>
              E-Mail:{' '}
              <a href="mailto:ordnungsamt@ba-sz.berlin.de" className="text-brand-green hover:underline">
                ordnungsamt@ba-sz.berlin.de
              </a>
            </span>
          </address>
        </section>

        {/* Markenhinweis */}
        <section aria-labelledby="marke">
          <h2 id="marke" className="text-lg font-semibold text-gray-900 mb-3">
            Markenhinweis
          </h2>
          <p>
            Die Wort-/Bildmarke Zwerghain ist rechtlich geschützt. Eine Nutzung ist nur mit
            ausdrücklicher Zustimmung der Inhaberin gestattet.
          </p>
        </section>

        {/* Bildnachweise */}
        <section aria-labelledby="bilder">
          <h2 id="bilder" className="text-lg font-semibold text-gray-900 mb-3">
            Bildnachweise
          </h2>
          <ul className="flex flex-col gap-1" role="list">
            <li>Bild 1: Quelle / Fotograf</li>
            <li>Bild 2: Quelle / Fotograf</li>
          </ul>
        </section>

        {/* Haftungsausschluss */}
        <section aria-labelledby="haftung">
          <h2 id="haftung" className="text-lg font-semibold text-gray-900 mb-3">
            Haftungsausschluss
          </h2>

          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">§ 1 Inhalte dieser Website</h3>
              <p>
                Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die
                Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine
                Gewähr. Namentlich gekennzeichnete Beiträge geben die Meinung des jeweiligen Autors
                wieder.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-1">§ 2 Externe Links</h3>
              <p>
                Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir
                keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                Anbieter verantwortlich. Bei Bekanntwerden von Rechtsverstößen werden derartige
                Links unverzüglich entfernt.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-1">§ 3 Urheberrecht</h3>
              <p>
                Die auf dieser Website veröffentlichten Inhalte unterliegen dem deutschen
                Urheberrecht. Vervielfältigung, Bearbeitung oder Verbreitung außerhalb der Grenzen
                des Urheberrechts bedürfen der schriftlichen Zustimmung der Inhaberin. Downloads und
                Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-1">§ 4 Besondere Nutzungsbedingungen</h3>
              <p>
                Soweit besondere Bedingungen für einzelne Nutzungen dieser Website von den
                vorgenannten Paragraphen abweichen, wird an entsprechender Stelle ausdrücklich
                darauf hingewiesen.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}