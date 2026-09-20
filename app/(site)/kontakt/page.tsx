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

function isDateSaturday(dateStr: string): boolean {
  if (!dateStr) return false
  return new Date(dateStr + 'T12:00:00').getDay() === 6
}

function isDateSunday(dateStr: string): boolean {
  if (!dateStr) return false
  return new Date(dateStr + 'T12:00:00').getDay() === 0
}

const BLOCKED_SUNDAYS = ['2026-08-30']

const VALID_ANLAESSE = ['eichhoernchen', 'fuchs', 'brunch_small', 'brunch_large', 'fruehstueck', 'individuell']

const anlaesse = [
  { value: '', label: 'Bitte wählen' },
  { value: 'eichhoernchen', label: '🐿️ Eichhörnchen-Feier – 329 €' },
  { value: 'fuchs', label: '🦊 Fuchs-Feier – 429 €' },
  { value: 'brunch_small', label: '🥐 Private Brunch Small – 329 €' },
  { value: 'brunch_large', label: '🥐 Private Brunch Large – 469 €' },
  { value: 'fruehstueck', label: '☕ Sonntagsfrühstück' },
  { value: 'individuell', label: '✉️ Individuelle Anfrage' },
]

const farbOptionen = [
  { value: '', label: 'Bitte wählen' },
  { value: 'rosa', label: 'Rosa' },
  { value: 'blau', label: 'Blau' },
  { value: 'gruen', label: 'Grün' },
  { value: 'gelb', label: 'Gelb' },
]

const mottoOptionen = [
  { value: '', label: 'Bitte wählen' },
  { value: 'prinzessin', label: 'Prinzessin' },
  { value: 'pirat', label: 'Pirat' },
  { value: 'superhelden', label: 'Superhelden' },
  { value: 'pawpatrol', label: 'Paw Patrol' },
  { value: 'dinosaurier', label: 'Dinosaurier' },
  { value: 'einhorn', label: 'Einhorn' },
  { value: 'waldtiere', label: 'Waldtiere' },
  { value: 'sonstiges', label: 'Sonstiges (bitte im Nachrichtenfeld angeben)' },
]

const kindergAlterOptionen = [
  { value: '', label: 'Bitte wählen' },
  { value: '0-2', label: '0 – 2 Jahre' },
  { value: '2+', label: '2 Jahre oder älter' },
]

const geburtstagExtras = [
  { value: 'kinderschminken', label: 'Kinderschminken', price: 'auf Anfrage' },
  { value: 'animation', label: 'Kinderanimation', price: 'auf Anfrage' },
  { value: 'basteln', label: 'Bastelaktionen', price: '13 € / Kind' },
  { value: 'gastgeschenk', label: 'Gastgeschenk-Tütchen', price: '10 €' },
  { value: 'torte', label: 'Individuelle Geburtstagstorte', price: 'ab 120 €' },
  { value: 'prinzessin_held', label: 'Prinzessin / Superheld', price: 'auf Anfrage' },
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
      <textarea id={id} rows={rows} value={value} onChange={onChange}
        placeholder={placeholder} maxLength={maxLength} className={className} />
      <p className={`text-xs text-right ${isNearLimit ? 'text-orange-500' : 'text-gray-400'}`}>
        {remaining} Zeichen verbleibend
      </p>
    </div>
  )
}

