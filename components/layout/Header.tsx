'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Start' },
  { href: '/events', label: 'Feiern & Geburtstage' },
  { href: '/breakfast', label: 'Sonntagsfrühstück' },
  { href: '/#about-us', label: 'Über uns' },
  { href: '/kontakt', label: 'Kontakt' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-brand-green border-b border-white/10">
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Hauptnavigation"
      >
        {/* Logo */}
        <Link
  href="/"
  aria-label="Zwerghain – Startseite"
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
>
  <Image
    src="/images/logo.png"
    alt="Zwerghain Logo"
    width={120}
    height={48}
    priority
    className="h-10 w-auto"
  />
</Link>

        {/* Desktop Nav */}
        <ul className="hidden min-[930px]:flex items-center gap-6" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-white hover:text-white/80 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden min-[930px]:block">
          <Link
            href="/kontakt"
            className="bg-white text-brand-green px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green"
          >
            Reservieren
          </Link>
        </div>

        {/* Mobile Burger */}
        <button
          className="min-[930px]:hidden p-2 rounded-md text-white hover:text-white/80"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
        >
          <span className="sr-only">{menuOpen ? 'Menü schließen' : 'Menü öffnen'}</span>
          <div className="w-5 h-5 flex flex-col justify-between" aria-hidden="true">
            <span className={`block h-0.5 bg-current transition-transform motion-reduce:transition-none ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current transition-opacity motion-reduce:transition-none ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-transform motion-reduce:transition-none ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div id="mobile-menu" className="min-[930px]:hidden bg-brand-green border-t border-white/10 px-4 pb-4">
          <ul className="flex flex-col gap-3 pt-3" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-sm font-medium text-white hover:text-white/80 py-1 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/kontakt"
                className="block bg-white text-brand-green px-4 py-2 rounded-lg text-sm font-medium text-center mt-2 hover:bg-white/90 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Reservieren
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}