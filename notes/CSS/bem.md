# BEM
Se non si segue una convenzione il codice CSS  può diventare velocemente un caos. BEM è una metodologia (o style guide o naming convenction) self explanatory e semplice che permette di identificare i `Blocchi` come un gruppo indipendente di `Elementi` UI e gli eventuali `modificatori` (che identificano delle variazioni alla versione standard) di tali elementi o blocchi dando ordine, struttura e una maggiore manutenibilità al codice CSS. 

Tali entità vengono tradotte in classi aventi la sintassi `block__element--modifier`:

```html
<div class="card card--light">
    <div class="card__header">
        <div class="card__header_imgbox">
            <img class="" src="./test.png">
            <span>Nature is good </span>
        </div>
        <div class="card__header_title">
            Titolo
        </div>
    </div>
    <div class="card__body">
        lorem sdasdad ipsum lorem sdasdad ipsum 
    </div>
    <div class="card__footer">
        <button class="card__btn">
            save 
        </button>
        <button class="card__btn card__btn--accent">
            save 
        </button>
    </div>

</div>
```

Considerare:
- i modificatori sono aggiunti all'elemento come classi extra (cioè su un certo elemento ci deve essere sia `card__btn` che `card__btn--accent`)
- una volta che si seleziona un elemento si riesce subito a risalire al blocco che lo contiene
- in bem ogni elemento dovrebbe avere una classe assegnata ad esso, evitando di avere degli elementi con una specificità bassa.
- da notare che in caso di elementi generici, com epossono essere i btn, può essere opportuno definire dei blocchi generici e relative classi per collocazioni specifiche:
```css
/* è un gruppo generico */
.button{
    padding:10px, 35px;
    font-size:1rem;
    border:1px, solid #333;
    border-radius:50%;
}
.card__button{
    margin:10px 0 0 32px;
}
.card__button--primary{
    background: #fff;
}
```


# BEM con SASS
Tramite Sass è possibile strutturare il codice avvantaggiandosi dell'operatore `&`:

```css
.card__header__title{
    content:'please...'
}
```
```scss
.card{
    ...
    &__header {
        ...
        &__title{
            content:'please...';
            padding: 10px, 0;
        }
    }
}
```