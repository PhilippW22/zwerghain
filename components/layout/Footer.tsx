import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand-green text-white" aria-label="Fußbereich">

      {/* Hauptbereich */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

        {/* Kontakt & Anreise */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">
            Kontakt & Anreise
          </h2>
          <address className="not-italic flex flex-col gap-2 text-sm text-white/90">
            <p className="font-semibold text-white">Zwerghain</p>
            <p>Baseler Str. 2<br />12205 Berlin</p>
            <p>
              <a
                href="tel:+493012345678"
                className="hover:text-white transition-colors"
                aria-label="Telefonnummer anrufen"
              >
                030 / 12 345 678
              </a>
            </p>
            <p>
              <a
                href="mailto:hallo@zwerghain.com"
                className="hover:text-white transition-colors"
              >
                hallo@zwerghain.com
              </a>
            </p>
            <p className="mt-2 text-white/70 text-xs leading-relaxed">
              Erreichbar mit der S1 und dem Bus M11<br />
              bis Bahnhof Lichterfelde West
            </p>
          </address>
        </div>

        {/* Öffnungszeiten & Preise */}
<div>
  <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">
    Öffnungszeiten & Preise
  </h2>

  <div className="flex flex-col gap-1 text-sm text-white/90 mb-5">
    <p className="font-medium text-white mb-1">Öffnungszeiten</p>
    <div className="grid grid-cols-[auto_1fr] gap-x-4">
      <span>Di – Fr</span>
      <span>10:00 – 18:00 Uhr</span>
      <span>Sa, So & Feiertage</span>
      <span>10:00 – 19:00 Uhr</span>
    </div>
    <p className="text-white/50 text-xs mt-1">Montag geschlossen</p>
  </div>

  <div className="flex flex-col gap-1 text-sm text-white/90">
    <p className="font-medium text-white mb-1">Preise</p>
    <div className="grid grid-cols-[auto_1fr] gap-x-4">
      <span>Mo – Fr (1 Std.)</span>
      <span>3,00 €</span>
      <span>Sa, So & Feiertage (1 Std.)</span>
      <span>4,00 €</span>
      <span>Kleinkinder bis 1 Jahr</span>
      <span>2,00 €</span>
      <span>Jede weitere Stunde</span>
      <span>1,00 €</span>
    </div>
  </div>
</div>

        {/* Navigation */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">
            Navigation
          </h2>
          <nav aria-label="Footer-Navigation">
            <ul className="flex flex-col gap-2" role="list">
              {[
                { href: '/', label: 'Start' },
                { href: '/events', label: 'Events' },
                { href: '/speisekarte', label: 'Speisekarte' },
                { href: '/#about-us', label: 'Über uns' },
                { href: '/kontakt', label: 'Kontakt' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

      </div>

      {/* Trennlinie */}
      <div className="border-t border-white/10" />

      {/* Subfooter */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

        <p className="text-xs text-white/60 text-center sm:text-left leading-relaxed max-w-sm">
          Das Zwerghain ist euer Kinder- und Familiencafé in Lichterfelde, wo kleine Gäste ganz groß werden.
          Wir freuen uns auf euren Besuch!
        </p>

        <nav aria-label="Rechtliche Links" className="flex flex-wrap justify-center gap-x-3 gap-y-1">
          {[
            { href: '/kontakt', label: 'Kontakt' },
            { href: '/barrierefreiheit', label: 'Barrierefreiheitserklärung' },
            { href: '/datenschutz', label: 'Datenschutzerklärung' },
            { href: '/impressum', label: 'Impressum' },
          ].map((link, index, arr) => (
            <span key={link.href} className="flex items-center gap-3">
              <Link
                href={link.href}
                className="text-xs text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
              {index < arr.length - 1 && (
                <span className="text-white/30 text-xs" aria-hidden="true">|</span>
              )}
            </span>
          ))}
        </nav>

      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center">
          <p className="text-xs text-white/40 text-center">
            Änderungen vorbehalten. © {new Date().getFullYear()} Zwerghain · Erstellt mit ♥ in Berlin
          </p>
        </div>
      </div>

    </footer>
  )
}