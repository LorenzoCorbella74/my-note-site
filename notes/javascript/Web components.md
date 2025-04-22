# Web Components
I [Web_Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) sono un gruppo di standards che permettono di scrivere elementi(tags) HTML custom, modulari e riusabili:
* Custom Elements
* Shadow DOM
* ES Modules
* HTML Templates

Si può definire un Web component tramite il seguente codice:

```js
class MyElement extends HTMLElement {
    
    // chiamata quando è costruito (prima di esser attaccato l'elemento al DOM)
    constructor() {
        super(); 
        console.log('constructed!');
    }

    // quando è inserito nel dom (è equiparabile a onInit)
    connectedCallback() {
        console.log('connected!');
    }

    // quando è rimosso dal DOM (è equiparabile a onDestroy)
    disconnectedCallback() {
        console.log('disconnected!');
    }

    // chiamato quando un attributo 'osservato' cambia (è equiparabile a onChange)
    attributeChangedCallback(name, oldVal, newVal) {
        console.log(`Attribute: ${name} changed!`);
    }

    adoptedCallback() {
        console.log('adopted!');
    }

    // con questo getter si osserva uno specifico attributo...
    static get observedAttributes() {
        return ['my-attr'];
    }
}

// Si registra il custom element dentro il "CustomElementRegistry"
window.customElements.define('my-element', MyElement);
```
Esempio di elemento lista con il proprio template e css è il seguente (`to-do-app.js`):

```js
// Si definisce un template con dentro un tag style
const template = document.createElement('template'); 
template.innerHTML = `
                        <style>
                            :host {display: block;font-family: sans-serif;text-align: center;}
                            button { border: none; cursor: pointer;}
                            ul { list-style: none; padding: 0;}
                        </style>

                        <h1>To do</h1>
                        <input type="text" placeholder="Add a new to do"></input>
                        <button>✅</button>
                        <ul id="todos"></ul>
                        `;

class TodoApp extends HTMLElement {

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' }); /* give this component a shadowDOM */
        this._shadowRoot.appendChild(template.content.cloneNode(true)); // si copia il template dentro
        // bindings
        this.$todoList = this._shadowRoot.querySelector('ul');
        this.$todoList = this._shadowRoot.querySelector('ul');
        this.$input = this._shadowRoot.querySelector('input');
        this.$submitButton = this._shadowRoot.querySelector('button');
        // eventi
        this.$submitButton.addEventListener('click', this._addTodo.bind(this));
    }

    _addTodo() {
        if(this.$input.value.length > 0){
            this._todos.push({ text: this.$input.value, checked: false })
            this._renderTodoList();
            this.$input.value = '';
        }
    }

    _removeTodo(e) {
        this._todos.splice(e.detail, 1);
        this._renderTodoList();
    }

    _toggleTodo(e) {
        const todo = this._todos[e.detail];
        this._todos[e.detail] = Object.assign({}, todo, {
            checked: !todo.checked
        });
        this._renderTodoList();
    }

    _renderTodoList() {
        this.$todoList.innerHTML = '';

        this._todos.forEach((todo, index) => {
            let $todoItem = document.createElement('to-do-item');
            $todoItem.setAttribute('text', todo.text);
            if(todo.checked) {
                $todoItem.setAttribute('checked', '');                
            }
            $todoItem.setAttribute('index', index);
            $todoItem.addEventListener('onRemove', this._removeTodo.bind(this));
            $todoItem.addEventListener('onToggle', this._toggleTodo.bind(this));

            this.$todoList.appendChild($todoItem);
        });
    }

    // SETTER di input!!!!
    set todos(value) {
        this._todos = value;
        this._renderTodoList();
    }

    get todos() {
        return this._todos;
    }
}

window.customElements.define('to-do-app', TodoApp);
```

Tramite i setter è possibile passare dei dati al custom element e renderizzare ad esempio una lista:

