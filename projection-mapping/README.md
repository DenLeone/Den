# Den Mapper — Projection Mapping

App web (un solo file HTML, nessuna installazione) per fare **projection mapping** e **giochi di luce** su ambienti reali, pensata per scalare a tanti proiettori indipendenti.

## Come si usa

Apri `index.html` in un browser (Chrome/Edge consigliati) sul computer collegato al proiettore, a schermo intero.

1. **Calibrazione** — premi `E` per entrare in modalità Edit. Trascina i 4 pallini numerati di ogni "superficie" finché la proiezione combacia con muro/colonna/oggetto reale. Frecce = nudge di 1px (`Shift` = 10px) sull'angolo selezionato.
2. **Effetti** — nel pannello "Superfici" scegli l'effetto (colore pieno, pulsazione, strobo, plasma, rumore organico, fuoco, scanner, spot radiale, immagine, video...) e i suoi parametri (colori, velocità, densità, luminosità, blend).
3. **Scene** — salva lo stato di tutte le superfici come "scena" e richiamala dal vivo (anche con i tasti `1`–`9`). Il cambio scena è una dissolvenza morbida, non uno scatto.
4. **Output pulito** — `F` per lo schermo intero, `Tab` per nascondere il pannello. `Spazio` = blackout istantaneo (con dissolvenza).

## Architettura per "mille proiettori"

Ogni computer/proiettore gira **la propria istanza** della pagina (nessun server, nessuna rete richiesta): calibra la propria geometria (che resta locale, salvata nel browser di quella macchina) e può caricare le stesse "scene" (esportabili/importabili in JSON dal tab Scene) per ottenere lo stesso "look" ovunque.

Le scene si abbinano alle superfici **per nome**: dai lo stesso nome coerente alle superfici sui vari computer (es. "Facciata", "Colonna-1"...) così una scena esportata da una macchina applica gli stessi effetti quando importata sulle altre.

**Sincronia senza rete:** tutti gli effetti sono funzioni dell'orologio di sistema (non di un contatore locale a caso). Se le macchine hanno l'ora sincronizzata (es. automaticamente via internet) e lanci la stessa scena nello stesso momento su ognuna, i proiettori restano "in fase" senza bisogno di alcuna rete di controllo dedicata.

## Note tecniche

- Il warp prospettico delle superfici (corner-pin) usa WebGL con la classica mappatura proiettiva "unit square → quadrilatero" (Heckbert), quindi le linee rette nel contenuto restano rette anche su superfici deformate fortemente.
- Gli effetti procedurali (plasma, rumore, fuoco) disegnano su un piccolo canvas 2D offscreen per superficie (risoluzione regolabile in Globale → Qualità, utile su hardware debole tipo Raspberry Pi), poi vengono proiettati via texture warp.
- Layout (geometria) e parametri sono salvati in `localStorage`, quindi **per-macchina**. File video/immagine caricati non vengono salvati e vanno ricaricati dopo un refresh.

## Roadmap possibile (non incluso in questa versione)

- Maschere non rettangolari (poligoni liberi) oltre ai quadrilateri.
- Controllo di rete (OSC/WebSocket) per sincronizzare/comandare a distanza più macchine da una regia centrale.
- Uscita DMX/Art-Net per pilotare fixture di illuminazione reali oltre ai proiettori.
