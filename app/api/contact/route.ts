import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const CAFE_EMAIL = 'hallo@zwerghain.com'
const FROM_EMAIL = 'noreply@zwerghain.com'

// ── Allowlists ──
const ALLOWED_ANLASS = ['geburtstag', 'fruehstueck']
const ALLOWED_KIND_ALTER = ['0-2', '2+']
const ALLOWED_STUNDE = ['9','10','11','12','13','14','15','16','17']
const ALLOWED_MINUTEN = ['00','15','30','45']
const ALLOWED_GB_ALTER = Array.from({ length: 12 }, (_, i) => String(i + 1))
const ALLOWED_GB_KINDER = Array.from({ length: 10 }, (_, i) => String(i + 1))
const ALLOWED_GB_ERWACHSENE = Array.from({ length: 16 }, (_, i) => String(i))
const ALLOWED_GB_EXTRAS = ['kinderschminken','animation','basteln','gastgeschenk','einladungskarten','torte','prinzessin_held']
const ALLOWED_GB_MOTTO = ['','prinzessin','pirat','superhelden','pawpatrol','dinosaurier','einhorn','sonstiges']
const ALLOWED_GB_ESSEN = ['pizza','haehnchen']
const ALLOWED_FS_SLOT = ['9:00','11:00']
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

function formatExtras(extras: string[]): string {
  const map: Record<string, string> = {
    kinderschminken: 'Kinderschminken',
    animation: 'Kinderanimation',
    basteln: 'Bastelaktionen',
    gastgeschenk: 'Gastgeschenk-Tütchen',
    einladungskarten: 'Einladungskarten',
    torte: 'Individuelle Geburtstagstorte',
    prinzessin_held: 'Prinzessin / Superheld',
  }
  return extras.map(e => map[e] || e).join(', ') || '–'
}

function formatEssen(essen: string[]): string {
  const map: Record<string, string> = {
    pizza: 'Mini-Pizzen',
    haehnchen: 'Hähnchenstücke mit Pommes/Ofenkartoffeln',
  }
  return essen.map(e => map[e] || e).join(', ') || '–'
}

export async function POST(request: Request) {
  // ── Punkt 3: API-Key Guard ──
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY ist nicht gesetzt.')
    return err('Serverkonfigurationsfehler.', 500)
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  // ── Punkt 2: request.json() in try/catch ──
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return err('Ungültige Anfrage.')
  }

  if (typeof body !== 'object' || body === null) return err('Ungültige Anfrage.')
  const b = body as Record<string, unknown>

  // ── Honeypot ──
  if (b.honeypot) {
    return NextResponse.json({ ok: true })
  }

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

  // ── KINDERGEBURTSTAG ──
  if (anlass === 'geburtstag') {
    const kindName = sanitize(b.gb_kind_name, 80)
    const kindAlter = sanitize(b.gb_kind_alter, 2)
    const datum = sanitize(b.gb_datum, 10)
    const stunde = sanitize(b.gb_stunde, 2)
    const minute = sanitize(b.gb_minute, 2)
    const kinder = sanitize(b.gb_kinder, 2)
    const erwachsene = sanitize(b.gb_erwachsene, 2)
    const motto = sanitize(b.gb_motto, 20)
    const nachricht = sanitize(b.gb_nachricht, 1500)

    if (!kindName) return err('Name des Kindes fehlt.')
    if (!ALLOWED_GB_ALTER.includes(kindAlter)) return err('Ungültiges Alter.')
    if (!datum || !/^\d{4}-\d{2}-\d{2}$/.test(datum)) return err('Ungültiges Datum.')
    if (!isValidDate(datum)) return err('Ungültiges Datum.')
    if (!isNotInPast(datum)) return err('Datum liegt in der Vergangenheit.')
    if (!ALLOWED_STUNDE.includes(stunde)) return err('Ungültige Stunde.')
    if (!ALLOWED_MINUTEN.includes(minute)) return err('Ungültige Minute.')
    if (!ALLOWED_GB_KINDER.includes(kinder)) return err('Ungültige Kinderanzahl.')
    if (!ALLOWED_GB_ERWACHSENE.includes(erwachsene)) return err('Ungültige Erwachsenenanzahl.')
    if (!ALLOWED_GB_MOTTO.includes(motto)) return err('Ungültiges Motto.')

    const extras = Array.isArray(b.gb_extras) ? b.gb_extras : []
    const essen = Array.isArray(b.gb_essen) ? b.gb_essen : []
    if (extras.some((e: unknown) => !ALLOWED_GB_EXTRAS.includes(e as string))) return err('Ungültiges Extra.')
    if (essen.some((e: unknown) => !ALLOWED_GB_ESSEN.includes(e as string))) return err('Ungültiges Essen.')
    if (extras.length > ALLOWED_GB_EXTRAS.length) return err('Zu viele Extras.')
    if (essen.length > ALLOWED_GB_ESSEN.length) return err('Zu viele Essensoptionen.')

    emailSubject = `Kindergeburtstag – ${kindName} (${kindAlter} Jahre)`
    emailText = `
KINDERGEBURTSTAG

Kontakt: ${vorname} ${nachname}
E-Mail: ${email}
Telefon: ${telefon || '–'}

Geburtstagskind: ${kindName}, wird ${kindAlter} Jahre alt
Datum: ${datum}
Uhrzeit: ${stunde.padStart(2, '0')}:${minute} Uhr
Kinder: ${kinder}
Erwachsene: ${erwachsene}

Motto: ${motto || 'Waldtier (inklusive)'}
Extras: ${formatExtras(extras as string[])}
Essen: ${formatEssen(essen as string[])}

Sonstiges: ${nachricht || '–'}
    `.trim()
  }

  // ── SONNTAGSFRÜHSTÜCK ──
  if (anlass === 'fruehstueck') {
    const sonntag = sanitize(b.fs_sonntag, 10)
    const slot = sanitize(b.fs_slot, 10)
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
    if (!ALLOWED_FS_SLOT.includes(slot)) return err('Ungültiger Slot.')
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
Slot: ${slot} – ${slot === '9:00' ? '10:30' : '12:30'} Uhr
Erwachsene: ${erwachsene}
Kinder: ${kinder}
Alter jüngstes Kind: ${kindAlter}
Etagere vegetarisch: ${vegetarisch ? 'Ja' : 'Nein'}

Hinweise: ${nachricht || '–'}
    `.trim()
  }

  // ── Punkt 1: E-Mail senden mit explizitem Error-Handling ──
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

${emailText}

Bis bald im Zwerghain!
Euer Zwerghain-Team
--
Bitte antwortet nicht auf diese E-Mail.
Bei weiteren Fragen oder Ergänzungen erreicht ihr uns unter:
hallo@zwerghain.com

      `.trim(),
    })

    if (confirmMailError) {
      // Bestätigungsmail fehlgeschlagen – Café-Mail war aber erfolgreich.
      // Wir loggen den Fehler, geben aber trotzdem ok zurück.
      console.error('Resend Bestätigungsmail Fehler:', confirmMailError)
    }

    return NextResponse.json({ ok: true })

  } catch (error) {
    console.error('Unerwarteter Resend-Fehler:', error)
    return err('E-Mail konnte nicht gesendet werden.', 500)
  }
}