```js
document.querySelector('to-do-app').todos = [
    {text: "Make a to-do list", checked: false}, 
    {text: "Finish blog post", checked: false}
];
```
NOTA BENE: si passano dati al componente perchè gli attributi possono essere soltanto stringhe, quindi anche per gli attributi booleani si deve:
```html
<!-- la presenza  indica "true"-->
<div hidden></div>
<div hidden=""></div>
<div hidden="hidden"></div>
<!-- l'assenza implica il "false" -->
<div></div>
```

Esempio di singolo item dentro `to-do-item.js`:
```js
const template = document.createElement('template');
template.innerHTML = `
<style>
    :host { display: block; font-family: sans-serif;}
    .completed {text-decoration: line-through;}
    button { border: none; cursor: pointer;}
</style>
<li class="item">
    <input type="checkbox">
    <label></label>
    <button>❌</button>
</li>
`;

class TodoItem extends HTMLElement {
    
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$item = this._shadowRoot.querySelector('.item');
        this.$removeButton = this._shadowRoot.querySelector('button');
        this.$text = this._shadowRoot.querySelector('label');
        this.$checkbox = this._shadowRoot.querySelector('input');

        this.$removeButton.addEventListener('click', (e) => {
            this.dispatchEvent(new CustomEvent('onRemove', { detail: this.index }));
        });

        this.$checkbox.addEventListener('click', (e) => {
            this.dispatchEvent(new CustomEvent('onToggle', { detail: this.index }));
        });
    }

    connectedCallback() {
        // We set a default attribute here; if our end user hasn't provided one,
        // our element will display a "placeholder" text instead.
        if(!this.hasAttribute('text')) {
            this.setAttribute('text', 'placeholder');
        }

        this._renderTodoItem();
    }

    _renderTodoItem() {
        if (this.hasAttribute('checked')) {
            this.$item.classList.add('completed');
            this.$checkbox.setAttribute('checked', '');
        } else {
            this.$item.classList.remove('completed');
            this.$checkbox.removeAttribute('checked');
        }
        this.$text.innerHTML = this._text;
    }

    static get observedAttributes() {
        return ['text', 'checked', 'index'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name){
            case 'text':
                this._text = newValue;
                break;
            case 'checked':
                this._checked = this.hasAttribute('checked');
                break;
            case 'index':
                this._index = parseInt(newValue);
                break;
        }
    }

   /* 
        E' possibile mettere in sync le proprietà e gli attributi tramite dei setter/getter
   */  
    get checked() {
        return this.hasAttribute('checked');
    }
    set checked(val) {
        if (val) {
            this.setAttribute('checked', '');
        } else {
            this.removeAttribute('checked');
        }
    }

    set index(val) {
        this.setAttribute('index', val);
    }

    get index() {
        return this._index;
    }
}
window.customElements.define('to-do-item', TodoItem);
```

# Passare dati dentro i WEB component
E' opportuno passare i dati come attributi se sono stringhe e come proprietà se sono oggetti. Notare come vadano settati dei getter per valorizzare delle proprietà private interne al componente. Inoltre tutti gli eventi `on` funzionano sui custom element ma sono attaccati a funzioni globali e non metodi di istanze di componenti.... [source](https://stackoverflow.com/questions/55468533/how-to-pass-js-object-and-functions-to-a-web-component):
```html
<my-component onclick="myFunction(event)"></my-component>
```

```js
function myFunction(e){
  alert(JSON.stringify(e.target.data));
  e.target.data = {a:1,b:"two"};
}

class MyComponent extends HTMLElement {
  constructor() {
    super();
    this._data = 0;
    this.attachShadow({mode:'open'}).innerHTML="Click Me";
  }

  static get observedAttributes() {
    return ['data'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (oldVal !== newVal) {

    }
  }

  get data() {
    return this._data;
  }
  set data(newVal) {
    this._data = newVal;
  }
}

customElements.define('my-component', MyComponent);
```

In teoria ogni componente, in quanto oggetto, darebbe la possibilità di accedere alle funzioni interne del componente o settare anche delle funzioni come funzioni di componenti esterni sullo scope di altri componenti:
```js
let comp = document.querySelector( 'my-child-component' )
comp.myMethod( obj )

// o da un altro componente che lo contiene...
comp.funz = this.parent.someFunction()

```

