import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Barrierefreiheitserklärung',
  description: 'Informationen zur digitalen Barrierefreiheit der Zwerghain-Website.',
}

export default function BarrierefreiheitPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">
        Barrierefreiheitserklärung
      </h1>

      <div className="flex flex-col gap-10 text-sm sm:text-base text-gray-700 leading-relaxed">

        {/* Einleitung */}
        <section aria-labelledby="einleitung">
          <h2 id="einleitung" className="text-lg font-semibold text-gray-900 mb-3">
            Einleitung
          </h2>
          <p className="mb-3">
            Das Zwerghain ist bestrebt, seine Website barrierefrei zugänglich zu machen.
            Diese Erklärung zur Barrierefreiheit gilt für die Website:{' '}
            <a
              href="https://www.zwerghain.com"
              className="text-brand-green hover:underline"
            >
              www.zwerghain.com
            </a>
          </p>
          <p>
            Die Anforderungen der Barrierefreiheit orientieren sich an den Erfolgskriterien
            der WCAG 2.1, Konformitätsstufe AA.
          </p>
        </section>

        {/* Stand der Vereinbarkeit */}
        <section aria-labelledby="stand">
          <h2 id="stand" className="text-lg font-semibold text-gray-900 mb-3">
            1. Stand der Barrierefreiheit
          </h2>
          <p className="mb-4">
            Diese Website wurde mit besonderem Augenmerk auf digitale Barrierefreiheit
            entwickelt. Folgende Maßnahmen wurden umgesetzt:
          </p>
          <div className="flex flex-col gap-3">
            {[
              {
                titel: 'Tastaturnavigation',
                text: 'Alle interaktiven Elemente – Navigation, Formulare, Buttons und Links – sind vollständig per Tastatur erreichbar und bedienbar. Die Fokus-Reihenfolge ist logisch und nachvollziehbar.',
              },
              {
                titel: 'Screenreader-Unterstützung',
                text: 'Alle Inhalte sind mit semantischem HTML strukturiert. Bilder haben beschreibende Alternativtexte. Formulare sind mit korrekten Labels und ARIA-Attributen (aria-label, aria-describedby, aria-invalid) ausgestattet.',
              },
              {
                titel: 'Kontrast',
                text: 'Texte und interaktive Elemente erfüllen die Kontrastanforderungen gemäß WCAG 2.1 AA (Mindestverhältnis 4,5:1 für normalen Text).',
              },
              {
                titel: 'Reduzierte Bewegung',
                text: 'Animationen werden automatisch deaktiviert, wenn im Betriebssystem die Option „Bewegung reduzieren" aktiviert ist (prefers-reduced-motion).',
              },
              {
                titel: 'Sprunglink',
                text: 'Ein „Zum Hauptinhalt springen"-Link ermöglicht es Tastatur- und Screenreader-Nutzern, die Navigation zu überspringen.',
              },
              {
                titel: 'Formularvalidierung',
                text: 'Fehlermeldungen in Formularen sind semantisch mit den jeweiligen Eingabefeldern verknüpft und werden Screenreadern korrekt angekündigt.',
              },
              {
                titel: 'Responsive Design',
                text: 'Die Website ist für alle Bildschirmgrößen optimiert und auf mobilen Geräten vollständig nutzbar.',
              },
            ].map((item) => (
              <div key={item.titel} className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-brand-green shrink-0" aria-hidden="true" />
                <p>
                  <span className="font-medium text-gray-900">{item.titel}:</span>{' '}
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bekannte Einschränkungen */}
        <section aria-labelledby="einschraenkungen">
          <h2 id="einschraenkungen" className="text-lg font-semibold text-gray-900 mb-3">
            2. Bekannte Einschränkungen
          </h2>
          <p>
            Wir sind uns bewusst, dass digitale Barrierefreiheit ein fortlaufender Prozess
            ist. Trotz sorgfältiger Umsetzung können einzelne Inhalte oder Funktionen noch
            nicht vollständig barrierefrei sein. Wir arbeiten kontinuierlich daran, diese
            zu verbessern. Rückmeldungen nehmen wir gerne entgegen.
          </p>
        </section>

        {/* Erstellung */}
        <section aria-labelledby="erstellung">
          <h2 id="erstellung" className="text-lg font-semibold text-gray-900 mb-3">
            3. Erstellung dieser Erklärung
          </h2>
          <p>
            Diese Erklärung wurde im März 2026 auf Basis einer Selbstbewertung der Website
            erstellt und wird bei wesentlichen Änderungen aktualisiert.
          </p>
        </section>

        {/* Feedback */}
        <section aria-labelledby="feedback">
          <h2 id="feedback" className="text-lg font-semibold text-gray-900 mb-3">
            4. Feedback und Kontakt
          </h2>
          <p className="mb-4">
            Wenn ihr Barrieren auf dieser Website feststellt oder Verbesserungsvorschläge
            habt, meldet euch gerne bei uns. Wir nehmen solche Rückmeldungen ernst und
            bemühen uns um eine zeitnahe Lösung.
          </p>
          <address className="not-italic flex flex-col gap-1">
            <span className="font-medium text-gray-900">Zwerghain Kindercafé & Partylocation</span>
            <span>Baseler Str. 2, 12205 Berlin</span>
            <span>
              E-Mail:{' '}
              <a href="mailto:hallo@zwerghain.com" className="text-brand-green hover:underline">
                hallo@zwerghain.com
              </a>
            </span>
            <span>
              Telefon:{' '}
              <a href="tel:+493012345678" className="text-brand-green hover:underline">
                +49 30 12 345 678
              </a>
            </span>
          </address>
        </section>

        {/* Schlichtungsverfahren */}
        <section aria-labelledby="schlichtung">
          <h2 id="schlichtung" className="text-lg font-semibold text-gray-900 mb-3">
            5. Schlichtungsverfahren
          </h2>
          <p className="mb-4">
            Solltet ihr auch nach einer Rückmeldung an uns keine zufriedenstellende Lösung
            erhalten, könnt ihr euch an die Schlichtungsstelle nach dem
            Behindertengleichstellungsgesetz wenden. Die Schlichtungsstelle hat die Aufgabe,
            Konflikte zwischen Menschen mit Behinderungen und privaten Anbietern
            außergerichtlich beizulegen. Das Verfahren ist kostenlos und erfordert keinen
            Rechtsbeistand.
          </p>
          <address className="not-italic flex flex-col gap-1">
            <span className="font-medium text-gray-900">
              Schlichtungsstelle nach dem Behindertengleichstellungsgesetz (BGG)
            </span>
            <span>Mauerstraße 53, 10117 Berlin</span>
            <span>
              E-Mail:{' '}
              <a
                href="mailto:info@schlichtungsstelle-bgg.de"
                className="text-brand-green hover:underline"
              >
                info@schlichtungsstelle-bgg.de
              </a>
            </span>
            <span>
              Telefon:{' '}
              <a href="tel:+4930185272805" className="text-brand-green hover:underline">
                +49 30 18 527-2805
              </a>
            </span>
            <span>
              Website:{' '}
              <a
                href="https://www.schlichtungsstelle-bgg.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-green hover:underline"
              >
                www.schlichtungsstelle-bgg.de
              </a>
            </span>
          </address>
        </section>

        <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">
          Stand: März 2026
        </p>

      </div>
    </div>
  )
}