# CSS GRID
Permette di costruire facilmente dei layout bidimensionali di pagina con un markup ridotto (senza classi .row o .col- tipo bootstrap) e alta [compatibilità](https://caniuse.com/#feat=css-grid). Le griglie sono constituite da due elementi, il `grid container` e gli `item dentro il container`. 

```html
<div class="container">
    <div class="header">HEADER</div>
    <div class="menu">MENU</div>
    <div class="content">CONTENT</div>
    <div class="footer">FOOTER</div>
</div>
```
```css
/* Esempio a 12 colonne con media query*/
.container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 40px 100px 40px;
}

.header {   grid-column: span 12;}  /* span sta per 'ESPANDE PER' */
.menu {     grid-column: span 4; }
.content {  grid-column: span 8; }
.footer {   grid-column: span 12;}

@media screen and (max-width: 480px) {
    .header { grid-column: span 6;}
    .menu {
        grid-row: 1;
        grid-column: span 6;
    }
    .content { grid-column: span 12;}
}
```
## grid-template
Il container di default ha 1 colonna ma tramite `grid-template-columns` si può speciicare il numero e la larghezza delle colonne e con `grid-template-rows` si specifica il numero e relativa l'altezza di ogni riga. Specificando delle larghezze o altezze ad auto si rende tali parti responsive:

```css
.container {
    display: grid;
    grid-template-columns: 100px auto 100px;
    grid-template-rows: 50px 50px ;
}
```

Per poter rendere tutte le colonne responsive ma definendo delle proporzioni tra esse, si usa la nuova unità di misura delle griglie, la `fraction unit` o `fr`.
```css
.container {
    display: grid;
    grid-template-columns:1fr 2fr 1fr;
    grid-template-rows: 50px 50px ;
    /*
        Oppure lo shorthand:
        grid-template: repeat(2, 50px) / repeat(3, 1fr); prima righe / colonne
    */
    grid-gap:3px;
}
```
Se le frazioni sono tutte uguali si può usare `grid-template-columns: repeat(3, 1fr);` dove il 1° parametro è il numero di righe/colonne ed il secondo il valore larghezza/altezza.

# Posizionare gli item dentro la griglia
E' possibile definire dove inizia e dove finisce ogni elemento impostando le proprietà `grid-column-start` e `grid-column-end` relative alle linee delle colonne. Così l'elemento con grid-column-start:1; grid-column-end:3; si ***espanderà*** dalla 1° alla 3° colonna. Da notare che questo modifica anche ciò che è stato impostato con la proprietà `grid-template`.

```css
.container {
    display: grid;
    grid-gap: 3px;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 40px 200px 40px;
}

.header {
    grid-column-start:2;
    grid-column-end:3;
    /*
        oppure gli shorthand:
        - grid-column: 2 / 3;
        - grid-column: 1 / span 2; cioè dala 1° riga e si ESPANDE per due colonne
        - grid-column: 2 / -1; cioè dala 1° si allarga fino all'ultima (utilissimo se non si sa quant item avremo...)
    */
}
.menu { grid-row: 1 / 4; }
.content { grid-column: 2 / -1;}
.footer { grid-column: 2 / -1;}
```

Si possono utilizzare anche le così dette "Named lines" ossia delle stringhe con prefissi `-start` e `-end` che permettono poi di essere referenziati negli elementi:
```css
.container {
    height: 100%; 
    display: grid;
    grid-gap: 3px;
    grid-template-columns: [main-start] 1fr [content-start] 5fr [content-end main-end];
    grid-template-rows: [main-start] 40px [content-start] auto [content-end] 40px [main-end]; 
}
.header { grid-column: main;}
.menu {}
.content { grid-column: content;}
.footer { grid-column: main;}
```

# Template Areas
Tramite la proprietà `grid-template-areas` abbiamo una rappresentazione visuale della griglia che permette di produrre
molto velocemente dei prototipi di layout.
```css
.container {
    height: 100%;
    display: grid;
    grid-gap: 3px;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 40px auto 40px;
    grid-template-areas: 
        "h h h h h h h h h h h h" /* qua diamo un nome ad ogni colonna per ogni riga */ 
        "m c c c c c c c c c c c" /* con il ' . ' abbiamo una cella del layout VUOTA */ 
        "f f f f f f f f f f f f" 
}

.header { grid-area: h;} /* qua ci referenziamo al nome dato in precedenza */    
.menu { grid-area: m;}
.content {grid-area: c;}
.footer { grid-area: f;}
```

## auto-fit and minmax
Per poter mettere un numero di colonne in base alla larghezza del contenitore si può usare 1ft per rendere le colonne responsive ma se si imposta un valore fisso usando il valore auto-fit (cioè calcola il maggior numero di colonne possibile) si può mettere gli elementi in + righe in base alla larghezza del contenitore, utile per i dispositivi mobile) . Ad esempio le colonne, riempiranno l'intera graiglia indipendentemente  dal contenitore e saranno al minimo 100px ma se c'è spazio verranno ugualmente distribuite sulle colonne

