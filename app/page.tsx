import Hero from '@/components/sections/Hero'
import Ticker from '@/components/ui/Ticker'
import EventHighlight from '@/components/sections/EventHighlight'
import AboutUs from '@/components/sections/AboutUs'
import FAQ from '@/components/sections/FAQ'
import Visit from '@/components/sections/Visit'

const tickerItems = [
  'Öffnungszeiten: Di 14–17:30 Uhr · Mi–Fr 9–17:30 Uhr · Sa & So 9–17 Uhr · Mo Ruhetag · Sonntagsfrühstück 9-13 Uhr nur mit Reservierung · Aktueller Hinweis: Diese Woche Samstag (25.04.) von 9–12:30 Uhr geöffnet',
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