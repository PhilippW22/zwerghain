import { Suspense } from 'react'
import { client } from '@/lib/sanity'
import KontaktForm from './KontaktForm'

async function getBlockedSundays(): Promise<string[]> {
  try {
    const data = await client.fetch(`*[_type == "blockedDates"][0].dates`)
    if (Array.isArray(data) && data.length > 0) return data
    return ['2026-09-27']
  } catch {
    return ['2026-09-27']
  }
}

export default async function KontaktPage() {
  const blockedSundays = await getBlockedSundays()

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-brand-green uppercase tracking-widest mb-3">Kontakt</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
          Schreibt uns – wir freuen uns!
        </h1>
        <p className="mt-4 text-gray-600 text-base leading-relaxed">
          Ob Kindergeburtstag, Private Brunch, Sonntagsfrühstück oder ein ganz besonderer Anlass –
          wir antworten so schnell wie möglich und beraten euch gerne persönlich.
        </p>
      </div>
      <Suspense fallback={<div className="text-center text-gray-500 text-sm">Formular wird geladen…</div>}>
        <KontaktForm blockedSundays={blockedSundays} />
      </Suspense>
    </div>
  )
}