# Passare dati tra componenti vicini
L'idea è quella di utilizzare degli eventi custom come tra normali elementi HTML.
```js
onClick() {
  const myEvent = new CustomEvent('x-increment', {
    bubbles: true,  // bubble event to containing elements
    composed: true, // let the event pass through the shadowDOM boundary
    detail: {       // an object to hold any custom data that's attached to this event
      amount: 1,
    }
  });
  this.dispatchEvent(myEvent);
}
```

L'evento può essere ascoltato da altri componenti dentro il costruttore:
```js
constructor() {
  super();
  // attach shadowDOM here

  this.addEventListener('x-increment', (event) => {
    // extract data
    const { amount } = event.detail;// 1
    // pass down to a child
    this.shadowRoot.querySelector('x-target').amount = amount;
  });
}
```

# Gestire lo stato con un componente contenitore 
Un pattern utile è avere un componente contenitore che gestisce lo stato dell'applicazione catturando gli eventi dei figli e passando i dati giù alla gerarchia dei componenti figli (come avviene in altri framework, one way data flow...).
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Web Component 101</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link rel="stylesheet" href="/styles/app.css">          <!-- si carica gli stili principali-->
    <script type="module" src="/scripts/app.js"></script>   <!-- si carica il js  principale-->
  </head>  
  <body>
    <h1>Web Component Counter</h1>  
      
    <x-container>
      <x-counter></x-counter>
      <hr>
      <x-controls></x-controls>
    </x-container>
    
  </body>
</html>
```

```js

// src/main.js
import XContainer from './container.js';
import XControls from './controls.js';
import XCounter from './counter.js';

// set the element names for our components
customElements.define('x-container', XContainer);
customElements.define('x-controls', XControls);
customElements.define('x-counter', XCounter);

// dentro ogni file
class XContainer extends HTMLElement {
  constructor() {
    super();
    
    // any external prop can be defined here
    this.props = {};
    
    // our application level state is defined here, with initial values
    this.state = {
      amount: 2, // the step amount to increment/decrement
      total: 0,  // the running total
    };
    
    // give this component a shadowDOM
    this.attachShadow({ mode: 'open' });
    
    // add shadowDOM and slot in the lightDOM
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block;}
      </style>
      <slot></slot>  <!-- TRANSLCLUSION -->
    `;
    
    // add our event listeners for listening to state change requests
    // ensure our callbacks are bound to the component context
    this.addEventListener('x-increment', this.onIncrement.bind(this));
    this.addEventListener('x-decrement', this.onDecrement.bind(this));
    this.addEventListener('x-update-amount', this.onUpdateAmount.bind(this));
  }
  
  connectedCallback() {
    // update the shadowDOM with the intitial props/state
    this.updateChildren();
  }
  
  onDecrement(event) {
    // decrement our total by the current amount
    this.state.total = this.state.total - this.state.amount;
    
    // update the shadowDOM with the current props/state
    this.updateChildren();
  }
  
  onIncrement(event) {
    // increment our total by the current amount
    this.state.total = this.state.total + this.state.amount;
    
    // update the shadowDOM with the current props/state
    this.updateChildren();
  }
  
  onUpdateAmount(event) {
    // update our state to the desired amount
    this.state.amount = event.detail.amount;
    
    // update the shadowDOM with the current props/state
    this.updateChildren();
  }
  
  updateChildren() {
    // set the props of our child components (one-way data binding)
    this.querySelector('x-controls').amount = this.state.amount;
    this.querySelector('x-counter').total = this.state.total;
  }
}

export default XContainer;

// classe contatore
class XCounter extends HTMLElement {
  constructor() {
    super();
    
    // initialise the props for the component
    this.props = {
      total: 0,
    };
    
    // no internal state for this component
    this.state = {};
    
    // add shadowDOM
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <h2>Total: <span id="total">0</span></h2>
    `;
  }
  
  connectedCallback() {
    // ensure any initial properties set before the component was initialised our passed through our setters
    // si associa tutte le props al this
    Object.keys(this.props).forEach((propName) => {
      if (this.hasOwnProperty(propName)) {
        let value = this[propName];
        delete this[propName];
        this[propName] = value;
      }
    });
    // update the shadowDOM with the intitial props/state
    this.updateChildren();
  }
  
  // per ogni prop si associa ad un getter/setter che mette le prop
  set total(value) {
    // update our props with new value
    this.props.total = value;
    this.updateChildren();
  }
  
  get total() {
    // return the prop
    return this.props.total;
  }
  
  updateChildren() {
    // set the props of our child components (one-way data binding)
    this.shadowRoot.querySelector('#total').innerText = this.props.total;
  }
}

