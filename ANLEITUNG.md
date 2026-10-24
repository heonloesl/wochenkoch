# Wochenkoch v0.5 – Einrichtung (Windows + iPhone + GitHub Pages)

## 1. Supabase-Projekt
1. Unter https://supabase.com/dashboard ein Projekt erstellen.
2. Unter **SQL Editor → New query** die gesamte Datei `schema.sql` einfügen und ausführen.
3. Unter **Authentication → Providers → Email** E-Mail-Anmeldung und **Confirm email** aktivieren. Öffentliche Registrierung muss erlaubt sein (unter Authentication-Einstellungen / Signups).
4. Unter **Authentication → URL Configuration** die **Site URL** auf `https://DEINNAME.github.io/wochenkoch/` setzen und unter **Redirect URLs** dieselbe Adresse ergänzen. `DEINNAME` durch deinen GitHub-Namen ersetzen. Keine Platzhalter stehen lassen.
5. Unter **Project Settings → API** (oder **Connect**) die **Project URL** und den **publishable key** (alternativ legacy `anon` key) kopieren.

## 2. Konfiguration
`config.js` öffnen und beide Werte eintragen:

```js
window.WOCHENKOCH_SUPABASE = {
  url: 'https://DEINPROJEKT.supabase.co',
  publishableKey: 'DEIN_PUBLIC_PUBLISHABLE_KEY'
};
```

**Sicherheit:** Nur der öffentliche `publishable`/`anon` Key darf in `config.js` stehen. Niemals `service_role`, `secret`, Datenbank-Passwort oder private API-Schlüssel in GitHub hochladen! Öffentliche Schlüssel sind bei aktivierter RLS für Browseranwendungen vorgesehen.

## 3. GitHub Pages aktualisieren
1. Alle Dateien **aus dem ZIP-Hauptverzeichnis** (inkl. `config.js`, `cloud.js`, `prices.js`, `schema.sql`, `ANLEITUNG.md`) im GitHub-Repository `wochenkoch` hochladen, vorhandene Dateien ersetzen.
2. `Settings → Pages`: Branch `main`, Ordner `/(root)`.
3. Unter `Actions` auf grünen Status warten.
4. Im iPhone-Safari `https://DEINNAME.github.io/wochenkoch/` öffnen. Falls die alte Oberfläche erscheint: App schließen, Seite neu laden; gegebenenfalls Website-Daten löschen (Achtung: lokale Daten gehen dabei verloren).

## 4. Benutzung
1. Tab **Profil** öffnen und mit E-Mail + Passwort registrieren.
2. E-Mail-Bestätigungslink öffnen, anschließend anmelden.
3. PLZ, Radius, Märkte, Ernährungsweise und ausgeschlossene Zutaten auswählen; **Einstellungen speichern**.
4. In **Wochenplan** eine neue Woche generieren.
5. Unter **Einkaufen → Preiszentrale** Beobachtungen suchen oder eigene Preise melden.
6. Bei fremden Beobachtungen `Diesen Preis bestätigen` wählen. Eigene Beobachtungen dürfen nicht selbst bestätigt werden; dieselbe Beobachtung kann pro Konto nur einmal bestätigt werden.

## 5. Datenschutz, Grenzen und Betrieb
- Profile sind per Row Level Security nur für den jeweiligen Kontoinhaber les- und änderbar.
- Preisbeobachtungen und Bestätigungen sind für **alle angemeldeten Konten** lesbar; sie enthalten Produkt, Preis, Datum und **Filial-PLZ**, aber keine genaue Adresse. Benutzer-UUIDs sind technisch enthalten.
- Diese Version bietet **keine echten Livepreise**, keine überprüfte Filialauswahl, keine automatische EAN-Zuordnung zum Rezept und keine Moderation/Spam-Abwehr. Preisbeobachtungen sind Community-Angaben.
- Ein Preis kann nicht bearbeitet werden; Korrekturen werden als neue Beobachtung eingetragen.
- Wochenplan und Häkchen bleiben lokal gespeichert; **nur Profil-Einstellungen** werden mit Supabase synchronisiert. Ein geräteübergreifender Wochenplan ist noch nicht implementiert.
- Die Einschränkung `Vegan` basiert auf den Rezeptzutaten. **Keine Allergie- oder Kreuzkontaminationsgarantie**.
- **Öffentliche Registrierung** erfordert für echten Betrieb zusätzliche Missbrauchsbegrenzung: Supabase Auth Rate Limits/CAPTCHA, Moderation, Lösch- und Meldeprozesse, Datenschutz- und Impressumspflichten prüfen. Bei öffentlichem Start E-Mail-Verifizierung aktiv lassen.
- Supabase-Kontolöschung und vollständige Löschung von Beiträgen sind noch nicht als Self-Service-Funktion implementiert. Vor öffentlicher Bewerbung nachrüsten.
- Supabase-JavaScript wird von einem CDN geladen. Die Anmeldung erfordert Internetzugang.

## 6. Schnelltest der Zugriffsregeln
- Konto A registrieren, Profil speichern; Konto B registrieren und sicherstellen, dass das Profil von A nicht sichtbar ist.
- Konto A Preis melden; Konto B kann ihn sehen und einmal bestätigen.
- Konto A darf eigene Beobachtung nicht bestätigen; Konto B darf nicht zweimal bestätigen.
- Ohne Anmeldung darf die Preiszentrale keine Beobachtungen abrufen.
- Fehlende/alte Preise werden **nicht** als Livepreise ausgegeben.
