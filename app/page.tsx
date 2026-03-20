import Hero from '@/components/sections/Hero'
import Ticker from '@/components/ui/Ticker'
import EventHighlight from '@/components/sections/EventHighlight'
import AboutUs from '@/components/sections/AboutUs'
import FAQ from '@/components/sections/FAQ'
import Tagline from '@/components/sections/Tagline'
import Visit from '@/components/sections/Visit'

const tickerItems = [
  'Öffnungszeiten: Di–Fr 9–17:30 Uhr · Sa & So 9–17 Uhr · HINWEIS: An folgenden Tagen bleibt das Zwerghain nachmittags geschlossen: 21.03. · 11.04. · 18.04.',
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