# FLEXBOX
Con [flexbox](https://caniuse.com/#feat=flexbox) ci sta sempre un 'contenitore' che prende tutto lo spazio (come block element) e degli 'elementi contenuti' che se figli diretti diventano automaticamente dei flex item. Di default il contenitore disporrà gli elementi secondo l'asse orizzontale principale (mentre l'asse cross è quello verticale) e l'altezza del contenitore sarà pari alla altezza massima dei figli in base ognuno al proprio contenuto.

```html
<body>
    <nav class="container">
        <div class="home">Home</div>
        <div class="search">Search</div>
        <div class="logout">Logout</div>
    </nav>
</body>
```
```css
.container {
  border: 5px solid #ffcc5c;
  display: flex;
  flex-direction: row; /* row è il default,  column */
}
```
Se i figli hanno una larghezza definita occuperanno tale larghezza altrimenti possono essere espansi per occupare lo spazio del contenitore ed in base alla sua altezza i figli avranno automaticamente l'altezza del padre a meno che non ne abbiano una loro definita.

## Giustificare il contenuto degli item sull'asse orizzontale
Per posizionare tutti i flex item  secondo l'asse principale (quindi se ci stanno 3 figli si posizioneranno tutti e tre i figli) si usa la proprietà `justify-content` sul flex container:
```css
.container {
  border: 5px solid #ffcc5c;
  display: flex;
  justify-content: flex-start; /* flex-start (default), flex-end center space-around, space-between space-evenly */
}
```

Per posizionare un singolo flex item si deve necessariamente utilizzare i margini:
```css
.container {
  border: 5px solid #ffcc5c;
  display: flex;
}
.logout {
  margin-left: auto; /* si sposta a dx !!!!*/
}
```
Nel caso si usi la direzione verticale con `flex-direction:column;` il `justify-content` permette di posizionare gli elementi su tale asse, anche se è opportuno impostare l'altezza del contenitore per poter vedere l'effetto. Stessa cosa per `align-items`
```css
.container {
  border: 5px solid #ffcc5c;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  align-items: center;
}
```

## Posizionare il contenuto degli item sull'asse verticale
Di default tutti i figli crescono lungo l'asse verticale. Questo funziona quando si imposta l'altezza sia di html che del body ( in modo da avere il container responsive sull'altezza). Per posizionali sull'asse verticale si usa la proprietà `align-items` sul flex container (stretch come default)
```css

html, body {
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  background-color: #ffeead;
}
.container {
  border: 5px solid #ffcc5c;
  display: flex;
  height: 100%;
  align-items: stretch; /* flex-start (default), flex-end center */
}
```

Per posizionare un singolo flex-item si usa su tale elemento:
```css
.container {
  border: 5px solid #ffcc5c;
  display: flex;
  height: 100%;
  align-items: center;
}

.logout {
  align-self: flex-start;
}
```

# flex

La proprietà `flex` permette di impostare la width dell'item in base alla width del contenitore, quindi di diventare responsive (grow & shrink, crescere e restringersi in base alla larghezza del contenitore). E' come se calcolasse width:33,333% nel caso di 3 item o calcolasse tutto in base al numero di figli.
E' uno shorthand di `flex-grow`, `flex-shrink`, `flex-basis` in quanto `flex:1` equivale a `flex: 1 1 0`; ossia `flex-grow:1; flex-shrink:1; flex-basis:0;`. Queste tre proprietà permettono di settare:
- `flex-grow: 0` (default) definisce quanto dello spazio extra del contenitore deve essere distribuito ad ogni item e la velocità a cui questo avviene la crescita
- `flex-shrink: 1` (default)definisce quanto dello spazio extra del contenitore deve essere distribuito ad ogni item e la velocità a cui questo avviene il restringimento
- `flex-basis:200px;` permette di settare la width base dell'elemento. Se il contenitore non ha spazio a sufficienza l'elemento viene ristretto


```css
.container {
  border: 5px solid #ffcc5c;
  display: flex;
}

/* si può rimuovere se si vuole espandere solo .search mentre gli altri rimangono fissi*/
.container > div {
  flex: 1;
}

/* nel caso si voglia uno + lungo degli altri, da notare che 
funziona solo se metto .container > .search e non con .search */
.container > .search {
  flex: 2;
}
```

# wrapper
E' possibile "avvolgere" (wrap) elementi in flexbox. Se ho tre elementi dentro un flex-container inizialmente questi hanno una dimensione in base al proprio contenuto.
Flexbox permette di restringere automaticamente questi elementi non permettendo di settare la larghezza esplicitamente se non c'è abbastanza width nel contenitore e non spingendo gli elementi sulla riga successiva questo perchè flexbox ha come default la proprietà `flex-wrap: nowrap` (quindi si avrà sempre una sola riga o una sola colonna lunga l'asse principale). Nel caso si importi `flex-wrap: wrap;` si avrà che il contenuto può andare sulle righe successive. ossia avere una multiline flex
```css
.container {
  border: 5px solid #ffcc5c;
  display: flex;
  flex-wrap: wrap;
}

.container > div {
  width: 300px;
}
```

## order 
E' possibile impostare l'ordine dei figli indipendentemente dall'ordine nel markup HTML tramite la proprietà sui figli `order: 0`. Di default è 0 mentre se 1 lo porta in fondo a dx e se -1 lo sposta a sx
```html
<body>
    <div class="container">
        <div class="item1">1 Home</div>
        <div class="item2">2 Search</div>
        <div class="item3">3 Logout</div>
    </div>
</body>
```
```css
.container {
  border: 5px solid #ffcc5c;
  display: flex;
}

.item1 {
  order: 1;
}

.item2 {
  order: 0;
}

.item3 {
  order: -1;
}
```

## Esempio: navbar responsive
```html
<body>
        <nav>
            <ul class="container">
                <li>Home</li>
                <li>Profile</li>
                <li class="search">
                    <input type="text" class="search-input" placeholder="Search">
                </li>
                <li>Logout</li>
            </ul>
        </nav>
    </body>
```
```css
.container {
  border: 5px solid #ffcc5c;
  display: flex;
}

.search {
  flex: 1;
}

@media all and (max-width: 600px) {
  .container {
    flex-wrap: wrap;
  }
  .container > li {
    flex: 1 1 50%;
  }
  .search > input {
    text-align: center;
  }
}

@media all and (max-width: 400px) {
  .container > li {
    flex: 1 1 100%;
  }
  .search {
    order: 1; /* si mette in fondo */
  }
}
```

## Esempio: image responsive grid
```css
.container {
    display: flex;
    flex-wrap: wrap;
}

.container > div > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.container > .normal {
    flex: 1 1 150px;
}

.container > .big {
    flex: 1 1 250px;
}
```

## Responsive grid with flexbox
[How to Create a Flexbox Grid](https://tania.dev/easiest-flex-grid-ever/)

# Sources:
[Scrimbla - Learn Flexbox for free](https://scrimba.com/g/gflexbox)
