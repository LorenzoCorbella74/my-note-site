# Angular Style

Come funzionano i fogli di stile in Angular?. Come si produce codice css scalabile e manutenibile usando SASS? Come si sviluppano i theme per i componenti? 

Come i Web components permettono di incapsulre e isolare parte del codice CSS all'interno di un singolo componente con lo Shadow DOM, Angular ha invece la possibilità di specificare 3 modalità:
- `None`: lo stile è aggiunto allo stile generale nell'head del documento e applicato a tutti i componenti.Come idea si potrebbe mettere `ViewEncapsulation.None` al root component (`app.component`) in modo da rendere tali stili globali ed utilizzabili da tutti i componenti.
- `Emulated (default)`: lo stile è applicato solo al componente (rimuovendolo dal global scope). Angular mette tutti gli stili all'interno dell'`<head>` riprocessando tutte le regole CSS aggiungendo gli attributi di scoping che sono ritrovabili nel markup degli elementi del template.
- `ShadowDom`: utilizza lo Shadow Dom "nativo" (non emulato) per i browser che lo supportano e l'elemento non ha più degli attributi generati da Angular ma ha proprio uno #shadow-root con dentro uno style incapsulato.

L'idea è lasciare il default e di mettere solo gli stili specifici per il singolo componente!

```typescript
import {Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector:'app-nav',
    template:'<div></div>',
    // embedded stylesheet
    styles:[`
        div {
            color:white;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
```

Si può aggiungere stile ad una applicazione Angular con:
- embedded style
- `<link rel="stylesheet" href="app-nav.component.css">`: nel template si può mettere anche link a stylesheet trattandolo come l'embedded stylesheet
- `@import`: è possibile linkare più import all'interno di un unico file per organizzare il codice in + pezzi
- inline style in template (non consigliato)
- con la proprietà `styleUrls:['./app.component.scss']` allo stesso modo della proprietà templateUrl


Nel caso di `ViewEncapsulation.Emulated` di può specificare per il componente le pseudo class `:host` e `:host-context` supportate ormai da tutti i browser:
```css
:host {
    backgraound: #2A9FBC;
    font-size:1rem; /* mettere sempre unità relative al browser */ 
}

/*   se ha la classe .example  */
:host(.example) {
    backgraound: #2A9FBC;
}

/*   se l'elemento che contiene il componente ha la classe .container  */
:host-context(.container) {
    backgraound: #2A9FBC;
}

```

In base alla `content projection` i componenti innestati possono ricevere delle regole dai componenti che li contengono tramite la classe `::ng-deep`:
```css
:host ::ng-deep a {
    color: #fff
    text-decoration:none;
}
:host ::ng-deep a:hover {
    text-decoration:underline;
}
```

# Scalable e maintanable CSS Structure
Si deve ripensare tutto in quanto i principali conflitti che si hanno con il CSS normale vengono ridimensionati dalla natura "isolata" dei componenti. Si deve così pensare a come gestire gli stili globali, naming convenction, relative units e predictability, selettori e overrides.
L'idea è di mettere dentro `src/style.scss` ( linkato dentro angular.json) tutti gli import ai partials dentro la cartella `styles` (oppure `shared/scss`) che devono riguardare impostazioni globali (browser resets, colors, typography, layout, media queries, utilities)

## Suggerimenti
- Per rendere tutto modulare e prevenire i conflitti per `style contamination` è opportuno aggiungere un prefix alle regole di ogni componente (come `.lt-container` o `.lt-grid`  dove `lt` sta per `layout`).
- Usare negli stili le variabili e i mixins di SCSS
- Non fare mai un override di stile ma aggiungere classi ad hoc.
- per avere degli stili "raw" si può applicare un CSS reset (Normalize.css) che per lo meno prevengono le inconsistenze dei vari browser.
- Come naming convenction una delle + flessibili è BEM   `class="block__element--modifier"` che ben si sposa con SCSS (&__).
- usare solo CSS classi e mai iD

## Links
- [Styling Angular Applications](https://app.pluralsight.com/library/courses/styling-angular-applications)
- [course code](https://github.com/pluralsight-styling-angular-apps)