import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const CAFE_EMAIL = 'hallo@zwerghain.com'
const FROM_EMAIL = 'noreply@zwerghain.com'

const ALLOWED_ANLASS = ['geburtstag', 'fruehstueck']
const ALLOWED_KIND_ALTER = ['0-2', '2+']
const ALLOWED_GB_PAKET = ['eichhoernchen', 'fuchs', 'eule']
const ALLOWED_GB_FARBE = ['pink', 'lila', 'gelb', 'gruen', 'blau']
const ALLOWED_GB_MOTTO = ['prinzessin','pirat','superhelden','pawpatrol','dinosaurier','einhorn','waldtiere','sonstiges']
const ALLOWED_GB_ALTER = Array.from({ length: 12 }, (_, i) => String(i + 1))
const ALLOWED_GB_KINDER = Array.from({ length: 10 }, (_, i) => String(i + 1))
const ALLOWED_GB_ERWACHSENE = Array.from({ length: 16 }, (_, i) => String(i))
const ALLOWED_GB_EXTRAS = ['kinderschminken','animation','basteln','gastgeschenk','einladungskarten','torte','prinzessin_held']
const ALLOWED_GB_ESSEN_WARM = ['pizza', 'nudeln', 'kartoffelecken']
const ALLOWED_FS_ANKUNFT = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30']
const ALLOWED_FS_PERSONEN = Array.from({ length: 8 }, (_, i) => String(i + 1))
const ALLOWED_FS_KINDER = Array.from({ length: 9 }, (_, i) => String(i))

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

function formatPaket(paket: string): string {
  const map: Record<string, string> = {
    eichhoernchen: '🐿️ Eichhörnchen-Feier (329 €)',
    fuchs: '🦊 Fuchs-Feier (399 €)',
    eule: '🦉 Eulen-Feier (499 €)',
  }
  return map[paket] || paket
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
  }
  return extras.map(e => map[e] || e).join('\n  ') || '–'
}

function formatEssenWarm(essen: string): string {
  const map: Record<string, string> = {
    pizza: 'Pizza Margherita (8,00 €)',
    nudeln: 'Nudeln mit Tomatensoße (7,50 €)',
    kartoffelecken: 'Kartoffelecken mit Kräuterquark (7,00 €)',
  }
  return map[essen] || '–'
}

