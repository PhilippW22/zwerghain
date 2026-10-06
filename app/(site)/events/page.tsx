import type { Metadata } from 'next'
import EventsTabs from './EventsTab'
import { getEventsData } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Events & Feiern',
  description:
    'Private Brunch & Kindergeburtstage im Zwerghain Berlin-Lichterfelde. Feiert exklusiv im Café – mit Frühstück, Spielbereichen und liebevoll gestalteten Geburtstagspaketen.',
}

export default async function EventsPage() {
  const eventsData = await getEventsData()
  return (
    <>
      {/* Intro – Server Component */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-brand-green uppercase tracking-widest mb-3">
            Feiern im Zwerghain
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
            Kindergeburtstage & Private Brunch in Berlin-Lichterfelde
          </h1>
          <p className="mt-4 text-gray-700 text-base sm:text-lg leading-relaxed">
          Feiern, frühstücken und besondere Momente genießen – während die Kleinen ihren Raum zum Spielen haben.
          Ob Kindergeburtstag oder ein exklusiver Vormittag mit euren Lieblingsmenschen: Wählt einfach aus, was zu euch passt.
          </p>
        </div>
      </section>

      <EventsTabs eventsData={eventsData} />
    </>
  )
}