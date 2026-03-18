import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung des Zwerghain Eltern-Kind-Cafés in Berlin-Lichterfelde.',
}

export default function DatenschutzPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">Datenschutzerklärung</h1>

      <div className="flex flex-col gap-10 text-sm sm:text-base text-gray-700 leading-relaxed">

        {/* 1. Überblick */}
        <section aria-labelledby="ueberblick">
          <h2 id="ueberblick" className="text-lg font-semibold text-gray-900 mb-3">
            1. Datenschutz auf einen Blick
          </h2>
          <p className="mb-3">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
            personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
            Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>
          <p>
            Diese Website verwendet keine Tracking- oder Analyse-Tools und setzt keine
            Werbe-Cookies. Es werden ausschließlich die Daten verarbeitet, die Sie uns über
            das Kontaktformular aktiv mitteilen, sowie technische Daten die beim Hosting
            anfallen.
          </p>
        </section>

        {/* 2. Verantwortliche Stelle */}
        <section aria-labelledby="verantwortlich">
          <h2 id="verantwortlich" className="text-lg font-semibold text-gray-900 mb-3">
            2. Verantwortliche Stelle
          </h2>
          <p className="mb-3">
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          </p>
          <address className="not-italic flex flex-col gap-1 mb-3">
            <span className="font-medium text-gray-900">
              Linda Fitzek, Lea Roggemann, Zwerghain Kindercafé & Partylocation
            </span>
            <span>Baseler Str. 2</span>
            <span>12205 Berlin</span>
            <span>
              E-Mail:{' '}
              <a href="mailto:hallo@zwerghain.com" className="text-brand-green hover:underline">
                hallo@zwerghain.com
              </a>
            </span>
            <span>
              Telefon:{' '}
              <a href="tel:+493012345678" className="text-brand-green hover:underline">
                +49 30 12 345 678
              </a>
            </span>
          </address>
          <p className="text-xs text-gray-500">
            Es ist kein Datenschutzbeauftragter bestellt. Für Datenschutzanfragen wenden
            Sie sich bitte direkt an die oben genannte E-Mail-Adresse.
          </p>
        </section>

        {/* 3. Hosting */}
        <section aria-labelledby="hosting">
          <h2 id="hosting" className="text-lg font-semibold text-gray-900 mb-3">
            3. Hosting
          </h2>
          <p className="mb-3">
            Diese Website wird gehostet bei:
          </p>
          <p className="mb-3">
            <span className="font-medium text-gray-900">Vercel Inc.</span><br />
            440 N Bayside Dr, San Francisco, CA 94107, USA
          </p>
          <p className="mb-3">
            Wenn Sie diese Website besuchen, verarbeitet Vercel automatisch technische
            Daten, die für den Betrieb der Website technisch notwendig sind. Dazu gehören
            typischerweise:
          </p>
          <ul className="flex flex-col gap-1 mb-3 ml-4 list-disc">
            <li>IP-Adresse des anfragenden Geräts</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>Aufgerufene URL</li>
            <li>Browsertyp und Betriebssystem</li>
            <li>HTTP-Statuscode</li>
          </ul>
          <p className="mb-3">
            Diese Daten werden in sogenannten Logfiles gespeichert. Der Zweck der
            Verarbeitung ist die technisch fehlerfreie Bereitstellung und Sicherheit
            der Website. Die Speicherdauer richtet sich nach den Richtlinien von Vercel;
            wir haben auf die genaue Speicherdauer keinen direkten Einfluss.
          </p>
          <p className="mb-3">
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an einer zuverlässigen und sicheren Darstellung
            der Website).
          </p>
          <p className="mb-3">
            Vercel hat sich den EU-Standardvertragsklauseln (SCCs) unterworfen. Da
            Vercel ein US-amerikanisches Unternehmen ist, können Daten in die USA
            übertragen werden. Weitere Informationen finden Sie in der
            Datenschutzerklärung von Vercel:
          </p>
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-green hover:underline"
          >
            vercel.com/legal/privacy-policy
          </a>
        </section>

        {/* 4. Kontaktformular */}
        <section aria-labelledby="kontaktformular">
          <h2 id="kontaktformular" className="text-lg font-semibold text-gray-900 mb-3">
            4. Kontaktformular und E-Mail-Versand
          </h2>

          <h3 className="font-medium text-gray-900 mb-2">Erhobene Daten und Zweck</h3>
          <p className="mb-3">
            Wenn Sie unser Kontaktformular nutzen, erheben wir die von Ihnen eingegebenen
            Daten zur Bearbeitung Ihrer Anfrage. Je nach gewähltem Anlass können das sein:
            Name, E-Mail-Adresse, Telefonnummer, Wunschdatum, Personenanzahl sowie weitere
            anlasspezifische Angaben.
          </p>

          <h3 className="font-medium text-gray-900 mb-2">Rechtsgrundlage</h3>
          <p className="mb-3">
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, soweit
            Ihre Anfrage auf die Anbahnung oder Erfüllung eines Vertrags gerichtet ist
            (z. B. Reservierungsanfragen). In allen übrigen Fällen beruht die Verarbeitung
            auf unserem berechtigten Interesse an der Bearbeitung an uns gerichteter
            Anfragen gemäß Art. 6 Abs. 1 lit. f DSGVO.
          </p>

          <h3 className="font-medium text-gray-900 mb-2">Speicherdauer</h3>
          <p className="mb-4">
            Die über das Formular übermittelten Daten verbleiben bei uns, bis Sie uns zur
            Löschung auffordern, oder der Zweck der Datenspeicherung entfällt. Zwingende
            gesetzliche Aufbewahrungsfristen – insbesondere steuer- und handelsrechtliche
            Fristen von bis zu zehn Jahren – bleiben unberührt.
          </p>

          <h3 className="font-medium text-gray-900 mb-2 mt-4">E-Mail-Versand über Resend</h3>
          <p className="mb-3">
            Für den technischen Versand der Formular-E-Mails nutzen wir den Dienst:
          </p>
          <p className="mb-3">
            <span className="font-medium text-gray-900">Resend Inc.</span><br />
            2261 Market Street #5014, San Francisco, CA 94114, USA
          </p>
          <p className="mb-3">
            Resend verarbeitet die von Ihnen eingegebenen Daten ausschließlich zum Zweck
            des E-Mail-Versands in unserem Auftrag. Mit Resend gelten die
            Vertragsbedingungen des Anbieters einschließlich eines
            Auftragsverarbeitungsvertrags (DPA) gemäß Art. 28 DSGVO, der mit der
            Registrierung bei Resend in Kraft tritt.
          </p>
          <p className="mb-3">
            Resend versendet E-Mails über Server in der Region EU (Irland). Metadaten
            und Logs können jedoch auch auf Servern in den USA gespeichert werden. Die
            Datenübertragung in die USA erfolgt auf Grundlage der
            EU-Standardvertragsklauseln (SCCs) gemäß Art. 46 Abs. 2 lit. c DSGVO.
          </p>
          <p>
            Weitere Informationen finden Sie in der Datenschutzerklärung von Resend:{' '}
            <a
              href="https://resend.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-green hover:underline"
            >
              resend.com/legal/privacy-policy
            </a>
          </p>
        </section>

        {/* 5. Externe Links */}
        <section aria-labelledby="externe-links">
          <h2 id="externe-links" className="text-lg font-semibold text-gray-900 mb-3">
            5. Externe Links
          </h2>
          <p>
            Diese Website enthält Links zu externen Websites, z. B. zu Instagram und
            Google Maps. Beim Anklicken dieser Links verlassen Sie unsere Website. Für
            die Inhalte und Datenschutzpraktiken der verlinkten Seiten sind ausschließlich
            deren Betreiber verantwortlich. Durch das bloße Vorhandensein eines Links auf
            unserer Website werden keine Daten an Dritte übertragen.
          </p>
        </section>

        {/* 6. SSL */}
        <section aria-labelledby="ssl">
          <h2 id="ssl" className="text-lg font-semibold text-gray-900 mb-3">
            6. SSL- bzw. TLS-Verschlüsselung
          </h2>
          <p>
            Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung.
            Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des
            Browsers mit „https://" beginnt und ein Schloss-Symbol angezeigt wird. Wenn
            die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie
            an uns übermitteln, nicht von Dritten mitgelesen werden.
          </p>
        </section>

        {/* 7. Betroffenenrechte */}
        <section aria-labelledby="rechte">
          <h2 id="rechte" className="text-lg font-semibold text-gray-900 mb-3">
            7. Ihre Rechte
          </h2>
          <p className="mb-4">
            Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Auskunft, Berichtigung und Löschung</h3>
              <p>
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre bei uns
                gespeicherten personenbezogenen Daten sowie das Recht auf Berichtigung oder
                Löschung dieser Daten, sofern keine gesetzlichen Aufbewahrungspflichten
                entgegenstehen.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-1">Einschränkung der Verarbeitung</h3>
              <p>
                Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen
                Daten zu verlangen, sofern die gesetzlichen Voraussetzungen hierfür vorliegen.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-1">Widerspruch</h3>
              <p>
                Sie haben das Recht, der Verarbeitung Ihrer personenbezogenen Daten auf
                Grundlage von Art. 6 Abs. 1 lit. f DSGVO jederzeit zu widersprechen, sofern
                dafür Gründe vorliegen, die sich aus Ihrer besonderen Situation ergeben.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-1">Widerruf der Einwilligung</h3>
              <p>
                Sofern die Datenverarbeitung auf Ihrer Einwilligung beruht, können Sie diese
                jederzeit mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der bis
                zum Widerruf erfolgten Verarbeitung bleibt unberührt.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-1">Datenübertragbarkeit</h3>
              <p>
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung
                automatisiert verarbeiten, in einem gängigen, maschinenlesbaren Format
                zu erhalten oder an einen Dritten übermitteln zu lassen, soweit dies
                technisch machbar ist.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-1">
                Beschwerderecht bei einer Aufsichtsbehörde
              </h3>
              <p className="mb-2">
                Sie haben gemäß Art. 77 DSGVO das Recht, sich bei einer
                Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen
                Daten zu beschweren – insbesondere in dem Mitgliedstaat Ihres gewöhnlichen
                Aufenthalts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.
              </p>
              <p>
                Zuständige Aufsichtsbehörde für Berlin ist die:{' '}
                <a
                  href="https://www.datenschutz-berlin.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-green hover:underline"
                >
                  Berliner Beauftragte für Datenschutz und Informationsfreiheit
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-1">Kontakt für Datenschutzanfragen</h3>
              <p>
                Für Fragen zum Datenschutz oder zur Geltendmachung Ihrer Rechte wenden Sie
                sich bitte direkt an:{' '}
                <a
                  href="mailto:hallo@zwerghain.com"
                  className="text-brand-green hover:underline"
                >
                  hallo@zwerghain.com
                </a>
              </p>
            </div>
          </div>
        </section>

        <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">
          Stand: März 2026
        </p>

      </div>
    </div>
  )
}