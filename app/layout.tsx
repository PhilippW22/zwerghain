import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Zwerghain – Eltern-Kind-Café',
    template: '%s | Zwerghain',
  },
  description: 'Willkommen im Zwerghain – Euer gemütliches Eltern-Kind-Café.',
  metadataBase: new URL('https://zwerghain.com'),
  openGraph: {
    siteName: 'Zwerghain',
    locale: 'de_DE',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-green focus:text-white focus:rounded"
        >
          Zum Hauptinhalt springen
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}