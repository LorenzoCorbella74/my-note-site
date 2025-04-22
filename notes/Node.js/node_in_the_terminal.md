# Node in tthe terminal
Non esistono gli oggetti `document`, `window` ma esiste il global object a cui si può accedere con `globalThis` un global scope e che contiene, ad esempio il metodo `fetch`, `setTimeout`, `setInterval`, etc. Esiste poi l'oggetto `process` che contiene informazioni sul runtime e l'OS in esecuzione (`process.platform`, `process.version`, etc) e per uscire syncronously dallo scipt con `process.exit()`.

La best practice prevede di lavorare asincronamente in un ambiente single threaded e di non usare `process.exit()` ma di usare `process.on('exit', () => {})` per fare il cleanup. 

```bash
> node -v # mostrra la versione

> node # entra in modalità REPL
> # premo TAB due volte e mostra tutti gli oggetti globali
> .exit # esce da REPL (oppure CTRL + D)

# eseguire un file js
> node file.js # o node ./file
# se il file sta in una cartella node cerca un index.js: node ./cartella

> node --watch file.js # esegue il file e lo ricarica se viene modificato (CTRL + C per uscire)
```
I parametri passati sono dentro l'array `process.argv` nella forma `[node, file.js, arg1, arg2, ...]`. Se si vuole passare un parametro con spazi bisogna metterlo tra doppi apici `> node file "param with spaces"`. L'ultimo parametro può essere preso con `process.argv.at(-1)`.

## Variabili ambientali
Possono essere messe dentro un file `.env` o settings.env o defaults.env dentro la stessa cartella (che per sicurezza devono essere messi dentro il .gitignore):
```env
MY_VAR=hello
```
Si possono poi recuperare con process.env.MY_VAR anche se si deve specificare quale file di variabili ambientali usare:
```bash
> node --env-file=default.env file
```
In alternativa si può usare il modulo `dotenv`:


E' possibile stare in ascolto di eventi del process life cycle:
```javascript
process.on('uncaughtException', (err, origin) => {
  console.log('An error occurred', err,origin);
  // Application specific logging, throwing an error, or other logic here
});

process.on('exit', (exitCode) => {
  console.log('exiting with code', exitCode); // 0 is NO EROOR
  console.log('uptime in seconds', process.uptime());
});
```

## Moduli
Si può usare la require syntax per importare moduli (commonjs):
```javascript
const os = require('os'); // user system
console.log(os.platform());

// oppure si può anche usare la sintassi ES6
import os from 'os';

const data = {
    username: os.userInfo().username,
    platform: os.platform(),
    release: os.release(),
    available_memory: (os.freemem()*100/os.totalmem()).toFixed(2) + '%',
}
if(process.argv.includes('-u')) {
    console.log(data.username);
} 
```
Ma per evitare l'errore (cannot use import statement outside a module):
- si deve rinominare il file in .mjs, 
- si deve specificare l'estenzione al run: > node  file.mjs

Oppure si deve aggiungere un manifest file `package.json` con il campo `type: module` e si può usare la sintassi ES6 (e si può chiamre il file con estenzione .js):
```json
{
  "type": "module"
}
```

E' possibile creare un modulo in un file che esporta una funzione/oggetto e importarlo in un altro file:
```javascript
// file.js
import os from 'os';
const flagActions = new Map([
    ['-u', () => console.log(os.userInfo().username)],
    ['-p', () => console.log(os.platform())],
    ['-r', () => console.log(os.release())],
    ['-m', () => console.log((os.freemem()*100/os.totalmem()).toFixed(2) + '%')],
]);

export default flagActions;

// index.js
import flagActions from './file.js'; // .js è REQUIRED !!!
```

E' possibile anche avere degli import condizionali:
```javascript
if(process.argv.includes('-u')) {
    import('./file.js').then(({default: flagActions}) => {
        // ...
    });

    // oppure
    const {default: flagActions} = await import('./file.js');
}
```
Da notare che:
- è stato usato await senza l'async questo perchè __Node supporta il TOP LEVEL Async__.
- il dynamic import sempre ritorna un module object

## File System
```javascript
import fs from 'fs';


// sincrono con CALL BACK functions
fs.readFile('./file.txt', 'utf8', (err, data) => {
    if(err) {
        console.error(err);
        return;
    }
    console.log(data);
});

// asincrono
try {
    const data = fs.readFileSync('./file.txt', 'utf8');
    console.log(data);
} catch (err) {
    console.error(err);
}
```