function formatEssenWarmOhnePreis(essen: string): string {
  const map: Record<string, string> = {
    pizza: 'Pizza Margherita',
    nudeln: 'Nudeln mit Tomatensoße',
    kartoffelecken: 'Kartoffelecken mit Kräuterquark',
  }
  return map[essen] || essen
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

  if (b.honeypot) return NextResponse.json({ ok: true })

  // ── Basisdaten ──
  const vorname = sanitize(b.vorname, 80)
  const nachname = sanitize(b.nachname, 80)
  const email = sanitize(b.email, 200)
  const telefon = sanitize(b.telefon, 50)
  const anlass = sanitize(b.anlass, 20)

  if (!vorname) return err('Vorname fehlt.')
  if (!nachname) return err('Nachname fehlt.')
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return err('Ungültige E-Mail.')
  if (!ALLOWED_ANLASS.includes(anlass)) return err('Ungültiger Anlass.')
  if (b.datenschutz !== true) return err('Datenschutz nicht akzeptiert.')
  if (telefon && !/^[0-9+\-\s()]{0,50}$/.test(telefon)) return err('Ungültige Telefonnummer.')

  let emailText = ''
  let emailSubject = ''
  let emailTextBestaetigung = ''

  // ── KINDERGEBURTSTAG ──
  if (anlass === 'geburtstag') {
    const paket = sanitize(b.gb_paket, 20)
    const farbe = sanitize(b.gb_farbe, 20)
    const motto = sanitize(b.gb_motto, 20)
    const kindName = sanitize(b.gb_kind_name, 80)
    const kindAlter = sanitize(b.gb_kind_alter, 2)
    const datum = sanitize(b.gb_datum, 10)
    const kinder = sanitize(b.gb_kinder, 2)
    const erwachsene = sanitize(b.gb_erwachsene, 2)
    const essenWarm = Array.isArray(b.gb_essen_warm) ? b.gb_essen_warm as string[] : []
    const nachricht = sanitize(b.gb_nachricht, 1500)

    if (!ALLOWED_GB_PAKET.includes(paket)) return err('Ungültiges Paket.')
    if (paket === 'eichhoernchen' && !ALLOWED_GB_FARBE.includes(farbe)) return err('Ungültige Farbe.')
    if ((paket === 'fuchs' || paket === 'eule') && motto && !ALLOWED_GB_MOTTO.includes(motto)) return err('Ungültiges Motto.')
    if (!kindName) return err('Name des Kindes fehlt.')
    if (!ALLOWED_GB_ALTER.includes(kindAlter)) return err('Ungültiges Alter.')
    if (!datum || !/^\d{4}-\d{2}-\d{2}$/.test(datum)) return err('Ungültiges Datum.')
    if (!isValidDate(datum)) return err('Ungültiges Datum.')
    if (!isNotInPast(datum)) return err('Datum liegt in der Vergangenheit.')
    if (!ALLOWED_GB_KINDER.includes(kinder)) return err('Ungültige Kinderanzahl.')
    if (!ALLOWED_GB_ERWACHSENE.includes(erwachsene)) return err('Ungültige Erwachsenenanzahl.')
    if (essenWarm.some(e => !ALLOWED_GB_ESSEN_WARM.includes(e))) return err('Ungültiges Essen.')
    if (essenWarm.length > ALLOWED_GB_ESSEN_WARM.length) return err('Zu viele Essensoptionen.')

    const extras = Array.isArray(b.gb_extras) ? b.gb_extras as string[] : []
    if (extras.some(e => !ALLOWED_GB_EXTRAS.includes(e))) return err('Ungültiges Extra.')
    if (extras.length > ALLOWED_GB_EXTRAS.length) return err('Zu viele Extras.')

    // Deko-Zeile je nach Paket
    const dekoZeile = paket === 'eichhoernchen'
      ? `Dekorationsfarbe: ${farbe}`
      : `Motto: ${motto || '–'}`

    // Essen-Zeile je nach Paket
    const essenZeile = paket === 'eule'
      ? `Warmes Essen (inklusive): ${essenWarm.length > 0 ? essenWarm.map(formatEssenWarm).join(', ') : '–'}`
      : `Optionales Essen: ${essenWarm.length > 0 ? essenWarm.map(formatEssenWarm).join(', ') : '–'}`

    const essenZeileBestaetigung = paket === 'eule'
      ? `Warmes Essen (inklusive): ${essenWarm.length > 0 ? essenWarm.map(formatEssenWarmOhnePreis).join(', ') : '–'}`
      : `Optionales Essen: ${essenWarm.length > 0 ? essenWarm.map(formatEssenWarm).join(', ') : '–'}`

    emailSubject = `Kindergeburtstag – ${kindName} (${kindAlter} Jahre) · ${formatPaket(paket)}`
    emailText = `
KINDERGEBURTSTAG

Kontakt: ${vorname} ${nachname}
E-Mail: ${email}
Telefon: ${telefon || '–'}

Paket: ${formatPaket(paket)}
${dekoZeile}

Geburtstagskind: ${kindName}, wird ${kindAlter} Jahre alt
Datum: ${datum}
Uhrzeit: ab 14:30 Uhr
Kinder: ${kinder}
Erwachsene: ${erwachsene}

Extras:
  ${formatExtras(extras)}
${essenZeile}

Sonstiges: ${nachricht || '–'}
    `.trim()
    emailTextBestaetigung = emailText.replace(essenZeile, essenZeileBestaetigung)

  }

  // ── SONNTAGSFRÜHSTÜCK ──
  if (anlass === 'fruehstueck') {
    const sonntag = sanitize(b.fs_sonntag, 10)
    const ankunft = sanitize(b.fs_ankunft, 5)
    const erwachsene = sanitize(b.fs_erwachsene, 2)
    const kinder = sanitize(b.fs_kinder, 2)
    const kindAlter = sanitize(b.fs_kind_alter, 10)
    const vegetarisch = b.fs_vegetarisch === true
    const nachricht = sanitize(b.fs_nachricht, 1000)

    if (!sonntag || !/^\d{4}-\d{2}-\d{2}$/.test(sonntag)) return err('Ungültiges Datum.')
    if (!isValidDate(sonntag)) return err('Ungültiges Datum.')
    if (!isNotInPast(sonntag)) return err('Datum liegt in der Vergangenheit.')
    const day = new Date(sonntag + 'T12:00:00').getDay()
    if (day !== 0) return err('Bitte einen Sonntag wählen.')
    if (!ALLOWED_FS_ANKUNFT.includes(ankunft)) return err('Ungültige Ankunftszeit.')
    if (!ALLOWED_FS_PERSONEN.includes(erwachsene)) return err('Ungültige Erwachsenenanzahl.')
    if (!ALLOWED_FS_KINDER.includes(kinder)) return err('Ungültige Kinderanzahl.')
    if (!ALLOWED_KIND_ALTER.includes(kindAlter)) return err('Ungültiges Kindesalter.')

    const [year, month, dayNum] = sonntag.split('-')
    const displayDate = new Date(Number(year), Number(month) - 1, Number(dayNum))
      .toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
    emailSubject = `Sonntagsfrühstück – ${displayDate}`
    emailText = `
SONNTAGSFRÜHSTÜCK

Kontakt: ${vorname} ${nachname}
E-Mail: ${email}
Telefon: ${telefon || '–'}

Datum: ${displayDate}
Ankunftszeit: ${ankunft} Uhr
Erwachsene: ${erwachsene}
Kinder: ${kinder}
Alter jüngstes Kind: ${kindAlter}
Etagere vegetarisch: ${vegetarisch ? 'Ja' : 'Nein'}

Hinweise: ${nachricht || '–'}
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