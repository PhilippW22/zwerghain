import Hero from '@/components/sections/Hero'
import Ticker from '@/components/ui/Ticker'
import EventHighlight from '@/components/sections/EventHighlight'
import AboutUs from '@/components/sections/AboutUs'
import FAQ from '@/components/sections/FAQ'
import Tagline from '@/components/sections/Tagline'

const tickerItems = [
  'Öffnungszeiten: Montag Ruhetag | Dienstag bis Freitag 9 – 17:30 Uhr | Samstag, Sonntag & Feiertage 9 – 17 Uhr | Bitte beachtet: Am 21. & 22.03.2026 bleibt das Zwerghain am Nachmittag wegen einer Geburtstagsfeier geschlossen.',
]

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker items={tickerItems} />
      <EventHighlight />
      <AboutUs />
      <FAQ />
      <Tagline />
    </>
  )
}