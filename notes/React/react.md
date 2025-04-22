# React

- [File del corso](https://github.com/iamshaunjp/Complete-REact-Tutorial)

## Creare un'app React

Il metodo più veloce è usare il tool [CreateReactApp](https://it.reactjs.org/docs/create-a-new-react-app.html)

```bash
& node -v # deve essere > 14

## creare una dir e navigare dentro tale direztory poi
& npx create-react-app <NOMEAPP>

# automaticamente viene fatto l'npm install
& cd NOMEAPP && code .
& npm start
```

All'interno della cartella `node_modules` abbiamo le dipendenze del progetto, nella cartela `public` abbiamo:

- `index.html` (tutta l'app React è iniettata dentro il `<div id="root" />`), loghi e favicon.ico
- `index.js` che starta l'applicazione iniettando l'App component all'interno dell'elemento #root, ed importa tutto il CSS globale contenuto dentro `index.css`

Infine dentro la cartella `src` troviamo tutta la gerarchia dei componenti partendo dal parent component App.

Nella versione 16.8 (February 2019) sono stati introdotti i [React hooks](https://www.smashingmagazine.com/2020/04/react-hooks-api-guide/) che permettono di costruire i componenti come funzioni e non più come classi.

## Components e Templates

Un'app è una gerarchia di componenti atomici inclusi in .js che contengono:

- template in JSX che viene convertito da babel in HTML in fase di rendering. Notare che in JSX le classi vengono indicate non con `class` ma con `className` e gli stili vengono espressi come oggetti con le proprietà che cambiano a camelCase: `style={{color: white, backgroundColor: grey, borderRadius: '8px'}}`
- logica js

Ogni componente è una funzione, con nome avente lettera maiuscola, che ritorna un template:

```javascript
import "./App.css"; // si importa il css del componente !

function App() {
  return (
    <div className="App">
      <h1>Welcome to react.</h1>
    </div>
  );
}
// si deve sempre esportare il componente !!!
export default App;
```

## Valori dinamici nel template

All'interno di JSX è possibile mettere tramite { } delle interpolazioni che permettono di renderizzare valori dinamici di variabili o valutare intere espressioni js.

```javascript
import './App.css';  // si importa il css del componente !

function App() {

  // variabili non reattive !!
  const welcome = 'Welcome to react'.
  const num = 50; // i num vengono convertiti in stringhe
  const person = { name: 'Lorenzo' }

  return (
    <div className="App">
        <h1>{welcome} {num}</h1>
        <p>{person.name}</p>
    </div>
  );
}
// si deve sempre esportare il componente !!!
export default App;
```

## Events

Quando si vuole scatenare un evento si usa nel template `onClick={nomeFn}` oppure `onClick={(e)=> nomeFn(arg, e)}` quando si devono passare dei parametri.

# State

Per avere delle variabili reattive che cambiano nel template si deve utilizzare i React Hook e nello specifico l'hook `useState`.
Invocando la funzione useState passandogli un valore iniziale di una variabile tramite il destructuring si definisce il nome della variabile che tiene il valore ed il nome della funzione che può modificare tale variabile:

```javascript
let [name, setName] = useState("mario");
let [age, setAge] = useState(25);

const handleClick = (msg, e) => {
  setName("luigi");
  setAge(30);
};
return (
  <div className="home">
    <h2>
      {name} os {age} years old
    </h2>
    <div>
      <button onClick={handleClick}> cambia</button>
    </div>
  </div>
);
```

Il valore passato dentro l'useState può essere qualsiasi, numeri, oggetti, array

# Props

Sono i parametri di input del componente. E' possibile passare una funzione che modifica uno stato del padre ad un figlio in modo da poterla utilizzare dentro il figlio (che eventualmente passerà dei parametri). In senso opposto si passa una fn da un padre al figlio e viceversa.

# useEffect Hook

L'hook useEffect, ad ogni render del componente, esegue una funzione con relative istruzioni. Il componente renderizza all'inizio e quando lo stato cambia. Il secondo parametro permette di definire su quale variabile si vuole stare in ascolto del cambiamento (come il watch in vue e in angular). [Tramite l'useEffect si può stare in ascolto delle prop che cambiano](https://app.pluralsight.com/guides/prop-changes-in-react-component)!

Da notare che in caso di applicazione con router nel momento in cui si cambia pagina il componente è tolto dal dom (unMounted) ma la funzione useEffect continua a girare. Per risolvere il problema si usa il così detto useEffect Cleanup !!!!

# VSC & Debug

- aggiungere l'estenzione [Simple react snippets](https://marketplace.visualstudio.com/items?itemName=burkeholland.simple-react-snippets) che aggiunge dei comodi shortcut quali:
  - sfc, genera un stateless funcional component
- per usare Emmet dentro i react component nei settings cercare Emmet e premere il btn add item ed inserire la chiave `javascript` e valore `javascriptreact`
- scaricare l'estenzione `React developer tools` per Chrome e Firefox che aggiunge l'albero dei componenti dentro al browser

## Custom HOOKS

- [custom-hook-to-fetch-data](https://dev.to/abhmohan/react-custom-hook-to-fetch-data-a72)
- [custom-hook-to-fetch-data axious](https://dev.to/keyurparalkar/creating-custom-hook-for-fetching-data-in-react-3mo3)
- [custom-hook-to-fetch-cash-data](https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/)

## Hooks us Composition API

The difference between the Vue Composition API and React Hooks is that React Hooks can run multiple times during rendering; Vue’s setup function runs only once while creating a component

- [compare-react-hooks-with-vue-composition-api](https://developpaper.com/compare-react-hooks-with-vue-composition-api/)
- [vue-composition-api-vs-react-hooks](https://blog.logrocket.com/vue-composition-api-vs-react-hooks/)

Da guardare:
https://github.com/alextim/vite-plugin-simple-json-server/tree/main
