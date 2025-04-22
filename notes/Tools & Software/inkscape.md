# [Inkscape](https://inkscape.org/it/)
E' un software free per la grafica vettoriale. Tutto ciò che si disegna sono "oggetti" che sono o __forme__ o  __tracciati(path)__. 
Quando si seleziona uno strumento a SX si mostra la sua specifica toolbar. Gli oggetti si sovrappongono secondo l'ordine di creazione, quindi l'ultimo sta sopra. Una volta che abbiamo un comando/strumento attivo si deve premere la barra spaziatrice per uscire da tale commando corrente e mantenere l'ultimo oggetto selezionato, o ESC per uscire senza avere niente selezionato. Nel caso in cui voglia tornare allo strumento precedente ripremere la barra spaziatrice.

## Tools
- [All tools](https://www.youtube.com/watch?v=qq7HsMvEVmU&ab_channel=LogosByNick)

## Strumento Selezione ("S", "F1")
E' possible selezionare oggetti se sono visibili o non bloccati.  Si seleziona: 
- si seleziona un oggetto tramite un click
- selezione  più oggetti tramite `SHIFT + click`
- si clicca e si tiene premeto si trascina il mouse per definire un area di selezione (bounding box)
- `CTRL + A` per selezionarli tutti o `ALT + click` o rotellina se voglio selezionare un oggetto sotto un altro 
-  `ALT + drag del mouse si disegna una linea che permette di selezionare per intersezione lineare di oggetti invece che per area (bounding box)

Una volta selezionato un oggetto si mostrano delle frecce per scalare l'elemento. Se si clicca nuovamente si mostrano altre icone per ruotare/deformare in base ad un punto di pivot che può essere spostato (`shift + click` per riportarlo al centro).
E' possibile infine selezionare gli oggetti dentro una area rettangolare cliccando e trascinando o se si vuole non considerare il 1° oggetto `SHIFT + click` e trascinando.

## Strumenti Rettangolo ed Ellisse
Lo strumento Rettangolo (R) permette di disegnare un rettangolo o un quadrato (se si tiene premuto CTRL) tramite click + trascinamento (dal vertice in alto a SX) premendo SHIFT si parte dal centro. Il manipolatore permette di  arrotondare gli spigoli.
Lo strumento ellisse (E) permette di disegnare un ellisse o un cerchio (se si tiene premuto CTRL) tramite click + trascinamento (dal vertice in alto a SX), o premendo ALT si si segue con il mouse il bordo. IL manipolatore permette di aprire l'ellisse (come un pacman... e se premiamo CTRL si hanno delle modifiche ogni 15°)
Le toolbar di questi strumenti permettono di modificare l'origine e le caratteristiche della forma (larghezza, altezza, angoli, etc..) ed i manipolatori
NB:__La status bar in basso a SX dice cosa sono gli oggetti__ in quanto ci possono essere rettangoli i cui spigoli sono stati stondati!


NB: quando si hanno oggetti dentro gruppi si deve cliccare due volte su un oggetto per selezioarlo
NB: Quando si muove il vertice in basso di un oggetto si modifica la scala ma per mantenere le proporzioni si deve cliccare il lucchetto.
NB: una volta selezionato un oggetto per zoomare a tale oggetto premere "3" ("4" per avere una visione di tutto ciò che è disegnato nel canvas, "5" di tutta la pagina, "1" per avere una visione 1:1)
NB: cliccando due volte sul singolo commando si va nelle impostazioni generali del commando Strumenti\<nome_comando>

## Fill & Stroke - Riempimento e contorni (`SHIFT + CTRL + F`)
Il menu "Fill & Stroke" contiene:
- fill (il riempimento)
- stroke (il bordo)
- stroke style
NB: in basso a sx ci sta stroke e fill e cliccando con il tasto DX si può impostare lo spessore dello stroke o tasto DX sull'opacita per scegliere il livello
NB: quando si clicca un colore si interviene sul fill quando si `clicca un colore + SHIFT` si colora il bordo
NB: nella barra delle palette i colori si possono trascinare a SX per metterli tra quelli + utilizzati o trascinarli sopra gli oggetti per colorarli automaticamente.

## Allinea e distribuisci (`SHIFT + CRTL + A`)
E' possible allineare più forme selezionate a:
- l'oggetto + piccolo o + grande
- il primo o l'ultimo selezionato
- la pagina intera o l'area selezionata

## SNAP (barra agganci)
Per il toggle premere `SHIFT + 5` (%) si aprono le sezioni che sono:
- i punti notevoli delle forme selezionate 
- i nodi
- altri punti (baricentro, punti centrali, etc..)
Da notare che gli elementi possono essere "aggancianti" e "agganciato".

## Livelli (Layer)
Il menu Layer permette di gestire i livelli ed il menu "Layers and Objects" permette di vedere gli oggetti dentro il proprio Livello ed eventualmente di fare il toggle tra nascosto/visibile e/o bloccare/abilitare.
Cliccando sul tasto DX su ogni oggetto è possible inserire l'oggetto in uno specifico Livello tramite il commando __Move to layer__.
NB: anche ogni singolo livello hanno un % di trasparenza

## Tracciati (Path)
Sequenza di nodi uniti da tratti lineari o curvi che possono essere chiusi (per cui è possibile applicare un riempimento fill) o aperti (senza riempimento). I nodi possono essere aggiunti in un solo tratto (terminali) o due tratti al Massimo. Tramite lo strumento "Node Tool (N)" è possible evidenziare i nodi che costituiiscono il tracciato e di aggiungerli/rimuoverli. Nel menu "Path" è possible cliccare la voce "Object to path" (SHIFT + CTRL + C) per convertire qualsiasi forma in un tracciato e con la voce "Stroke to path"(ALT + CTRL + C) è possibile creare un nuovo path dal contorno (stroke) di una forma.
TRamite i comandi intrudi (inset) o estrudi (outset) è possibile creare delle nuove forme da quelle di partenza. Esiste anche la Dynamic e LInked Offset (che è una copia dell'originale). Per accettare le proiezioni si deve a sua volta trasformare da forme a path.

## Operazioni booleane
E' possible applicare le operazioni a forme e tracciati (curve di Bezier) anche se stanno nel menu Tracciati (Path) cioè non c'è bisogno di trasformarle prima in tracciati, anche se il risultato sarà SEMPRE un tracciato. Sono coinvolte sempre DUE oggetti dove l'obj in primo piano esegue l'azione su l'oggetto che sta in secondo piano (che sta sotto e "subisce" l'azione):
Si possono eseguire:
- unione `CTRL +`: unisce l'elemento superiore a quello inferiore
- Differenza `CTRL -`: sottrae l'elemento superiore a quello inferiore
- Intersezione: si ottiene le parti in commune tra le due figure
- esclusione: si ottiene tutto ciò che non è in commune tra i due oggetti
- divisione: l'oggetto superiore divide, con la sua forma  l'oggetto inferiore che diventerà due forme chiuse
- taglio tracciato: taglia la forma sottostante con quella superiore (che viene cancellate) ottenendo un tracciato aperto.

- combina `CTRL K`:simile ad unione ma lascia elementi delle due forme combinate
- separa (se ho ad esempio due tracciati aperti combinati, questo li separa)

NB: l'unione/intersezione permette di unione anche più di due oggetti, ma gli altri comandi danno risultati "imprevedibili".
NB: le operazioni booleane non si applicano se uno degli elementi è un gruppo

## Shortcuts 
Notare che spesso SHIFT inverte dei comandi
- `CTRL + Z`: annulla l'ultima azione UNDO
- `CTRL + SHIFT + Z`: ripristina l'ultima azione annullata REDO
- `CTRL + Y`: ripristina l'ultima azione annullata
- `CTRL + A`: seleziona tutti gli oggetti (del livello selezionato o `ALT + CTRL + A` per selezionare tutti gli oggetti del documento)
- `CTRL + D`: duplica l'oggetto selezionato
- `ALT + D` : clona l'oggetto selezionato (le modifiche all'oggetto sorgente sono mantenute anche agli oggetti clonati)
- `SHIFT + ALT + D`: rimuovere il legame di clonazione
- `CTRL + G`: raggruppa gli oggetti selezionati
- `CTRL + SHIFT + G`: sgruppa gli oggetti selezionati (oppure`CTRL + U`)
- `CTRL + L`: semplificare la forma di un tracciato
- `!`: inverte la selezione
- `h`: ribaltamento orizzontale dell'oggetto selezionato
- `v`: ribaltamento verticale dell'oggetto selezionato
- `CTRL + SHIFT + P`: apre il pannello delle preferenze
- page down/page up: sposta l'oggetto selezionato in basso o in alto nel livello

Per configurare il software andare su __Edit \ Preferences \ Interface__

# Links
- [corso youtube](https://www.youtube.com/@italianinkscapechannel/videos)
- [esempi creazione oggetti youtube](https://www.youtube.com/playlist?list=PLGFq_FmoDG50etpBDNrA_S5fcmGdTCX7O)
- [esempi creazione game art youtube](https://www.youtube.com/playlist?list=PL1DYD9ZF9iLofLIApc_aI78s1PCc7_h1u)
- [esempi creazione game art youtube](https://www.youtube.com/playlist?list=PLEuVieGawK9TE_OGv2XbIc4rsLHmbF_Vm)
- [feature and tools](https://www.youtube.com/playlist?list=PLFaiVIC3VA4wV5xl9Vn6SvJb6S92VgNdX)
- [seamless fill pattern](https://www.youtube.com/watch?v=_Arjrqvrq58&list=PLEuVieGawK9TE_OGv2XbIc4rsLHmbF_Vm&index=4&ab_channel=2dgameartguru)
- [texture pattern](https://www.youtube.com/watch?v=biyhxcgqs5A&ab_channel=2dgameartguru)

## [seamless textures](https://www.youtube.com/watch?v=0cpy__XC6q8&ab_channel=2dgameartguru)
Aprire `Preferences \ Behavior \ Steps` per avere un controllo migliore sullo spostamento degli oggetti tramite `Arrow key move by`.
L'idea è duplicare degli oggetti e metterli alla stessa distanza della dimensione della texture che vogliamo replicare in modo da creare un pattern (duplicare l'oggetto con CTRL + D e poi premere le frecce per metterlo alla distanza desiderata).
Poi: 
- si duplica la texture e si mette on top, 
- si selezionano tutti gli oggetti che dovranno essere messi dentro la texture e si fa `Object \ Clip \ Set Clip` (in ITA Oggetto \ Fissaggio \Imposta )e si ritaglia la selezione in base alla maschera di fissaggio(la texture) in modo che tutti gli oggetti finiscano dentro la texture. Da notare che poi si puà anche rimuovere tale maschera di fissaggio con `Object \ Clip \ Release` (in ITA Oggetto \ Fissaggio \ Rimuovi).


## Brushes
Inkscape non ha una vera e propria brushed feature, ma è possible creare dei pattern e poi usarli come brushes. L'idea è partire da una forma
copiarla e poi utilizzare la modalità `Shape: from clipboard` impostando una opportuno valore di `Smoothing` del Pen tool per creare un pattern.
- [custom brushes](https://www.youtube.com/watch?v=u5B0TSUVYyY&ab_channel=LogosByNick)

E' possibile importare una immagine vettoriale di una texture che poi deve essere trasformata in vettoriale (`Path\Trace bitmap`) e poi usarla come pattern.
- [tex to vector](https://www.youtube.com/watch?v=k-IXIJs6UiY&ab_channel=JeanLambertSalvatori)


## Clip (maschere di fissaggio) 
Per ritagliare un oggetto secondo un altro oggetto si usano le clip o maschere di fissaggio. che lavorano come le operazioni booleane: l'oggetto che sta sopra a tutto esegue l'azione di mascheratura su tutti gli oggetti che stanno sotto.
- [clip e maschere](https://www.youtube.com/watch?v=etnfKJ-w8O4&list=PLpbOyEgMReazyr8mEUCd6IOcc3G3LwXPW&index=16&ab_channel=JeanLambertSalvatori)
Se le clip permettono di ritagliare degli oggetti sottostanti le maschere permettono di rendere visibile la parte bianca dell'oggetto di mascheratura e coprire la parte nera (o trasparente) in base . La modalità di applicazione è la stessa delle clip, ma si usa `Object \ Mask \ Set mask` (in ITA Oggetto \ Maschera \ Imposta).



## [Hidden secrets](https://www.youtube.com/watch?v=Hwilw97pR6k&ab_channel=LogosByNick)
E' possibile:
- allineare __selezioni di nodi__ in modo che siano allineati in verticale o orizzontale (sempre dal menu Allinea e distribuisci)
- nel Node tool, una volta che si selezionano dei nodi è possbile mostrare le icone di trasformazione (ruotare, scalare, etc..) cliccando sul 3° tasto a DX della tool bar, così come si può fare per gli oggetti interi.
- è possibile selezionare elementi aventi lo stesso fill e/o stroke andando sul menu `Edit \Select Same \ Fill and Stroke`
- E' possibile creare un nuovo file da un template andando su `File \ New from template` e scegliendo il template desiderato (e si possono aggiungere anche template custom in formato svg )
- E' possibile avere un Batch export ossia è possibile salvare tutti gli oggetti selezionati in un file separato andando su `File \ Export \ Batch Export` (utile per icone da riprodursi in dimensioni diverse)
- il metodo più veloce per creare un pattern è `Object \ Pattern \ Object to pattern` 
- per convertire un oggetto vettoriale in una immagine raster si può fare `Edit \ Make a Bitmap copy`
- cliccando sui righelli orizzontali e verticali (o agli angoli )si possono creare guide orizzontali e verticali o a 45° che aiutano a disegnare in modo preciso. Cliccando due volte sulle guide è possibile impostare il colore e l'angolo delle guide.


## Tutorials
- [tutorial 1](https://logosbynick.com/tag/inkscape/)
- [HSL adjustments](https://logosbynick.com/hsl-adjustments-inkscape/)
- [apply textures](https://logosbynick.com/apply-vector-textures-in-inkscape/)
- [invert color](https://logosbynick.com/how-to-invert-colors-with-inkscape/)
- [mirron](https://logosbynick.com/mirror-in-inkscape/)