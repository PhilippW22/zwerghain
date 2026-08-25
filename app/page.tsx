import Hero from '@/components/sections/Hero'
import Ticker from '@/components/ui/Ticker'
import EventHighlight from '@/components/sections/EventHighlight'
import AboutUs from '@/components/sections/AboutUs'
import FAQ from '@/components/sections/FAQ'
import Visit from '@/components/sections/Visit'

const tickerItems = [
  'Öffnungszeiten vom 24.08.–30.08.2026: Mo Ruhetag · Di 14–18 Uhr · Mi-Fr 9-14 Uhr · Sa & So wegen privaten Veranstaltungen geschlossen'
  //  Sommeröffnungszeiten: Di 14–18 Uhr · Mi–Fr 9–14 Uhr · Sa 9–18 Uhr · So 9-14 Uhr · Mo Ruhetag · Hinweis: Am Donnerstag (06.08.) und Samstag (08.08.) bleibt das Zwerghain geschlossen.'
  //   Öffnungszeiten vom 09.–14.06.2026: Aufgrund privater Veranstaltungen schließen wir an einigen Tagen früher. Di 14–17:30 Uhr · Mi 9–17:30 Uhr · Do 9–14 Uhr · Fr 9–17:30 Uhr · Sa 9–13 Uhr · So 9–12:30 Uhr Sonntagsfrühstück nur mit Reservierung'
  //    Öffnungszeiten: Di 14–17:30 Uhr · Mi–Fr 9–17:30 Uhr · Sa & So 9–17 Uhr · Mo Ruhetag · Sonntagsfrühstück 9-13 Uhr nur mit Reservierung
  //   · Hinweis: Am Samstag (dd.mm.) schließen wir ab 12:30 Uhr wegen einer geschlossenen Gesellschaft.
  // Öffnungszeiten vom 03.08.–09.08.2026: Mo Ruhetag · Di 14–18 Uhr · Mi 9-14 Uhr · Do geschlossen · Fr 9–14 Uhr · Sa geschlossen · So 9-14 Uhr
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