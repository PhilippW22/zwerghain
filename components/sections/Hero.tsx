import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative">

      {/* Desktop – ab 800px */}
      <div className="hidden min-[800px]:block relative w-full h-[700px]">
        <Image
          src="/images/herodesktop.png"
          alt="Waffeln am Stiel im Zwerghain – Eltern-Kind-Café in Berlin-Lichterfelde"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl w-full mx-auto px-8 lg:px-16">
            <div className="max-w-lg">
              <h1
                id="hero-heading"
                className="text-3xl lg:text-4xl font-bold text-gray-900 leading-snug"
              >
                Willkommen im Zwerghain, eurem Eltern-Kind-Café in Berlin-Lichterfelde.
              </h1>
              <p className="mt-4 text-gray-700 text-base lg:text-lg leading-relaxed">
                Bei uns gibt es Raum zum Spielen, gemütliche Snacks für zwischendurch
                und natürlich unsere besonderen Waffeln am Stiel, die Kinderaugen
                zum Leuchten bringen.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
  <Link
    href="/#about-us"
    className="bg-brand-green text-white px-5 py-3 max-[354px]:px-3 max-[354px]:py-2 max-[354px]:text-xs rounded-2xl text-sm font-medium hover:bg-brand-green/90 transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
  >
    Mehr über uns
  </Link>
  <Link
    href="/kontakt"
    className="bg-white text-brand-green border-2 border-brand-green px-5 py-3 max-[354px]:px-3 max-[354px]:py-2 max-[354px]:text-xs rounded-2xl text-sm font-medium hover:bg-brand-green hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
  >
    Jetzt reservieren
  </Link>
</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile – bis 800px */}
      <div className="min-[800px]:hidden relative w-full h-[500px]">
        <Image
          src="/images/heromobile.png"
          alt="Zwerghain Eltern-Kind-Café in Berlin-Lichterfelde"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-6 py-16">
            <h1
              className="text-2xl font-bold text-gray-900 leading-snug"
            >
              Willkommen im Zwerghain, eurem Eltern-Kind-Café in Berlin-Lichterfelde.
            </h1>
            <p className="mt-3 text-gray-700 text-base leading-relaxed">
              Bei uns gibt es Raum zum Spielen, gemütliche Snacks für zwischendurch
              und natürlich unsere besonderen Waffeln am Stiel, die Kinderaugen
              zum Leuchten bringen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
  <Link
    href="/#about-us"
    className="bg-brand-green text-white px-5 py-3 max-[354px]:px-3 max-[354px]:py-2 max-[354px]:text-xs rounded-2xl text-sm font-medium hover:bg-brand-green/90 transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
  >
    Mehr über uns
  </Link>
  <Link
    href="/kontakt"
    className="bg-white text-brand-green border-2 border-brand-green px-5 py-3 max-[354px]:px-3 max-[354px]:py-2 max-[354px]:text-xs rounded-2xl text-sm font-medium hover:bg-brand-green hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
  >
    Jetzt reservieren
  </Link>
</div>
          </div>
        </div>
      </div>

    </section>
  )
}