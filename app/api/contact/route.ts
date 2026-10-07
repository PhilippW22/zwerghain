import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const CAFE_EMAIL = 'hallo@zwerghain.com'
const FROM_EMAIL = 'noreply@zwerghain.com'

const VALID_ANLAESSE = ['eichhoernchen', 'fuchs', 'brunch_small', 'brunch_large', 'fruehstueck', 'individuell']
const BLOCKED_SUNDAYS = ['2026-08-30']

const ALLOWED_FARBE = ['rosa', 'blau', 'gruen', 'gelb']
const ALLOWED_MOTTO = ['prinzessin', 'pirat', 'superhelden', 'pawpatrol', 'dinosaurier', 'einhorn', 'waldtiere', 'sonstiges']
const ALLOWED_EXTRAS = ['kinderschminken', 'animation', 'basteln', 'gastgeschenk', 'einladungskarten', 'torte', 'prinzessin_held', 'dekopauschale']
const ALLOWED_FUCHS_ESSEN = ['pizza', 'nudeln']
const ALLOWED_KIND_ALTER = ['0-2', '2+']
const ALLOWED_FS_ANKUNFT = ['09:00-10:30', '11:00-12:30']
const ALLOWED_TISCHSTYLING = ['', 'small', 'large']

function err(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status })
}

function sanitize(str: unknown, max: number): string {
  if (typeof str !== 'string') return ''
  return str.trim().slice(0, max)
}

function isValidDate(dateStr: string): boolean {
  const d = new Date(dateStr + 'T12:00:00')
  return !isNaN(d.getTime())
}

