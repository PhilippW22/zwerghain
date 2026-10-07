import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'dsfji5xs',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const fetchOptions = { next: { revalidate: 60 } }

// Ticker
export async function getTickerItems(): Promise<string[]> {
  try {
    const data = await client.fetch(`*[_type == "ticker"][0].items`, {}, fetchOptions)
    if (Array.isArray(data) && data.length > 0) return data
  } catch (e) {
    console.error('Sanity Ticker fetch fehlgeschlagen:', e)
  }
  return [
    'Öffnungszeiten: Di 14–17:30 Uhr · Mi - Fr 9-17:30 Uhr · Sa geschlossen · So 9–13 Uhr Sonntagsfrühstück nur mit Reservierung · Mo Ruhetag',
  ]
}

// opening hours
export type OpeningHoursRow = { day: string; hours: string }
export type OpeningHoursData = {
  rows: OpeningHoursRow[]
  closedDay: string
}
export async function getOpeningHours(): Promise<OpeningHoursData> {
  try {
    const data = await client.fetch(`*[_type == "openingHours"][0]`, {}, fetchOptions)
    if (data?.rows) return data
  } catch (e) {
    console.error('Sanity OpeningHours fetch fehlgeschlagen:', e)
  }
  return {
    rows: [
      { day: 'Di', hours: '14 – 17:30 Uhr' },
      { day: 'Mi - Fr', hours: '9 – 17:30 Uhr' },
      { day: 'Sa', hours: 'geschlossen' },
      { day: 'So', hours: '9 – 13 Uhr' },
    ],
    closedDay: 'Montag',
  }
}

// faq items
export type FaqItem = { question: string; answer: string }

export async function getFaqItems(): Promise<FaqItem[]> {
  try {
    const data = await client.fetch(`*[_type == "faq"][0].items`, {}, fetchOptions)
    if (Array.isArray(data) && data.length > 0) return data
  } catch (e) {
    console.error('Sanity FAQ fetch fehlgeschlagen:', e)
  }
  return [
    { question: 'Was ist das Zwerghain?', answer: 'Das Zwerghain ist ein liebevoll gestaltetes Kinder- und Familiencafé in Berlin-Lichterfelde mit Spielbereich und Eventlocation. Hier treffen freies Spiel, Genuss und entspannte Familienzeit aufeinander.' },
    { question: 'Für welches Alter ist das Café geeignet?', answer: 'Unser Angebot richtet sich vor allem an Babys, Kleinkinder und Vorschulkinder. Ältere Geschwister sind herzlich willkommen, solange das Miteinander respektvoll und altersgerecht bleibt.' },
    { question: 'Muss ich reservieren?', answer: 'Für einen spontanen Cafébesuch ist keine Reservierung zwingend notwendig, wir empfehlen sie jedoch. Für unser Sonntagsfrühstück sowie für Feiern ist eine Reservierung erforderlich.' },
    { question: 'Kann ich bei euch feiern?', answer: 'Ja! Ob Kindergeburtstag, Taufe oder Familienfest – auch eine exklusive Anmietung ist möglich. Geburtstagsanfragen stellt ihr bitte direkt über unser Kontaktformular.' },
    { question: 'Gibt es Essen für Erwachsene?', answer: 'Neben kinderfreundlichen Speisen bieten wir euch auch Waffeln, Bagels sowie eine wechselnde Auswahl an Kuchen an.' },
    { question: 'Spielbereich & Konzept', answer: 'Im Mittelpunkt steht freies, selbstbestimmtes Spielen. Kinder entdecken unsere Spielbereiche in ihrem eigenen Tempo, während ihr als Eltern entspannt genießen könnt.' },
    { question: 'Preise & Ausstattung', answer: 'Für den Spielbereich fällt eine einmalige Gebühr von 3,00 € pro Kind an. Wir legen großen Wert auf ein sauberes, gepflegtes und liebevoll ausgestattetes Café. Hochstühle sowie ein Wickeltisch stehen selbstverständlich zur Verfügung.' },
    { question: 'Adresse & Kontakt', answer: 'Baseler Straße 2, 12205 Berlin-Lichterfelde. Gut erreichbar mit der S1 sowie dem Bus M11 bis Bahnhof Lichterfelde West. Ihr erreicht uns telefonisch, per E-Mail, über unser Kontaktformular oder direkt vor Ort.' },
    { question: 'Wichtige Hinweise', answer: 'Bitte bringt Stoppersocken oder Hausschuhe mit (bei Bedarf auch bei uns erhältlich). Eigene Speisen und Getränke müssen bitte draußen bleiben.' },
  ]
}

