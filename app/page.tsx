import Hero from '@/components/sections/Hero'
import Ticker from '@/components/ui/Ticker'
import EventHighlight from '@/components/sections/EventHighlight'
import AboutUs from '@/components/sections/AboutUs'
import FAQ from '@/components/sections/FAQ'
import Visit from '@/components/sections/Visit'

const tickerItems = [
  'Öffnungszeiten: Di 14–17:30 Uhr · Mi–Fr 9–17:30 Uhr · Sa & So 9–17 Uhr · Mo Ruhetag · Sonntagsfrühstück 9-13 Uhr nur mit Reservierung'
  //   Öffnungszeiten vom 09.–14.06.2026: Aufgrund privater Veranstaltungen schließen wir an einigen Tagen früher. Di 14–17:30 Uhr · Mi 9–17:30 Uhr · Do 9–14 Uhr · Fr 9–17:30 Uhr · Sa 9–13 Uhr · So 9–12:30 Uhr Sonntagsfrühstück nur mit Reservierung'
  //    Öffnungszeiten: Di 14–17:30 Uhr · Mi–Fr 9–17:30 Uhr · Sa & So 9–17 Uhr · Mo Ruhetag · Sonntagsfrühstück 9-13 Uhr nur mit Reservierung
  //   · Hinweis: Am Samstag (dd.mm.) schließen wir ab 12:30 Uhr wegen einer geschlossenen Gesellschaft.
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