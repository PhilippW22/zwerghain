import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative">

      {/* Desktop – ab 800px */}
      <div className="hidden min-[800px]:block relative w-full" style={{ aspectRatio: '16/8' }}>
        <Image
          src="/images/herodesktop2.webp"
          alt="Spielbereich im Zwerghain – Eltern-Kind-Café in Berlin-Lichterfelde"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Weißer Gradient von links nach rechts */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background: 'linear-gradient(to right, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.85) 35%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0) 80%)',
          }}
        />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl w-full mx-auto px-4 lg:px-2">
          <div className="max-w-xl">
          <h1
            id="hero-heading"
            style={{ fontFamily: 'sfont, system-ui, sans-serif' }}
            className="text-3xl lg:text-4xl xl:text-5xl text-brand-mint leading-snug"
          >
            Willkommen im Zwerghain,
            Eurem Eltern-Kind-Café
            in Berlin-Lichterfelde.
          </h1>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/#about-us"
                  className="bg-brand-green text-white px-5 py-3 rounded-2xl text-sm font-medium hover:bg-brand-green/90 transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                >
                  Mehr über uns
                </Link>
                <Link
                  href="/kontakt"
                  className="bg-white text-brand-green border-2 border-brand-green px-5 py-3 rounded-2xl text-sm font-medium hover:bg-brand-green hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                >
                  Jetzt reservieren
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile – bis 800px */}
      <div className="min-[800px]:hidden relative w-full">

        {/* Bild über volle Breite, kein Gradient */}
        <div className="relative w-full h-64 sm:h-80">
          <Image
            src="/images/herodesktop2.webp"
            alt="Spielbereich im Zwerghain – Eltern-Kind-Café in Berlin-Lichterfelde"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Text darunter auf beigem Hintergrund */}
        <div className="bg-brand-beige px-6 py-8">
          <h1
            id="hero-heading"
            style={{ fontFamily: 'sfont, system-ui, sans-serif' }}
            className="text-2xl text-brand-mint leading-snug"
          >
            Willkommen im Zwerghain,<br />
            Eurem Eltern-Kind-Café<br />
            in Berlin-Lichterfelde.
          </h1>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/kontakt"
              className="bg-brand-green text-white px-5 py-3 max-[354px]:px-3 max-[354px]:py-2 max-[354px]:text-xs rounded-2xl text-sm font-medium hover:bg-brand-green/90 transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            >
              Jetzt reservieren
            </Link>
            <Link
              href="/#about-us"
              className="bg-white text-brand-green border-2 border-brand-green px-5 py-3 max-[354px]:px-3 max-[354px]:py-2 max-[354px]:text-xs rounded-2xl text-sm font-medium hover:bg-brand-green hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            >
              Mehr über uns
            </Link>
          </div>
        </div>

      </div>

    </section>
  )
}