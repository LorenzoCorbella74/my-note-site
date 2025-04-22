# Angular Architecture playbook

## Table of Contents
1. [Introduction](#introduction)
2. [Angular Architecture strategies](#angular-architecture-strategies)
3. [Build](#build)
4. [Angular library architecture strategies](#angular-library-architecture-strategies)
5. [Links](#links)

## Introduction
Il corso tratta di:
- Angular Architecture strategies
- Angular library architecture strategies
- Module federation for large scale applications

### Angular Architecture strategies
L?idea è quello di tenere tutto il più semplice possibile, e di non complicare le cose. 

I moduli in angular sono dei contenitori di componenti, direttive, servizi, pipes, etc. Da Angular 14 si possono usare gli standalone components, che sono dei componenti che non hanno bisogno di un modulo per essere usati e che importano le dipendenze autonomamente. 

Per applicazioni piccole gli stand alone component sono preferibili mentre per grandi applicazioni è meglio usare i moduli che possono essere distinti in:
- __root module__: il parent module che contiene tutti gli altri moduli
- __feature module__: raggruppa feature specifiche 
- __shared module__: contiene componenti, direttive, pipes, etc che possono essere condivisi tra più moduli (evita la code duplication)
- __core module__: raggruppa i servizi che sono singleton e che devono essere condivisi tra più moduli

i Service, in quanto singleton permettono di encapsulare la logica di business e/o shared code e di condividerla tra più componenti.

```typescript
// app
// ├── core
// │   ├── services
// │   │   ├── auth.service.ts
// │   │   ├── logger.service.ts
// │   │   └── user.service.ts
// │   └── core.module.ts
// ├── features
// │   ├── feature1
// │        ├── feature.module.ts
// │        ├── models
// │        │   └── feature.model.ts
// │        ├── pages    
// │        │   ├── feature-page.component.ts
// │        ├── components
// │        │   ├── feature.component.ts
// │        │   └── feature.component.html
// │        ├── services
// │        │   ├── feature.service.ts
// │        │   └── feature-resolver.service.ts
// │        └── feature-routing.module.ts
// ├── shared
// │   ├── shared.module.ts
// │   ├── components
// │   │   ├── shared.component.ts  
// │   │   └── shared.component.html
// │   ├── directives
// │   │   └── shared.directive.ts
// │   ├── pipes
// │   │    
// │   └── models
// │       └── shared.model.ts
// └── app.module.ts
```
## Build
Per convertire un progetto da webpack a vite che usa esbuild, usare il comando
```bash
ng update @angular/cli --name use-esbuild
```

## Angular library architecture strategies
All'interno dell'angular.json nella sezione build si vede che viene usato il builder [ng-packagr](https://github.com/ng-packagr/ng-packagr#how-to) che permette di creare delle librerie in angular. Tale pacchetto usa la configurazione presente all'interno del file `ng-package.json` dove è specificato la destinazione del buildato, l'entry file etc.

```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/angular-library-example",
  "lib": {
    "entryFile": "src/public-api.ts"
  }
}
```
si utilizza il comando `ng build @scope/angular-library-name` per buildare la libreria.
All'interno della cartella della libreria è presente il file `public-api.ts` che contiene l'export di tutti i pezzi della libreria (chiamati entry points).

```typescript
export * from './lib/angular-library-example.module';
export * from './lib/components';
export * from './lib/services';
```


## Large scale applications
Per le grandi applicazioni si può usare:
- __micro frontends__: si prende un applicazioni e si separa in applicazioni più piccole che possono essere sviluppate e deployate in modo indipendente. L'idea è di avere una host app che contiene n applicazioni
- __module federation__ è una deploying technique che permette di avere una applicazione host che carica dinamicamente altre app a runtime (che possono essere sia app che microfrontend che possono essere hostate da un'altra parte rispetto alla host app). Questo permette a diverse applicazioni di condividere il codice senza necessità di duplicarlo (come le dipendenze angular,@angular/core, @angular/common, @angular/router, etc ), favorendo la modularizzazione e la collaborazione tra progetti indipendenti. È particolarmente utile in contesti di microfrontend, dove le applicazioni sono suddivise in piccoli componenti frontend gestiti separatamente.. 
- monorepo integration (Nx):  è una pratica di gestione del codice sorgente in cui più progetti (che possono condividere codice o essere completamente separati) sono contenuti in un unico repository Git. Piuttosto che avere un repository separato per ogni progetto, tutti i progetti vengono gestiti insieme.  Nx è un tool che permette di gestire le dipendenze e automatizzare i processi (build, test, deploy) all'interno del monorepo. Un monorepo può trarre vantaggio da Module Federation in contesti dove si vuole mantenere moduli separati in termini di build e deploy, ma si desidera una gestione centralizzata del codice.

## Links
-[Angular Architecture Playbook pluralsight course](https://app.pluralsight.com/library/courses/angular-architecture-playbook/table-of-contents)
- [esempio angular library](https://github.com/rothsandro/angular-library-example)
- [medium article on angular librar: Crafting a Versatile Angular Library: A Guide to Multiple Entry Points](https://medium.com/@simplycodesmart/crafting-a-versatile-angular-library-a-guide-to-multiple-entry-points-8b924d304b3a)

- [corso Angular monorepos with Nx](https://app.pluralsight.com/library/courses/angular-monorepos-nx/table-of-contents)

- [esempio microfrontend](https://github.com/oktadev/okta-angular-microfrontend-example)