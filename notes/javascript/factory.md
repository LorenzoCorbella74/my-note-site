# Factory function al posto di classi

E' possibile incapsulare proprietà e metodi in classi secondo la constructor function (ES5) che con le classi (ES6):

```js
/* -------------- 1) pseudoclassical OOP --------------*/
 
const Foo = function (value) {
  this._value = value; // privata per convenzione ma non nella realtà
};

// public interface
Foo.prototype.add = function (number) {
  return number + this._value;
};

// uso
const foo = new Foo(42);
foo.add(1); 


/* -------------- 2) class declaration --------------*/

const Foo = class {
  constructor (value) {
    this._value = value; // privacy by convention
  }

  // public interface
  add (number) {
    return number + this._value;
  }
};

// uso
const foo = new Foo(42);
foo.add(1);
```

Per superare le problematiche delle classi che non possono avere membri privati si può usare le factory function nel seguente modo:
```js
const createFoo = (spec) => {
  const value = spec.value; // real privacy
  const result = {
    add: (number) => number + value
  };

  return result;
};

const foo = createFoo({ value: 42 });
foo.add(1); // => 43
foo.value; // => undefined

/* -------------- 3) Factory function con ES6 --------------*/

/**
 * @param {Object} spec a specification object
 * @return {Object}
 */
const createFoo = (spec) => {
  // private state
  let { value } = spec; // selectively read from spec

  // public, immutable interface
  return Object.freeze({
    add: (number) => number + value
  });
};

// uso
const foo = createFoo({ value: 42 });
foo.add(1); // => 43
foo.value; // => undefined
```

## Funzioni al posto di classi con metodi statici

Un'altro punto contro le classi ES6 aventi metodi statici (quindi usato come singleton senza la keyword __new__) è quello di convertire tali metodi in funzioni esportabili singolarmente. Questo, anche se sembra più scomodo per importare tante funzioni permette di usare "solo quello che serve".
```js
export class StringUtil {
  static reverse(value) {
    return value
      .split('')
      .reverse()
      .join('');
  }

  static greeting(value) {
    return `Hello ${value}!`;
  }

  static camelToKebab(value) {
    return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
}

// Uso
import { StringUtil } from './string-util'; // oppure import StringUtil from './string-util' se è esportato come default.
console.log(StringUtil.reverse('Hello'));

```
Si può usare un modulo ES6 che esporta n funzioni pure che possono essere importate o singolarmente o tramite la sintassi __* as NomeAlias__ :

```js
export function reverse(value) {
  return value
    .split('')
    .reverse()
    .join('');
}

export function greeting(value) {
  return `Hello ${value}!`;
}

export function camelToKebab(value) {
  return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// Uso
import {reverse} from './stringhe';
let test = reverse('ciccio prova');

// import * as Stringhe from './stringhe';
// let test = Stringhe.reverse('ciccio prova');
```


# Builder pattern

E' possibile implementare il __build pattern__ senza le classi. L'idea è avere due funzioni:
- la 1° costruisce un oggetto tramite dei metodi e tramite il metodo build chiama la 2° con opportuni parametri: da notare che nei metodi non è stata messa l'arrow function che avrebbe fatto sbagliare il contesto.
- la 2° torna un oggetto con 2 metodi che richiede dei parametri passati dal 1°
```js
const axios = require('axios').default;
const fetch = require('node-fetch');

function executeWithFetch(...request) {
  return fetch(...request);
}

function executeWithAxios(...request) {
  return axios(...request);
}

const maker = (baseUrl, headers, executor) => {
  const post = (endpoint, data) => {
    const url = `${baseUrl}${endpoint}`;
    return executor({
      url,
      data,
      method: "POST",
      headers: headers
    });
  };

  const get = (endpoint, params) => {
    const url = `${baseUrl}${endpoint}`;
    return executor({
      url,
      params,
      method: "GET",
      headers: headers
    });
  };

    // interfaccia pubblica
  return { post, get;
};

const builder =  () => {
  return {
    forBaseUrl: function(baseUrl) {
      this.baseUrl = baseUrl;
      return this;
    },
    withHeaders: function(headers) {
      this.headers = headers;
      return this;
    },
    usingFetch: function() {
      this.executor = executeWithFetch;
      return this;
    },
    usingAxios: function() {
      this.executor = executeWithAxios;
      return this;
    },
    build: function() {
      return maker(this.baseUrl, this.headers, this.executor);
    }
  };
}

```


```js
// USO
const client = builder()
  .forBaseUrl("https://jsonplaceholder.typicode.com")
  .withHeaders({ Authorization: "Bearer ABACABA" })
  .usingAxios()
  .build();

client
  .get("/users", {})
  .then(res => {
    console.log(res);
  })
  .catch(e => console.log(e));
```

# Sources
- [class-free-object-oriented-programming](https://depth-first.com/articles/2019/03/04/class-free-object-oriented-programming/)
- [builder-pattern-in-javascript-without-classes](https://everyday.codes/javascript/builder-pattern-in-javascript-without-classes/#)

