import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sonntagsfrühstück',
  description: 'Jeden Sonntag im Zwerghain: Gemeinsam frühstücken mit frischen Brötchen, Etagere und Spielraum für Kinder. Jetzt Tisch reservieren.',
}

export default function BreakfastLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}