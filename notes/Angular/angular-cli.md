# Angular CLI

E' possibile automatizzare molti task seguendo le best practices di Angular:

- creare applicazioni o strutturare un progetto
- generare codice da modelli
- fare il lint del codice
- fare build ottimizzate
- eseguire Unit & E2E Test

## Installazione

```bash
# Si installa una volta che si ha node LTS 14.15.4:
$ npm install -g @angular/cli
$ ng v      # informazioni sulla versione
```

## Creare app

```bash
$ ng new my-skelethon
# --defaults            skippa le domande che la CLI pone
# --skip-install        skippa npm install
# --help                riporta tutte le opzioni e relativi defaults
# --dry-run (-d)        riporta tutto ma non genera i file
# --prefix <nome>       per avere il prefix sui componenti
# --skip-tests (-S)     per skippare gli unit test
# --style scss          per scegliere lo stile
# --routing             per avere il routing
# --strict              per avere lo strict mode
# --minimal             we avoid using a testing framework
```

Un esempio può essere il comando sotto prima con il dry run, se poi tutto è ok si ripete senza:

```bash
$ ng new my-app --routing --style scss --strict --prefix cor -d
```

E' possibile configurare la Cli tramite comandi dentro `ng new <flags>`, oppure manualmente editando `angular.json` oppure tramite `ng config <jsonPath> <value>` anche se decisamente più scomodo.

```bash
$ ng config schematics.@schematics/angular:component.styletext scss
# --global (-g)     per renderle globali
```

## Lint