function isNotInPast(dateStr: string): boolean {
  const d = new Date(dateStr + 'T12:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return d >= today
}

function isDateSaturday(dateStr: string): boolean {
  return new Date(dateStr + 'T12:00:00').getDay() === 6
}

function isDateSunday(dateStr: string): boolean {
  return new Date(dateStr + 'T12:00:00').getDay() === 0
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-')
  return new Date(Number(year), Number(month) - 1, Number(day))
    .toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
}

// Plausibilitätsprüfung für Personenzahlen
function isValidPersonCount(val: string, min: number): boolean {
  const n = Number(val)
  return Number.isInteger(n) && n >= min && n <= 50
}

function validateExtras(extras: unknown[]): string | null {
  if (extras.some(e => !ALLOWED_EXTRAS.includes(e as string))) return 'Ungültiges Extra.'
  if (extras.length > ALLOWED_EXTRAS.length) return 'Zu viele Extras.'
  if (new Set(extras).size !== extras.length) return 'Doppelte Extras sind nicht erlaubt.'
  return null
}

function formatExtras(extras: string[]): string {
  const map: Record<string, string> = {
    kinderschminken: 'Kinderschminken',
    animation: 'Kinderanimation',
    basteln: 'Bastelaktionen (13 € / Kind)',
    gastgeschenk: 'Gastgeschenk-Tütchen (10 €)',
    einladungskarten: 'Einladungskarten (10 €)',
    torte: 'Individuelle Geburtstagstorte (ab 120 €)',
    prinzessin_held: 'Prinzessin / Superheld',
    dekopauschale: 'Dekopauschale Erwachsenentische (20 €)',
  }
  return extras.length > 0 ? extras.map(e => map[e] || e).join(', ') : '–'
}

function formatFarbe(farbe: string): string {
  const map: Record<string, string> = {
    rosa: 'Rosa', blau: 'Blau', gruen: 'Grün', gelb: 'Gelb',
  }
  return map[farbe] || farbe
}

function formatMotto(motto: string): string {
  const map: Record<string, string> = {
    prinzessin: 'Prinzessin', pirat: 'Pirat', superhelden: 'Superhelden',
    pawpatrol: 'Paw Patrol', dinosaurier: 'Dinosaurier', einhorn: 'Einhorn',
    waldtiere: 'Waldtiere', sonstiges: 'Sonstiges',
  }
  return map[motto] || motto
}

function formatFuchsEssen(essen: string): string {
  const map: Record<string, string> = {
    pizza: 'Pizza Margherita',
    nudeln: 'Nudeln mit Tomatensoße in Bio-Qualität',
  }
  return map[essen] || essen
}

function formatTischstyling(ts: string): string {
  if (ts === 'small') return 'Tischstyling Small (29 €)'
  if (ts === 'large') return 'Tischstyling Large (39 €)'
  return '–'
}

function formatSlot(slot: string): string {
  if (slot === '09:00-10:30') return '9:00–10:30 Uhr'
  if (slot === '11:00-12:30') return '11:00–12:30 Uhr'
  return slot
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY ist nicht gesetzt.')
    return err('Serverkonfigurationsfehler.', 500)
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return err('Ungültige Anfrage.')
  }

  if (typeof body !== 'object' || body === null) return err('Ungültige Anfrage.')
  const b = body as Record<string, unknown>

  // Honeypot
  if (b.honeypot) return NextResponse.json({ ok: true })

  // Basisdaten
  const vorname = sanitize(b.vorname, 80)
  const nachname = sanitize(b.nachname, 80)
  const email = sanitize(b.email, 200)
  const telefon = sanitize(b.telefon, 50)
  const anlass = sanitize(b.anlass, 20)

  if (!vorname) return err('Vorname fehlt.')
  if (!nachname) return err('Nachname fehlt.')
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return err('Ungültige E-Mail.')
  if (!VALID_ANLAESSE.includes(anlass)) return err('Ungültiger Anlass.')
  if (b.datenschutz !== true) return err('Datenschutz nicht akzeptiert.')
  if (telefon && !/^[0-9+\-\s()]{0,50}$/.test(telefon)) return err('Ungültige Telefonnummer.')

  let emailSubject = ''
  let emailText = ''
  let emailTextBestaetigung = ''

  // ── EICHHÖRNCHEN-FEIER ──
  if (anlass === 'eichhoernchen') {
    const kindName = sanitize(b.ei_kind_name, 80)
    const kindAlter = sanitize(b.ei_kind_alter, 2)
    const datum = sanitize(b.ei_datum, 10)
    const kinder = sanitize(b.ei_kinder, 2)
    const erwachsene = sanitize(b.ei_erwachsene, 2)
    const mitMotto = b.ei_mit_motto === true
    const farbe = sanitize(b.ei_farbe, 20)
    const motto = sanitize(b.ei_motto, 20)
    const nachricht = sanitize(b.ei_nachricht, 1500)

    if (!kindName) return err('Name des Kindes fehlt.')
    if (!kindAlter || isNaN(Number(kindAlter)) || Number(kindAlter) < 1 || Number(kindAlter) > 12) return err('Ungültiges Alter.')
    if (!datum || !/^\d{4}-\d{2}-\d{2}$/.test(datum)) return err('Ungültiges Datum.')
    if (!isValidDate(datum)) return err('Ungültiges Datum.')
    if (!isNotInPast(datum)) return err('Datum liegt in der Vergangenheit.')
    if (!isValidPersonCount(kinder, 1)) return err('Ungültige Kinderanzahl.')
    if (!isValidPersonCount(erwachsene, 0)) return err('Ungültige Erwachsenenanzahl.')
    if (!mitMotto && !ALLOWED_FARBE.includes(farbe)) return err('Ungültige Farbe.')
    if (mitMotto && !ALLOWED_MOTTO.includes(motto)) return err('Ungültiges Motto.')

    const extras = Array.isArray(b.ei_extras) ? b.ei_extras as string[] : []
    const extrasError = validateExtras(extras)
    if (extrasError) return err(extrasError)

    const dekoZeile = mitMotto
      ? `Mottodekoration (+50 €): ${formatMotto(motto)}`
      : `Wunschfarbe: ${formatFarbe(farbe)}`

    emailSubject = `🐿️ Eichhörnchen-Feier – ${kindName} (${kindAlter} Jahre)`
    emailText = `
EICHHÖRNCHEN-FEIER · 329 €

Kontakt: ${vorname} ${nachname}
E-Mail: ${email}
Telefon: ${telefon || '–'}

Geburtstagskind: ${kindName}, wird ${kindAlter} Jahre alt
Datum: ${formatDate(datum)}
Uhrzeit: ab 14:30 Uhr
Kinder: ${kinder}
Erwachsene: ${erwachsene}

Dekoration: ${dekoZeile}
Extras: ${formatExtras(extras)}

Sonstiges: ${nachricht || '–'}
    `.trim()

    emailTextBestaetigung = emailText
  }

  // ── FUCHS-FEIER ──
  if (anlass === 'fuchs') {
    const kindName = sanitize(b.fu_kind_name, 80)
    const kindAlter = sanitize(b.fu_kind_alter, 2)
    const datum = sanitize(b.fu_datum, 10)
    const kinder = sanitize(b.fu_kinder, 2)
    const erwachsene = sanitize(b.fu_erwachsene, 2)
    const motto = sanitize(b.fu_motto, 20)
    const essenWarm = sanitize(b.fu_essen_warm, 20)
    const nachricht = sanitize(b.fu_nachricht, 1500)

    if (!kindName) return err('Name des Kindes fehlt.')
    if (!kindAlter || isNaN(Number(kindAlter)) || Number(kindAlter) < 1 || Number(kindAlter) > 12) return err('Ungültiges Alter.')
    if (!datum || !/^\d{4}-\d{2}-\d{2}$/.test(datum)) return err('Ungültiges Datum.')
    if (!isValidDate(datum)) return err('Ungültiges Datum.')
    if (!isNotInPast(datum)) return err('Datum liegt in der Vergangenheit.')
    if (!isValidPersonCount(kinder, 1)) return err('Ungültige Kinderanzahl.')
    if (!isValidPersonCount(erwachsene, 0)) return err('Ungültige Erwachsenenanzahl.')
    if (!ALLOWED_MOTTO.includes(motto)) return err('Ungültiges Motto.')
    if (!ALLOWED_FUCHS_ESSEN.includes(essenWarm)) return err('Bitte ein Gericht wählen.')

    const extras = Array.isArray(b.fu_extras) ? b.fu_extras as string[] : []
    const extrasError = validateExtras(extras)
    if (extrasError) return err(extrasError)

    emailSubject = `🦊 Fuchs-Feier – ${kindName} (${kindAlter} Jahre)`
    emailText = `
FUCHS-FEIER · 429 €

Kontakt: ${vorname} ${nachname}
E-Mail: ${email}
Telefon: ${telefon || '–'}

Geburtstagskind: ${kindName}, wird ${kindAlter} Jahre alt
Datum: ${formatDate(datum)}
Uhrzeit: ab 14:30 Uhr
Kinder: ${kinder}
Erwachsene: ${erwachsene}

Motto: ${formatMotto(motto)}
Warmes Essen (inklusive): ${formatFuchsEssen(essenWarm)}
Extras: ${formatExtras(extras)}

Sonstiges: ${nachricht || '–'}
    `.trim()

    emailTextBestaetigung = emailText
  }

  // ── PRIVATE BRUNCH ──
  if (anlass === 'brunch_small' || anlass === 'brunch_large') {
    const datum = sanitize(b.br_datum, 10)
    const erwachsene = sanitize(b.br_erwachsene, 2)
    const kinder = sanitize(b.br_kinder, 2)
    const tischstyling = sanitize(b.br_tischstyling, 10)
    const gaestebuch = b.br_gaestebuch === true
    const nachricht = sanitize(b.br_nachricht, 1500)

    if (!datum || !/^\d{4}-\d{2}-\d{2}$/.test(datum)) return err('Ungültiges Datum.')
    if (!isValidDate(datum)) return err('Ungültiges Datum.')
    if (!isNotInPast(datum)) return err('Datum liegt in der Vergangenheit.')
    if (!isDateSaturday(datum)) return err('Bitte einen Samstag wählen.')
    if (!isValidPersonCount(erwachsene, 1)) return err('Ungültige Erwachsenenanzahl.')
    if (!isValidPersonCount(kinder, 0)) return err('Ungültige Kinderanzahl.')
    if (!ALLOWED_TISCHSTYLING.includes(tischstyling)) return err('Ungültiges Tischstyling.')

    const paketName = anlass === 'brunch_small' ? 'Private Brunch Small (329 €)' : 'Private Brunch Large (469 €)'
    const kapazitaet = anlass === 'brunch_small' ? 'bis zu 6 Erwachsene + 3 Kinder (Grundpaket)' : 'bis zu 10 Erwachsene + 5 Kinder (Grundpaket)'

    emailSubject = `🥐 ${paketName} – ${formatDate(datum)}`
    emailText = `
PRIVATE BRUNCH

Paket: ${paketName}
Grundkapazität: ${kapazitaet}

Kontakt: ${vorname} ${nachname}
E-Mail: ${email}
Telefon: ${telefon || '–'}

Datum: ${formatDate(datum)}
Erwachsene: ${erwachsene}
Kinder: ${kinder}

Tischstyling: ${formatTischstyling(tischstyling)}
Gästebuch-Platz: ${gaestebuch ? 'Ja' : 'Nein'}

Anlass & Wünsche: ${nachricht || '–'}
    `.trim()

    emailTextBestaetigung = emailText
  }

  // ── SONNTAGSFRÜHSTÜCK ──
  if (anlass === 'fruehstueck') {
    const sonntag = sanitize(b.fs_sonntag, 10)
    const ankunft = sanitize(b.fs_ankunft, 12)
    const erwachsene = sanitize(b.fs_erwachsene, 2)
    const kinder = sanitize(b.fs_kinder, 2)
    const kindAlter = sanitize(b.fs_kind_alter, 10)
    const vegetarisch = b.fs_vegetarisch === true
    const nachricht = sanitize(b.fs_nachricht, 1000)

    if (!sonntag || !/^\d{4}-\d{2}-\d{2}$/.test(sonntag)) return err('Ungültiges Datum.')
    if (!isValidDate(sonntag)) return err('Ungültiges Datum.')
    if (!isNotInPast(sonntag)) return err('Datum liegt in der Vergangenheit.')
    if (!isDateSunday(sonntag)) return err('Bitte einen Sonntag wählen.')
    if (BLOCKED_SUNDAYS.includes(sonntag)) return err('Dieser Sonntag ist nicht verfügbar.')
    if (!ALLOWED_FS_ANKUNFT.includes(ankunft)) return err('Ungültige Ankunftszeit.')
    if (!isValidPersonCount(erwachsene, 1)) return err('Ungültige Erwachsenenanzahl.')
    if (!isValidPersonCount(kinder, 0)) return err('Ungültige Kinderanzahl.')
    if (kinder && kinder !== '0' && !ALLOWED_KIND_ALTER.includes(kindAlter)) return err('Ungültiges Kindesalter.')

    emailSubject = `☕ Sonntagsfrühstück – ${formatDate(sonntag)}`
    emailText = `
SONNTAGSFRÜHSTÜCK

Kontakt: ${vorname} ${nachname}
E-Mail: ${email}
Telefon: ${telefon || '–'}

Datum: ${formatDate(sonntag)}
Frühstücksslot: ${formatSlot(ankunft)}
Erwachsene: ${erwachsene}
Kinder: ${kinder}
Alter jüngstes Kind: ${kinder === '0' ? '–' : kindAlter}
Etagere vegetarisch: ${vegetarisch ? 'Ja' : 'Nein'}

Hinweise: ${nachricht || '–'}
    `.trim()

    emailTextBestaetigung = emailText
  }

  // ── INDIVIDUELLE ANFRAGE ──
  if (anlass === 'individuell') {
    const nachricht = sanitize(b.ind_nachricht, 2000)
    if (!nachricht) return err('Nachricht fehlt.')

    emailSubject = `✉️ Individuelle Anfrage – ${vorname} ${nachname}`
    emailText = `
INDIVIDUELLE ANFRAGE

Kontakt: ${vorname} ${nachname}
E-Mail: ${email}
Telefon: ${telefon || '–'}

Anfrage:
${nachricht}
    `.trim()

    emailTextBestaetigung = emailText
  }

  // ── E-Mail senden ──
  try {
    const { error: cafeMailError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CAFE_EMAIL,
      replyTo: email,
      subject: emailSubject,
      text: emailText,
    })

    if (cafeMailError) {
      console.error('Resend Café-Mail Fehler:', cafeMailError)
      return err('E-Mail konnte nicht gesendet werden.', 500)
    }

    const { error: confirmMailError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Eure Anfrage im Zwerghain – wir haben sie erhalten!',
      text: `
Hallo ${vorname},

vielen Dank für eure Anfrage! Wir haben sie erhalten und melden uns zeitnah zurück.

Hier eine Zusammenfassung eurer Anfrage:

${emailTextBestaetigung}

Bis bald im Zwerghain!
Euer Zwerghain-Team
--
Bitte antwortet nicht auf diese E-Mail.
Bei Fragen erreicht ihr uns unter: hallo@zwerghain.com
      `.trim(),
    })

    if (confirmMailError) {
      console.error('Resend Bestätigungsmail Fehler:', confirmMailError)
    }

    return NextResponse.json({ ok: true })

  } catch (error) {
    console.error('Unerwarteter Resend-Fehler:', error)
    return err('E-Mail konnte nicht gesendet werden.', 500)
  }
}