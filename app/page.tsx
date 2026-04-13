import Hero from '@/components/sections/Hero'
import Ticker from '@/components/ui/Ticker'
import EventHighlight from '@/components/sections/EventHighlight'
import AboutUs from '@/components/sections/AboutUs'
import FAQ from '@/components/sections/FAQ'
import Visit from '@/components/sections/Visit'

const tickerItems = [
  'Öffnungszeiten (14.04.-19.04.): Di 14-17:30 Uhr · Mi–Fr 9–17:30 Uhr · Sa (18.04.) geschlossen · So 9–17 Uhr · So 9–13 Uhr Sonntagsfrühstück nur mit Reservierung',
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