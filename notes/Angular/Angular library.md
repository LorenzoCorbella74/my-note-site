## Angular library

E' possibile generare una libreria **dentro un progetto** tramite:
```bash
ng generate library nome-lib # con la versione globale dell'angular cli

# oppure per una versione speciica dell'angular cli
npx -p @angular/cli@15 ng g library nome-lib
```
Dentro il progetto di partenza viene creata una cartella `projects/nome-lib` con la stessa struttura di un progetto Angular, ma con:
- un file ng-package.json che contiene le informazioni necessarie per la generazione della libreria,
- e src/lib/public-api.ts che contiene le esportazioni pubbliche della libreria.
```typescript
export * from './lib/nome-lib.service';
export * from './lib/nome-lib.component';   
export * from './lib/nome-lib.module';
export * from './lib/types/user.interface.ts';
```
Da notare che all'interno del angular.json ci sta nell'oggetto `projects` la libreria appena creata, con le informazioni necessarie per la build e l'applicazione di partenza.

## Build
La libreria non può essere usata se non è buildata. **Dalla cartella del progetto di partenza**:
```bash
ng build nome-lib --watch # con la versione globale dell'angular cli (per buildare in watch mode)

# oppure per una versione speciica dell'angular cli
npx -p @angular/cli@15 ng build nome-lib
```


**NOTARE BENE**: da dentro la libreria si deve referenziare le altre parti della libreria tramite path relativi, altrimenti non funzionano in quanto si avrebbe un problema di circular dependancy. Ad esempio:
```typescript
import { User } from './types/user.interface'; // CORRETTO
import { User } from 'nome-lib/types/user.interface'; // ERRATO
```

## Usare la libreria in un altro progetto

Per usarla nel progetto, è possibile importarla nel modulo principale del progetto:
```typescript
import { MlaUsersModule } from 'mla-users';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MlaUsersModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```
La possibilità di leggere la libreria come un modulo è garantita dall'angular.json che permette di vederla come un modulo pubblicato su NPM.

## Pubblicare la libreria su npm
Per pubblicare la libreria su npm, è necessario eseguire il comando `npm publish` all'interno della cartella `dist/nome-lib` generata dalla build della libreria. Prima di farlo, assicurati di avere un file `package.json` configurato correttamente con le informazioni necessarie per la pubblicazione.

## Links
- [Github code example](https://github.com/monsterlessonsacademy/monsterlessonsacademy/tree/338-angular-library)
- [Angular Official documentation](https://angular.dev/tools/libraries/creating-libraries)


## [NX](https://nx.dev/docs)
Nx è un build system open source che fornisce tool e tecnicque per migliorare l'esperienza dello sviluppatore. Permette di configurare, fare lo scaffolding di app, librerie e moduli, e di gestire le dipendenze tra di essi. Nx è un tool che si integra con Angular CLI e fornisce funzionalità avanzate per la gestione di progetti Angular complessi. Con Nx, puoi creare monorepo, gestire le dipendenze tra librerie e applicazioni, e ottimizzare il processo di build e test.
Tramite il comando npx nx@latest init viene creato un progetto Nx a cui possono essere aggiunti dei plugin.
Tramite il comando è possibile scegliere lo stack (None, React, Angular, Node):
```bash
npx create-nx-workspace@latest myorganization  # --preset=angular --appName=myapp --style=scss --nx-cloud=false
```
Scegliendo una tecnlogia come ad esempio angular è possibile crare uno "stand alone project" o un "monorepo".
Un monorepo è un repository che contiene più progetti, librerie e moduli, tutti gestiti insieme. Nx fornisce strumenti per gestire le dipendenze tra questi progetti e ottimizzare il processo di build e test. Con Nx, puoi creare un monorepo per gestire più applicazioni Angular, librerie condivise e moduli, tutto in un unico repository.

E' possibile aggiungere librerie al progetto tramite (e scegliere da CLI tra varie opzioni come quale bundler utilizzare):
```bash
npx nx g @nx/angular:library nome-lib # --directory=lib --style=scss --publishable --importPath=@myorg/lib
```


E' utile installare l'estensione `Nx Console` per VSCode, che fornisce un'interfaccia grafica per eseguire comandi Nx e gestire progetti e librerie. Con Nx Console, puoi facilmente eseguire comandi Nx, generare nuovi progetti e librerie, e visualizzare le dipendenze tra i tuoi progetti in modo visivo. 


All'interno del file `tsconfig.base.json` è possibile vedere nella proprietà `paths` le librerie create e gli alias di queste per poterle importarle.
Oppure all'interno della cartella libs ci stanno pià progetti con le loro librerie, ognuna con il proprio `tsconfig.json` e `package.json`. All'interno di quest'ultimo la proprietà name permette di definire l'alias con cui sono chiamate tali librerie all'interno di applicazioni. Ad esempio:
```json
{
  "name": "@ciccio/servizi-form",
  "version": "0.0.1",
  "peerDependencies": {
    "@angular/common": "^15.0.0",
    "@angular/core": "^15.0.0"
  },
  "dependencies": {
    "@ciccio/servizi-layout": "^4.0.0"
  }
}
```

Inoltre nx permette di portare tutto alle ultime versioni tramite il comando:
```
bash
npx nx migrate latest
```


## NX Links
- [Soo what is Nx](https://www.youtube.com/watch?v=-_4WMl-Fn0w)
- [Building Angular Apps in an Nx Monorepo](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial) 

## [Nx Angular Monorepo Tutorial Walkthrough](https://www.youtube.com/watch?v=ZzTP4bVJEnI&t=99s)
Si crea un workspace con:
```bash
npx create-nx-workspace@latest angular-monorepo --preset=angular-monorepo # si chiama angular-store con esbuild come bundler, css

# si starta con
nx serve angular-store #oppure
nx run angular-store:serve # per eseguire il progetto angular
```
Per vedere la proprietà `targets` dentro il `project.json` della cartella del progetto. 

Per creaer nuove entità si usano i generators (app, componenti, service, etc.):
```bash
nx list @nx/angular # per vedere i generatori disponibili
nx g @nx/angular:component nome-componente --project=angular-store # per creare un componente dentro il progetto angular-store
