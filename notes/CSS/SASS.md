# SASS

## Table of content:

1. [Composing](#composing)
2. [Variabili e Interpolazione](#variabili)
3. [Nesting](#nesting)
4. [Operazioni](#operazioni)
5. [Funzioni](#funzioni)
6. [Placeholder](#placeholder)
7. [Mixins](#mixins)
8. [Oggetti](#oggetti)
9. [Loops](#loops)
10. [Esempi](#esempi)



## Composing
E' possibile importare file aventi estenzione `.scss` trmite la direttiva `@import`. Tali file esterni detti `partials` devono iniziare con `_` ossia `_nomefile.scss` in modo da esplicitare che devono essere importati senza essere compilati in css.
```scss
@import 'partials/_vars'; // l'estenzione scss o sass è optionale

body {
  color: $color;
}

/* content of partials/_vars.scss */
$color: #333;
```
E' buona regola importare tutti i partials all'interno del file principale per poi aver accesso al contenuto di tali file in tutti i file.

## Variabili
E'possibile creare delle `variabili`, utilizzando `$` come prefisso che vengono usate nelle valorizzazioni delle proprietà CSS e delle `interpolazioni` con il prefisso `#{ }` che sono usate nei nomi delle proprietà.

```scss
// variabile
$my-color: #46EAC2;

a {
  color: $my-color;
}

// interpolazione
$wk: -webkit-;
.rounded-box {
  #{$wk}border-radius: 4px;
}

```
Da notare che le variabili in CSS sono in scope all'elemento su cui sono dichiarate e sono manipolabili tramite javascript e sono generalmente più [potenti](https://codyhouse.co/blog/post/css-custom-properties-vs-sass-variables) delle variabili di scss in quanto il loro valore può essere sovrascritto a breakpoints specifici.

## Nesting
E' possibile evitare delle ripetizioni innestando selettori figli all'interno del selettore padre tramite l'operatore padre `&`. Funziona anche con pseudoclassi.
```scss
ul {
  list-style-type: none;
  li {
    display: inline-block;
    margin: 0;
    padding: 0 5px;
    a {
        text-decoration: none;
        &:hover { text-decoration: underline; }
    }
  }
}
```
Tale funzionalità permette di aderire alla convenzione di nomenclatura delle classi [BEM](https://medium.com/@andrew_barnes/bem-and-sass-a-perfect-match-5e48d9bc3894)

## Operazioni 
E' possibile usare [operazioni matematiche](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html) all'interno del valore delle proprietà.

## Funzioni
E' possibile usare `funzioni` che accettano argomenti e ritornano tramite la direttiva `@return` una valorizzazione "calcolata" di una proprietà:
```scss
@function set-text-color($color) {
  @if (lightness($color) > 40%) {
    @return #000;
  } @else {
    @return #fff;
  }
}
```
Sass ha molte funzioni utili per lavorare con colori, stringhe, numeri e verificare la presenza di `mixin`, `funzioni` , `variabili` , etc. Per una lista completa vedere il seguente [cheatsheet](https://www.cheatography.com/mist-graphx/cheat-sheets/sass-script/).

### Funzioni di colori
```scss
// RGBA
rgb(100, 120, 140)
rgba(100, 120, 140, .5)
rgba($color, .5)

// MIX
mix($a, $b, 10%)   // 10% a, 90% b

// HSLA
hue($color)         // → 0deg..360deg
saturation($color)  // → 0%..100%
lightness($color)   // → 0%..100%
alpha($color)       // → 0..1 (aka opacity())

// MODIFICA HSLA
darken($color, 5%)
lighten($color, 5%)
saturate($color, 5%)
desaturate($color, 5%)
grayscale($color)
adjust-hue($color, 15deg)
complement($color)    // like adjust-hue(_, 180deg)
invert($color)
fade-in($color, .5)   // aka opacify()
fade-out($color, .5)  // aka transparentize() - halves the opacity
rgba($color, .5)      // sets alpha to .5

// RBA
red($color)         // → 0..255
green($color)
blue($color)

// Adjustments
// Changes by fixed amounts
adjust-color($color, $blue: 5)
adjust-color($color, $lightness: -30%)   // like darken(_, 30%)
adjust-color($color, $alpha: -0.4)       // like fade-out(_, .4)
adjust-color($color, $hue: 30deg)        // like adjust-hue(_, 15deg)
// Changes via percentage
scale-color($color, $lightness: 50%)
// Changes one property completely
change-color($color, $hue: 180deg)
change-color($color, $blue: 250)

```

### Altre funzioni

```scss

// stringhe
to-upper-case(hello)
to-lower-case(hello)
str-length(hello world)
str-slice(hello, 2, 5)      // "ello" - it's 1-based, not 0-based
str-insert("abcd", "X", 1)  // "Xabcd"

// UNITS
unit(3em)        // 'em'
unitless(100px)  // false

// MISC
variable-exists(red)    // checks for $red
mixin-exists(red-text)  // checks for @mixin red-text
function-exists(redify)
global-variable-exists(red)
selector-append('.menu', 'li', 'a')   // .menu li a
selector-nest('.menu', '&:hover li')  // .menu:hover li
selector-extend(...)
selector-parse(...)
selector-replace(...)
selector-unify(...)

// NUMBERS
floor(3.5)
ceil(3.5)
round(3.5)
abs(3.5)
min(1, 2, 3)
max(1, 2, 3)
percentage(.5)   // 50%
random(3)        // 0..3

```

## Placeholder
Generalmente la convenzione prevede che si utilizzino mixin per stile "dinamico" mentre per blocchi di stile "statico" si usano i `placeholder` che vengono definiti con il prefissso `%` e sono importati tramite la direttiva `@extend`. Tale funzionalità permette di creare l'__ereditarietà__ tra un selettore di partenza e selettori di destinazione. Da notare che tali classi non appaiono nel css compilato se non vengono utilizzati in quanto esistono esclusivamente per lo scopo di essere estese. E' possibile quindi utilizzare una classe di stili preesistente da estendere o una classe non esistente (placeholder).

```scss
// Placeholder for static values
%message {
    padding: 1em;
    margin: .5em;
    border-radius: .15em;
    border: 1px solid;
}

// Mixin for dynamic values, Extending the placeholder
@mixin message($color) {
  @extend %message;
  color: $color;
  background: lighten($color, 38%);
  border-color: lighten($color, 20%);
}
 
```
Da notare che la direttiva `@extend` permette di __non duplicare__ le proprietà css:
```scss
.error { border: 1px #F00; background: #FDD; }

.badError {
  @extend .error;
  border-width: 3px;
}

// genera il seguente codice css
.error, .badError { border: 1px #F00; background: #FDD; }

.badError {
  border-width: 3px;
}
```

## Mixins
Permettono di riutilizzare dei blocchi di stili tramite la direttiva `@mixin` per poi essere inclusi in un altro selettore tramite la direttiva `@include`. Possono essere di vari tipi:

```scss
// senza parametri
@mixin heading-font {
  font-family: sans-serif;
  font-weight: bold;
}
h1 {
  @include heading-font;    // senza parentesi
}

// con parametri
@mixin pad($n: 10px) {  // valore di default (può essere anche una variabile)
  padding: $n;
}
body {
  @include pad(15px);
}

```
Tramite la direttiva `@content` è possibile passare al mixin una funzione callback (come il transclude di Angular) che permette di copiare stile dinamico.

```scss
@mixin media-xl {
  @media screen and (min-width: 1600px) {
    @content;
  }
}

// dentro uno specifico selettore si applica:
@include media-lg {
  .projects__bio-image {
    height: 50vh;
  }
```

## Oggetti
E' possibile definire degli oggetti, o [mappe](https://www.sitepoint.com/using-sass-maps/), e recuperare valori di specifiche chiavi tramite la funzione `map-get` o di esistenza `map-has-key`. Da notare che sarebbe opportuno definire delle mappe aventi come chiave ogni elemento che ha una determinata proprietà e gestire quindi tale proprietà in una maniera "centralizzata". Vedere questa pagibna per [esempi avanzati](https://www.sitepoint.com/5-great-uses-sass-maps/).

```scss
$breakpoints: (
  small: 767px,
  medium: 992px,
  large: 1200px
);

// _mixins.scss
@mixin respond-to($breakpoint) { 
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: #{map-get($breakpoints, $breakpoint)}) {
      @content;
    }
  }
  @else {
    @warn "Unfortunately, no value could be retrieved from `#{$breakpoint}`. "
        + "Please make sure it is defined in `$breakpoints` map.";
  }
}
```
Altro esempio con i colori:
```scss
$message-types: (
  error : #b94a48,
  warn  : #c09853,
  valid : #468847,
  info  : #3a87ad
) !default;

// Loop tramite
@each $type, $color in $message-types {
  .message-#{$type} {
    @include message($color);
  }
}

// oppure mappa usata poi in una funzione
$z-layers: (
  bottomless-pit: -9999,
  default: 1,
  dropdown: 3000,
  overlay: 4000
  modal: 4001
);

// _functions.scss
@function z($key) {
  @if map-has-key($z-layers, $key) {
    @return map-get($z-layers, $key);
  }
  @warn "Unknown `#{$key}` in $z-layers.";
  @return null;
}
```

## Loops 
E' possibile ciclare sia con `@for from through` loop che con `@each in` e `@while` loop:
```scss
$start:1;
$end:100;

/* for loop */
@for $i from $start through $end {
    .margin-#{$i} { 
      margin: #{$i}rem;
    }
}

/* each loop */
$menu-items: home about services contact;

@each $item in $menu-items {
  .photo-#{$item} {
    background: url('images/#{$item}.jpg');
  }
}

/* each loop nested */
$backgrounds: (home, 'home.jpg'), (about, 'about.jpg');

@each $id, $image in $backgrounds {
  .photo-#{$id} {
    background: url($image);
  }
}

/* while loops (ESEMPIO con step di 5...) */
$i: 1;
@while $i <100 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i + 5;
}
```


# ESEMPI:

## Responsive grid
Si usa SASS per costuire dei fogli di stile più manutenibili. [SOURCE](https://callmenick.com/dev/maintainable-responsive-web-design-with-sass/) 
```scss

$breakpoints: (
  xs: 32rem,
  sm: 48rem,
  md: 72rem,
  lg: 96rem,
  xl: 102rem,
  xx: 120rem
);

@mixin break($size) {
  @media (min-width: map-get($breakpoints, $size)) {
    @content;
  }
}

.el {
  display: none;
  @include break(sm) {
    display: block;
  }
}

// -> convertito in cSS diventa
.el {
  display: none;
}

@media (min-width: 48rem) {
  .el {
    display: block;
  }
}
```
Pertanto una [responsive grid](https://callmenick.com/dev/maintainable-responsive-web-design-with-sass/) può essere prodotta dal seguente codice scss:
```scss
// number of items variable
$items: 12;

// grid container
.row {
  display: flex;
  flex-flow: row wrap;
}

// loop over the breakpoints
@each $key, $value in $breakpoints {
  @for $i from 1 through $items {
    .col-#{$key}-#{$i} {
      flex: 0 0 100%;
      @include break($key) {
        flex: 0 0 #{$i / $items * 100}%;
      }
    }
  }
}
```
```html
<div class="row">
  <div class="col col-xs-1">
    xs span 1
  </div>
  <div class="col col-xs-2">
    xs span 2
  </div>
  <div class="col col-xs-3">
    xs span 3
  </div>
  <div class="col col-xs-6">
    xs span 6
  </div>
</div>
```

