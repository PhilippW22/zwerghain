import Hero from '@/components/sections/Hero'
import Ticker from '@/components/ui/Ticker'
import EventHighlight from '@/components/sections/EventHighlight'
import AboutUs from '@/components/sections/AboutUs'
import FAQ from '@/components/sections/FAQ'
import Tagline from '@/components/sections/Tagline'

const tickerItems = [
  'Öffnungszeiten: Di–Fr 9–17:30 Uhr · Sa & So 9–17 Uhr · WICHTIGER HINWEIS: Am 21. & 22.03. bleibt das Zwerghain am Nachmittag wegen einer Feier geschlossen.',
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