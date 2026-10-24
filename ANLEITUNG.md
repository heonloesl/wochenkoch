# Wochenkoch – Anmeldung verpflichtend

1. `config.js` mit der **Supabase Project URL** (`https://...supabase.co`, ohne `/rest/v1/`) und dem **Publishable Key** ausfüllen. Keine Secret Keys verwenden.
2. Alle Dateien dieses Ordners direkt ins Hauptverzeichnis des GitHub-Repositories hochladen. Besonders `index.html`, `app.js`, `cloud.js`, `style.css`, `sw.js`, `config.js`.
3. Nach dem GitHub-Pages-Deployment die Seite in einem privaten Browserfenster öffnen.
4. Registrieren, E-Mail bestätigen, anmelden.
5. Profil mit PLZ, Umkreis, Supermärkten, Ernährungsweise und Ausschlüssen speichern. Erst dann werden die anderen Bereiche freigeschaltet.

**Hinweis:** `schema.sql` wurde nicht verändert und muss nicht erneut ausgeführt werden, wenn die v0.5-Tabellen bereits angelegt wurden. Profil-Einstellungen liegen online, Wochenplan und Einkaufshäkchen derzeit nur lokal. Die Supermarkt- und PLZ-Angaben bewirken noch keine automatische Livepreis- oder Filialabfrage. Die Zugangssperre ist eine UI-Sperre; Datenzugriff wird zusätzlich durch Supabase-RLS geregelt.
