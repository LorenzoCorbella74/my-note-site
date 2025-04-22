# Automating Node.js with NPM scripts
Automatizzare tutte le fasi di sviluppo software, building, developing, testing, deploying con NPM scripts contenuti all'interno del package.json.

E' possibile far girare eseguibili presenti nel `PATH` o dentro la cartella `node_modules/.bin`.

```json
// nel package.json
{
    "scripts":{
        "prestart":"echo prestart... && npm run build && echo starting",
        "start":"node dist/server/index.js",
        "debug":"node --inpect dist/server/index.js",
    }
}
``` 

```bash
# Per generare package.json
& npm init -y

# Per vedere tutti gli script di un progetto
& npm run 

# per far girare uno script (npm start / npm test non hanno bisogno di "run")
& npm run <nome_script>
```



## Indice
- [Building](#building)
- [Links](#links)


## Building
```json
{
    "scripts":{
         "tsc": "tsc",
        "prestart": "echo Prestart Script && npm run tsc",
        "start": "cross-env PORT=4000 node index.js"
    }
}
```
Tramite il modulo cross platform `cross-env` è possibile passare delle variabili ambientali.  

Per valori di configurazione si possono mettere direttamente dentro il package.json:
```json
{
    "name":"progetto_di_test",
    "config":{ "port":"8080"},
    "scripts":{
         "tsc": "tsc",
         "prestart": "echo Prestart Script && npm run tsc",
         "start": "node index.js"
    }
}
```
E' possibile recuperare tali valori con
```javascript
process.env.npm_package_config_port
```
O settarli con:
```bash
& npm config set progetto_di_test:port 80
```

Per precompilare css con sass, una volta che è stato importato nelle dipendenze di progetto:
```json
{
    "name":"progetto_di_test",
    "scripts":{
         "sass": "sass style.sass style.css",
         "prestart": "npm run sass",
         "start": "node index.js"
    }
}
```
Oppure per usare webpack usando la stessa tecnica:
```json
{
    "name":"progetto_di_test",
    "scripts":{
         "build": "webpack",
         "prestart": "npm run build",
         "start": "node index.js"
    }
}
```

Stessa cosa per avere un progetto angular servito da un server node:
```javascript
// in express
app.get("*", (req,res)=>{
    res.sendFile('index.html', {root:'dist'})
})

// nelle configurazioni di angular in angular.json
{
    "node-angular":{
        "architect":{
            "build":{
                "options":{
                    outputPath:"dist"  // al posto di node-angular
                }
            }
        }
    }
}

// si builda l'app con "npm run build"
```
```json
{
    "name":"progetto_di_test",
    "scripts":{
         "ng": "ng",
         "start-ng":"ng serve",
         "prestart": "npm run build",
         "start": "node server/server.js",
         "build":"ng build",
         "list":"ng lint"
    }
}
```

Tramite npm script si può costruire una immagine docker e farla girare con i seguenti comandi:
```bash
# si costruiisce l'immagine node_web_app da un docker file
& docker build -t node_web_app

# Si logga le img presenti
& docker image ls 

# si fa partire l'img con docker run
# -p porta interna: porta esposta
# -d in background
& docker run -p 4005:4005 -d --name webapp node_web_app
```

dove nel docker file si ha
```dockerfile
FROM node:14
#Create app directory
WORKDIR /usr/src/app

#install app dependencies
# a wildcard is used to ensure both package.json and package-lock.json
# where avaiable
COPY package*.json ./

RUN npm install

#copy source code in this folder
COPY . .

EXPOSE 4005
CMD ["node","docker-server.js"]
```
Si può pertanto aggiungere degli script per automatizzare:
```json
{
    "name":"progetto_di_test",
    "scripts":{
         "docker:build":"docker build -t node_web_app",
         "docker:run":"docker run -p 4005:4005 -d --name webapp node_web_app"
    }
}
```

## Development
Durante lo sviluppo se faccio dei cambiamenti voglio che tali cambiamenti siano live nell'applicazione. In node si usa il tool [nodemon](https://github.com/remy/nodemon) come devDependencies che guarda al cambiamento di file `.js` e `.json`:
```bash
& nodemon src/index.js
```
Nel caso in cui si debba tranpilare da ts a js e far girare il server si deve necessariamente mandare due script in parallelo usando il modulo platform independent [npm-run-all](https://github.com/mysticatea/npm-run-all) (che permette di mandare in parallelo con il flag `-p` o in serie più script (di default)):
```json
{
    "scripts":{
        "release":"npm-run-all build test pub", // in serie
        "build":"webpack --prod",
        "test":"mocha",
        "pub":"npm publish"
    }
}

// nel caso di webserver con ts
{
    "scripts":{
            "tsc": "tsc",
            "start:dev": "nodemon index.js",
            "build:watch": "npm run tsc -- --watch",
            "start:dev:watch": "npm-run-all tsc --parallel  start:dev  build:watch",
    } 
}
```
con `start:dev:watch` si fà partire prima tsc poi in parallelo il watch sui ts e il watch sui .js.

Da notare che nel caso in cui i task siano in serie si passa al successivo quando un task è terminato. Nel caso ad esempio di un web server l'applicazione rimane live senza terminare!!.

UN'altra arternativa è guardare direttamente al cambiamento dei file `.ts` con il modulo [ts-node-dev](https://github.com/wclr/ts-node-dev) e mettere uno script: 
`"start:tsdev":"ts-node-dev index.ts"`.

Nel caso di webpack è possibile osservare i cambiamenti con il comando  `webpack --watch` pertanto sempre usando `npm-run-all` si può mandare in parallelo il watch su webpack e quello sul server.
```json
{
    "scripts":{
            "build": "webpack",
            "build:watch": "webpack --watch",
            "start:dev": "nodemon dist/app.js",
            "start": "npm-run-all build --parallel  build:watch  start:dev sync-watch",
            "sync:watch":"browser-sync start - p localhost:4005 -w ./dist"
    } 
}
```
In tale caso funziona tutto ma per vedere i cambiamenti si deve refreshare il browser. Un modulo che permette di ovviare anche a tale problema è [browsersync](https://github.com/Browsersync/browser-sync), che quanndo sente un cambiamento con il flag `-w` su una cartella refresha il browser.

Se volessimo un app Angular servita da un server Node.

```json
{
    "scripts":{
        "ng":"ng",
        "start":"npm-run-all --parallel start:dev build:watch",
        "start:dev":"nodemon server/server.js",
        "prestart":"npm run build",
        "start-ng":"ng serve",
        "build":"ng build",
        "build:watch":"ng build --watch"
    }
}
```
Per avere poi il refresh del browser si dovrebbe aggiungere anche browsersync (anche se stare in ascolto su una build ha poco senso in quanto in sviluppo si va con ng serve...)

## Links
- [corso PLuralsight](https://app.pluralsight.com/library/courses/automating-nodejs-npm-scripts/table-of-contents)
- [articolo medium npm-run-all](https://medium.com/netscape/npm-task-running-techniques-15fe5b697f15#:~:text=The%20-p%20flag%20is%20an%20npm-run-all%20flag%20that,combination%20of%20tasks%20in%20parallel%20and%20in%20sequence%3A)