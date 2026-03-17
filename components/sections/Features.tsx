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
      <WaveDivider fromColor="#83A17D" toColor="#F5F5DC" />

      <section
        aria-labelledby="features-heading"
        className="bg-brand-beige py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="features-heading"
            className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10"
          >
            Spielen, genießen und feiern im Eltern-Kind-Café Zwerghain in Berlin-Lichterfelde.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} title={feature.title} variant="default">
                <div className="relative w-full h-44 rounded-2xl overflow-hidden">
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
    </>
  )
}