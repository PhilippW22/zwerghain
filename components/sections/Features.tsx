import Image from 'next/image'
import Card from '@/components/ui/Card'
import WaveDivider from '@/components/ui/WaveDivider'

const features = [
  {
    image: '/images/feature1.jpg',
    imageAlt: 'Spielbereich im Eltern-Kind-Café Zwerghain in Berlin-Lichterfelde',
    title: 'Spielen & Entspannen',
    text: 'Freies Spielen, Bewegung und kreatives Entdecken stehen bei uns für Kinder im Mittelpunkt. Eltern genießen dabei eine entspannte Pause.',
  },
  {
    image: '/images/feature2.jpg',
    imageAlt: 'Snacks und Waffeln im Zwerghain Eltern-Kind-Café in Berlin',
    title: 'Genuss & Café',
    text: 'Im Zwerghain trifft bewusste Küche auf Familienalltag. Freut euch auf leichte Snacks, herzhafte Kartoffelwaffeln und Bagels sowie unsere beliebte Waffel am Stiel.',
  },
  {
    image: '/images/feature3.jpg',
    imageAlt: 'Kindergeburtstag im Zwerghain – Eventlocation in Berlin-Lichterfelde',
    title: 'Feiern & Events',
    text: 'Kindergeburtstag, Baby Shower oder Familienfest – wir gestalten eure Feier individuell und mit viel Liebe zum Detail. Regionale Torten und persönliche Akzente machen das Zwerghain zur Eventlocation in Berlin-Lichterfelde.',
  },
]

export default function Features() {
  return (
    <>
      <section
        aria-labelledby="features-heading"
        className="relative bg-brand-green py-12 sm:py-16 overflow-hidden"
      >
        {/* Subtiler Hintergrund-Gradient für Tiefe */}
        <div
          className="absolute inset-0 opacity-30"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse at 20% 50%, #079171 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #025a45 0%, transparent 50%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="features-heading"
            className="text-2xl sm:text-3xl font-bold text-white text-center mb-10"
          >
            Spielen, genießen und feiern im Eltern-Kind-Café Zwerghain in Berlin-Lichterfelde.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} title={feature.title} variant="glass">
                <div className="relative w-full h-44 -mx-0 rounded-2xl overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p>{feature.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#415F48" toColor="#F5F5DC" />
    </>
  )
}