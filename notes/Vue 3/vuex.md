# Vuex
E' una libreria ed un pattern per la gestione dello stato nelle applicazioni sviluppate con Vue.js. Concetto centrale in vuex è lo "store" ossia un oggetto reattivo condiviso (lo stato o `state`)che non può essere mutato direttamente se non tramite delle `mutation`. Essendo reattivo i propri cambiamenti possono essere osservati tramite le computed property. Nota centrale è dichiarare tutte le proprietà prima di qualsiasi altra operazione, invece di aggiungerle successivamente con:
```javascript
// Vue.set(obj, 'new prop', 123)
// state.obj = { ...state.obj, newProp: 123 }
```

Una nota importante è che non ci devono stare informazioni doppie, quindi lo stato di componenti deve essere distinto dallo stato globale.
Ci può essere il caso che lo stato locale manipoli le informazioni dello stato globale ma non devono essere doppie !!!!

```javascript
const store = new Vuex.Store({
    strict: true,   // con questo vuex avverte se si cerca di modificare lo state direttamente senza mutation (per development, rallenta molto...)
    state: {
        count: 0
    }
});

new Vue({ 
    el: '#app',
    store,
    computed: {
        count () {
            return this.$store.state.count  // si accede alla variabile dello store
        }
    }
});
```

## Mapstate
Per creare facilmente delle computed property si può utilizzare l'utility mapstate:
```javascript
const store = new Vuex.Store({
    state: {
        count: 3
    }
});

import { mapState } from 'vuex';

new Vue({ 
    el: '#app',
    store,
    data() {
        return {
            localCount: 4
        }
    },
    computed: mapState({
        count: state => state.count,    // si usa una funzione
        countAlias: 'count',            // countAlias è nel template e count è la prop delo store
        countPlusLocalState (state) {   // funzione che mescola stato globale e locale
            return state.count + this.localCount
        }
    })
    // oppure direttamente con stringhe delle variabili da osservare
    computed: mapState(['count'])
});
```

## Getters
Per recuperare dati filtrati dallo store si può usare dei `getters` come se fossero delle computed properties dello store che vengono cachate e vengono ricalcolate quando lo store cambia.

```javascript
const store = new Vuex.Store({
   state: {
       todos: [
           { id: 1, text: 'uno', done: true },
           { id: 2, text: 'due', done: false },
       ]
   },
   getters: {
       doneTodos: state => {
           return state.todos.filter(todo => todo.done);
       },
       doneTodosCount: (state, getters) => {
           return getters.doneTodos.length
       },
       getTodoById: (state) => (id) => {
           return state.todos.find(todo => todo.id === id)
       }
   }
});
new Vue({ 
    el: '#app',
    store,
    data: {
    },
    computed: {
        doneTodosCount () {
            return this.$store.getters.doneTodosCount
        },
        testNumOne(){
            return this.$store.getters.getTodoById(1);
        }
    }
    /* oppure si mappa direttamente i metodi dei getter dello store con */
    computed: mapGetters([
        'doneTodos', 'doneTodosCount', 'getTodoById'
    ])
});
```

## Mutations
Per aggiornare lo stato con operazioni ***SINCRONE*** si usano le `mutations`:
```javascript
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        },
        incrementBy (state, payload) {  // qua si passa un oggetto
            state.count += payload.amount
        }
    }
});

new Vue({ 
    el: '#app',
    store,
    data: { },
    computed: mapState(['count']),
    methods: {
        increment () {
            this.$store.commit('increment')
            // si può chiamare le mutation in due modi:
            this.$store.commit({
                type: 'incrementBy',
                amount: 40
            })
            // oppure
            this.$store.commit('incrementBy', { amount: 29 });
        }
    }
    /* oppure si mappa direttamente i metodi delle mutations dello store con */
    methods: mapMutations([
        'increment',
        'incrementBy'
    ])
});
```

## Actions
Per aggiornare lo stato con operazioni ***ASINCRONE*** si dispachano le `actions` ed una volta che l'azione è terminata si chiamano le `mutations` per aggiornare lo stato:
```javascript
actions: {
        incrementAsync ({ commit }) {   // si destruttura il context che permette di accedere a tutto lo store
            setTimeout(() => {
                commit('increment')
            }, 1000)
        },
        actionA ({ commit }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('someMutation')
                    resolve()
                }, 1000)
            })
        },
        actionB ({ dispatch, commit }) {    // una volta ritornata l'actionA si chiama la mutazione
            return dispatch('actionA').then(() => {
                commit('someOtherMutation')
            })
        },
        async actionC ({ commit }) {    // qua si usa async await
            commit('gotData', await getData())
        },
        async actionD ({ dispatch, commit} ) {
            await dispatch('actionC')
            commit('gotOtherData', await getOtherData())
        }
    }

    // si chiamano le azioni dentro i metodi con;
    this.$store.dispatch('incrementAsync', payload);

    /* oppure si mappa direttamente i metodi delle mutations dello store con */
    methods: mapMutations([ 'incrementAsync' ]);
```

