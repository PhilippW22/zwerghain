'use client'

import React, { useState, useEffect, useRef, Suspense, cloneElement, isValidElement } from 'react'
import { useSearchParams } from 'next/navigation'

function localDateMin(): string {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

const anlaesse = [
  { value: '', label: 'Bitte wählen' },
  { value: 'geburtstag', label: 'Kindergeburtstag' },
  { value: 'fruehstueck', label: 'Sonntagsfrühstück' },
]

const birthdayExtras = [
  { value: 'kinderschminken', label: 'Kinderschminken', price: '65 € / Stunde' },
  { value: 'animation', label: 'Kinderanimation', price: '45 € / Stunde' },
  { value: 'basteln', label: 'Bastelaktionen', price: '13 € / Kind' },
  { value: 'gastgeschenk', label: 'Gastgeschenk-Tütchen', price: '10 €' },
  { value: 'einladungskarten', label: 'Einladungskarten', price: '10 €' },
  { value: 'torte', label: 'Individuelle Geburtstagstorte', price: 'ab 120 €' },
  { value: 'prinzessin_held', label: 'Prinzessin / Superheld', price: 'auf Anfrage' },
]

const mottoOptionen = [
  { value: '', label: 'Waldtier-Motto (inklusive)' },
  { value: 'prinzessin', label: 'Prinzessin' },
  { value: 'pirat', label: 'Pirat' },
  { value: 'superhelden', label: 'Superhelden' },
  { value: 'pawpatrol', label: 'Paw Patrol' },
  { value: 'dinosaurier', label: 'Dinosaurier' },
  { value: 'einhorn', label: 'Einhorn' },
  { value: 'sonstiges', label: 'Sonstiges (bitte im Nachrichtenfeld angeben)' },
]

const essenOptionen = [
  { value: 'pizza', label: 'Mini-Pizzen mit Käse (auf Wunsch Salami oder Schinken)', price: '7 € / Kind' },
  { value: 'nuggets', label: 'Chicken Nuggets mit Pommes', price: '8 € / Kind' },
]

const kindergAlterOptionen = [
  { value: '', label: 'Bitte wählen' },
  { value: '0-2', label: '0 – 2 Jahre' },
  { value: '2+', label: '2 Jahre oder älter' },
]

const stunden = Array.from({ length: 9 }, (_, i) => {
  const h = i + 9
  return { value: String(h), label: `${String(h).padStart(2, '0')}`}
})

const minuten = [
  { value: '00', label: ':00' },
  { value: '15', label: ':15' },
  { value: '30', label: ':30' },
  { value: '45', label: ':45' },
]

function numOptions(min: number, max: number, suffix = '') {
  return Array.from({ length: max - min + 1 }, (_, i) => ({
    value: String(i + min),
    label: `${i + min}${suffix}`,
  }))
}

function Field({ label, error, required, children, hint, htmlFor }: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
  hint?: string
  htmlFor?: string
}) {
  const errorId = htmlFor ? `${htmlFor}-error` : undefined
  const hintId = htmlFor ? `${htmlFor}-hint` : undefined
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
        {label}{required && <span aria-hidden="true" className="text-brand-green ml-1">*</span>}
      </label>
      {hint && <p id={hintId} className="text-xs text-gray-500 -mt-1">{hint}</p>}
      {isValidElement(children) && (describedBy || error)
        ? cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
            'aria-describedby': describedBy,
            'aria-invalid': error ? true : undefined,
          })
        : children}
      {error && <p id={errorId} role="alert" className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

function inputClass(error?: string) {
  return `rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green transition bg-white ${error ? 'border-red-400' : 'border-gray-200'}`
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="h-px flex-1 bg-gray-100" />
      <span className="text-xs font-semibold text-brand-green uppercase tracking-widest whitespace-nowrap">
        {children}
      </span>
      <div className="h-px flex-1 bg-gray-100" />
    </div>
  )
}

