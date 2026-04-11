import Hero from '@/components/sections/Hero'
import Ticker from '@/components/ui/Ticker'
import EventHighlight from '@/components/sections/EventHighlight'
import AboutUs from '@/components/sections/AboutUs'
import FAQ from '@/components/sections/FAQ'
import Visit from '@/components/sections/Visit'

const tickerItems = [
  'Sonderöffnungszeiten (11.–15.04.): 11.04. geschlossen · 12.04. nur für Familienfrühstück (9-13 Uhr) geöffnet - es gibt noch freie Plätze, bitte reservieren. · Di (14.04.) geschlossen · Mi (15.04.) ab 14 Uhr geöffnet',
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