# Corso "React 18 Fundamentals"

React è una libreria javascript per costruire User Interfaces basata su componenti. L'idea è costruire SPA tramite una gerarchia di componenti riutilizzabili, aventi uno state interno e l'UI dichiarata tramite javascript che viene rirenderizzata quando lo state cambia: tale operazione di ri rendering, chiamata RECONCILIATION, è selettiva (si aggiornano le parti dell'UI che devono cambiare).

## Anatomia di una app

I componenti sono funzioni javascript che ritornano JSX (Javascript eXtension) transformato da [BABEL](https://babeljs.io/) in Markup HTML.

```js
// I componenti CUSTOM sono PascalCase !!!!
const Banner = () => <h1>his is a banner</h1>;
// NB: se vogliamo andare a capo  si deve mettere le (<h1>his is a banner</h1>)

// 1) convertito da BABEL in Javascript
React.createElement("h1", null, "This is a banner");

// 2) convertito da React DOM in HTML: <h1>his is a banner</h1>
```

L'attributo _class_ in HTML è convertito in _className_ per non aver conflitti javascript con la relativa keyword.

Prima si costruivano i componenti come classi, ma ora è raccomandato usare solo i function component:

```js
class Banner extends React.Component {
  render() {
    return <h1>his is a banner</h1>;
  }
}
```

Si può usare un componente dentro il JSX di un altro componente avendo così una composizione.

## Tools

Per costruire applicazioni con React.js si usano principalmente due tool:

- [Create react app](https://create-react-app.dev/)
- [Next.js](https://nextjs.org/) che ha caratteristiche server side (pre rendering component & building APIs), ma può essere usato anche per applicazini react.
  Una volta installato [Node.js](nodejs.org) si starta il progetto con la 2° opzione (che usa internamente Webpack):

```bash
> npx create-ext-app nome-progetto
> cd nome-progetto && code .

# si starta il dev environment su localhost:3000 con
> npm run dev

# si  esegue un check di es-lint (oppure se si installa in VSC l'estenzione ESLInt si vedrà subito le violazioni sul codice)
> npm run lint
```

Nei progetti creati con Next.js il root component è all'interno di `/pages/index.js` (e può essere tolto \_app.js che è specifico di next.js) e tutti i componenti devono essere dei moduli js contenuti in singoli file _che devono essere esportati_ per essere disponibili:

```js
// banner.js
const Banner = ()=> (
    <h1>his is a banner</h1>
    <img src="./logo.png" alt="logo">
);

export  default doSomething;

// si importa e si può usare un nome diverso
import Banner from "./banner.js";

const App = ()=> (
    <Banner />
    <h1>his is an app</h1>
    );
```

Tutti ifile statici devono essere messi all'interno della cartella `/public` creata da next.js.

## Debug

Pe debuggare con i developer tools dei browsers si deve usare _la cartella \_N_E_ che ripresenta la struttura del codice. E' consigliato inoltre installare il plugin per Chrome [React Developer Tool](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) che permette i vedere la gerarchia dei componenti (e realtive props) e il Profiler (le monitora le prestazioni dell'app).

## Styling Components

E' possibile aggiungere stile in vari modi:

1. in Next.js dentro \_app.js
2. caricare CSS file nel HTML root document (non c'è in next.js ma in create-react-app si!!)
3. applicare un file CSS a livello del singolo componente

- usare l'attributo style sul componente

Relativamente al caso 2 è possibile create un file _/pages/\_document.js_ con il seguente contenuto dove dentro l'Head si mette un riferimento ad un CSS esterno e uno locale (dentro la cartella `/public`):

```js

import {Html, Body, Main, NextScript} from "next/document";

export default function Document(){
    return (
        <Html>
        <Head>
        <link href="https://cdn.jsdeliver.net/npm/bootstrap@5.1.3" rel="stylesheet">
        <link rel="stylesheet" href="css/globals.css">
        </Head>
        <Body>
            <div className="container">
                <Main />
            </div>
            <NextScript />
        </Body>
        </Html>
    )
}
```

Per isolare il css su un solo componente si usano i CSS Modules (non sono una React feature, ma sono forniti da Webpack che permette il bundling e i nomi delle classi sono automaticamente rinominati per valere solo su un componente) che permettono di importare un CSS file in un solo componente.

```javascript
import styles from "./banner.module.css";

const Banner = ()=> (
    <h1>his is a banner</h1>
    <img src="./logo.png" alt="logo" className={styles.logo}>
);
```

oppure con il destructuring:

```javascript
import {logo} from "./banner.module.css";

const Banner = ()=> (
    <h1>his is a banner</h1>
    <img src="./logo.png" alt="logo" className={logo}>
);
```

### Inline style

E' infine possibile usare lo style attribute, anche se è una pratica scoraggiata, che prende un oggetto che contiene proprietà css in camelCase (e non includono '-'):

```javascript
const titleStyle = { fontStyle: "italic" };

const Banner = () => <h1 style={titleStyle}> this is a banner</h1>;
```

# Props

Tramite le props (un oggetto, una referenza a variabili, non una COPIA!!) è possibile passare argomenti dall'esterno ad un componente. La regola generale è che _le props sono read only_, il componente non può modificare cosa riceve dall'esterno, ma solo notificare il componente padre di modificare cosa riceve. Per stringhe

```javascript
// esempio stringhe
const app = () => (
  <Banner headerText="Ciao bello">
    testo dentro i tag di apertura e chiusura
  </Banner>
);

// in caso di oggetti si passa
const conf ={...};

const app = () => (
  <Banner config={conf} />
);

const Banner = (props) => <h1>{props.headerText}</h1>;

const jsx = <h2>Hi </h2>;

// oppure con il desctructuring
const Banner = ({ headerText, children }) => (
  <React.Fragment>
    {jsx}
    <h1>{headerText}</h1>
    <p>{children}</p>
  </React.Fragment>
);
```

la proprietà _children_ contiene tutto il markup presente tra il tag iniziale e di chiusura.

Il _React.Fragment_ permette di racchiudere il contenuto del componente all'interno di un elemento (o un suo shortcut <> </>, l'elemento vuoto).

## Liste

```javascript
const List = ({ items }) => (
  <tbody>
    {items.map((item) => (
      <tr key={item.id}>
        <td>{item.title}</td>
        <td>{item.description}</td>
      </tr>
    ))}
  </tbody>
);
```

Da notare che ogni item ha bisogno di avere un valore per una chiave _key_ che permette di ottimizzare il rendering di elementi che possono cambiare (come ultima spiaggia si può usare l'index della funzione .map() anche se può causare problemi se l'ordine degli item cambia).

Si può rifattorizzare in due maniere:

```javascript
const List = ({ items }) => (
  <tbody>
    {items.map((item) => (
        <Item key={item.id} item={item}>
    ))}
  </tbody>
);

const Item = ({ item}) => (
   <tr>
        <td>{item.title}</td>
        <td>{item.description}</td>
    </tr>
);
```

oppure (anche se può influire sulle prestazioni se si hanno tante proprietà):

```javascript
const List = ({ items }) => (
  <tbody>
    {items.map((item) => (
        <Item key={item.id} {...item}>
    ))}
  </tbody>
);

const Item = ({ title, description }) => (
   <tr>
        <td>{title}</td>
        <td>{description}</td>
    </tr>
);
```

```javascript
const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default currencyFormatter;

// poi importata nel componente
import currencyFormatter from "../helpers/currencyFormatter";
const Item = ({ item }) => (
  <tr>
    <td>{item.title}</td>
    <td>{item.description}</td>
    <td>{currencyFormatter.format(item.price)}</td>
  </tr>
);
```

E' possibile avere una libreria di funzioni di formattazione (come i pipe in angular) che possono essere richiamati ed utilizzati nel codice:

# Hooks

Sono funzioni che iniziano per _use_ che incapsulano complessità. Built in hook permettono di usare le funzionalità interne di React all'interno dei function component. OLtre ai built-in hooks è possibile costruirsi dei custom-hooks che possono essere importati nei componenti.
Si devono considerare due regole fondamentali:

1. Possono essere chiamati soltanto al top level del file(e non possono essere chiamati condizionalmente)
   e nello stesso ordine tutte le volte che la component function è chiamata.
2. Possono essere usati soltanto in function component (ad eccezione dei custom hook che possono usare anche i built in hooks)

## useState

Se le props sono passate dall'esterno lo state è interno al componente. Per poter modificare delle variabili si usa l'hook _useState_ che tramite destructuring permette di accedere alla var che si vuole modificare e alla funzione che può modificarla.

```javascript
const List = () => {
    const [items, setItems]=useState(itemsArray)
    return (
        <>
             <tbody>
                {items.map((item) => (
                    <Item key={item.id} {...item}>
                ))}
            </tbody>
        </>
    )
};
```

`itemsArray` è un array di inizializzazione. La funzione viene fatta girare soltanto al primo giro.
Quando viene chiamata `setItems` React sa che deve ri renderizzare il componente (quando lo stato del componente cambia si ha il ri-rendering). Non si può direttamente modificare `items` perchè è un valore read only, si deve per forza utilizzare `setItems`.

```javascript
const addItem = () => {
  setItems([...items, { id: 3, title: "tre", price: 5 }]);
};

// chiamata da un btn in JSX con
// onClick={addItem}
```

La funzione di set contiene un parametro relativa al valore corrente dello state:

```javascript
const [counter, setCounter] = useState(0);

setCounter((current) => current + 1);
```

Ciò che è props per un componente è magari state per il suo padre

## Rendering e Side effects

Quando si definisce il design di una applicazione è importante considerare che se tante funzioni sono fatte rigirare per rispondere ad un cambiamento di un solo pezzo di state allora conviene ottimizzare la gerarchia di tali componenti.
React si affifa a pure function, cioè a fn che ritornano sempre lo stesso risultato con lo stesso input e pertanto possono essere cachate. Le component function a stessi input (props e state) torna sempre lo stesso jsx.

C'è un metodo per momorizzare (cachare) l'output di un componente e prevenire che quando lo stato del componente padre cambia si abbia il rerender anche del componente figlio:

```javascript
import React from "react";

const Item = ({ item }) => (
  <tr>
    <td>{item.title}</td>
    <td>{item.description}</td>
    <td>{item.price}</td>
  </tr>
);

const ItemMem = React.memo(Item);
export default Item;
export { ItemMem };
```

E' opportuno usarlo quando il beneficio è misurabile (tramite il Profile tool del plugin di Chrome), quando si hanno pure functinal component e quando il rerender accade spesso con gli stessi valori di props.

## Effects

In realtà funzioni pure non sono frequenti perchè spesso avvengono operazioni non prevedibili che dovrebbero essere poste a lato (non devono essere parte di pure fn). Tali operazioni sono dette _Side effects_ e facendo degli esempi sono:

- interazione con API
- uso di browser api (document, window, etc)
- timing function (settimeout)

In tali casi si usa l'hook _useEffect_ che prende una funzione come parametro ed è eseguita automaticamente quando react esegue la pure function del componente ed il browser è stato aggiornato (quindi viene eseguita dopo il rendering!!!!):

```javascript
import React, { useEffect, useState } from "react";
const List = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // perform effect (es fetch data from API)
    const fetchItems = async () => {
      const response = await fetch("/api/items");
      const items = await response.json();
      setItems(items);
    };
    fetchItems();
  }, []);
};
```

Per non avere un infinite loop si deve instruire React ad eseguire l'useEffect solo in certi casi specificando il così detto dependancy array:

- per eseguire _soltanto una volta, quando il componente renderizza la 1° volta si usa un array vuoto []_.
- quando si vuole guardare ad una proprietà che cambia si deve mettere nell'array delle dipendenze.

Da notare che quando si hanno molti effetti è oportuno mettere ogni singolo effetto dentro la propria funzione useEffect e relativi array di dipendenze per meglio distinguere le logiche.

Inoltre è possibile ritornare una funzione da useEffect per eventualmente "pulire" certe attività (come stream di eventi o):

```javascript
useEffect(() => {
  // subscribe
  return () => {
    // unsubscribe quando il componente
    // è smontato dal DOM
  };
}, []);
```

## UseMemo hook

Per memorizzare valori in un componente ed aumentare la performance generale del componente che lo utilizza si usa l'hook useMemo che permette di memorizzare valori calcolati/dipendenti da altri parametri (che verrebbero calcolati ad ogni ri-rendering).

```javascript
const result = timeConsumingCalculation(items);

// diventa con useMemo
const result = useMemo(() => {
  return timeConsumingCalculation(items);
}, [items]);
```

Come secondo parametro si usa un array di variabili che permette di definire i parametri da cui dipende il calcolo.

# useRef hook

L'hook useRef può essere usato per conservare dei valori che persistono tra più passate di rendering. La differenza rispetto ad un useState e che _quando si modifica un ref value non causa un ri-render_.

Se voglio contare quante volte renderizza un componente

```javascript
const [counter, setCounter] = useState(0);

useEffect(() => {
  setCounter(counter + 1); // causa un infinite loop
}, []);
```

con useState si ha un infinite loop mentre con useRef torna un oggetto con una proprietà current che non causa un ri-render.

```javascript
const counter = useRef(0);

useEffect(() => {
  ounter.current++;
}, []);
```

quando un reference type è passato a useRef, tale hook garantisce che la stessa referenza è ritornata nel campo .current lungo vari ri-renders.

E' inoltre utilizzato per avere accesso a DOM object e componenti:

```javascript
const TextInputWithFocusBtn = () => {
  const inputEl = useRef(null);
  const onBtnClick = () => {
    inputEl.current.focus();
  };

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onBtnClick}>Focus the inpt </button>
    </>
  );
};
```

## Conditional rendering & stared state

E' possibile avere dei rendering condizionali tramite le seguenti 4 condizioni:

1. if statement
2. operatore ternario
3. operatore &&
4. return multipli dal componente per distinguere varie casistiche (loading, success, error)

Esempio di if statement:

```javascript
import currencyFormatter from "../helpers/currencyFormatter";
const Item = ({ item }) => {
  let priceTd;
  if (item.price < 50) {
    priceTd = <td>{currencyFormatter.format(item.price)}</td>;
  } else {
    priceTd = (
      <td className="text-primary">{currencyFormatter.format(item.price)}</td>
    );
  }

  return (
    <tr>
      <td>{item.title}</td>
      <td>{item.description}</td>
      {priceTd}
    </tr>
  );
};
```

Esempio di operatore ternario direttamente nel JSX:

```javascript
const Item = ({ item }) => {
  return (
    <tr>
      <td>{item.title}</td>
      <td>{item.description}</td>
       <td className={`${item.price<50?"text-primary":"">}`}>{currencyFormatter.format(item.price)}</td>;
    </tr>
  );
};
```

Oppure se voglio rimuovere un elemento se una certa proprietà è falsy utilizzo l'operatore _&&_:

```javascript
const Item = ({ item }) => {
  return (
    <tr>
      <td>{item.title}</td>
      <td>{item.description}</td>
       {item.price && (<td className={`${item.price<50?"text-primary":"">}`}>{currencyFormatter.format(item.price)}</td>)}
    </tr>
  );
};
```

Da notare che è possibile passare componenti dentro gli attributi di un componente. Un esempio è nel [post](https://medium.com/@marcioc0sta/strategy-pattern-for-conditional-rendering-797d9a3261f7) dove si utilizza uno strategy pattern per scegliere o un componente o un'altro (senza mettere if, switch o ternari).

## Eventi

```javascript
import React from "react";

const ShowAlertComponent = () => {
  const showAlert = () => {
    alert("I'm an alert");
  };

  return <button onClick={showAlert}>Show alert</button>;
};
export default ShowAlertComponent;
```

oppure passando parametri:

```javascript
const App = () => {
  const [count, setCount] = useState(0);
  const sayHello = () => {
    alert("Hello!");
  };

  return (
    <div>
      <p>{count}</p>
      <button
        onClick={() => {
          sayHello();
          setCount(count + 1);
        }}
      >
        Say Hello and Increment
      </button>
    </div>
  );
};
```

Per eventi geenrali:

```javascript
const App = (props) => {
  const handleKeyDown = (event) => {
    console.log("A key was pressed", event.keyCode);
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="container">
      <h1>Welcome to the Keydown Listening Component</h1>
    </div>
  );
};
```

## Montare e smontare i componenti

Quando i componenti vengono renderizzati sono detti "mounted" quando sono tolti dal DOM sono "unmounted" e lo state di questi componenti è distrutto

## Wrapper function

Quando i figli ricevono delle funzioni dal padre hanno la possibilità di intervenire sul modello del padre. Invece di passare direttamente la fn _setSelectedHouse_ si passa la funzione wrapper _selectedHouseWrapper_ che può prevenire il problema:

```javascript
const App = () => {
  const [selectedHouse, setSelectedHouse]=useState()

  const selectedHouseWrapper =
    // qua si può fare la validazione che
    // ciò che è passato alla fn è realmente
    // ciò che ci sia aspetta (una house)
    useCallback((house)=> {
      setSelectedHouse(house);
    },[])
  }

  return (
    <>
    {selectedHouse? (
      <House house={selectedHouse} />
    ):(<HouseList selectedHouse={selectedHouseWrapper}>)}
  )
}
```

Da notare che la fn è ricreata (quindi una nuova reference) ad ogni rendering, pertanto attenzione a quando la fn è passata a componenti "memorizzati" con React.memo. Se cambia la referenza il componente e ri-renderizzato!. Oppure se la fn è usata come dipendenza di un effetto, l'effectFn verrà eseguita. Per prevenire questo problema può essere usato l'hook _useCallback_ preservando la stesso riferimento di fn lungo vari ri-rendering (cioè la funzione contenuta viene memorizzata).

-> funzioni come dipendenza di effetti ??????

## Custom Hooks

Sono delle funzioni esportate come modulo che non ritornano JSX ma possono usare altri hooks. I custom hooks devono sempre avere il prefisso _use_.Possono essere usati per riutilizzare codice tra più componenti ( ma ognuno con il proprio _isolated state_)

```javascript
const useHouses = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchHouses = async () => {
      const response = await fetch("/api/houses");
      const houses = response.json();
      setHouses(houses);
    };
    fetchHouses();
  }, []);

  return { houses, setHouses };
};

export default useHouses;
```

Si può togliere della logica da un componente per metterla su un custom hook. Tale possibilità permette di snellire i componenti portando la logica di modifica all'interno degli hook stessi che possono servire per + componenti anche se _lo state per ogni call ad esso è isolato_ quindi se useHouses è usato in un altro componente riceverebbe un altro houses state diverso da quello di un altro componente, quindi non è una soluzione per condividere lo state globally (per quello si usa una feature chiamata CONTEXT):

```javascript
import useHouses from "../hooks/useHouses";
const HouseList = () => {
  const { houses, setHouses } = useHouses();

  // return JSX
};
```

La funzione hook può accettare parametri di ingresso e ritornare cambiamenti di stato ai componenti che la utilizzano che portano il ri-rendering del componente.

## Sharing state

Per condividere lo stato si usano le prop per passare lo stato del padre a componenti figli (e anche le funzioni possono essere passate). I custom hook sono potenti perchè permettono la riusabilità tra + componenti e ritornano lo state che ri-renderizza il componente che usa tali hook.

E' possibile anche accedere ad uno stato globale senza necessariamente passare informazioni giù per la gerarchia dei componenti. Tale feature di React è chiamata context:

1. Si deve creare un context

```javascript
const context = React.createContext("default value");
```

2. Nel componente che deve provvedere il context ai propri figli fornendo un certo valore (se non c'è viene usato il default):

```html
<context.Provider value="some_value">
  <!-- children -->
</context.Provider>
```

3. Nei componenti figli si può accedere al context:

```javascript
const value = useContext(context);
```

Quando il valore del contesto cambia, tutti i consumatori saranno ri-renderizzati. Generalmente si usa quando si deve passare lo stesso state a molti componenti attraverso le props (cioè molti componenti sono sincronizzati sulla stessa base di dati: le implicazioni possono essere purtroppo a livello prestazionale perchè molti componenti devono essere ri-renderizzati (e anche i loro figli). Un'altra implicazione e che se dei componenti si affidano ad un context specifico allora la loro riusabilità sarà limitata.

# Input & Forms

Si deve convertire gli elementi del form in modo da renderli reattivi (si dice controlled component in quando lo state è controllato da react):

```javascript
const formComponent = () => {
  const [person, setPerson] = useState({ firstname: "Alice", lastname: "Doe" });
  const change = (e) =>
    setPerson({ ...person, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    // sumit form to API
  };

  return (
    <form onSubmit={submit}>
      <input type="text" value={person.firstname} onChange={change} />
      <input type="text" value={person.lastname} onChange={change} />
      <!-- la textarea è usata come un input -- >
      <textarea value={state} onChange={change} />
      <!-- la select è usata come un input -- >
      <select value={state} onChange={change}>
        <option value="option1">1</option>
        <option value="option2">2</option>
      </select>
    </form>
  );
};

// per checkbox, radio si usa e.target.check
```

Si può usare il metodo sopra ma può essere lungo in quanto si deve prevedere un handler per gestire il cambiamento di ogni input. Un'altra soluzione può essere il non controllare un componente (uncontrolled component):

```javascript
const formComponentTwo = () => {
  const inputEl = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    // sumit form to API
    const inputValue = inputEl.current.value;
  };

  return (
    <form onSubmit={submit}>
      <input type="text" ref={inputEl} defaultValue={val} />
      <input type="submit" value="submit" />
    </form>
  );
};
```

Generalmente un file input è sempre un uncontrolled component perchè il suo valore può soltanto essere settato da un utente.
Se si vuole la validazione, error messages, handling form submission, state handling è opportuno ricorrere a librerie esterne come [formik](formik.org).

# Application Design

Quando si deve pensare all'application design di una app è importante tenere a mente i seguenti punti, secondo un processo continuo:

- si deve pensare alla gerarchia dei componenti che devono essere costruiti secondo il principio del single reponsibility principle (ogni componente deve fare bene una cosa, mostrare dei dati, recuperare dati, etc, non devono fare troppe cose contemporaneamente!!).
- definire una struttura dei file coerente: Una opzione è seguire la gerarchia dei componenti ed avere una struttura per feature/moduli con cartelle per:
  - componenti
  - hooks
- definire una cartella _common_ con componenti, hooks, utilities condivise nel progetto.

Con tale organizzazione è indicato rinominare il componente principale di ogni modulo come _index.js_ in modo che può poi essere importato con il nome della directory:

```js
/*
 houses 
     index.js  import HouseList from './houses';
     house.js
     useHouses.js
     useBids.ts
*/
```

Cosa finisce nello state:

- cosa non è passato da un padre come prop
- ciò che cambia nel tempo
- ciò che non può essere calcolato
  Ci deve essere solo un componente che contiene uno specifico pezzo dello state. L'idea è quello di mettere nel punto più basso della gerarchia la sola parte di state necessaria

## Links

- [React 18 Fundamentals](https://app.pluralsight.com/library/courses/react-18-fundamentals/table-of-contents)
- [Course repository](https://github.com/RolandGuijt/ps-react-fundamentals)
- [tips for writing better react code](https://javascript.plainenglish.io/tips-for-writing-better-react-code-ceb49e929001)
- [If. else component](https://betterprogramming.pub/how-i-improved-my-react-code-readability-and-maintainability-with-conditional-rendering-94b32448bc70)

- [Libraries for react 2022](https://www.robinwieruch.de/react-libraries/)
