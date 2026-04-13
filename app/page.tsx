import Hero from '@/components/sections/Hero'
import Ticker from '@/components/ui/Ticker'
import EventHighlight from '@/components/sections/EventHighlight'
import AboutUs from '@/components/sections/AboutUs'
import FAQ from '@/components/sections/FAQ'
import Visit from '@/components/sections/Visit'

const tickerItems = [
  'Öffnungszeiten: Di–Fr 9–17:30 Uhr · Sa & So 9–17 Uhr · So 9–13 Uhr Sonntagsfrühstück nur mit Reservierung · Hinweis: Am Samstag (18.04.) bleibt das Zwerghain aufgrund einer Veranstaltung geschlossen',
]

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker items={tickerItems} />
      <EventHighlight />
      <AboutUs />
      <FAQ />
      <Visit />
      
    </>
  )
}