## Modules
I moduli permettono di strutturare e gestire lo stato: invece di avere un unico store monolitico si scompone in `moduli` dove ognuno contiene `state`, `getter`, `mutations`, `actions` e anche altri `modules`. Da notare che all'interno dei moduli lo state e il context è quello del modulo
```javascript

const moduleA = {
    namespaced: true,   // namespaced di default è fakse: per chiamare le mutation si deve mettere a/increment e non increment per non avre conflitti nei nomi
    state: { 
        count: 3
    },
    mutations: {
        increment (state) {
            state.count++
        }
    },
    getters: {
      doubleCount (state) {
          return state.count * 2
      }  
    },
    actions: {
        incrementIfOdd({state, commit}) {
            if (state.count % 2 === 1) {
                commit('increment');
            }
        }
    }
}

const moduleB = {
    state: {
        count: 8
    },
    mutations: {},
    getters: {},
    actions: {}
}

/* questo è il così detto ROOT Store */
const store = new Vuex.Store({
    modules: {
        a: moduleA, // qua si definiscono le chiavi del modulo
        b: moduleB
    },
    state: {
        count: 2
    },
    mutations: {},
    getters: {},
    actions: {}
})


new Vue({ 
    el: '#app',
    store,
    data: {
    },
    computed: {
    }
});

console.log(store.state.a.count);   // si deve mettere l'alias del modulo

store.commit('a/increment');    // una volta specificato il namespace si deve mettere come prefisso del nome del metodo
```
### Sottomoduli
Si possono avere anche sottomoduli. Se namespace è false allora i sottomoduli prendono lo state ed il context del modulo padre, se namespace del padre è a true allora si deve specificare il path corretto

```javascript
const moduleB = {
    namespaced: true,
    modules: {
        subModule: {
            namespaced: true,
            state: {},
            mutations: {
                login () {}
            },
            getters: {
              login () {}  
            },
            actions: {
              login () {}  
            }
        }
    },
    state: {
        count: 8
    },
    mutations: {},
    getters: {
        someGetter (state, getters, rootState, rootGetters) {   // qua si può accedere allo stato/getter del ROOT
            rootState.count;
            state.count;
        }
    },
    actions: {
        someAction({ dispatch, commit, getters, rootGetters }) {
            getters.someGetter;
            rootGetters.someGetter;
            
            dispatch('someOtherAction');
            dispatch('someOtherAction', null, { root: true });  // qua si fa il dispatch di azioni nel ROOT store con il 3° argomento

            commit('someMutation');
            commit('someMutation', null, { root: true }); // qua si fa il commit di mutation nel ROOT store con il 3° argomento
        }
    }
}

this.$store.commit('b/subModule/login');
this.$store.dispatch('b/subModule/login');
this.$store.getters['b/subModule/login'];
```

Per accedere alle informazioni dei vari moduli dai componenti si usano i path:
```javascript
new Vue({ 
    el: '#app',
    store,
    data: {
    },
    computed: mapState({
        a: state => state.a.count,
        b: state => state.b.subModule.count,
    }),
    methods: mapActions('nome_modulo/eventuale_submodule/nome_action'])
});
```

### Form
Da notare che quando si vuole sincronizzare lo stato nei form quando si usa `v-model` si deve utilizzare sia i getter che i setter delle computed properties:

```javascript
// nel caso di v-model
computed: {
    message: {
        get () {
            return this.$store.state.message
        },
        set (value) {
            this.$store.commit('updateMessage', value)
        }
    }
},
// nel caso si usi un @onInput="updateMessage" e :value="message" sull'input
methods: {
    updateMessage (e) {
        this.$store.commit('updateMessage', e.target.value)
    }
}
```

# Plugins
I plugin sono una opzione che espone degli hook per ogni mutation, o meglio una funzione che riceve lo store
```javascript
 const myPlugin = store => {
     // Called when store is initialized
     store.subscribe((mutation, state) => {
         // Called after every mutation
         // Mutation comes in the format `{ type, payload }`
     })
 }

 function createWebSocketPlugin (socket) {
     return store => {
         socket.on('data', data => {
             store.commit('receiveData', data)
         })
         store.subscribe(mutation => {
             if (mutation.type === 'UPDATE_DATA') {
                 socket.emit('update', mutation.payload)
             }
         })
     }
 }

 const myPluginWithSnapshot = store => {
     let prevState = _.cloneDeep(store.state)
     store.subscribe((mutation, state) => {
         let nextState = _.cloneDeep(state)       
         // Compare prevState to nextState      
         // Save state for next mutation
         prevState = nextState
     })
 }

 const store = new Vuex.Store({
    //...
    plugins: [myPlugin]
})
```