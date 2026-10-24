# Wochenkoch: Kassenzettel einlesen

## Installation
1. ZIP entpacken und die App-Dateien in das GitHub-Repository `wochenkoch` hochladen (vorhandene Dateien ersetzen). **Die bestehende, ausgefüllte `config.js` nicht ersetzen.** Die ZIP enthält keine `config.js`.
2. Im Supabase-Dashboard unter **SQL Editor** den Inhalt von `receipt-migration.sql` **einmal** ausführen. Dadurch wird die EAN für Belegprodukte optional; viele Kassenzettel enthalten keine EAN.
3. GitHub Pages neu laden, ggf. Seite komplett schließen und erneut öffnen (Service Worker Cache).
4. In der **Preiszentrale** einen Kassenzettel fotografieren/auswählen, Supermarkt und PLZ festlegen, **Foto lokal auslesen**, alle erkannten Zeilen prüfen und Packungsgrößen ergänzen. Erst nach Bestätigung werden ausgewählte Preiszeilen gespeichert.

## Datenschutz und Einschränkungen
- Das Bild wird nur im Browser an die OCR-Bibliothek Tesseract.js übergeben und **nicht** in Supabase gespeichert. Tesseract.js wird beim ersten Einlesen über jsDelivr geladen; je nach Konfiguration werden Sprachmodelle aus externen CDNs bezogen. Für eine strikte Offline-/Datenschutzlösung die OCR-Bibliothek und Sprachmodelle selbst hosten und Datenschutzhinweise anpassen.
- Gespeichert werden Produktname, Preis, Packungsgröße, optional EAN, Supermarkt, Geschäfts-PLZ und Datum; kein Belegbild und keine Zahlungsdaten.
- OCR ist ungenau: insbesondere Rabatte, Pfand, Mehrfachmengen, Summen und mehrzeilige Belege müssen überprüft werden. Nicht erkannte Zeilen können manuell ergänzt werden. Jede Zeile benötigt eine Packungsgröße.
- Die Funktion markiert alle gespeicherten Zeilen als **keine Aktion**; Sonderangebote auf Belegen müssen vor dem Übernehmen abgewählt werden, da das Belegformat keine verlässliche automatische Erkennung erlaubt.
- Falls Preise nicht erscheinen, prüfen, ob die Benutzeranmeldung besteht und die SQL-Migration ausgeführt wurde.