```css
.container {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1ft)); /* minimo 100px e il massimo 1ft */
    grid-auto-rows:100px;   /* quando si restringe avremo un numero di righe che viene impostato automaticamente ed implicitamente creato*/
}
```

# Justify-content & align-content
Utilizzando `justify-content` si sposta orizzontalmente gli elementi (non responsive, ma di larghezza definita) all'interno della griglia (riprende quanto fatto in una sola direzione da flexbox, anche se poco utilizzabile):

```css
.container {
    border: 1px solid black;
    height: 100%;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(2, 100px);
    justify-content: end; /* start è il default, center, space-between, space-evenly space-around, end */
    align-content: end; 
}
```

## Justify-item& align-item
Le proprietà del container `justify-items` e `align-items` di default sono `strech` ma possono essere impostate anch'essi a `start`, `center`, `space-between`, `space-evenly` `space-around`, `end`. così come le proprietà del grid item `justify-self` e `align-self` (anche se di fatto poco utilizzabili in pratica).

## CSS GRID & FLEXBOX
Flexbox è costruito su un layout a una dimensione menttre CSS Grid permette di costruire dei layout in due dimensioni. Quindi se si deve costruire un layout che ha una direzione è opportuno usare flexbox altrimenti è meglio utilizzare la potenza dei CSS Grid. Flexbox è content based mentre Grid è layout based.

```html
<body>
    <div class="grid-page">
        <div class="header">
            <div>HOME</div>
            <div>SEARCH</div>
            <div>LOGOUT</div>
        </div>
        <div class="menu">MENU</div>
        <div class="content">CONTENT</div>
        <div class="footer">FOOTER</div>
    </div>
</body>
```
```css
.grid-page {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 40px 200px 40px;
}
.header {
    grid-column: 1 / -1;
    display: flex;
}
.header > div:nth-child(3) {
    margin-left: auto;
}
.menu { grid-column: 1 / 2;}
.content { grid-column: 2 / -1;}
.footer { grid-column: 1 / -1;}
```

### Esempio
E' possibile spezzettare un elemento in + colonne e gestirlo come grid ad esempio di 3 colonne:

```css
.some-elem {
    display: grid;
    grid-template-columns: 80px 1fr 80px;
    grid-column-gap: 10px;
}

/* si mette tutto dentro la colonna centrale */
.some-elem > * {
    grid-column: 2;
    min-width: 0;
}

.some-elem > figure {
    grid-column: 1 / -1;
    margin: 20px 0;
}

/* si mette degli elementi nella colonna di dx */
.some-elem > .aside {
    grid-column: 3;
    color: #666;
    font-size: 0.8em;
}
```

# Sources:
[Scrimbla - Learn CSS Grid for free](https://scrimba.com/g/gR8PTE)



