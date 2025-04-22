#software

# [Obsidian](https://obsidian.md/)
E' un software per prendere note che permette di collegare le note tra loro tramite dei birectional links, Questo permette di avere una più profonda connessione tra gli argomenti che supera la semplice organizzazione dei file in cartelle e sottocartelle per categorizzare le note.

Per puro uso personale è gratis, per uso commerciale è a pagamento (50$/yr). Gli addon Sync (4$/mese permette di sincronizzare files tra + dispositivi tramite l'account obsidyan) e Publish ($8/mese per i siti di note).

Il `vault` è una cartelle "base" dove vengono salvate tutte le note di Obsidian e le sottocartelle.
Le cartelle possono raggruppare degli insiemi di note, ad esempio per progetti, argomenti, etc.
Tramite lo shortcut `CTRL + O` è possibile cercare le note per titolo anche dentro le cartelle.
  
All'interno di ogni singola nota è possibile inserire:
- collegamenti (o backlink) con `[[nome della nota]]` e cliccando su di essi si apre la nota.
- tag con `#tag` e cliccando su di essi si apre la nota. Nella sezione DX  c'è la lista di tutti i tag presenti nel vault.
- link esterni con `![](link)`
- link interni con `![[nome della nota]]`
- immagini con tag html `<img src="link" width="500">`
- video youtube andando sul sito del video > condiividi > incorpora > copiare il link e incollarlo in obsidian come codice iframe
  
## Canvas
E' possibile creare delle lavagne virtuali per disegnare schemi, mappe concettuali, etc. Gli elementi disegnabili sono box di testo, collegamenti (frecce mono o bidirezionali), previuw di note, immagini (locali trascinate con drag & drop), sito web, gruppi (cornici che raggruppano elementi), etc.
E' possibile esportare il canvas in formato immagine o pdf.

## Grafo
E' possibile avere un grafo dei collegamenti tra le note dove è possibile colorare i nodi in base ai tag, ai collegamenti ai gruppi, etc. E' possibile anche filtrare i nodi per tag, per gruppi, etc. Da notare che esiste anche il timelapse che anima i nodi in base ai collegamenti che si sono creati nel tempo.

## Plugin
Sono funzioni extra che si dividono in:
- principali: sono quelli che vengono installati di default con obsidian
- terze parti: sono quelli sviluppati dalla community. Un esempio è il plugin Kanban che permette di creare dei task su una kanban boards (anche se sono sempre markdown). Quando vengono installati le icone vengono messe sulla SX e si possono configurare tramite le configurazioni

Per degli esempi di plugin, come il caledario per avere un Journal quotidiano/settimanale guardare il [video](https://www.youtube.com/watch?v=Byy-QNgtHIg&ab_channel=FromSergio) e [video2](https://www.youtube.com/watch?v=cBm95iCcX2E&ab_channel=FromSergio) oppure leggere l'articolo [migliori plugin del 2024](https://thesweetsetup.com/a-roundup-of-the-best-obsidian-plugin-in-2024/) e [articolo2](https://dev.to/rubiin/top-obsidian-plugins-to-supercharge-your-note-taking-experience-4p8e)

## Shortcuts
- `CTRL + ,` apri Impostazioni (per lo shortcut vedere cosa impostato nei settings)
## Template
L'idea è di avere dei modelli o templates, che non sono altro che note, che possono essere riutilizzati . Come funzionano:
- Abilitare il template plugin e specificare la cartella dove risidono i templates 
-  Premere `CTRL + P` e scrivere `Templates` e scegliere `Insert template`

All'interno del template si posssono mettere
```
 # titolo
 {Date of publich} // da riempire
 {{Date}}          // questo viene automaticamente riempito
 {tags}
 {Related}
 
 corpo della nota...
```

## Properties
E' possibile aggiungere dei metadati alle note, che stanno proprio sotto il titolo, premendo la combinazione presente nei settings. Toccando il nome si può impostare il tipo di propretà (Testo, LIsta, Number, checkbox, Date, Date & Time, etc). In `Settings\Editor\Properties in document` è possibile impostare la visibilità delle proprietà. E' possibile ricercare per proprietà immettendo nel campo di ricerca `[nome-prop]`

