# CSS variables

Sotto un esempio di uso di variabili CSS sia per i colori che per la responsività della pagina

```css
/*Variable declarations nell'elemento root (scope della variabile) che ha una specificità > del tag 'html' */

:root {
    --red: #ff6f69;
    --beige: #ffeead;
    --yellow: #ffcc5c;
    --main: var(--red); /* NB: è possibile referenziare variabili ad altre ma se --red sotto nel CSS cambia non viene --main !!!! */
    --funky-shadow: 3px 3px 10px brown; /* la variabile è una intera espressione */
    --special-padding: 1.5em;
}

.grid {
    --columns: 200px 200px;
}

/* Styles */
html, body {
    background: var(--beige); 
    color: var(--red);
}
/* 
    NB: sopra nel 'body' si era già specificato il colore pertanto la dichiarazione sotto potrebbe essere inutile
    ma se si vuole cambiare tramite override dentro qualche figlio di h1, p si deve necessariamente 'referenziare'
    come sotto:
*/
h1, p {
    color: var(--red);
    padding-bottom: calc(var(--special-padding) + 1em); /* si possono usare variabili con calc */
}

#navbar a {
    color: var(--red);  /* qua si fa l'override della variabile locale */
    box-shadow: var(--funky-shadow);
}

.grid {
    display: grid;
    grid-template-columns: var(--columns);  /* qua si usano per la resposività  */
    grid-auto-rows: 140px;
    grid-gap: 20px;
    justify-content: center;
}

.item {
    background: var(--yellow);
}

button {
    background: var(--red);
    color: var(--yellow);
}

@media all and (max-width: 450px) {
    .grid {
       --columns: 200px;   
    }
    :root {
        --beige: #fffead;
    }
}
```

## Esempio di responsività con CSS Variables

```html
   <body>
        <header>
            <nav id="navbar">
                <ul>
                    <li><a href="#">home</a></li>
                    <li><a href="#">about</a></li>
                    <li><a href="#">contact</a></li>
                </ul>
            </nav>
        </header>
        <main>
            <h1>my awesome portfolio</h1>
                <div class="grid">
                    <div class="item">
                        <h1>project a</h1>
                        <button>learn more</button>
                    </div>
                    <div class="item">
                        <h1>project b</h1>
                        <button>learn more</button>
                    </div>
                    <div class="item">
                        <h1>project c</h1>
                        <button>learn more</button>
                    </div>
                    <div class="item">
                        <h1>project d</h1>
                        <button>learn more</button>
                    </div>
            </div>
        </main>
    </body>
```

```css
:root {
    --base-font-size: 30px;
    --columns: 200px 200px;
    --base-margin: 30px;
}
/* Styles */
#navbar {
    margin: var(--base-margin) 0;
}
#navbar a {
    font-size: var(--base-font-size);
}
h1 {
    font-size: var(--base-font-size);
}
.grid {
    margin: var(--base-margin) 0;
    grid-template-columns: var(--columns);
}

@media all and (max-width: 450px) {
    :root {
        --columns: 200px;
        --base-margin: 15px;
        --base-font-size: 20px;
    }
}
```

## Modificare le variabili CSS con Javascript

```javascript

var root = document.querySelector(':root');
var rootStyles = getComputedStyle(root);

// GET
var red = rootStyles.getPropertyValue('--red');
console.log('red: ', red);

// SET
root.style.setProperty('--red', 'green')
```

# UI Design Fundamentals

## White space
Si intende lo spazio vuoto tra gli elementi dell'interfaccia detto anche negative space.
```css
.secondary {
    padding: 1.9em;
}

.secondary h1 {
    margin-bottom: .5em;
}
.secondary p {
    line-height: 1.3em;
}
```
## Alignment
E' il processo che assicura che gli elementi siano posizionati (allineati) correttamente in relazione agli altri vicini.
Si interviene geralmente modificando `margin` (spazio esterno all'elemento), `padding` (spazio interno), e `text-align`.
```css
/* per controllare l'allignment mettere a 0 il 4° parametro*/
.example {
    border-left: 1px solid rgba(255,255,255,1);
}
```
# Contrast
Ci stanno plugin per il contrast checking tools

# Scale
La dimensione degli elementi dell'UI deve essere studiato con attenzione così come la visual hierarchy- > spesso provare ad aumentare il font degli header

# Typography 
Una buona tipografia richiede la compensione degli altri fondamentali e altre considerazioni speciali per la tipografia quali
- Scelta e numero dei font e loro dimensione
- `Visual Hierarchy` (si deve capire quale elemento deve avere > importanza)
- Alignment
- Letter spacing e line height
- stile del font (weight,italics, etc)
- colore e contrasto

# Color
E' forse il fondamentale dell'UI design più importante che dà forma una pagina web . C'è tanta letteratura legata alla `Color psicology`. La prima regola è non avere troppi colori (così come per la tipografia non avere troppi tipi di font, al max 2/3).


# Visual Hierarchy
Ogni elemento all'interno di una user interface ha un livello di importanza, ma alcuni elementi hanno più importanza di altri. la Visual Hierarchy è ciò che definisce tale importanza.


