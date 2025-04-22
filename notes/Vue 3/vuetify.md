# Vuetify

##
Tutti i componenti iniziano per `v-`. v-content wrappa la pagina con flexbox:
```html
<div id="app">
    <v-app> <!-- l'app con vuetify deve essere inclusa nel tag v-app -->
        <v-content>
            <playground></playground>
        </v-content>
    </v-app>
</div>
```
## Typography
```html

    <v-card class="mt-5 mb-8">
      <v-card-text>
        <h1 class="display-4 purple yellow--text">Heading 1</h1>
        <h2 class="display-3">Heading 2</h2>
        <h3 class="display-2">Heading 3</h3>
        <h4 class="title">Title</h4>
        <h5 class="subtitle-1">Subtitle</h5>
        <p class="body-1">Body</p>
      </v-card-text>
    </v-card-text>
</v-card>
```
## Margin & padding
Si usano le classi:
* mt, mb, ml, mr, mx, my, ma-1, ma-auto  (con numeri che vanno da 1 a 12 ad intervanni di 4px) oppure mb-sm-8 solo per schermi piccoli.
* pt, pb, pl, pr, px, py, pa-1 (con numeri che vanno da 1 a 12 ad intervanni di 4px)

## griglia 
Il grid system di vuetify è basato su flexbox quindi è possibile usare la sintassi di quest'ultimo all'interno di vuetify come built in props e classi ad esempio: `<v-row no-gutters justify="space-between">`. L'elemento `<v-spacer></v-spacer>` permette di espandere lo spazio tra elementi.
La sintassi `cols="12"` si adatta a schermi di tutte le dimensioni mentre si si vuole circoscrivere a certe dimensioni si deve usare `sm="6" offset-sm="3"`
```html
<v-container pa-0> <!--  per mettere tutto a zero si usa la stessa sintassi delle classi -->
    <v-row no-gutters > <!-- no-gutters rimuove tutti gli spazi, dense invece li diminuisce -->
        <v-col cols="12">
            <v-card
            class="pa-2"
            outlined
            tile
            >
            Column
            </v-card>
        </v-col>
    </v-row>
</v-container>
```

Nel caso si voglia nascondere elementi con certe dimensioni dello schermo si può usare delle classi come `class="hidden-xs-only"`

## Bottoni

```html
<v-btn tile outlined color="success">
    <v-icon left>mdi-pencil</v-icon> Edit
</v-btn>
 ```