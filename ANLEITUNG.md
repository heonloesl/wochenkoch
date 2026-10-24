# Wochenkoch: Preiszentrale und Kamera

## Hochladen

1. `index.html`, `app.js` und `preise.html` im Stammverzeichnis deines GitHub-Repositories ersetzen.
2. `camera.js` im selben Verzeichnis neu anlegen.
3. Die bisherige `receipt.js` und `prices.js` müssen im Repository bereits vorhanden und funktionsfähig sein. Diese Dateien wurden nicht hochgeladen und deshalb nicht verändert.
4. `config.js` NICHT ersetzen. Kein neues SQL nötig, sofern die Kassenzettel-Migration schon ausgeführt wurde.
5. GitHub Pages neu laden, am besten in einem privaten Fenster.

## Funktion

Im Hauptmenü gibt es jetzt `Preise`. Die Preiszentrale bietet die direkte Kameravorschau. Ein aufgenommenes Foto wird an die bestehende Kassenzettel-Erkennung (`receipt.js`) übergeben. Die bestehende Prüfung und ausdrückliche Bestätigung vor dem Speichern bleiben maßgeblich.

Das Foto wird durch `camera.js` nicht hochgeladen. Die bestehende OCR-Bibliothek kann weiterhin externe Dateien laden. Die Erkennung von Kassenzetteln ist nicht fehlerfrei; alle Zeilen vor dem Speichern kontrollieren.

## Bei Problemen

Wenn `receipt.js` nicht vorhanden ist, kann das Foto zwar aufgenommen, aber nicht automatisch ausgelesen werden. Wenn die Kamera blockiert ist, kann weiterhin ein Foto über die Dateiauswahl gewählt werden.
