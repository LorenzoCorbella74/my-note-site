# UI Design Fundamentals

## White Space
Con il termine white space (o Negative space) si intende lo spazio vuoto tra gli elementi in the UI.
Generalmente è opportuno aumentare lo spazio dentro i container, aumentare la distanza tra headers e paragrafi e lo spazio tra i paragrafi.
```css
.container{
    padding: 1.5em;  
}
.header{
    margin-bottom:.5em;
}
p{
    line-height:1.5em
}
```
Come regola generale gli elementi all'interno del container ___devono presentare uguale spazio in tutti i lati___.

## Alignment
Con "Allineamento" si intende il processo di assicurare che ogni elemento è posizionato correttamente in relazione agli altri elementi.
E' opportuno che vari elementi che stanno in linee e colonne stiano tutti allineati verticalmente alla rispettiva colonna.  

## Color
Il primo elemento che dà forma all'esperienza dell'utente è il colore. Ogni colore ha il suo significato ed il suo contesto. Troppi colori possono essere dannosi, come colori non associabili. Una buona strategia  èscegliere un colore e prendere un suo derivato (+ chiaro o + scuro)

## Contrast
Ogni elemento nell'UI deve avere un certo livello di contrasto rispetto allo sfondo o agli altri elementi (definiti in base al WCAG 2.0 Contrast Guidelines). Ci stanno website, browser plugins, etc che permettono di avere la giusta qualità di contrasto tra i vari elementi (> 4.5)

## Scale
Come per l'allineamento, spazio bianco, contrasto e altri fondamentali la dimensione di ogni elemento dell'UI deve essere opportunamente considerata. Righe diverse devono avere una dimensione diversa a seconda dell'importanza nella gerarchia di importanza. 

## Typography
Una buona tipografia richiede la comprensione degli altri fondamentali insieme ad altre considerazioni speciali:
- scelta del font (di solito si sceglie 2 tipi di font)
- gerarchia visuale: ogni elemento ha un livello di importanza e qualcuno è + importante di altri. Si utilizzano i fondamentali indicati in precedenza.
- dimensione del carattere (scale)
- allineamento
- Letter spacing & line height
- stile del font (weight, italics, etc)
- colore e contrasto

# [web-design-in-4-minutes](https://jgthms.com/web-design-in-4-minutes/)

```css
/* 1° regola è centrare il contenuto */
body {
  margin: 0 auto;
  max-width: 50em;
}

/* 

2° regola è mettere un font (sans-serif) + piacevole
o prendere un font custom 

*/
body {
  font-family: "Helvetica", "Arial", sans-serif;
}

@import 'https://fonts.googleapis.com/css?family=Roboto:300,400,500';

body {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
}

/* 3° regola è dare la giusta spaziatura */
body {
  line-height: 1.5;
  padding: 4em 1em;
}

h2 {
  margin-top: 1em;
  padding-top: 1em;
}

/* 4° regola è dare un contrasto più confortevole */
body {
  color: #555;
}
h1,
h2,
strong {
  color: #333;
}

/* 
    6° regola è definire un colore primario ed un colore secondario per essere usato per bordi, sfondi e anche il corpo del testo
*/
a {
  color: #e81c4f;
}

body {
  color: #566b78;
}

code,
pre {
  background: #f5f7f9;
  border-bottom: 1px solid #d8dee9;
  color: #a7adba;
}

pre {
  border-left: 2px solid #69c;
}


```




## Links
- [corso](www.scrimba.com/learn/design)
