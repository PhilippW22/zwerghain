'use client'

import { useEffect, useRef, useState } from 'react'

export default function Tagline() {
  const sectionRef = useRef<HTMLElement>(null)
  const [line1Y, setLine1Y] = useState(0)
  const [line2Y, setLine2Y] = useState(0)

  

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      // rect.top ist 0 wenn Section genau oben im Viewport ist
      // Wir nehmen die Mitte der Section als Referenzpunkt
      const sectionCenter = rect.top + rect.height / 2
      const viewportCenter = window.innerHeight / 2
      const distance = sectionCenter - viewportCenter

      setLine1Y(distance * -0.12)
      setLine2Y(distance * 0.12)
    }

    handleScroll() // einmal direkt aufrufen
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Tagline"
      className="bg-brand-beige py-8 sm:py-10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p
          className="font-bold leading-tight tracking-tight text-brand-mint whitespace-nowrap text-[clamp(2rem,8vw,5.5rem)] motion-reduce:transform-none"
          style={{ transform: `translateY(${line1Y}px)`, willChange: 'transform' }}
        >
          früher berghain
        </p>
        <p
          className="font-bold leading-tight tracking-tight text-brand-green whitespace-nowrap text-[clamp(2rem,8vw,5.5rem)] motion-reduce:transform-none"
          style={{ transform: `translateY(${line2Y}px)`, willChange: 'transform' }}
        >
          heute zwerghain
        </p>
      </div>
    </section>
  )
}