Il linting è svolto tramite tslint ma la comunità si sta spostando verso eslint e nello specifico nella libreria [angular-eslint](https://github.com/angular-eslint/angular-eslint)

```bash
$ ng lint                   # esegue il linting
$ ng lint my-app --help     # indica tutte le opzioni
$ ng lint my-app --format stylish  # fa il lint e colora l'output
# --fix                     esegue il lint e risolve i problemi semplici
```

## Doc

```bash
# apre la documentazione online per un termine
$ ng doc component
```

## Generate

```bash
$ ng generate <blueprint> <options> # g as shortcut

# ogni comando ha il suo help
$ ng g --help
$ ng g c--help
```

E' possibile generare

- `component / c`,
- `service / s`,
- `class /cl`,
- `directive / d`,
- `interface / i`,
- `enum / e`,
- `pipe / p`,
- `module / m`
- interceptors, resolvers, etc

```bash
$ ng g c data/customer-list -t -s
$ ng g i models/customer
$ ng g e models/customertype
$ ng g p shared/my-pipe -m app.module
$ ng g s --skipTests     # per saltare il file di test


# --dry-run   permette di fare pratica (insieme a git!!)
# --flat true / false  indica se deve essere creata una folder
# --inline-template (-t) template dentro il .ts
# --inline-style (-s) style dentro il .ts
# --spec false      per generare o no uno .spec.ts
# --view-encapsulation (-v)  Emulated per la strategia di stile
# --change-detection OnPush (-c)  per la strategia di CD
# --prefix <nome>     per aggiungere un prefix
# -m <nome modulo>    si specifica il modulo
```

Da notare che la CLI mette i service come provided:Root ma spesso è utile metterli dentro il rispettivo modulo.

```bash
$ ng g m auth               # genera un modulo
$ ng g c auth/login -m auth # genera il c login e lo mette dentro il modulo auth
```

## Routing

E' possibile aggiungere delle informazioni di routing prima di generare un modulo, guardie etc. Cioè per ogni modulo che si crea si vuole avere il routing? L'idea è che ogni modulo sia caricato all'interno del modulo padre

```bash
# 1) Si aggiunge il routing globalmente a livello di app
$ ng new sales --routing


# 2) si aggiunge il routing al modulo:  admin-routing.module.ts
$ ng g module admin --routing -m app -d

# 3) si generano i componenti e si definiscono le rotte nell'admin-routing.module
$ ng g c admin/email-plug
$ ng g c admin/sms-plug
```

E' possibile generare le `guard` per le singole rotte tramite:

```bash
$ ng g guard auth  # CanActivate guard auth.guard.ts
```

## Test

```bash
$ ng test --help (-h)   # mostra tutti i comandi

$ ng test
# esegue unit test tramite Karma su tutti i *.spec.ts in modalità watch

$ ng e2e  --help
# esegue E2E test con Protractor, compilando servendo su una porta random ed eseguendo i test e2e all'interno dell'omonima cartella.

# --code-coverage  genera report in /coverage (defaut: false)
# --progress       logga i progressi in console (defaut: true)
# --sourcemaps     genera sourcemaps   (defaut: true)
# --watch          parte il test e rimane in ascolto  (defaut: true)
```

Da notare che è possibile debuggare i test andando nei developr tools dentro i `*.spec.ts` (grazie alle source maps).

## Serve

In sviluppo si serve l'applicazione che risiede in memoria

```bash
$ ng serve
# --help   riporta tutte le opzioni
# --open  (-o) apre localhost:4200 sul browser
# --port  (-p) si specifica la porta
# --live-reload false (di default è true)
# --ssl     Serve using https
# --proxy-config     Proxy configuration file
```

## Build

Tramite Webpack si compila l'applicazione in una cartella di output `/dist/[app name]` indicata in `architect.options.outputPath` nell' `angular.json` con i seguenti file:

- runtime.js Webpack runtime
- main.js App code
- polyfills.js Polyfills
- style.s Styles
- vendor.js Angular e altri file di librerie

```bash
$ ng build          # produce build da environment.ts con sourcemap
$ ng build --help   # mostra tutti i comandi
$ ng build --prod   # produce build ottimizzata (codice minificato con tree-shaking, cioè si toglie il codice non usato) da environment.prod.ts senza sourcemap e Ahead of time compilation

 # --source-map     si abilita le source map
 # --aot            se si vuole in dev mode
 # --watch (-w)     watch and rebuild
```

Per visualizzare l'output si usano due tool:

```bash
# 1) webpack-bundle-analyzer
$ npm install webpack-bundle-analyzer --save-dev
$ ng build --stats-json
$ npx webpack-bundle-analyzer dist/my-app/stats.json

# 2) source-map-explorer
$ npm install source-map-explorer --save-dev
$ ng build
$ npx source-map-explorer dist/my-app/main.dlasldasldaasdasdasdasdas.js
```

## Add

E' possibile aggiungere dalla versione 6 nuove funzionalità, scaricare dipendenze, aggiornare la configurazione di un progetto, etc.

```bash
$ ng add <name package>
$ ng add @angular/pwa
$ ng add @angular/material
$ ng add @angular/elements
$ ng add @ng-bootstrap/schematics
```

Se vogliamo far processare degli scripts esterni o degli style esterni all'app si deve specificarli nelle omonime sezioni delle `achitect.build.options` dell' `angular.json`, così come immagini o fonts da aggiungere all'elenco degli `assets`.

## Tooling

E' possibile aggiornare il progetto all'ultima versione di Angular tramite la CLI, aggiornando anche le 3rd party libraries e trasformando il progetto:

```bash
$ ng update --help
# --all     aggiorna tutti i package nel package.json
# --force   forza l'update se i pacchetti istallati sono incompatibili
```

Nel caso di aggiornamento si veda il [sito prodotto dall'angular team](https://update.angular.io)

### Multiple projects

E' possibile produrre workspaces con progetti multipli (cioè più applicazioni e librerie contemporaneamente, come si può vedere nello schema dell' `angular.json` che ha più progetti su cui si può fare build, serve su uno o su più di uno). I comandi `ng build`, `ng serve`, `ng test`, `ng e2e` tutti supportano un target project.

```bash
$ ng build # builda tutti i progetti nel workspace
$ ng build <project> # builda solo quanto specificato
```

Vedere l'[articolo](https://blog.logrocket.com/customize-angular-lazy-loading-modules-multiple-frontends/)

```bash
$ ng new test-project
$ ng g application help-area    # finisce dentro la cartella projects
```

### Angular Libraries

Inoltre è possibile generare delle librerie di elementi angular (dalla versione 6):

```bash
$ ng generate library my-lib #

ng g s my-service --project my-lib
$ ng build my-lib --prod

$ cd dist/my-lib
$ npm publish   # pubblicarla

# --entry-file      path per creare il file dell'API (public-api.ts)
# --skip-package-json   non aggiunge dipendenze al package.json
# --skip-ts-config   non aggiorna tsconfig.json per sviluppo
```

E' obbligatorio prima fare la build della libreria prima di poterla usare (importandola) e di conseguenza sempre ribuildare la libreria dopo aver fatto dei cambiamenti:

```javascript
import { logger } from "my-lib";
```

## Links

- [Official Angular](https://angular.io)
- [Official Angular CLI](https://cli.angular.io)
- [Pluralsight Angular Course](https://app.pluralsight.com/library/courses/angular-cli)
- [Angular first look](https://github.com/johnpapa/angular-first-look-examples)

## Debug

Dalla versione 9 è possibile selezionare un elemento nel browser e applicare nella console i comandi `ng`.

```javascript
// get the component you selected in the Elements panel
heroListComp = ng.getComponent($0);

// Clone the first hero
before = { ...heroListComp.heroes[0] };

// Change the first hero's name
heroListComp.heroes[0].name = "Oliver";

// Clone the first hero, after your changes
after = { ...heroListComp.heroes[0] };

// Display the before and after
console.table({ before, after });

// Apply the changes (so you can see them in the View)
ng.applyChanges($0);
```