function KontaktForm() {
  const searchParams = useSearchParams()
  const formRef = useRef<HTMLFormElement>(null)

  const [form, setForm] = useState({
    vorname: '', nachname: '', email: '', telefon: '', anlass: '',
    honeypot: '',
    ei_kind_name: '', ei_kind_alter: '', ei_datum: '',
    ei_kinder: '', ei_erwachsene: '',
    ei_mit_motto: false, ei_farbe: '', ei_motto: '',
    ei_extras: [] as string[], ei_nachricht: '',
    fu_kind_name: '', fu_kind_alter: '', fu_datum: '',
    fu_kinder: '', fu_erwachsene: '',
    fu_motto: '', fu_essen_warm: '',
    fu_extras: [] as string[], fu_nachricht: '',
    br_datum: '', br_erwachsene: '', br_kinder: '',
    br_tischstyling: '', br_gaestebuch: false, br_nachricht: '',
    fs_sonntag: '', fs_ankunft: '', fs_erwachsene: '', fs_kinder: '',
    fs_kind_alter: '', fs_vegetarisch: false, fs_nachricht: '',
    ind_nachricht: '',
    datenschutz: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    const anlass = searchParams.get('anlass')
    const paket = searchParams.get('paket')

    let resolved = ''

    if (anlass === 'geburtstag' && paket === 'eichhoernchen') resolved = 'eichhoernchen'
    else if (anlass === 'geburtstag' && paket === 'fuchs') resolved = 'fuchs'
    else if (anlass === 'brunch' && paket === 'small') resolved = 'brunch_small'
    else if (anlass === 'brunch' && paket === 'large') resolved = 'brunch_large'
    else if (anlass && VALID_ANLAESSE.includes(anlass)) resolved = anlass

    if (resolved) {
      setForm(prev => ({ ...prev, anlass: resolved }))
    }
  }, [searchParams])

  const set = (field: string, value: unknown) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
    setServerError('')
  }

  const toggleArray = (field: 'ei_extras' | 'fu_extras', value: string) => {
    setServerError('')
    setForm(prev => {
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

    if (form.anlass === 'eichhoernchen') {
      if (!form.ei_kind_name.trim()) e.ei_kind_name = 'Bitte Namen eingeben.'
      if (!form.ei_kind_alter) e.ei_kind_alter = 'Bitte Alter wählen.'
      if (!form.ei_datum) e.ei_datum = 'Bitte Datum wählen.'
      if (!form.ei_kinder) e.ei_kinder = 'Bitte Anzahl wählen.'
      if (!form.ei_erwachsene) e.ei_erwachsene = 'Bitte Anzahl wählen.'
      if (!form.ei_mit_motto && !form.ei_farbe) e.ei_farbe = 'Bitte Farbe wählen.'
      if (form.ei_mit_motto && !form.ei_motto) e.ei_motto = 'Bitte Motto wählen.'
    }

    if (form.anlass === 'fuchs') {
      if (!form.fu_kind_name.trim()) e.fu_kind_name = 'Bitte Namen eingeben.'
      if (!form.fu_kind_alter) e.fu_kind_alter = 'Bitte Alter wählen.'
      if (!form.fu_datum) e.fu_datum = 'Bitte Datum wählen.'
      if (!form.fu_kinder) e.fu_kinder = 'Bitte Anzahl wählen.'
      if (!form.fu_erwachsene) e.fu_erwachsene = 'Bitte Anzahl wählen.'
      if (!form.fu_motto) e.fu_motto = 'Bitte Motto wählen.'
      if (!form.fu_essen_warm) e.fu_essen_warm = 'Bitte ein Gericht wählen.'
    }

    if (form.anlass === 'brunch_small' || form.anlass === 'brunch_large') {
      if (!form.br_datum) e.br_datum = 'Bitte Datum wählen.'
      else if (!isDateSaturday(form.br_datum)) e.br_datum = 'Bitte einen Samstag wählen.'
      if (!form.br_erwachsene) e.br_erwachsene = 'Bitte Anzahl wählen.'
      if (!form.br_kinder) e.br_kinder = 'Bitte Anzahl wählen.'
    }

    if (form.anlass === 'fruehstueck') {
      if (!form.fs_sonntag) {
        e.fs_sonntag = 'Bitte einen Sonntag wählen.'
      } else if (!isDateSunday(form.fs_sonntag)) {
        e.fs_sonntag = 'Bitte einen Sonntag auswählen.'
      } else if (BLOCKED_SUNDAYS.includes(form.fs_sonntag)) {
        e.fs_sonntag = 'Dieser Sonntag ist leider bereits ausgebucht. Bitte wählt einen anderen Termin.'
      }
      if (!form.fs_ankunft) e.fs_ankunft = 'Bitte Frühstücksslot wählen.'
      if (!form.fs_erwachsene) e.fs_erwachsene = 'Bitte Anzahl wählen.'
      if (!form.fs_kinder) e.fs_kinder = 'Bitte Anzahl wählen.'
      if (form.fs_kinder && form.fs_kinder !== '0' && !form.fs_kind_alter) {
        e.fs_kind_alter = 'Bitte Alter wählen.'
      }
    }

    if (form.anlass === 'individuell') {
      if (!form.ind_nachricht.trim()) e.ind_nachricht = 'Bitte eine Nachricht eingeben.'
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
        if (el) { el.focus(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }) }
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

      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor="honeypot">Bitte leer lassen</label>
        <input id="honeypot" name="honeypot" type="text" value={form.honeypot}
          onChange={e => set('honeypot', e.target.value)} tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-sm text-gray-500">
        Felder mit <span className="text-brand-green">*</span> sind Pflichtfelder.
      </p>

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

      <SectionLabel>Worum geht es?</SectionLabel>

      <Field label="Anlass der Anfrage" required error={errors.anlass} htmlFor="anlass">
        <select id="anlass" value={form.anlass}
          onChange={e => set('anlass', e.target.value)} className={inputClass(errors.anlass)}>
          {anlaesse.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </Field>

      {/* ── EICHHÖRNCHEN-FEIER ── */}
      {form.anlass === 'eichhoernchen' && (
        <>
          <SectionLabel>Eichhörnchen-Feier</SectionLabel>

          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-0 p-0 m-0">
            <legend className="sr-only">Geburtstagskind</legend>
            <Field label="Name des Geburtstagskindes" required error={errors.ei_kind_name} htmlFor="ei_kind_name">
              <input id="ei_kind_name" type="text" value={form.ei_kind_name}
                onChange={e => set('ei_kind_name', e.target.value)} className={inputClass(errors.ei_kind_name)} />
            </Field>
            <Field label="Alter des Geburtstagskindes" required error={errors.ei_kind_alter} htmlFor="ei_kind_alter">
              <select id="ei_kind_alter" value={form.ei_kind_alter}
                onChange={e => set('ei_kind_alter', e.target.value)} className={inputClass(errors.ei_kind_alter)}>
                <option value="">Bitte wählen</option>
                {numOptions(1, 12, ' Jahre').map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
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
            <Field label="Datum" required error={errors.ei_datum} htmlFor="ei_datum">
              <input id="ei_datum" type="date" min={localDateMin()} value={form.ei_datum}
                onChange={e => set('ei_datum', e.target.value)} className={inputClass(errors.ei_datum)} />
            </Field>
          </fieldset>

          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-0 p-0 m-0">
            <legend className="text-sm font-medium text-gray-700 mb-1 col-span-full">Anzahl der Gäste</legend>
            <Field label="Kinder (inkl. Geburtstagskind)" required error={errors.ei_kinder} htmlFor="ei_kinder">
              <select id="ei_kinder" value={form.ei_kinder}
                onChange={e => set('ei_kinder', e.target.value)} className={inputClass(errors.ei_kinder)}>
                <option value="">Bitte wählen</option>
                {numOptions(1, 10, ' Kinder').map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
            <Field label="Erwachsene" required error={errors.ei_erwachsene} htmlFor="ei_erwachsene">
              <select id="ei_erwachsene" value={form.ei_erwachsene}
                onChange={e => set('ei_erwachsene', e.target.value)} className={inputClass(errors.ei_erwachsene)}>
                <option value="">Bitte wählen</option>
                {numOptions(0, 15, ' Erwachsene').map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
          </fieldset>

          <fieldset className="flex flex-col gap-3 border-0 p-0 m-0">
            <legend className="text-sm font-medium text-gray-700">Dekoration</legend>
            {!form.ei_mit_motto && (
              <Field label="Wunschfarbe" required error={errors.ei_farbe} htmlFor="ei_farbe"
                hint="Dekoration in eurer Lieblingsfarbe.">
                <select id="ei_farbe" value={form.ei_farbe}
                  onChange={e => set('ei_farbe', e.target.value)} className={inputClass(errors.ei_farbe)}>
                  {farbOptionen.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </Field>
            )}
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={form.ei_mit_motto}
                onChange={e => {
                  set('ei_mit_motto', e.target.checked)
                  if (!e.target.checked) set('ei_motto', '')
                  if (e.target.checked) set('ei_farbe', '')
                }}
                className="mt-0.5 w-4 h-4 rounded accent-brand-green cursor-pointer shrink-0" />
              <span className="text-sm text-gray-700">
                Stattdessen <span className="font-medium">Mottodekoration</span> wählen{' '}
                <span className="text-gray-500">(+50 €)</span>
              </span>
            </label>
            {form.ei_mit_motto && (
              <Field label="Wunsch-Motto" required error={errors.ei_motto} htmlFor="ei_motto">
                <select id="ei_motto" value={form.ei_motto}
                  onChange={e => set('ei_motto', e.target.value)} className={inputClass(errors.ei_motto)}>
                  {mottoOptionen.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </Field>
            )}
          </fieldset>

          <fieldset className="border-0 p-0 m-0 flex flex-col gap-2">
            <legend className="text-sm font-medium text-gray-700 mb-1">Extras & Zusatzangebote</legend>
            <p className="text-xs text-gray-500 -mt-1 mb-2">Mehrfachauswahl möglich</p>
            {geburtstagExtras.map(extra => (
              <label key={extra.value} htmlFor={`ei_extra_${extra.value}`}
                className="flex items-center justify-between gap-3 cursor-pointer group">
                <span className="flex items-center gap-3">
                  <input id={`ei_extra_${extra.value}`} type="checkbox"
                    checked={form.ei_extras.includes(extra.value)}
                    onChange={() => toggleArray('ei_extras', extra.value)}
                    className="w-4 h-4 rounded accent-brand-green cursor-pointer shrink-0" />
                  <span className="text-sm text-gray-700 group-hover:text-brand-green transition-colors">{extra.label}</span>
                </span>
                <span className="text-xs text-gray-500 whitespace-nowrap">{extra.price}</span>
              </label>
            ))}
          </fieldset>

          <Field label="Sonstiges & weitere Fragen" htmlFor="ei_nachricht">
            <TextareaWithCounter id="ei_nachricht" rows={4} value={form.ei_nachricht}
              onChange={e => set('ei_nachricht', e.target.value)}
              placeholder="Allergien, besondere Wünsche, weitere Fragen…"
              maxLength={1500} className={`${inputClass()} resize-none`} />
          </Field>
        </>
      )}

      {/* ── FUCHS-FEIER ── */}
      {form.anlass === 'fuchs' && (
        <>
          <SectionLabel>Fuchs-Feier</SectionLabel>

          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-0 p-0 m-0">
            <legend className="sr-only">Geburtstagskind</legend>
            <Field label="Name des Geburtstagskindes" required error={errors.fu_kind_name} htmlFor="fu_kind_name">
              <input id="fu_kind_name" type="text" value={form.fu_kind_name}
                onChange={e => set('fu_kind_name', e.target.value)} className={inputClass(errors.fu_kind_name)} />
            </Field>
            <Field label="Alter des Geburtstagskindes" required error={errors.fu_kind_alter} htmlFor="fu_kind_alter">
              <select id="fu_kind_alter" value={form.fu_kind_alter}
                onChange={e => set('fu_kind_alter', e.target.value)} className={inputClass(errors.fu_kind_alter)}>
                <option value="">Bitte wählen</option>
                {numOptions(1, 12, ' Jahre').map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
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
            <Field label="Datum" required error={errors.fu_datum} htmlFor="fu_datum">
              <input id="fu_datum" type="date" min={localDateMin()} value={form.fu_datum}
                onChange={e => set('fu_datum', e.target.value)} className={inputClass(errors.fu_datum)} />
            </Field>
          </fieldset>

          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-0 p-0 m-0">
            <legend className="text-sm font-medium text-gray-700 mb-1 col-span-full">Anzahl der Gäste</legend>
            <Field label="Kinder (inkl. Geburtstagskind)" required error={errors.fu_kinder} htmlFor="fu_kinder">
              <select id="fu_kinder" value={form.fu_kinder}
                onChange={e => set('fu_kinder', e.target.value)} className={inputClass(errors.fu_kinder)}>
                <option value="">Bitte wählen</option>
                {numOptions(1, 10, ' Kinder').map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
            <Field label="Erwachsene" required error={errors.fu_erwachsene} htmlFor="fu_erwachsene">
              <select id="fu_erwachsene" value={form.fu_erwachsene}
                onChange={e => set('fu_erwachsene', e.target.value)} className={inputClass(errors.fu_erwachsene)}>
                <option value="">Bitte wählen</option>
                {numOptions(0, 15, ' Erwachsene').map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
          </fieldset>

          <Field label="Wunsch-Motto" required error={errors.fu_motto} htmlFor="fu_motto"
            hint="Das Motto bestimmt Dekoration, Geschirr und Kuchen.">
            <select id="fu_motto" value={form.fu_motto}
              onChange={e => set('fu_motto', e.target.value)} className={inputClass(errors.fu_motto)}>
              {mottoOptionen.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </Field>

          <fieldset className="border-0 p-0 m-0 flex flex-col gap-2">
            <legend className="text-sm font-medium text-gray-700 mb-1">Extras & Zusatzangebote</legend>
            <p className="text-xs text-gray-500 -mt-1 mb-2">Mehrfachauswahl möglich</p>
            {geburtstagExtras.map(extra => (
              <label key={extra.value} htmlFor={`fu_extra_${extra.value}`}
                className="flex items-center justify-between gap-3 cursor-pointer group">
                <span className="flex items-center gap-3">
                  <input id={`fu_extra_${extra.value}`} type="checkbox"
                    checked={form.fu_extras.includes(extra.value)}
                    onChange={() => toggleArray('fu_extras', extra.value)}
                    className="w-4 h-4 rounded accent-brand-green cursor-pointer shrink-0" />
                  <span className="text-sm text-gray-700 group-hover:text-brand-green transition-colors">{extra.label}</span>
                </span>
                <span className="text-xs text-gray-500 whitespace-nowrap">{extra.price}</span>
              </label>
            ))}
          </fieldset>

          <fieldset
            className="border-0 p-0 m-0 flex flex-col gap-2"
            aria-describedby={errors.fu_essen_warm ? 'fu_essen_warm-error' : undefined}
          >
            <legend className="text-sm font-medium text-gray-700 mb-1">
              Warmes Essen <span aria-hidden="true" className="text-brand-green ml-1">*</span>
            </legend>
            <p className="text-xs text-brand-green -mt-1 mb-2">Im Fuchs-Paket bereits enthalten – bitte wählt euer Wunschgericht.</p>
            {[
              { value: 'pizza', label: 'Pizza Margherita' },
              { value: 'nudeln', label: 'Nudeln mit Tomatensoße in Bio-Qualität' },
            ].map(essen => (
              <label key={essen.value} htmlFor={`fu_essen_${essen.value}`}
                className="flex items-center gap-3 cursor-pointer group">
                <input
                  id={`fu_essen_${essen.value}`}
                  type="radio"
                  name="fu_essen_warm"
                  value={essen.value}
                  checked={form.fu_essen_warm === essen.value}
                  onChange={() => set('fu_essen_warm', essen.value)}
                  className="w-4 h-4 accent-brand-green cursor-pointer shrink-0"
                />
                <span className="text-sm text-gray-700 group-hover:text-brand-green transition-colors">{essen.label}</span>
                <span className="text-xs text-brand-green ml-auto">inklusive</span>
              </label>
            ))}
            {errors.fu_essen_warm && (
              <p id="fu_essen_warm-error" role="alert" className="text-xs text-red-500">
                {errors.fu_essen_warm}
              </p>
            )}
          </fieldset>

          <Field label="Sonstiges & weitere Fragen" htmlFor="fu_nachricht">
            <TextareaWithCounter id="fu_nachricht" rows={4} value={form.fu_nachricht}
              onChange={e => set('fu_nachricht', e.target.value)}
              placeholder="Allergien, besondere Wünsche, weitere Fragen…"
              maxLength={1500} className={`${inputClass()} resize-none`} />
          </Field>
        </>
      )}

      {/* ── PRIVATE BRUNCH ── */}
      {(form.anlass === 'brunch_small' || form.anlass === 'brunch_large') && (
        <>
          <SectionLabel>
            {form.anlass === 'brunch_small' ? 'Private Brunch Small' : 'Private Brunch Large'}
          </SectionLabel>

          <div className="bg-brand-green/5 rounded-2xl px-5 py-4 flex flex-col gap-1">
            <p className="text-sm font-medium text-brand-green">Hinweis</p>
            <p className="text-sm text-gray-600">
              {form.anlass === 'brunch_small'
                ? <><span className="font-semibold text-gray-800">329 €</span> · bis zu 6 Erwachsene + 3 Kinder · 2,5 Stunden exklusiv</>
                : <><span className="font-semibold text-gray-800">469 €</span> · bis zu 10 Erwachsene + 5 Kinder · 2,5 Stunden exklusiv</>
              }
            </p>
          </div>

          <fieldset className="flex flex-col gap-4 border-0 p-0 m-0">
            <legend className="text-sm font-medium text-gray-700 mb-1">
              Wunschtermin
              <span className="block text-xs font-normal text-gray-500 mt-0.5">
                Sa 9:30–12:00 Uhr · weitere Termine auf Anfrage
              </span>
            </legend>
            <Field label="Datum" required error={errors.br_datum} htmlFor="br_datum">
              <input id="br_datum" type="date" min={localDateMin()} value={form.br_datum}
                onChange={e => set('br_datum', e.target.value)} className={inputClass(errors.br_datum)} />
            </Field>
            {form.br_datum && !isDateSaturday(form.br_datum) && (
              <p className="text-xs text-red-500 -mt-2">Bitte einen Samstag wählen.</p>
            )}
          </fieldset>

          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-0 p-0 m-0">
            <legend className="text-sm font-medium text-gray-700 mb-1 col-span-full">Anzahl der Personen</legend>
            <Field label="Erwachsene" required error={errors.br_erwachsene} htmlFor="br_erwachsene">
              <select id="br_erwachsene" value={form.br_erwachsene}
                onChange={e => set('br_erwachsene', e.target.value)} className={inputClass(errors.br_erwachsene)}>
                <option value="">Bitte wählen</option>
                {numOptions(1, 50, ' Erwachsene').map(o =>
                  <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
            <Field label="Kinder" required error={errors.br_kinder} htmlFor="br_kinder">
              <select id="br_kinder" value={form.br_kinder}
                onChange={e => set('br_kinder', e.target.value)} className={inputClass(errors.br_kinder)}>
                <option value="">Bitte wählen</option>
                {numOptions(0, 50, ' Kinder').map(o =>
                  <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
          </fieldset>

          <fieldset className="border-0 p-0 m-0 flex flex-col gap-3">
            <legend className="text-sm font-medium text-gray-700 mb-1">Optionale Zusatzangebote</legend>
            <Field label="Tischstyling" htmlFor="br_tischstyling">
              <select id="br_tischstyling" value={form.br_tischstyling}
                onChange={e => set('br_tischstyling', e.target.value)} className={inputClass()}>
                <option value="">Kein Tischstyling</option>
                <option value="small">Tischstyling Small – 29 €</option>
                <option value="large">Tischstyling Large – 39 €</option>
              </select>
            </Field>
            </fieldset>

          <Field label="Euer Anlass & besondere Wünsche" htmlFor="br_nachricht">
            <TextareaWithCounter id="br_nachricht" rows={4} value={form.br_nachricht}
              onChange={e => set('br_nachricht', e.target.value)}
              placeholder="Erzählt uns von eurem Anlass, euren Wünschen oder Ideen…"
              maxLength={1500} className={`${inputClass()} resize-none`} />
          </Field>
        </>
      )}

      {/* ── SONNTAGSFRÜHSTÜCK ── */}
      {form.anlass === 'fruehstueck' && (
        <>
          <SectionLabel>Sonntagsfrühstück</SectionLabel>

          <div className="bg-brand-green/5 rounded-2xl px-5 py-4 flex flex-col gap-1">
            <p className="text-sm font-medium text-brand-green">Preisinfo</p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">38,00 €</span> – Familien-Etagere für 2 Erwachsene + 1 Kind
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">+ 8,00 €</span> – jedes weitere Kind ab 3 Jahren
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Getränke werden separat bestellt.</p>
          </div>

          <Field label="Wunsch-Sonntag" required error={errors.fs_sonntag} htmlFor="fs_sonntag"
            hint="Bitte wählt einen Sonntag aus.">
            <input id="fs_sonntag" type="date" min={localDateMin()} value={form.fs_sonntag}
              onChange={e => set('fs_sonntag', e.target.value)} className={inputClass(errors.fs_sonntag)} />
          </Field>

          <div className="bg-brand-green/5 rounded-2xl px-5 py-4 flex flex-col gap-1">
            <p className="text-sm font-medium text-brand-green">Unsere Frühstücksslots</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Wir haben jeden Sonntag zwei Frühstücksslots. Bitte beachtet, dass euer Tisch jeweils
              bis zum Ende des gebuchten Slots für euch reserviert ist.
            </p>
          </div>

          <Field label="Frühstücksslot" required error={errors.fs_ankunft} htmlFor="fs_ankunft">
            <select id="fs_ankunft" value={form.fs_ankunft}
              onChange={e => set('fs_ankunft', e.target.value)}
              className={inputClass(errors.fs_ankunft)}>
              <option value="">Bitte wählen</option>
              <option value="09:00-10:30">9:00–10:30 Uhr</option>
              <option value="11:00-12:30">11:00–12:30 Uhr</option>
            </select>
          </Field>

          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-0 p-0 m-0">
            <legend className="text-sm font-medium text-gray-700 mb-1 col-span-full">Anzahl der Personen</legend>
            <Field label="Erwachsene" required error={errors.fs_erwachsene} htmlFor="fs_erwachsene">
              <select id="fs_erwachsene" value={form.fs_erwachsene}
                onChange={e => set('fs_erwachsene', e.target.value)} className={inputClass(errors.fs_erwachsene)}>
                <option value="">Bitte wählen</option>
                {numOptions(1, 8, ' Erwachsene').map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
            <Field label="Kinder" required error={errors.fs_kinder} htmlFor="fs_kinder">
              <select id="fs_kinder" value={form.fs_kinder}
                onChange={e => {
                  set('fs_kinder', e.target.value)
                  if (e.target.value === '0') set('fs_kind_alter', '')
                }}
                className={inputClass(errors.fs_kinder)}>
                <option value="">Bitte wählen</option>
                {numOptions(0, 8, ' Kinder').map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
          </fieldset>

          {form.fs_kinder && form.fs_kinder !== '0' && (
            <Field label="Alter des jüngsten Kindes" required error={errors.fs_kind_alter} htmlFor="fs_kind_alter">
              <select id="fs_kind_alter" value={form.fs_kind_alter}
                onChange={e => set('fs_kind_alter', e.target.value)} className={inputClass(errors.fs_kind_alter)}>
                {kindergAlterOptionen.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
          )}

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
            <TextareaWithCounter id="fs_nachricht" rows={3} value={form.fs_nachricht}
              onChange={e => set('fs_nachricht', e.target.value)}
              placeholder="Allergien, Unverträglichkeiten, sonstige Wünsche…"
              maxLength={1000} className={`${inputClass()} resize-none`} />
          </Field>
        </>
      )}

      {/* ── INDIVIDUELLE ANFRAGE ── */}
      {form.anlass === 'individuell' && (
        <>
          <SectionLabel>Individuelle Anfrage</SectionLabel>
          <p className="text-sm text-gray-600 leading-relaxed">
            Nicht jede Feier passt in ein fertiges Paket – und das muss sie auch nicht.
            Erzählt uns von eurem Anlass, euren Vorstellungen und Wünschen, und wir schauen
            gemeinsam, welche Möglichkeiten wir im Zwerghain für euch umsetzen können.
          </p>
          <Field label="Eure Anfrage" required error={errors.ind_nachricht} htmlFor="ind_nachricht">
            <TextareaWithCounter id="ind_nachricht" rows={6} value={form.ind_nachricht}
              onChange={e => set('ind_nachricht', e.target.value)}
              placeholder="Beschreibt gerne euren Anlass, eure Vorstellungen und Wünsche…"
              maxLength={2000} className={`${inputClass(errors.ind_nachricht)} resize-none`} />
          </Field>
        </>
      )}

      {/* ABSCHLUSS */}
      {form.anlass && (
        <>
          <SectionLabel>Abschluss</SectionLabel>
          <div className="bg-brand-green/5 rounded-2xl px-5 py-4 text-sm text-gray-600 leading-relaxed">
            <p>
              <span className="font-medium text-brand-green">Hinweis:</span> Eure Anfrage ist unverbindlich.
              Wir melden uns zeitnah per E-Mail oder Telefon zurück und bestätigen eure Anfrage persönlich.
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
            <p role="alert" className="text-sm text-red-500 text-center">{serverError}</p>
          )}

          <button type="submit" disabled={loading}
            className="w-full bg-brand-green text-white px-6 py-4 rounded-2xl text-base font-bold hover:bg-brand-green/90 transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 mt-2 disabled:opacity-60 cursor-pointer">
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
          Ob Kindergeburtstag, Private Brunch, Sonntagsfrühstück oder ein ganz besonderer Anlass –
          wir antworten so schnell wie möglich und beraten euch gerne persönlich.
        </p>
      </div>
      <Suspense fallback={<div className="text-center text-gray-500 text-sm">Formular wird geladen…</div>}>
        <KontaktForm />
      </Suspense>
    </div>
  )
}