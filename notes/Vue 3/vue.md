# VUE.JS

## Configurazione

La Vue-cli legg i seguenti file:
.env — default file
.env.local — local override
.env.[mode] — override for a specific environment
.env.[mode].local — local override for a specific environment

Then in the .env files, we can write:
VUE_APP_NOT_SECRET_CODE=some_value
As long as the prefix of the config key is VUE_APP_ , Vue CLI will read it.

## Filtered list
Quando si vuole valorizzare una variabile dipendente da altre variabili è opportuno usare le computed properties:
```javascript

// esempio di filtro di una lista
computed: {
  filteredItems() {
    return this.items.filter(item => item.type.toLowerCase().includes(this.search.toLowerCase()))
  }
}
```
```html
<div v-for="item of filteredItems">
  <p>{{item.name}}</p>
</div>
```

## Chiamate HTTP
```javascript
methods: {
  async getData(){
    const res = await fetch('/some/url')
    const data = await res.json();
    this.data = data;   // si assegna con =
  }
}
```
Oppure si può usare axious usandolo globalmente tramite:
```javascript
import Axios from 'axios'

// si mette nel prototype di vue
Vue.prototype.$http = Axios;

// si usa all'interno dei componenti con:
this.$http.get('https://example.com') 
```

## Prop change
```javascript
props: ['myProp'],
watch: { 
    myProp(newVal, oldVal) { 
        console.log(newVal, oldVal)
    }
}

// se vogliamo stare in ascolto subito si imposta immediate a true
watch: {
  myProp: {
    immediate: true, 
    handler (val, oldVal) {
      // ...
    }
  }
}
 ```

Esempio di dichiarazione props con validazione, default, etc

```javascript
export default {
  props: {
    color: {
      type: String,
      default: 'teal',
      validator: function(value) {
        const validColors = ['teal', 'orange']
        return validColors.includes(value)
      },
    },
  },
}
```

## Remove hash from URL
Si imposta nel router l'history mode
```javascript
const router = new VueRouter({ mode: 'history'})
```

# Comunicazione tra componenti
E' possibile passare ai componenti figli tutte le prop e i data che li avranno disponibili tramite `this.$attrs['example-data']`
```javascript
<template>
  <div class='all-props'>
    <child-component :example-data="$props" />
    <router-view :example-data="$data" />
  </div>
</template>

<script>
import { ChildComponent } from "./components"
export default {
  name: "all-props",
  components: {
    ChildComponent
  },
  props: {
    status: {
      type: String,
      required: true,
      validator: val => ['loading','error','complete'].indexOf(val) > -1
    }
  },
  data:() => ({
    items:[],
    error: false,
    loading: false
  })
};
</script>
```

Inoltre è possibile:
* accedere ai metodi del padre tramite `this.$parent.coolFunction()`
* accedere alle informazioni del figlio tramite $refs
```javascript
<template>
  <div class="home">
    <HelloWorld ref="foo" msg="Hello World" />
    <button
      @click.exact="triggerChildMethod"
      @keydown.enter="triggerChildMethod"
    >
      Trigger Child Method
    </button>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "Home",
  components: {
    HelloWorld
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    lorem: "ipsum"
  }),
  methods: {
    triggerChildMethod() {
      this.$refs.foo.triggerAlert();
    }
  },
  /**
   * @note $refs and $children not available in created hook
   */
  mounted() {
    console.log("this.$refs.foo.$data :", this.$refs.foo.$data);
    console.log("this.$children[0].$data :", this.$children[0].$data);
  }
};
</script>
```

## Custom directive
[article](https://medium.com/js-dojo/creating-custom-directives-in-vue-js-286142392fd8)