export default XCounter;

// controls
class XControls extends HTMLElement {
  constructor() {
    super();
    // initialise the props for the component
    this.props = {amount: 1};
    // no internal state for this component
    this.state = {};
    // add shadowDOM
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {display: flex;}
      </style>
      <div>
        <label for="amount">Amount</label>
        <input type="number" id="amount">
      </div>
      <div>
        <button id="increment">+</button>
        <button id="decrement">-</button>
      </div>
    `;
    // add our event listeners for our component controls
    // ensure our callbacks are bound to the component context
    this.shadowRoot.querySelector('#amount').addEventListener('input', this.onUpdateAmount.bind(this));
    this.shadowRoot.querySelector('#increment').addEventListener('click', this.onIncrement.bind(this));
    this.shadowRoot.querySelector('#decrement').addEventListener('click', this.onDecrement.bind(this));
  }
  
  connectedCallback() {
    // ensure any initial properties set before the component was initialised our passed
    // through our setters
    Object.keys(this.props).forEach((propName) => {
      if (this.hasOwnProperty(propName)) {
        let value = this[propName];
        delete this[propName];
        this[propName] = value;
      }
    });
    
    // update the shadowDOM with the intitial props/state
    this.updateChildren();
  }
  
  set amount(value) {
    // update our props with new value
    this.props.amount = value;
    
    this.updateChildren();
  }
  
  get amount() {
    // return the prop
    return this.props.amount;
  }
  
  onUpdateAmount(event) {
    // get value from input
    const amount = parseInt(event.target.value, 10);
    
    // dispatch event to update our container state
    this.dispatchEvent(new CustomEvent('x-update-amount', {
      bubbles: true,
      composed: true,
      detail: {
        amount,
      },
    }));
  }
  
  onIncrement(event) {
    // dispatch event to update our container state
    this.dispatchEvent(new CustomEvent('x-increment', {
      bubbles: true,
      composed: true,
    }));
  }
  
  onDecrement(event) {
    // dispatch event to update our container state
    this.dispatchEvent(new CustomEvent('x-decrement', {
      bubbles: true,
      composed: true,
    }));
  }
  
  updateChildren() {
    // set the props of our child components (one-way data binding)
    this.shadowRoot.querySelector('#amount').value = this.props.amount;
  }
}

export default XControls;
```


## Separare la classe dal template
E' possibile implementare il metodo usato [qua](https://stackoverflow.com/questions/55080103/how-to-separate-web-components-to-individual-files-and-load-them).

## Sources
* [web-components-from-zero-to-hero](https://dev.to/thepassle/web-components-from-zero-to-hero-4n4m)
* [how-to-pass-data-between-web-components](https://lamplightdev.com/blog/2019/03/13/how-to-pass-data-between-web-components/)

## CSS foe Web Component
* [on-styling-web-components](https://blog.webf.zone/on-styling-web-components-b74b8c70c492)
* [Styling Web Components Using A Shared Style Sheet](https://www.smashingmagazine.com/2016/12/styling-web-components-using-a-shared-style-sheet/)
* [styling-a-web-component](https://css-tricks.com/styling-a-web-component/)

## Polyfills
Utilizzando il bundler [parcel]() si è poi utilizzato il plugin [parcel-plugin-webcomponents](https://github.com/Cortys/parcel-plugin-webcomponents) che include [webcomponentsjs](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs), mantenuto da Google, polyfills nelle builds.