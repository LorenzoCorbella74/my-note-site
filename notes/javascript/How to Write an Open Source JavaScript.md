# How to Write an Open Source JavaScript Library

- [corso](https://egghead.io/courses/how-to-write-an-open-source-javascript-library) 

## Github repo

La prima cosa da fare è creare un github repo: 

```bash
& git init
```

## Rilasciare una nuova versione
E' fondamentale rilasciare facendo si che il repositori su gitlab e quello su npm siano allineati: tramite un version tag (è una label che punta ad un commit) si sottolinea una release o un momento importante nella history dei cambiamenti dei file.

 ```bash
& git tag 1.1.0     # 1.0.0 è il Nome del tag  
& git push --tags   # si manda tale tag a github
 ```
Andando su github si ha che questo tag è associato ad una release (ed eventualmente si possono aggiungere anche dei dettagli a tale release nel tab "Release") 

## Pushare un aggiornamento alla libreria
 Se partiamo ad esempio dalla `version: "1.0.0"` abbiamo il 1° numero che indica la major version che indica una major release (con breaking changes) mentre il 2° numero indica una miror release (nuove features ma non breaking api changes), il 3° per patch release (tipo un bug fix): alziamo a 1.1.0 (facendo una minor relase) e poi committiamo

 ```bash
# si crea il tg e si manda su gitlab/npm
& git commit -ma "nuova feature"
& git tag 1.1.0 
& git push 
& git push --tags
& npm publish # si pubblica la uova versione

# per chiedere le informazioni di una libreria
& npm info nome-libreria
```

## Pubblicare una beta version
Se vogliamo pubblicare una versione beta si deve aumentare la versione ma specificando che è una versione beta tramite `version: "1.2.0-beta.0 "` 

 ```bash
# si crea il tg e si manda su gitlab/npm
& git commit -ma "nuova feature"
& git tag 1.2.0-beta.0 
& git push 
& git push --tags
& npm publish  --tag beta # si pubblica una versione BETA
```

Invece di installare la libreria con `npm install nome-libreria` si richiede di installare la versione beta con `npm install nome-libreria@beta` o proprio una specifica versione con `npm install nome-libreria@1.2.0-beta.x` dove x è il contatore della beta version.

## Rilasci automatici con semantic-release
Per evitare di eseguire i passi necessari a fare delle release è stato sviluppato il tool semantic-release che utilizza vari servizi di CI (Continus integration come Travis CI che esegue delle catene di jobs quali ad esempio prima esegue i test e poi se tutto ok produce la release).
 ```bash
# si installa
& npm install -g semantic-release-cli

# si configura il tool  
& semantic-release-cli setup
```

Semantic release si occuperà di aumentare la versione nel package.json quando tramite una [convenzione](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit) nei messaggi di commit si specificherà la tipologia dei cambiamenti effettuati che permetteranno di capire cosa fare. Un altro tool che permette di semplificare il processo di creazione dei msg di commit [commitizen](https://github.com/commitizen)

 ```bash
& npm install -D commitizen cz-conventional-changelog
 ```bash