Nel caso in cui si usi il modulo commonjs si ha accesso a __dirname e __filename __ma nel caso di moduli ES6 si usa import.meta__ (experimental stage):
```javascript
const os = require('os');
console.log("filename", __filename); // current running file path
console.log("dirname", __dirname);  // current running directory path

// ES6
import os from 'os';
console.log("filename", __filename); // undefined
console.log("dirname", __dirname);  // undefined
console.log(import.meta);  // { url: 'file:///path/to/file.js', dirname: 'file:///path/to/', filename: 'file:///path/to/file.js' }

import url from 'url';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

```

E' possibile usare anche la versione sincrona di fs con `fs.promises`:
```javascript
import fs from 'fs/promises';

try {
    await fs.opendir(userdir);
} catch (err) {
   if(err.code==='ENOENT') {
       console.log('directory does not exist');
       await fs.mkdir('userdir').catch(console.error);
   } else {
         console.error(err);
   }
}
trye {
    await fs.appendFile(userfile, something+os.EOL, {encoding: 'utf8'});
    const data = await fs.readFile(userfile, 'utf8');
    console.log(data);
} catch (err) {
    console.error(err);
}
```

## HTTP Server
```javascript

// server.js

import http from 'http';
const PORT = process.env.PORT || 3000;

const server = http.createServer(handleRequest);

server.listen(PORT, 'localhost', () => {
    console.log('server is running on port ', PORT);
});

function handleRequest(req, res) {
    console.log('Incoming request:', req.method,  req.url);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // oppure
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    
    res.write('Hello World');
    res.end();

    // oppure un json
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({message: 'Hello World'}));
    res.end();
}
```
Si fa partire con:
```bash
> node server --watch --env-file=.env

> curl localhost:3000 # Hello World
> curl -X POST localhost:3000/login 
> curl -i localhost:3000 # mostra  l'header sul client
```

## Events
Il process object è una estensione dell'EventEmitter class e si possono creare eventi personalizzati:
```javascript
// server.js
import http from 'http';
import { EventEmitter } from 'events';

const PORT = process.env.PORT || 3000;

const server = http.createServer(handleRequest);
const emitter = new EventEmitter();


emitter.on('login', (req, res) => {
    console.log('login event');
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({message: 'login'}));
    res.end();
});

server.listen(PORT, 'localhost', () => {
    console.log('server is running on port ', PORT);
});

server.on('request', (req, res) => {
    console.time(`${req.method} ${req.url}`);
    if(req.method === 'POST' && req.url === '/login') {
        emitter.emit('login', req, res);
    }
});

function handleRequest(req, res) {
    res.on('finish', () => {
        console.timeEnd(`${req.method} ${req.url}`);
    });
    res.end();
}
```
gli eventi sono broadcasted a tutto il runtime environment senza sapere se ci stanno listeners in ascolto. le funzioni di callback vengono eseguite in ordine di registrazione e sono sincrone ma si può usare `setImmediate` per renderle asincrone.
```javascript
emitter.on('login', (req, res) => {
    setImmediate(() => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({message: 'login'}));
        res.end();
    });
});

```

## Test
```javascript
// test.js
import assert from 'assert';
import Stats from './stats.js';
import {test, suite, beforeEach} from 'node:test'; // suite può essere sostituito con describe e test con it

suite('Stats', () => {

    let stats;
    beforeEach(() => {
        stats = new Stats(1,2,3);
    });
    test('sum', () => {
        const stats = stats;
        const actual = stats.sum();
        const expected = 6;
        assert.strictEqual(actual, expected);
    });
});

// si può mettere dei test a TODO e SKIP con test.skip e test.todo
```
E' possibile anche avere una indicazione della copertura con > node --experimental-test-coverage --test 

# Links
- [corso pluralsight](https://app.pluralsight.com/library/courses/nodejs-terminal/table-of-contents)
- [Article: turn your terminal into a powerful JS editor](https://mirzaleka.medium.com/turn-your-terminal-into-a-powerful-javascript-editor-node-js-repl-39a6a4a653d6)
- [Article: share data between JS modules](https://mirzaleka.medium.com/share-data-between-javascript-modules-90318575cb29)