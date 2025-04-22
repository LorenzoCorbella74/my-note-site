# Cypress: End-to-end JavaScript Testing

> Quality is not an act, it's a habit. Aristotele

Appunti del corso [Cypress: End-to-end JavaScript Testing](https://app.pluralsight.com/library/courses/cypress-end-to-end-javascript-testing/table-of-contents) sulla piattaforma [Pluralsight](https://app.pluralsight.com/library/). 
File del corso: [Demo app](https://github.com/gothinkster/realworld)
Plugin "Cypress Snippets" for VSC

## E2E Testing
E' possibile fare vari tipi di test:
- ***Unit test***: sono test di parti isolate di codice (una funzione, una classe ) che non dipendedono da altre parti di codice
- ***Integration test***: sono test su parti di codice con dipendenze (ad esempio APi, componenti, etc)
-  ***E2E testing***: si intende la verifica non manuale del flusso di una applicazione, simulando le interazione con una applicazione come farebbe un utente finale

Secondo la Test Automation Pyramid si svolgono prima Unit ed Integration test (più veloci) che devono rappresentare la maggiornaza dei test su una applicazione e poi E2E (più lenti e costosi)

## Cos'è Cypress
E' un software open source che interagendo con applicazioni che girano su browser, permette di eseguire dei test E2E automatici: i test automatici permettono di testare una applicazione dall'inizio alla fine simulando scenari di'utilizzo di un utente reale permettendo di:
- scovare bug prima del reale utilizzo con un livello di copertura eccellente
- evitare di spendere ore di test manuali
- dare un prodotto di qualità elevata a clienti finali

## Perchè Cypress
Supporta
- time travel & debugging (è sempre possibile verificare l'app ad un certo step del test)
- Ha al suo interno Stubs, Spies e clocks
- Ha il così detto "automatic waiting" cioè sempre la fine di comandi per proseguire (non c'è bisogno di mettere waiters asincroni, come si faceva con altri software) 
- riporta tramite screenshot o video i fallimenti dei test

## Esempio di test
Il codice è scritto in Javascript ed è " leggibile"
```javascript
/// <reference types="Cypress" /> 

// describe è la funzione padre con il nome della suite di test
// describe e test sono fn di MOCHA
describe('my first test', function(){
    // nome del singolo test
    it('Go to page X', function(){
        // tutti i comandi cypress iniziano con "cy"
        cy.visit('https://example.com')
    })
})
```

## How Cypress is different
A differenza di altre soluzioni di E2E test come Selenium che si affidavano a Framework (Mocha, Jasmine, Karma), Assertion Library (Chai, Expect.js) e avevano bisogno di wrapper (protractor, Nightwatch, etc), Cypress contiene tutto il necessario per la configurazione ed esecuzione di test. Essendo eseguito su browser ha accesso a tutto (DOM, window object, etc) indipendentemente dal framework front end utilizzato (in quanto guarda in definitiva solo il codice HTML che è renderizzato indipendentemente da come è generato)

## Trade offs
- Cypress girano dentro il browser pertanto non può essere usato in Node o altro linguaggio server side anche se ha la possibilità di comunicare con il BE tramite comandi quali ***cy.exec()***, ***cy.task()*** e ***cy.request()***.
- Non supporta il test multi tabs
- nello stesso test non può visitare due domini aventi origini differenti (la soluzione è mettere i path diversi in differenti it)
```javascript
describe('navigation', function(){
        cy.visit('https://example.com')
        cy.visit('https://example2.com') // ERROR !!
    })
})
```
- non supporta ad oggi native or mobile events
- ha un supporto limitato per iframe
- non permette (anche se ci stanno workaround) per l'evento "hover" e "tab"
- file uploads/downloads

# Core concepts

### Organisation
E' opportuno organizzare i test in cartelle. All'interno della cartella "fixtures" si possono mettere tutti i .json degli stubs/mock da utilizzare nei test, mentre dentro "plugin" i plugin di cypress mentre dentro support/index.js si può mettere il codice riutilizzato dentro tutti i test file

### Interacting with elements
Cypress interagisce con pagine Html attraverso catene di comandi che possono essere di vari tipi: 
- ***parent comand***: iniziano una catena di comandi 
- ***child comand***: proseguono da un comando padre o altro figlio 
- ***dual commands***: possono iniziare una catena o essere attaccati a comandi esistenti
 
```javascript
// parent commands
cy.get('a.nav-link')               // trova un elemento in pagina
cy.visit('https://example.com')    // va ad una pagina
cy.request('https://example.com')  // GET Http request 
cy.exec('npm run build')           // esegue un system comand 
cy.route('/users/321312')          // esegue una network request

// Child commands
cy.get('a.nav-link').click()                    // click su elemento
cy.get('[data-cy=username]').type('stringa')    // scrive all'interno di un input
cy.get('.article').find('stringa')              // trova un elemento dentro un altro
cy.contains('a.nav-lisk', "Login").should('be.visible') // verifica che un elemento contiene del testo

// Dual commands
cy.contains()
cy.screenshot()
cy.scrollTo()
cy.wait()
```

L'idea fondamentale per la selezione di elementi è quella di utilizzare degli attributi identificativi per ogni elemento (come fatto noi con ***data-testid=xxxx***) con cui si interagirà in modo da evitare le problematiche legate al fatto che attributi normali o stili possono cambiare in fase di sviluppo.

### [Assertion](https://docs.cypress.io/guides/references/assertions)
Cypress fonisce asserzioni di Sinon, Chai (che permette di fare affermazioni su dati) e Jquery (che permette di fare delle affermazioni su DOM object):
```javascript
cy.contains('a.nav-lisk', "Login")
    .should('be.visible')

cy.location('pathname')
    .should('equal', '/register')

cy.get('.article')
    .should('have.length', 10)

cy.get('[data-cy=profile]')
    .should('not.exist')
```
- [Esempi di assertion](https://example.cypress.io/commands/assertions)

### Retry ability
Oggi le applicazioni sono asincrone ed i comandi e le assertion di cypress aspettano che i comandi abbiano aggiornato il DOM e le asserzioni relative ad un elemento del DOM se inizialmente falliscono ritentano automaticamente fino ad un tempo di timeout impostato fino a quando le affermazioni non sono matchate. Questo permette, fino ad un certo livello, di non impostare delle attese hardcoded come si faceva con altri framework.
Da considerare comunque che:
- Cypress ritenta solo i comandi che interrogano il DOM (.get(), .find(), .contains()) mentre non sono ritentati i comandi che modificano lo stato di una applicazione (come click()) che falliscono "istantaneamente".
- in una catena di comandi soltanto l'ultimo comando prima di un'asserzione è ritentato (quindi l'idea è quella di avere un comando e poi un'asserzione)

```javascript

cy.get('.article')
    .should('have.length', 10)
    .first()     // NB: si può continuare la catena anche dop ouna assertion
    .find('[data-cy=xxxx]')
    .click()
```

### Hooks
E' possibile far girare prima o dopo ciascun blocco di test una funzione (hook):
```javascript
describe('name of test suite', function(){
    
    // prima di tutto
    before(() => {
        cy.visit('/users/new')
    })

    // prima di ogni test
    beforeEach(()=>{
        // task è una funzione  che chiama comandi
        cy.task('clean')
    })

    beforeEach(() => {
        // comandi aggiunti con Cypress commands.add si chiamamocon cy.nomecomando aggiunto
        cy.login()
    })

    afterEach(() => {
        cy.logout()
    })
})
```
[Best practice](https://docs.cypress.io/guides/references/best-practices#Using-after-or-afterEach-hooks)

### Aliases
```javascript

    // è opportuno mettere gli aliases dentro il beforeEach
    // o before visto che viene eseguito prima di ogni it
    beforeEach(()=>{
        // si crea così
        cy.get('.article').click().as('ClickonNewPost)
    })

it('write a new post', ()=>{
    // ci si referenzia così con @ + nome
    cy.get('@ClickonNewPost)
})
```
Da notare che è opportuno non creare aliases quando si è in prodondità di una catena di comandi, ma solo all'inizio di comandi. Il riferimento ***@ + nome_alias*** si può avere solo con ***cy.get()*** o con ***cy.wait()***.

# Ecosystem and Tooling

##  Network request
E' possibile sia fare richieste finte (stub responses con dati finti per body, status, headers, delay) che richieste reali.
```javascript

   
    cy.server()     // attiva un server
    //  .route serve per chiamate con response stubbate o no
    cy.route('DELETE', '**/user/*',{})
    cy.route('**/users',
    // si passa uno stub per avere una .json response
    [{
        id:1, name:'Jhon'
    }]).as('getUser)
    cy.visit('/users')
    cy.wait('@getUser')

    // per eseguire http request REALI
    cy.request(url) 
    // oppure
    cy.request({
        method:'POST',
        url:'api/articles',
        body:{
            articles: {}
        },
        headers:{
            authorization: `Token ${my_token}`
        }
    }) 
```

## Screenshot and Videos
E' possibile salvare dentro la cartella indicata degli screenshot a momenti specifici del test (o automaticamente, creando anche dei video (a meno che non si imposti `video:false` nel file di configurazione `cypress.json`), quando un test fallisce facendo partire i test in modalità headless tramite il comando `npx cypress run`):
```javascript
    cy.screenshot('folder1/register') // per eseguire uno screenshot come comando padre o figlio in un momento specifico
```

## Browser support
Dalla versione 4 è possibile eseguire test E2E con Chrome e Chromium based browser (MS IE Edge), Firefox. Non ha supporto per Safari e IE. E' possibile seguire i test tramite il comando
```bash
& cypress run --browser chrome
``` 

## Code coverage
Per generare indicazioni sulla copertura dei test si utilizza la dipendenza `@cypress/code-coverage` che genera all'interno della cartella coverage una pagina html su cui è possibile vedere in forma tabellare la copertura dei test nei vari file. 

```bash
# istallare le dipendenze
& npm install @cypress/code-coverage istanbul-lib-coverage nyc babel-plugin-instanbul
```
```javascript
 // dentro cyprss/support/index.js
 import '@cypress/code-coverage/support'
 
// dentro cypress/plugin/index.js 
module.exports = (on, config)=> {
    on('task', require('@cypress/code-coverage/task'))
}
```

## [Plugins](http://docs.cypress.io/plugins)
Per estendere le funzionalità è possibile usare i plugins che vengono eseguiti durante specifiche fasi di esecuzione di Cypress e che permettono di alterare la configurazione e le variabili ambientali, customizzare come il codice di test è transpilato e mandato al browser ed uscire dal browser per eseguire azioni sul BE (nel caso si abbia uno strato Node).