// eventhighlights
export type EventHighlightData = {
  feiernHeadline: string
  feiernBullets: string[]
  fruehstueckHeadline: string
  fruehstueckText: string
  fruehstueckBullets: string[]
}

export async function getEventHighlight(): Promise<EventHighlightData> {
  try {
    const data = await client.fetch(`*[_type == "eventHighlight"][0]`, {}, fetchOptions)
    if (data) return data
  } catch (e) {
    console.error('Sanity EventHighlight fetch fehlgeschlagen:', e)
  }
  return {
    feiernHeadline: 'Kindergeburtstag, Baby Shower oder Familienfest – bei uns wird jeder Anlass besonders.',
    feiernBullets: [
      'Feiern während des Cafébetriebs möglich',
      'Exklusive Raummiete für private Feste',
      'Individuelle Dekoration & liebevolle Details',
      'Animation, Kinderschminken & mehr zubuchbar',
    ],
    fruehstueckHeadline: 'Sonntagsfrühstück im Zwerghain – gemeinsam entspannt in den Tag starten.',
    fruehstueckText: 'Startet entspannt in den Sonntag: Während die Kinder spielen und entdecken, genießt ihr ein liebevoll angerichtetes Frühstück mit frischen Brötchen, herzhaften und süßen Aufschnitten sowie einer reich gefüllten Etagere für Groß und Klein.',
    fruehstueckBullets: [
      'Zwei Slots: 9:00–10:30 Uhr & 11:00–12:30 Uhr',
      'Liebevoll angerichtete Frühstücks-Etagere',
      '39,00 € für 2 Erw. + 1 Kind',
      '19,00 € für 1 Erw. + 1 Kind',
      'Jedes weitere Kind ab 3 Jahren + 9,00 €',
      'Nur mit Reservierung',
    ],
  }
}

// about us
export type AboutUsData = {
  headline: string
  body: string
  closing: string
}

export async function getAboutUs(): Promise<AboutUsData> {
  try {
    const data = await client.fetch(`*[_type == "aboutUs"][0]`, {}, fetchOptions)
    if (data) return data
  } catch (e) {
    console.error('Sanity AboutUs fetch fehlgeschlagen:', e)
  }
  return {
    headline: 'Pädagogik & Spiel im Zwerghain',
    body: 'Im Zwerghain steht das freie Spiel im Mittelpunkt. Kinder entdecken hier selbstbestimmt und im eigenen Tempo ihre Welt – durch Bewegung, Kreativität und eigene Erfahrungen.\n\nUnsere vielseitigen Spielbereiche fördern Fantasie, Motorik und soziale Kompetenzen – beim Klettern, Bauen, Rollenspiel oder gemeinsamen Entdecken. Kinder erleben Selbstwirksamkeit und lernen spielerisch Rücksichtnahme und Teamgeist.\nWährenddessen genießen Eltern eine entspannte Atmosphäre – aufmerksam begleitend oder mit einer bewussten kleinen Auszeit.',
    closing: 'So verbindet das Zwerghain pädagogische Qualität, Sicherheit und Wohlbefinden unter einem Dach.',
  }
}

// Eventspage
export type EventsData = {
  eichhoernchenBullets: string[]
  eichhoernchenHinweis: string
  fuchsBullets: string[]
  brunchEinleitung: string
  brunchSmallBullets: string[]
  brunchLargeBullets: string[]
}

