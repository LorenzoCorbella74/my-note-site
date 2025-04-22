# VITE
Vite (Fast in Francese) è un **build tool for the web**  basato su due tecnologie:
- **esbuild** (bundler scritto in GO usato in development per caricare velocemente le dipendenze) 
- **rollup.js** (usato in production come base module bundler con ottimizzazioni e un ampio ecosistema di plugins). 
- opzionalmente può usare anche [SWC](https://swc.rs/) (un compilatore rust per javascript e typescript) usato al posto di babel per il transpiling del codice.

Principale caratteristica è che un cambiamento del codice non viene ribuildato tutto ma solo la parte interessata tramite l'**Hot Module replacement (HMR)** che permette di aggiornare il codice senza ricaricare l'intera pagina. 

Per uniformare tutti i tre tool sopra citati Vite sta per migrare ad un unico tool, basato su rust chiamato Rolldown.

Richiede una versione di Node >= 20.

## Indice
- [Templates](#templates)
- [Static asset](#static-asset)
- [Environment variables](#environment-variables)
- [Typescript](#typescript)     
- [Configure with options](#configure-with-options)
- [Plugins](#plugins)
- [Deno 2](#deno-2)


# Templates
Per creare un progetto tramite i template di vite si usa il comando:
```bash
> npm create vite@latest
> npm install
> npm run dev # per avviare il server di sviluppo
> npm run build # per produzione con il pacchetto prodotto nella cartella dist
> npm run preview #per preview della build di produzione su localhost:4173
```
Il comando `create` installa il pacchetto `create-vite@6.3.1` che permette di creare un progetto vite con i suguenti template disponibili:
- Vanilla
- Vue
- React
- Preact
- Lit
- Svelte
- solid
- qwik
- angular
- lit-ts
- Others

Poi è possibile scegliere la variant del template (javascript o typescript) e il nome del progetto.

Indipendentemente dal framework scelto, il progetto creato avrà sempre la stessa struttura di base. 
```
my-project
├── index.html
├── package.json
├── src
│   ├── assets
│   ├── main.js
│   └── style.css
└── vite.config.js
``` 
### [Static asset](https://vitejs.dev/guide/assets.html)
La cartella `src/assets` contiene i file statici che si vuole ottimizzare  e che avranno un hash nel nome per caching, e se i file file hanno un size è <4KB verranno convertiti in base64 ed inclusi nell'html, mentre la cartella `public` contiene i file statici che non si vuole ottimizzare (e che verranno copiati nella build senza ottimizzazione quindi con un path assoluto come `import viteLogo from '/vite.svg'`).

Per usare i file statici ed importarli nel js si deve usare un path relativo (`import reactLogo from './assets/react.svg'`)e non assoluto (es. `src/assets/logo.png`). 

Il progetto verrà creato nella cartella `dist` in cui verranno copiati i file ottimizzati


### Importare vite

E' possibile anche importare vite dentro un progetto creato con `npm init -Y`:

```bash
> npm install --save-dev vite
```

all'interno del `package.json` si ha:
```json
{
    "scripts":{
        "dev": "vite dev --host" // --host espone l'app in rete locale
    }
}
```

Per avere la possibilità di importare codice js tramite la sintassi `import` all'interno di `main.js` si deve specificare l'attributo `type="module"`:
```html
<h1>Hello world</h1>
<script type="module" src="main.js"></script>
```
Per il css si usa o il normale link per lo stile globale
```html
<link rel="stylesheet" href="style.css">
```
Oppure per CSS modules si usa:
```html
<script type="module">
    import './main.js";
    import classes from './style.module.css'; // come CSS MODULES

    // si possono aggiungere le classi del CSS Modules tramite js
    document.querySelector("h1").className = classes.title
</script>
```

## [Environment variables](https://vite.dev/guide/env-and-mode.html#built-in-constants)
L'oggetto `import.meta` è un web standard a cui Vite aggiunge l'oggetto `import.meta.env` che contiene le variabili d'ambiente e un gruppo di costanti built in pronte da usare:
- .BASE_URL contenente il base url da cui l'app è servita
- .MODE (development, production, test) che indica la modalità in cui è in esecuzione l'app (es. `npm run dev` o `npm run build`), 
- .DEV, .PROD (boolean per capire se l'app è in development o production), 
- .SSR (boolean indicante se l'app gira su server). 
- si ha inoltre accesso al file `.env` che contiene le variabili d'ambiente **che devono avere nel nome il prefisso** `VITE_`.

 Per usare le variabili d'ambiente si deve usare la sintassi `import.meta.env.VITE_` (es. `import.meta.env.VITE_API_URL`).

## Typescript
Il [supporto per typescript](https://vite.dev/guide/features.html#typescript-compiler-options) è nativo e basato su due momenti la transpilation e il type checking. Se scelto in fase di scaffolding verrà aggiunto il file `tsconfig.json` e il file `vite-env.d.ts` che contiene le dichiarazioni di tipo per vite.


## Configure with options
Per [configurare vite](https://vite.dev/config/) si usa il file `vite.config.js` che contiene le opzioni di configurazione. E' possibile usare anche il file `vite.config.ts` se si usa typescript. Le opzioni di configurazione sono divise in 3 sezioni:
- server: per configurare il server di sviluppo (es. porta, cors, proxy, ecc..)
- build: per configurare la build (es. output, minification, ecc..)
- preview: per configurare il server di preview della build di produzione (es. porta, cors, proxy, ecc..)
```js
import { defineConfig } from 'vite'

// plugin example npm install --save-dev vite-plugin-qrcode
import react from '@vitejs/plugin-react'
import {qrcode} from 'vite-plugin-qrcode'
import svg from 'vite-plugin-svgr' // plugin per importare svg come componenti react

export default defineConfig({
  plugins: [react(), qrcode()],
  server: {
    port: 3000,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  },
  preview: {
    port: 4173,
    open: true
  }
})
```
## Plugins
I plugin sono basati sulla roll-up interface e devono essere installati come dipendenze di sviluppo.

## Deno 2

Al posto di Node si può usare Deno:
```bash
deno run -A npm:create-vite@latest --template react-ts
deno install
deno task dev
deno task build # per produzione 
deno task preview  # per preview della build di produzione 
```
Per creare un progetto vite con Deno vedere [l'articolo](https://docs.deno.com/examples/create_react_tutorial/).

# Links
- [Corso Scrimba](https://scrimba.com/intro-to-vite-c03p6pbbdq)
- [watch public directory for hot relaod](https://stackoverflow.com/questions/69626090/how-to-watch-public-directory-in-vite-project-for-hot-reload)

