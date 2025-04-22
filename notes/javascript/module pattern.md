# Module/Reveal pattern

In precedenza per tenere delle variabili private si aveva il module/reveling pattern con IIFE
```javascript
const module = (function(opt){
    var a = 1 || opt;
    function foo() { a++}
    function bar() {a--}

    return { 
        foo: foo, 
        bar: bar
    };

})(externalOtp);
```

Ed il pattern con constructor function:
```javascript
function myModule(opt) {
    var a = 1 || opt;
    function foo() { a++}
    function bar() {a--}

  return { 
    foo: foo, 
    bar: bar
  };
}
```

Con javascript ES6 si può invece scrivere un modulo in un file separato in cui le variabili sono visibili all'interno del solo modulo:
```javascript
// new-file.js si esportano SOLO FUNZIONI dentro un OBJ
function foo() ...
function bar() ...

export { foo, bar };

// 0) si importano le funzioni singolarmente
import { foo, bar } from './new-file.js';

foo();
bar();
```

```javascript
// new-file.js
function foo() ...
function bar() ...

export default { foo, bar }; // si esportano come default

// 1) import file
import baz from './new-file.js';
const { foo, bar } = baz;   // si importano facendo il descructuring
foo();
bar();

// 2) import file
import baz from './new-file.js';    // si importano con un namespace
baz.foo();
baz.bar();
```