export async function getEventsData(): Promise<EventsData> {
  try {
    const data = await client.fetch(`*[_type == "events"][0]`, {}, fetchOptions)
    if (data) return data
  } catch (e) {
    console.error('Sanity Events fetch fehlgeschlagen:', e)
  }
  return {
    eichhoernchenBullets: [
      '2,5 Stunden exklusive Nutzung des Cafés',
      'Dekoration in einer Wunschfarbe: Rosa, Blau, Grün oder Gelb',
      'Wasser & Apfelschorle für die Kinder',
      'Frische & süße Etagere mit Gemüsesticks & Obst',
      'Himbeer-Vanille-Geburtstagstorte',
    ],
    eichhoernchenHinweis: 'Ihr möchtet ein bestimmtes Motto? Auch bei der Eichhörnchen-Feier könnt ihr statt der farblichen Gestaltung eine Mottodekoration für zusätzlich 50 € buchen.',
    fuchsBullets: [
      '2,5 Stunden exklusive Nutzung des Cafés',
      'Liebevoll gestaltete Mottodekoration nach Wahl',
      'Passende Tischdekoration & Geschirr',
      'Luftballons passend zum Motto',
      'Aufblasbare Geburtstagszahl',
      'Wasser & Apfelschorle für die Kinder',
      'Frische & süße Etagere mit Gemüsesticks & Obst',
      'Himbeer-Vanille-Geburstagstorte passend zum Motto dekoriert',
      'Warmes Essen: Pizza Margherita oder Nudeln mit Tomatensoße in Bio-Qualität',
    ],
    brunchEinleitung: 'Ein entspannter Samstagvormittag mit euren Lieblingsmenschen: Für 2,5 Stunden gehört das gesamte Zwerghain exklusiv euch. Ihr frühstückt gemeinsam an eurer eigenen großen Tafel, während die Kleinen unsere Spielbereiche entdecken und nach Herzenslust spielen können.\n\nPerfekt für Babyshowers, Taufen, Baby-Welcomes, Geburtstage oder einfach einen besonderen Vormittag mit Familie und Freunden.',
    brunchSmallBullets: [
      '2,5 Stunden Zwerghain exklusiv für euch',
      '3 große Zwerghain-Frühstücksetageren',
      'Brötchen & Croissants',
      'Käse- & Wurstauswahl',
      'Butter, Frischkäse & süße Aufstriche',
      'Frisches Obst & Gemüse',
      'Wasser auf den Tischen',
      'Komplette Nutzung unserer Spielbereiche',
    ],
    brunchLargeBullets: [
      '2,5 Stunden Zwerghain exklusiv für euch',
      '5 große Zwerghain-Frühstücksetageren',
      'Brötchen & Croissants',
      'Käse- & Wurstauswahl',
      'Butter, Frischkäse & süße Aufstriche',
      'Frisches Obst & Gemüse',
      'Wasser auf den Tischen',
      'Komplette Nutzung unserer Spielbereiche',
    ],
  }
}

// sonntagsfrühstück
export type SonntagsfruehstueckData = {
  einleitung: string
  leistungsBullets: string[]
  absageHinweis: string
}

export async function getSonntagsfruehstueck(): Promise<SonntagsfruehstueckData> {
  try {
    const data = await client.fetch(`*[_type == "sonntagsfruehstueck"][0]`, {}, fetchOptions)
    if (data) return data
  } catch (e) {
    console.error('Sanity Sonntagsfrühstück fetch fehlgeschlagen:', e)
  }
  return {
    einleitung: 'Startet entspannt in den Sonntag und lasst euch bei uns verwöhnen. Während die Kinder spielen und entdecken, genießt ihr eine liebevoll zusammengestellte Frühstücks-Etagere für die ganze Familie.',
    leistungsBullets: [
      'Liebevoll zusammengestellte Frühstücks-Etagere',
      'Frische Brötchen',
      'Herzhafte und süße Aufschnitte',
      'Familienfreundliche Atmosphäre',
      'Raum zum Spielen für die Kinder',
    ],
    absageHinweis: 'Falls ihr euren Termin nicht wahrnehmen könnt, sagt bitte mindestens eine Stunde vorher ab. So können wir den Platz noch an eine andere Familie vergeben. Vielen Dank!',
  }
}