function TextareaWithCounter({ id, rows, value, onChange, placeholder, maxLength, className }: {
  id: string
  rows: number
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  maxLength: number
  className?: string
}) {
  const remaining = maxLength - value.length
  const isNearLimit = remaining <= 100

  return (
    <div className="flex flex-col gap-1">
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={className}
      />
      <p className={`text-xs text-right ${isNearLimit ? 'text-orange-500' : 'text-gray-400'}`}>
        {remaining} Zeichen verbleibend
      </p>
    </div>
  )
}

function UhrzeitDropdown({ stunde, minute, onStunde, onMinute, errorStunde, required, idStunde }: {
  stunde: string
  minute: string
  onStunde: (v: string) => void
  onMinute: (v: string) => void
  errorStunde?: string
  required?: boolean
  idStunde: string
}) {
  const errorId = `${idStunde}-error`
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-gray-700">
        Wunschuhrzeit{required && <span aria-hidden="true" className="text-brand-green ml-1">*</span>}
      </span>
      <div className="flex gap-2">
        <select
          id={idStunde}
          aria-label="Stunde"
          aria-invalid={errorStunde ? true : undefined}
          aria-describedby={errorStunde ? errorId : undefined}
          value={stunde}
          onChange={e => onStunde(e.target.value)}
          className={`flex-1 ${inputClass(errorStunde)}`}
        >
          <option value="">Stunde</option>
          {stunden.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <select
          aria-label="Minute"
          value={minute}
          onChange={e => onMinute(e.target.value)}
          className={`flex-1 ${inputClass()}`}
        >
          {minuten.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
        </select>
      </div>
      {errorStunde && <p id={errorId} role="alert" className="text-xs text-red-500">{errorStunde}</p>}
    </div>
  )
}

function KontaktForm() {
  const searchParams = useSearchParams()
  const formRef = useRef<HTMLFormElement>(null)

  const [form, setForm] = useState({
    vorname: '', nachname: '', email: '', telefon: '', anlass: '',
    honeypot: '',
    gb_kind_name: '', gb_kind_alter: '', gb_datum: '',
    gb_stunde: '', gb_minute: '00',
    gb_kinder: '', gb_erwachsene: '', gb_extras: [] as string[],
    gb_motto: '', gb_essen: [] as string[], gb_nachricht: '',
    fs_sonntag: '', fs_slot: '', fs_erwachsene: '', fs_kinder: '',
    fs_kind_alter: '', fs_vegetarisch: false, fs_nachricht: '',
    datenschutz: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    const anlass = searchParams.get('anlass')
    const map: Record<string, string> = {
      eichhoernchen: 'geburtstag', fuchseule: 'geburtstag',
      fruehstueck: 'fruehstueck',
    }
    if (anlass && map[anlass] !== undefined) {
      setForm((prev) => ({ ...prev, anlass: map[anlass] }))
    } else if (anlass) {
      setForm((prev) => ({ ...prev, anlass }))
    }
  }, [searchParams])

  const set = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
    setServerError('')
  }

  const toggleArray = (field: 'gb_extras' | 'gb_essen', value: string) => {
    setServerError('')
    setForm((prev) => {
      const arr = prev[field]
      return { ...prev, [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] }
    })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.vorname.trim()) e.vorname = 'Bitte Vornamen eingeben.'
    if (!form.nachname.trim()) e.nachname = 'Bitte Nachnamen eingeben.'
    if (!form.email.trim()) e.email = 'Bitte E-Mail-Adresse eingeben.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Bitte gültige E-Mail eingeben.'
    if (!form.anlass) e.anlass = 'Bitte einen Anlass wählen.'

    if (form.anlass === 'geburtstag') {
      if (!form.gb_kind_name.trim()) e.gb_kind_name = 'Bitte Namen eingeben.'
      if (!form.gb_kind_alter) e.gb_kind_alter = 'Bitte Alter wählen.'
      if (!form.gb_datum) e.gb_datum = 'Bitte Datum wählen.'
      if (!form.gb_stunde) e.gb_stunde = 'Bitte Uhrzeit wählen.'
      if (!form.gb_kinder) e.gb_kinder = 'Bitte Anzahl wählen.'
      if (!form.gb_erwachsene) e.gb_erwachsene = 'Bitte Anzahl wählen.'
    }

    if (form.anlass === 'fruehstueck') {
      if (!form.fs_sonntag) {
        e.fs_sonntag = 'Bitte einen Sonntag wählen.'
      } else {
        const day = new Date(form.fs_sonntag + 'T12:00:00').getDay()
        if (day !== 0) e.fs_sonntag = 'Bitte einen Sonntag auswählen.'
      }
      if (!form.fs_slot) e.fs_slot = 'Bitte Slot wählen.'
      if (!form.fs_erwachsene) e.fs_erwachsene = 'Bitte Anzahl wählen.'
      if (!form.fs_kinder) e.fs_kinder = 'Bitte Anzahl wählen.'
      if (!form.fs_kind_alter) e.fs_kind_alter = 'Bitte Alter wählen.'
    }

    if (!form.datenschutz) e.datenschutz = 'Bitte Datenschutz akzeptieren.'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const firstKey = Object.keys(errs)[0]
      setTimeout(() => {
        const el = formRef.current?.querySelector<HTMLElement>(`#${firstKey}`)
        if (el) {
          el.focus()
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 50)
      return
    }

    setLoading(true)
    setServerError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setServerError(data.error || 'Ein Fehler ist aufgetreten. Bitte versucht es erneut.')
        return
      }

      setSubmitted(true)

    } catch {
      setServerError('Verbindungsfehler. Bitte prüft eure Internetverbindung.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div role="alert" aria-live="polite" className="bg-white rounded-3xl shadow-sm p-8 sm:p-12 text-center max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-4" aria-hidden="true">
          <svg className="w-8 h-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-brand-green mb-3">Anfrage gesendet!</h2>
        <p className="text-gray-700 leading-relaxed">
          Vielen Dank! Wir melden uns so schnell wie möglich bei euch zurück und bestätigen eure Anfrage persönlich.
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Kontaktformular"
      className="bg-white rounded-3xl shadow-sm p-6 sm:p-10 flex flex-col gap-6">

      {/* ── Honeypot ── */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
      >
        <label htmlFor="honeypot">Bitte leer lassen</label>
        <input
          id="honeypot"
          name="honeypot"
          type="text"
          value={form.honeypot}
          onChange={e => set('honeypot', e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p className="text-sm text-gray-500">
        Felder mit <span className="text-brand-green">*</span> sind Pflichtfelder.
      </p>

      {/* ── KONTAKTDATEN ── */}
      <SectionLabel>Eure Kontaktdaten</SectionLabel>

      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-0 p-0 m-0">
        <legend className="sr-only">Name</legend>
        <Field label="Vorname" required error={errors.vorname} htmlFor="vorname">
          <input id="vorname" type="text" autoComplete="given-name" value={form.vorname}
            onChange={e => set('vorname', e.target.value)} className={inputClass(errors.vorname)} />
        </Field>
        <Field label="Nachname" required error={errors.nachname} htmlFor="nachname">
          <input id="nachname" type="text" autoComplete="family-name" value={form.nachname}
            onChange={e => set('nachname', e.target.value)} className={inputClass(errors.nachname)} />
        </Field>
      </fieldset>

      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-0 p-0 m-0">
        <legend className="sr-only">Kontakt</legend>
        <Field label="E-Mail" required error={errors.email} htmlFor="email">
          <input id="email" type="email" autoComplete="email" value={form.email}
            onChange={e => set('email', e.target.value)} className={inputClass(errors.email)} />
        </Field>
        <Field label="Telefon" htmlFor="telefon">
          <input id="telefon" type="tel" autoComplete="tel" value={form.telefon}
            onChange={e => set('telefon', e.target.value)} className={inputClass()} />
        </Field>
      </fieldset>

      {/* ── ANLASS ── */}
      <SectionLabel>Worum geht es?</SectionLabel>

      <Field label="Anlass der Anfrage" required error={errors.anlass} htmlFor="anlass">
        <select id="anlass" value={form.anlass}
          onChange={e => set('anlass', e.target.value)} className={inputClass(errors.anlass)}>
          {anlaesse.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </Field>


      {/* ── KINDERGEBURTSTAG ── */}
      {form.anlass === 'geburtstag' && (
        <>
          <SectionLabel>Kindergeburtstag</SectionLabel>

          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-0 p-0 m-0">
            <legend className="sr-only">Geburtstagskind</legend>
            <Field label="Name des Geburtstagskindes" required error={errors.gb_kind_name} htmlFor="gb_kind_name">
              <input id="gb_kind_name" type="text" value={form.gb_kind_name}
                onChange={e => set('gb_kind_name', e.target.value)}
                className={inputClass(errors.gb_kind_name)} />
            </Field>
            <Field label="Alter des Geburtstagskindes" required error={errors.gb_kind_alter} htmlFor="gb_kind_alter">
              <select id="gb_kind_alter" value={form.gb_kind_alter}
                onChange={e => set('gb_kind_alter', e.target.value)} className={inputClass(errors.gb_kind_alter)}>
                <option value="">Bitte wählen</option>
                {numOptions(1, 12, ' Jahre').map(o =>
                  <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
          </fieldset>

          <fieldset className="flex flex-col gap-4 border-0 p-0 m-0">
            <legend className="text-sm font-medium text-gray-700 mb-1">
              Wunschtermin
              <span className="block text-xs font-normal text-gray-500 mt-0.5">
                Sa & So ab 14:30 · Mi & Do ab 14:30 · weitere Termine auf Anfrage
              </span>
            </legend>
            <Field label="Datum" required error={errors.gb_datum} htmlFor="gb_datum">
              <input id="gb_datum" type="date"
                min={localDateMin()}
                value={form.gb_datum}
                onChange={e => set('gb_datum', e.target.value)}
                className={inputClass(errors.gb_datum)} />
            </Field>
            <UhrzeitDropdown
              idStunde="gb_stunde"
              stunde={form.gb_stunde} minute={form.gb_minute}
              onStunde={v => set('gb_stunde', v)} onMinute={v => set('gb_minute', v)}
              errorStunde={errors.gb_stunde} required
            />
          </fieldset>

          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-0 p-0 m-0">
            <legend className="text-sm font-medium text-gray-700 mb-1 col-span-full">Anzahl der Gäste</legend>
            <Field label="Kinder (inkl. Geburtstagskind)" required error={errors.gb_kinder} htmlFor="gb_kinder">
              <select id="gb_kinder" value={form.gb_kinder}
                onChange={e => set('gb_kinder', e.target.value)} className={inputClass(errors.gb_kinder)}>
                <option value="">Bitte wählen</option>
                {numOptions(1, 10, ' Kinder').map(o =>
                  <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
            <Field label="Erwachsene" required error={errors.gb_erwachsene} htmlFor="gb_erwachsene">
              <select id="gb_erwachsene" value={form.gb_erwachsene}
                onChange={e => set('gb_erwachsene', e.target.value)} className={inputClass(errors.gb_erwachsene)}>
                <option value="">Bitte wählen</option>
                {numOptions(0, 15, ' Erwachsene').map(o =>
                  <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
          </fieldset>

          <Field label="Motto-Dekoration" htmlFor="gb_motto"
            hint="Waldtier-Motto ist kostenlos enthalten. Individuelles Motto: 35 € pauschal.">
            <select id="gb_motto" value={form.gb_motto}
              onChange={e => set('gb_motto', e.target.value)} className={inputClass()}>
              {mottoOptionen.map(o =>
                <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </Field>

          <fieldset className="border-0 p-0 m-0 flex flex-col gap-2">
            <legend className="text-sm font-medium text-gray-700 mb-1">Extras & Zusatzangebote</legend>
            <p className="text-xs text-gray-500 -mt-1 mb-2">Mehrfachauswahl möglich</p>
            {birthdayExtras.map(extra => (
              <label key={extra.value} htmlFor={`extra_${extra.value}`}
                className="flex items-center justify-between gap-3 cursor-pointer group">
                <span className="flex items-center gap-3">
                  <input id={`extra_${extra.value}`} type="checkbox"
                    checked={form.gb_extras.includes(extra.value)}
                    onChange={() => toggleArray('gb_extras', extra.value)}
                    className="w-4 h-4 rounded accent-brand-green cursor-pointer shrink-0" />
                  <span className="text-sm text-gray-700 group-hover:text-brand-green transition-colors">
                    {extra.label}
                  </span>
                </span>
                <span className="text-xs text-gray-500 whitespace-nowrap">{extra.price}</span>
              </label>
            ))}
          </fieldset>

          <fieldset className="border-0 p-0 m-0 flex flex-col gap-2">
            <legend className="text-sm font-medium text-gray-700 mb-1">Optionales Essen</legend>
            <p className="text-xs text-gray-500 -mt-1 mb-2">Mehrfachauswahl möglich</p>
            {essenOptionen.map(essen => (
              <label key={essen.value} htmlFor={`essen_${essen.value}`}
                className="flex items-center justify-between gap-3 cursor-pointer group">
                <span className="flex items-center gap-3">
                  <input id={`essen_${essen.value}`} type="checkbox"
                    checked={form.gb_essen.includes(essen.value)}
                    onChange={() => toggleArray('gb_essen', essen.value)}
                    className="w-4 h-4 rounded accent-brand-green cursor-pointer shrink-0" />
                  <span className="text-sm text-gray-700 group-hover:text-brand-green transition-colors">
                    {essen.label}
                  </span>
                </span>
                <span className="text-xs text-gray-500 whitespace-nowrap">{essen.price}</span>
              </label>
            ))}
          </fieldset>

          <Field label="Sonstiges & weitere Fragen" htmlFor="gb_nachricht">
            <TextareaWithCounter
              id="gb_nachricht"
              rows={4}
              value={form.gb_nachricht}
              onChange={e => set('gb_nachricht', e.target.value)}
              placeholder="Allergien, besondere Wünsche, weitere Fragen…"
              maxLength={1500}
              className={`${inputClass()} resize-none`}
            />
          </Field>
        </>
      )}

      {/* ── SONNTAGSFRÜHSTÜCK ── */}
      {form.anlass === 'fruehstueck' && (
        <>
          <SectionLabel>Sonntagsfrühstück</SectionLabel>

          <Field label="Wunsch-Sonntag" required error={errors.fs_sonntag} htmlFor="fs_sonntag"
            hint="Bitte wählt einen Sonntag aus.">
            <input
              id="fs_sonntag"
              type="date"
              min={localDateMin()}
              value={form.fs_sonntag}
              onChange={e => set('fs_sonntag', e.target.value)}
              className={inputClass(errors.fs_sonntag)}
            />
          </Field>

          <Field label="Frühstücks-Slot" required error={errors.fs_slot} htmlFor="fs_slot">
            <select id="fs_slot" value={form.fs_slot}
              onChange={e => set('fs_slot', e.target.value)}
              className={inputClass(errors.fs_slot)}>
              <option value="">Bitte wählen</option>
              <option value="9:00">9:00 – 10:30 Uhr</option>
              <option value="11:00">11:00 – 12:30 Uhr</option>
            </select>
          </Field>

          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-0 p-0 m-0">
            <legend className="text-sm font-medium text-gray-700 mb-1 col-span-full">Anzahl der Personen</legend>
            <Field label="Erwachsene" required error={errors.fs_erwachsene} htmlFor="fs_erwachsene">
              <select id="fs_erwachsene" value={form.fs_erwachsene}
                onChange={e => set('fs_erwachsene', e.target.value)} className={inputClass(errors.fs_erwachsene)}>
                <option value="">Bitte wählen</option>
                {numOptions(1, 8, ' Erwachsene').map(o =>
                  <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
            <Field label="Kinder" required error={errors.fs_kinder} htmlFor="fs_kinder">
              <select id="fs_kinder" value={form.fs_kinder}
                onChange={e => set('fs_kinder', e.target.value)} className={inputClass(errors.fs_kinder)}>
                <option value="">Bitte wählen</option>
                {numOptions(0, 8, ' Kinder').map(o =>
                  <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
          </fieldset>

          <Field label="Alter des jüngsten Kindes" required error={errors.fs_kind_alter} htmlFor="fs_kind_alter">
            <select id="fs_kind_alter" value={form.fs_kind_alter}
              onChange={e => set('fs_kind_alter', e.target.value)} className={inputClass(errors.fs_kind_alter)}>
              {kindergAlterOptionen.map(o =>
                <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </Field>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Etagere-Präferenz</span>
            <div className="flex items-center gap-3">
              <input id="fs_vegetarisch" type="checkbox" checked={form.fs_vegetarisch}
                onChange={e => set('fs_vegetarisch', e.target.checked)}
                className="w-4 h-4 rounded accent-brand-green cursor-pointer" />
              <label htmlFor="fs_vegetarisch" className="text-sm text-gray-700 cursor-pointer">
                Etagere vegetarisch
              </label>
            </div>
          </div>

          <Field label="Besondere Wünsche oder Hinweise" htmlFor="fs_nachricht">
            <TextareaWithCounter
              id="fs_nachricht"
              rows={3}
              value={form.fs_nachricht}
              onChange={e => set('fs_nachricht', e.target.value)}
              placeholder="Allergien, Unverträglichkeiten, sonstige Wünsche…"
              maxLength={1000}
              className={`${inputClass()} resize-none`}
            />
          </Field>
        </>
      )}

      {/* ── ABSCHLUSS ── */}
      {form.anlass && (
        <>
          <SectionLabel>Abschluss</SectionLabel>

          <div className="bg-brand-green/5 rounded-2xl px-5 py-4 text-sm text-gray-600 leading-relaxed">
            <p>
              <span className="font-medium text-brand-green">Hinweis:</span> Eure Anfrage ist unverbindlich.
              Wir melden uns zeitnah per E-Mail oder Telefon zurück und bestätigen eure Reservierung persönlich.
              Erst mit unserer Bestätigung ist die Buchung verbindlich.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-start gap-3">
              <input id="datenschutz" type="checkbox" checked={form.datenschutz}
                onChange={e => set('datenschutz', e.target.checked)}
                aria-invalid={errors.datenschutz ? true : undefined}
                aria-describedby={errors.datenschutz ? 'datenschutz-error' : undefined}
                className="mt-0.5 w-4 h-4 rounded accent-brand-green cursor-pointer shrink-0"
                aria-required="true" />
              <label htmlFor="datenschutz" className="text-sm text-gray-700 cursor-pointer">
                Ich akzeptiere, dass meine Daten verarbeitet und gespeichert werden.{' '}
                <span aria-hidden="true" className="text-brand-green">*</span>
              </label>
            </div>
            <a href="/datenschutz"
              className="ml-7 text-sm underline text-brand-green hover:text-brand-green/80 transition-colors w-fit">
              Datenschutzerklärung lesen
            </a>
            {errors.datenschutz && (
              <p id="datenschutz-error" role="alert" className="text-xs text-red-500 ml-7">
                {errors.datenschutz}
              </p>
            )}
          </div>

          {serverError && (
            <p role="alert" className="text-sm text-red-500 text-center">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-green text-white px-6 py-4 rounded-2xl text-base font-bold hover:bg-brand-green/90 transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 mt-2 disabled:opacity-60"
          >
            {loading ? 'Wird gesendet…' : 'Anfrage absenden'}
          </button>
        </>
      )}
    </form>
  )
}

export default function KontaktPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-brand-green uppercase tracking-widest mb-3">Kontakt</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
          Schreibt uns – wir freuen uns!
        </h1>
        <p className="mt-4 text-gray-600 text-base leading-relaxed">
          Ob Kindergeburtstag oder Sonntagsfrühstück –
          wir antworten so schnell wie möglich und beraten euch gerne persönlich.
        </p>
      </div>
      <Suspense fallback={<div className="text-center text-gray-500 text-sm">Formular wird geladen…</div>}>
        <KontaktForm />
      </Suspense>
    </div>
  )
}