
export default function Visit() {
  return (
    <section
      aria-labelledby="visit-heading"
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Links – Infos */}
        <div className="px-6 py-8 sm:px-10 sm:py-12 flex flex-col gap-6">
          <div>
            <p className="text-sm font-semibold text-brand-green uppercase tracking-widest mb-2">
              Besucht uns
            </p>
            <h2 id="visit-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
              So findet ihr uns
            </h2>
          </div>

          {/* Adresse */}
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-700">Adresse</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Baseler Straße 2<br />
              12205 Berlin-Lichterfelde
            </p>
            <a
              href="https://maps.app.goo.gl/Zv5Bt6G9AzL6SMrG8"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-sm text-brand-green underline hover:text-brand-green/80 transition-colors w-fit"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              Auf Google Maps anzeigen
            </a>
          </div>

          {/* Öffnungszeiten */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-gray-700">Öffnungszeiten</p>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm text-gray-600">
              <span>Di – Fr</span>
              <span>9:00 – 17:30 Uhr</span>
              <span>Sa, So & Feiertage</span>
              <span>9:00 – 17:00 Uhr</span>
              <span className="text-gray-400">Montag</span>
              <span className="text-gray-400">Ruhetag</span>
            </div>
          </div>

          {/* Anreise */}
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-700">Anreise</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              S1 und Bus M11 bis Bahnhof Lichterfelde West
            </p>
          </div>

          {/* Kontakt-Buttons */}
          <div className="flex flex-wrap gap-3 mt-2">
            <a
              href="tel:+4917647624019"
              className="inline-flex items-center gap-2 bg-brand-green text-white px-5 py-3 rounded-2xl text-sm font-medium hover:bg-brand-green/90 transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              0176 / 476 24 019
            </a>
            <a
              href="mailto:hallo@zwerghain.com"
              className="inline-flex items-center gap-2 bg-white text-brand-green border-2 border-brand-green px-5 py-3 rounded-2xl text-sm font-medium hover:bg-brand-green hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              hallo@zwerghain.com
            </a>
          </div>
        </div>

        {/* Rechts – dekoratives Bild oder Karte-Ersatz */}
        <div className="relative bg-brand-green/5 flex items-center justify-center p-8 min-h-64">
          <div className="text-center flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-brand-green/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900 text-lg">Zwerghain</p>
              <p className="text-gray-600 text-sm mt-1">Baseler Straße 2</p>
              <p className="text-gray-600 text-sm">12205 Berlin-Lichterfelde</p>
            </div>
            <a
              href="https://maps.app.goo.gl/Zv5Bt6G9AzL6SMrG8"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block bg-brand-green text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-brand-green/90 transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            >
              In Google Maps öffnen
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}