'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

const galleryImages = [
  { src: '/images/gallery1.webp', alt: 'Zwerghain Eltern-Kind-Café Berlin-Lichterfelde – Impression 1' },
  { src: '/images/gallery2.webp', alt: 'Zwerghain Eltern-Kind-Café Berlin-Lichterfelde – Impression 2' },
  { src: '/images/gallery3.webp', alt: 'Zwerghain Eltern-Kind-Café Berlin-Lichterfelde – Impression 3' },
  { src: '/images/gallery4.webp', alt: 'Zwerghain Eltern-Kind-Café Berlin-Lichterfelde – Impression 4' },
  { src: '/images/gallery5.webp', alt: 'Zwerghain Eltern-Kind-Café Berlin-Lichterfelde – Impression 5' },
  { src: '/images/gallery6.webp', alt: 'Zwerghain Eltern-Kind-Café Berlin-Lichterfelde – Impression 6' },
  { src: '/images/gallery7.webp', alt: 'Zwerghain Eltern-Kind-Café Berlin-Lichterfelde – Impression 7' },
  { src: '/images/gallery8.webp', alt: 'Zwerghain Eltern-Kind-Café Berlin-Lichterfelde – Impression 8' },
]

export default function AboutUs() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (lightboxIndex !== null) {
      closeButtonRef.current?.focus()
    }
  }, [lightboxIndex])

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : 0))
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % galleryImages.length : 0))

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = null
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev() }
    touchStartX.current = null
    touchEndX.current = null
  }

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e
    const { left, width } = currentTarget.getBoundingClientRect()
    const clickX = clientX - left
    clickX < width / 2 ? prev() : next()
  }

  return (
    <>
      {/* AboutUs auf beigem Hintergrund – kein WaveDivider oben nötig da Features beige endet */}
      <section
        id="about-us"
        aria-labelledby="aboutus-heading"
        className="bg-brand-beige py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">

          {/* Über uns Card */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
            {/* Text – links */}
            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 order-1">
              <p className="text-sm font-semibold text-brand-green uppercase tracking-widest mb-3">
                Über uns
              </p>
              <h2
                id="aboutus-heading"
                className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-6"
              >
                Pädagogik & Spiel im Zwerghain
              </h2>
              <div className="flex flex-col gap-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Im Zwerghain steht das freie Spiel im Mittelpunkt. Kinder entdecken hier
                  selbstbestimmt und im eigenen Tempo ihre Welt – durch Bewegung, Kreativität
                  und eigene Erfahrungen.
                </p>
                <p>
                  Unsere vielseitigen Spielbereiche fördern Fantasie, Motorik und soziale
                  Kompetenzen – beim Klettern, Bauen, Rollenspiel oder gemeinsamen Entdecken.
                  Kinder erleben Selbstwirksamkeit und lernen spielerisch Rücksichtnahme
                  und Teamgeist.
                </p>
                <p>
                  Währenddessen genießen Eltern eine entspannte Atmosphäre – aufmerksam
                  begleitend oder mit einer bewussten kleinen Auszeit.
                </p>
                <p className="text-brand-green font-semibold border-l-4 border-brand-green pl-4 mt-2">
                  So verbindet das Zwerghain pädagogische Qualität, Sicherheit und
                  Wohlbefinden unter einem Dach.
                </p>
              </div>
            </div>

            {/* Bild – rechts */}
            <div className="relative w-full min-h-72 md:min-h-full order-2">
              <Image
                src="/images/aboutus.webp"
                alt="Spielbereich im Zwerghain Eltern-Kind-Café in Berlin-Lichterfelde"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Galerie */}
          <div>
            <p className="text-sm font-semibold text-brand-green uppercase tracking-widest mb-4 text-center">
              Eindrücke
            </p>
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
              role="list"
              aria-label="Bildergalerie des Zwerghain"
            >
              {galleryImages.map((image, index) => (
                <button
                  key={image.src}
                  role="listitem"
                  onClick={() => openLightbox(index)}
                  aria-label={`Bild ${index + 1} vergrößern: ${image.alt}`}
                  className="relative aspect-square rounded-2xl overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-brand-beige"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors motion-reduce:transition-none flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:transition-none"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Bildergalerie Vollansicht"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <button
            ref={closeButtonRef}
            onClick={closeLightbox}
            aria-label="Galerie schließen"
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-4xl mx-4 cursor-pointer select-none"
            onClick={(e) => { e.stopPropagation(); handleImageClick(e) }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            aria-label="Klick links für vorheriges Bild, rechts für nächstes Bild"
          >
            <div className="relative w-full" style={{ height: 'min(80vh, 90vw)' }}>
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            <div className="hidden sm:flex absolute inset-0 items-center justify-between px-4 pointer-events-none">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev() }}
                aria-label="Vorheriges Bild"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next() }}
                aria-label="Nächstes Bild"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <p className="text-center text-white/60 text-sm mt-3">
              {lightboxIndex + 1} / {galleryImages.length}
            </p>
            <p className="sm:hidden text-center text-white/40 text-xs mt-1">
              Wischen oder tippen zum Navigieren
            </p>
          </div>
        </div>
      )}
    </>
  )
}