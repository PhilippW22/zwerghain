'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const anlaesse = [
  { value: '', label: 'Bitte wählen' },
  { value: 'eichhoernchen', label: 'Paket Eichhörnchen – Geburtstag während des Cafébetriebs' },
  { value: 'fuchseule', label: 'Paket Fuchs & Eule – Exklusive Geburtstagsfeier' },
  { value: 'kuchen', label: 'Geburtstagskuchen & Torten' },
  { value: 'familienfest', label: 'Besondere Momente – Familienfest, Taufe & Baby Shower' },
  { value: 'allgemein', label: 'Allgemeine Anfrage' },
]

const addonOptionen = [
  { value: 'kinderschminken', label: 'Kinderschminken – 35,00 € pauschal' },
  { value: 'schatzsuche', label: 'Schatzsuche – 39,00 € pauschal' },
  { value: 'kinderdisco', label: 'Kinderdisco mit Musik & Licht – 28,00 € pauschal' },
  { value: 'animation', label: 'Kinderanimation (45 Min.) – 55,00 €' },
  { value: 'helden', label: 'Helden-Besuch – auf Anfrage' },
]

function KontaktForm() {
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    wunschtag: '',
    wunschzeit: '',
    anlass: '',
    addons: [] as string[],
    nachricht: '',
    datenschutz: false,
  })

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Vorauswahl aus URL-Parameter
  useEffect(() => {
    const anlass = searchParams.get('anlass')
    if (anlass) {
      setFormData((prev) => ({ ...prev, anlass }))
    }
  }, [searchParams])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    if (type === 'checkbox' && name === 'datenschutz') {
      setFormData((prev) => ({ ...prev, datenschutz: (e.target as HTMLInputElement).checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleAddonToggle = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      addons: prev.addons.includes(value)
        ? prev.addons.filter((a) => a !== value)
        : [...prev.addons, value],
    }))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.vorname.trim()) newErrors.vorname = 'Bitte Vornamen eingeben.'
    if (!formData.nachname.trim()) newErrors.nachname = 'Bitte Nachnamen eingeben.'
    if (!formData.email.trim()) newErrors.email = 'Bitte E-Mail-Adresse eingeben.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Bitte eine gültige E-Mail-Adresse eingeben.'
    if (!formData.anlass) newErrors.anlass = 'Bitte einen Anlass wählen.'
    if (!formData.datenschutz) newErrors.datenschutz = 'Bitte Datenschutz akzeptieren.'
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    // Hier später: API-Route oder Formularservice einbinden
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="bg-white rounded-3xl shadow-sm p-8 sm:p-12 text-center max-w-xl mx-auto"
      >
        <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-4" aria-hidden="true">
          <svg className="w-8 h-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-brand-green mb-3">Anfrage gesendet!</h2>
        <p className="text-gray-700 leading-relaxed">
          Vielen Dank für deine Nachricht. Wir melden uns so schnell wie möglich bei dir.
          Wir freuen uns darauf, mit euch zu feiern!
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Kontaktformular"
      className="bg-white rounded-3xl shadow-sm p-6 sm:p-10 flex flex-col gap-6"
    >
      <p className="text-sm text-gray-500">
        Felder mit <span aria-label="Pflichtfeld">*</span> sind Pflichtfelder.
      </p>

      {/* Name */}
      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-0 p-0 m-0">
        <legend className="sr-only">Name</legend>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="vorname" className="text-sm font-medium text-gray-700">
            Vorname <span aria-hidden="true" className="text-brand-green">*</span>
          </label>
          <input
            id="vorname"
            name="vorname"
            type="text"
            autoComplete="given-name"
            required
            aria-required="true"
            aria-describedby={errors.vorname ? 'vorname-error' : undefined}
            aria-invalid={!!errors.vorname}
            value={formData.vorname}
            onChange={handleChange}
            className={`rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green transition ${
              errors.vorname ? 'border-red-400' : 'border-gray-200'
            }`}
          />
          {errors.vorname && (
            <p id="vorname-error" role="alert" className="text-xs text-red-500 mt-0.5">
              {errors.vorname}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="nachname" className="text-sm font-medium text-gray-700">
            Nachname <span aria-hidden="true" className="text-brand-green">*</span>
          </label>
          <input
            id="nachname"
            name="nachname"
            type="text"
            autoComplete="family-name"
            required
            aria-required="true"
            aria-describedby={errors.nachname ? 'nachname-error' : undefined}
            aria-invalid={!!errors.nachname}
            value={formData.nachname}
            onChange={handleChange}
            className={`rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green transition ${
              errors.nachname ? 'border-red-400' : 'border-gray-200'
            }`}
          />
          {errors.nachname && (
            <p id="nachname-error" role="alert" className="text-xs text-red-500 mt-0.5">
              {errors.nachname}
            </p>
          )}
        </div>
      </fieldset>

      {/* E-Mail */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          E-Mail <span aria-hidden="true" className="text-brand-green">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-required="true"
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
          value={formData.email}
          onChange={handleChange}
          className={`rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green transition ${
            errors.email ? 'border-red-400' : 'border-gray-200'
          }`}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-xs text-red-500 mt-0.5">
            {errors.email}
          </p>
        )}
      </div>

      {/* Telefon */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="telefon" className="text-sm font-medium text-gray-700">
          Telefon
        </label>
        <input
          id="telefon"
          name="telefon"
          type="tel"
          autoComplete="tel"
          value={formData.telefon}
          onChange={handleChange}
          className="rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green transition"
        />
      </div>

      {/* Wunschtag & -zeit */}
      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-0 p-0 m-0">
        <legend className="text-sm font-medium text-gray-700 mb-1 col-span-full">
          Wunschtag & -zeit
        </legend>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="wunschtag" className="text-sm text-gray-600">
            Datum
          </label>
          <input
            id="wunschtag"
            name="wunschtag"
            type="date"
            value={formData.wunschtag}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="wunschzeit" className="text-sm text-gray-600">
            Uhrzeit
          </label>
          <input
            id="wunschzeit"
            name="wunschzeit"
            type="time"
            value={formData.wunschzeit}
            onChange={handleChange}
            className="rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green transition"
          />
        </div>
      </fieldset>

      {/* Anlass */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="anlass" className="text-sm font-medium text-gray-700">
          Anlass der Anfrage <span aria-hidden="true" className="text-brand-green">*</span>
        </label>
        <select
          id="anlass"
          name="anlass"
          required
          aria-required="true"
          aria-describedby={errors.anlass ? 'anlass-error' : undefined}
          aria-invalid={!!errors.anlass}
          value={formData.anlass}
          onChange={handleChange}
          className={`rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green transition bg-white ${
            errors.anlass ? 'border-red-400' : 'border-gray-200'
          }`}
        >
          {anlaesse.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.anlass && (
          <p id="anlass-error" role="alert" className="text-xs text-red-500 mt-0.5">
            {errors.anlass}
          </p>
        )}
      </div>

      {/* Add-ons */}
      <fieldset className="border-0 p-0 m-0 flex flex-col gap-2">
        <legend className="text-sm font-medium text-gray-700 mb-1">
          Zubuchbare Highlights & Animation
        </legend>
        <p className="text-xs text-gray-500 -mt-1 mb-2">Mehrfachauswahl möglich</p>
        <div className="flex flex-col gap-2">
          {addonOptionen.map((addon) => (
            <label
              key={addon.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                name="addons"
                value={addon.value}
                checked={formData.addons.includes(addon.value)}
                onChange={() => handleAddonToggle(addon.value)}
                className="w-4 h-4 rounded accent-brand-green cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-brand-green transition-colors">
                {addon.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Nachricht */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="nachricht" className="text-sm font-medium text-gray-700">
          Besondere Wünsche & weitere Informationen
        </label>
        <p id="nachricht-hint" className="text-xs text-gray-500">
          In diesem Textfeld kannst du uns deine weiteren Wünsche, Informationen zum Anlass,
          Dekorationswünsche sowie die Anzahl der Gäste übermitteln. Das hilft uns, dir ein
          passendes Arrangement zusammenzustellen, das deine Feierlichkeit zum Highlight werden lässt.
        </p>
        <textarea
          id="nachricht"
          name="nachricht"
          rows={5}
          aria-describedby="nachricht-hint"
          value={formData.nachricht}
          onChange={handleChange}
          className="rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green transition resize-none"
        />
      </div>

      {/* Datenschutz */}
        <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 cursor-pointer">
            <input
            type="checkbox"
            name="datenschutz"
            required
            aria-required="true"
            aria-describedby={errors.datenschutz ? 'datenschutz-error' : undefined}
            aria-invalid={!!errors.datenschutz}
            checked={formData.datenschutz}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 rounded accent-brand-green cursor-pointer shrink-0"
            />
            <span className="text-sm text-gray-700">
            Ich akzeptiere, dass meine Daten verarbeitet und gespeichert werden.{' '}
            <span aria-hidden="true" className="text-brand-green">*</span>{' '}
            <a
                href="/datenschutz"
                className="underline text-brand-green hover:text-brand-green/80 transition-colors"
            >
                Datenschutzerklärung lesen
            </a>
            </span>
        </label>
        {errors.datenschutz && (
            <p id="datenschutz-error" role="alert" className="text-xs text-red-500 mt-0.5 ml-7">
            {errors.datenschutz}
            </p>
        )}
        </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-brand-green text-white px-6 py-4 rounded-2xl text-base font-bold hover:bg-brand-green/90 transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 mt-2"
      >
        Anfrage absenden
      </button>
    </form>
  )
}

export default function KontaktPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-brand-green uppercase tracking-widest mb-3">
          Kontakt
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
          Schreibt uns – wir freuen uns!
        </h1>
        <p className="mt-4 text-gray-600 text-base leading-relaxed">
          Ob Geburtstag, Familienfest oder eine allgemeine Frage – wir antworten
          so schnell wie möglich und beraten euch gerne persönlich.
        </p>
      </div>

      <Suspense fallback={<div className="text-center text-gray-500 text-sm">Formular wird geladen…</div>}>
        <KontaktForm />
      </Suspense>
    </div>
  )
}