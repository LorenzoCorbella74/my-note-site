# Installazione

Tramite la [Vue cli](https://cli.vuejs.org/guide/creating-a-project.html) è possibile configurare e creare nuovi progetti:

```bash
# installa l'ultima versione (21/09/2020)
$ npm install vue@next

# istalla l'ultima versione della cli (dà la scelta su cosa installare)
$ npm install -g @vue/cli

# versione di vue
$ vue --version

# creare un nuovo progetto, seguire le istruzioni a video
$ vue create hello-world

# navigare nella cartella di progetto
$ cd hello-world

# Per installare vuetify aprire o l'interfaccia grafica GUI
$ vue ui
# oppure manualmente
$ vue add vuetify

# Internazionalizzazione
vue add i18n

# apre VSC
code .

# serve il development server
$ npm run serve

# per una production build
$ npm run build.
```

# Siti ufficiali
[VUE3](https://v3.vuejs.org/)

[VUE2](https://vuejs.org/)

[official style guide](https://vuejs.org/v2/style-guide/)

[codice confronto V2 ->3](https://github.com/academind/vue-3-update/tree/vue3-update)

[riassunto migration guide](https://medium.com/js-dojo/vue-3-new-features-breaking-changes-a-migration-path-e075a9b3d3d5)

<br><br/>

# Tools
[tools for consistent javascript code style](https://blog.bitsrc.io/tools-for-consistent-javascript-code-style-56a6e93d75d)

# Tutorials

# Large scale app
[article](https://medium.com/js-dojo/architect-a-large-scale-vue-js-application-eaf90dc1da05)

### Configuration
[environment variables in vue](https://dev.to/gautemeekolsen/environment-variables-in-vue-ld4)
[official](https://cli.vuejs.org/guide/mode-and-env.html#using-env-variables-in-client-side-code)

### Global Http client
[source](https://medium.com/locale-ai/architecting-http-clients-in-vue-js-applications-for-efficient-network-communication-991cf1df1cb2)
[axious + vue](https://dev.to/erenyatkin/creating-http-client-instance-with-axios-in-vue-3an2)

### Error Handler
In [error handling in vue with vuex](https://dev.to/terabytetiger/error-handling-in-vue-with-vuex-2mcp) propone una modale accanto al router-view
[componente error boundarie/hooks](https://medium.com/js-dojo/error-exception-handling-in-vue-js-application-6c26eeb6b3e4)
[error-handling-with-async-await](https://dev.to/sobiodarlington/better-error-handling-with-async-await-2e5m)

### Vuex for large scale app
[source](https://medium.com/locale-ai/architecting-vuex-store-for-large-scale-vue-js-applications-24c36137e251)

### Internazionalizzazione
[source](https://www.smashingmagazine.com/2020/06/internationalization-vue-i18n/)
[official](https://vuetifyjs.com/en/customization/internationalization/)

### Style
[sass file in component](https://css-tricks.com/how-to-import-a-sass-file-into-every-vue-component-in-an-app/)

### Charts
[article](https://medium.com/js-dojo/how-to-add-charts-and-graphs-to-a-vue-js-application-29f943a45d09)

### Form validation
[validation with vuetify](https://medium.com/js-dojo/form-validation-with-vuetify-in-a-vue-app-d72e3d9b65db)

### Component library
[build a component library](https://www.freecodecamp.org/news/how-to-create-and-publish-a-vue-component-library/)

### Component communication and state management
[summary article](https://medium.com/js-dojo/component-communication-and-state-management-in-vue-js-cc59389d4c01)

[Creating a Global Store in Vue without Vuex](https://simplygoodwork.com/blog/creating-a-global-store-in-vue)

<br><br/>

## Composition API
In Vue 3 si ha la possibilità ___opzionale___ di usare al posto della ***OPTION Api*** (che struttura il componente in data, methods, computed, watch) di usare la ***COMPOSITION Api*** che mergia (data, methods, computed in un unico metodo setup(), mentre components e props non sono toccate). Con tale possibilità si cerca di risolvere i seguenti tre problemi:
* codice che appartiene a Feature comuni è spezzettato tra data, methods, computed, watch: la C.API permette di spezzettare i componenti "pesanti" ed organizzarli per singole feature.
* il riutilizzo di parti comuni in più componenti è complicato (ed i `mixin`, le `mixin factories` e `scoped slots` risolvono parzialmente il problema)
* Typescript support

La funzione `setup(props, context)` è chiamata da vue quando crea il componente prima dell'hook `created` sostituendo:
* data con `const nome_ref = ref('valore_default')` che è una referenza reattiva e wrappa la primitiva in un oggetto di cui possiamo monitorare i cambiamenti. Da notare che per prendere il valore si deve usare `nome_ref.value` ma non nel template: è possibile dare null.
* i methods con semplici funzioni
* le computed con `const nomecomputed = computed(function(){ })`
* i watch con `watch(ref_da_guardare, function(newval,oldval){ })`

La funzione setup deve ritornare ciò che vue deve usare nel template(si espone solo quello che interessa, nomi variabili di ref, nomi funzioni ). All'interno della funzione non si ha accesso al this del componente (quindi non si può accedere direttamente a this.$router o a this.$store)  ma riceve da Vue due argomenti il primo è l'obj `props` che è reattivo e può essere watched, mentre il 2° è il `context`. All'interno del `context` si ha accesso a:
* context.attr 
* context.slots
* context.parent
* context.root
* context.emit 

Da notare che all'interno della funzione si possono usare delle `composition function` o `custom hook` che contengono all'interno ref, computed property, watch, methods riutilizzabili da più componenti.

[link ufficiale](https://composition-api.vuejs.org/api.html#setup)
Per utilizzare la composition api in VUE2 si deve istallare da [official](https://github.com/vuejs/composition-api) con `npm install @vue/composition-api`


Invece di avere singoli ref è possibile usare un oggetto reattivo con `reactive`
```javascript
// AS IS
import {ref, computed} from "vue";
export default {
    setup(){
        const capacity = ref(4);
        const attending = ref(["Tim","bob","Gino"]);
        // computed
        const spaceleft = computed(()=>{
            return capacity.value - attending.value.length;
        })
        // method
        function increaseCapacity(){ capacity.value++;}

        // expose to template
        return {capacity, increaseCapacity, attending, spaceleft}
    }
}

// TO BE con reactive al posto di ref
import {reactive, computed, toRefs} from "vue";
export default {
    setup(){
        const event = reactive({
            capacity: 4,
            attending: ["Tim","bob","Gino"],
            spaceleft = computed(()=>{
                return event.capacity - event.attending.length;
            })
        });

        function increaseCapacity(){ event.capacity++;}
        return { event, increaseCapacity}    // in questo caso nel template si hanno interpolazioni con {{event.XXXXXXX}}
        // oppure, dal momento che non si può fare desctructuring perchè si perde la reattività, si usa toRefs per avere nel template {{capacity}}
        return {...toRefs(event), increaseCapacity} 
        // se increaseCapacity non si deve esporre si ha
        return toRefs(event)
    }
}
```
E' possibile mettere la logica all'interno del file:
```javascript

import {watch, computed} from "vue";
export default {
    props:{
        name:String
    },
    setup(props){
        const test = ref(0);
        watch(test, (newval, oldval)=>{
            console.log(props.name);
        })
        // oppure per due variabili da guardare
        watch([variab1, variab2], ([newval1, oldvar1], [newval2, oldvar2])=>{
            console.log(props.name);
        })

        const comp_example = computed(()=>{
            return test.value++;
        })

        return {
            ...useSearch(),
            ...useSorting(),
            test, comp_example // nel template si avrà {{comp_example}}
        }
    }
}

// STESSO FILE
function useSearch(){}
function useSorting(){}
```

oppure importandoli dall'esterno
```javascript
import useSearch from '@use/search';
import useSorting from '@use/sorting';
export default {
    setup(){
        const productSearch = useSearch(configSearch)
        const resultSorting = useSorting({input, options})
        return {
            ...productSearch,
            ...resultSorting
        }
    }
}
```

```javascript
// 1) si può mettere tutto dentro una fn esterna nello stesso file
import {ref, computed} from "vue";
export default {
    setup(){
        return useEventFeature();
    }
}

/* composition function della feature event */
function useEventFeature(){
    const capacity = ref(4);
        const attending = ref(["Tim","bob","Gino"]);
        const spaceleft = computed(()=>{
            return capacity.value -attending.value.length;
        })
        function increaseCapacity(){ capacity.value++;}
        return {capacity, increaseCapacity, attending, spaceleft}
}

// 2) si può mettere tutto dentro una fn esterna in altro file
import useEventFeature from './use/event-space';
// import useEventMapping from './use/event-mapping-space';
export default {
    setup(){
        return useEventFeature();
        // in caso di più oggetti ritornati si usa la ...spread syntax
        return { ...useEventFeature(), ...useEventMapping()}
    }
}

/* /use/event-space.js */
import {ref, computed} from "vue";
export default function useEventFeature(){
    const capacity = ref(4);
        const attending = ref(["Tim","bob","Gino"]);
        const spaceleft = computed(()=>{
            return capacity.value -attending.value.length;
        })
        function increaseCapacity(){ capacity.value++;}
        return {capacity, increaseCapacity, attending, spaceleft}
}
```

<br><br/>

### LifeCycle Methods

* beforeCreate() : chiamata subito dopo che l'istanza è stata inizializzata, prima di observation and event/watcher setup
* created() : chiamata dopo che l'istanza è stata creata : è stato creato data observation, computed properties, methods, watch/event callbacks. Ma il montaggio non è iniziato e $el non è ancora disponibile
* beforeMount() chiamata prima che il mounting del dom inizi : the render function is about to be called for the first time.
* mounted() : chiamata quando l'istanza è stata montata nel dom
* beforeUpdate() : chiamata quando i dati reattivi sono cambiati, prima che il DOM sia ri renderizzato : This is a good place to access the existing DOM before an update, e.g. to remove manually added event listeners
* updated() : chiamata quando i dati sono cambiati ed il DOM ri renderizzato
* beforeDestroy() : (in V3 beforeUnmounted()) chiamata prima che l'istanza di vue sia distrutta: At this stage the instance is still fully functional
* destroyed() : (in V3 unmounted() ) chiamata dopo che l'istanza di vue è stata distrutta
* activated() : usata per componenti dinamici con <keep-alive> è toggled on
* deactivated() : usata per componenti dinamici con <keep-alive> è toggled off
* errorCaptured() : chiamata quando un errore su un componente discendente è catturato 

Per usarli all'interno della Composition API si deve aggiungere `on` al nome dell'hook, tranne che per `beforeCreate()` e `created()` che vengono sostuite da `setup` (quindi il codice eseguito dentro questi metodi deve esser messo in setup, come possono essere le API CALL!!):
```javascript
import {onBeforeMount, onMounted} from "vue";

export default {
    setup(){
        onBeforeMount(()=>{
            console.log("Before mount!");
        }); 
        onMount(()=>{
            console.log("Mounted!");
        });

    }
}
```

Vue 3 ha aggiunge altri due lifeCycle methods:
* onREnderTrack() : chiamata quando nella render function si è avuto accesso ad una dipendenza reattiva (che sarà tracked -> debugging) 
* onRenderTRiggered() : chiamata quando un nuovo rendering è scatenato, permettendo di ispezionare quale dipendenza ha causato tale re render.

<br><br/>

# Sharing state
Ad esempio nel caso di API request si può astrarre funzionalità comuni in `/composable/use-promise.js`:
```javascript
import {ref} from "vue";
export default function usePromise(fn){
    const result = ref(null);
    const loading = ref(false);
    const error = ref(null):

    const createPromise = async (...args)=> {
        loading.value = true;
        error.value = null;
        results.value = null;
        try{
            result.value = await fn(...args);
        } catch (err){
            error.value = err;
        } finally {
            loading.value = false;
        }
    };
    return { results, loading, error, createPromise} 
    
}
// si può importare con 
import usePromise from "@/composables/use-promise"
// usare con
const getEvents = usePromise(search => event.api.getEventCount(search.value))

// chiamare con
getEvents.createPromise(searchInput)
// dove getEvents contiene anche getEvents.results.value e può essere passato al template
// tramite destructuring dell'oggetto con return {...getEvents}
```

Altri esempi di [custom hooks](https://medium.com/javascript-in-plain-english/handling-asynchrony-in-vue-3-composition-api-part-1-managing-async-state-e993842ebf8f) 

<br><br/>

### Vuex + composition API
Per usare Vuex "più comodamente" con la composition api usare:
```bash
npm install vuex-composition-helpers
```
Insieme:

[using vuex with the vue composition](https://blog.codecourse.com/using-vuex-with-the-vue-composition-api/)

[How to use Vuex store with Composition API](https://morioh.com/p/1b30fd946b0f)

Al posto di:

[composition api al posto vues](https://vueschool.io/articles/vuejs-tutorials/state-management-with-composition-api/)
Da notare che quando lo stato è dentro la `setup` tutte le volte che viene importata avrà una istanza dello stato mentre se questo è messo all'esterno della setup allora diventerà uno stato reattivo al pari di quanto strutturato con vuex. Leggere l'articolo [Vuex-or-Not-to-Vuex](https://wildermuth.com/2020/08/30/Vue-3-To-Vuex-or-Not-to-Vuex) o [articolo2](https://andrejgaluf.com/blog/vue-composition-api-store/) o [articolo3](https://vueschool.io/articles/vuejs-tutorials/state-management-with-composition-api/). Un riassunto sullo state management è l'ottimo articolo su [vue-state-management](https://vueschool.io/articles/vuejs-tutorials/deep-dive-into-vue-state-management/)

Confronto con uso di mixins:

[replaceing-mixins](https://css-tricks.com/how-the-vue-composition-api-replaces-vue-mixins/)

Sunto:

[the-state-of-vue](https://dev.to/thomasferro/the-state-of-vue-will-the-3-0-still-be-approachable-4mgc)

<br><br/>


# TESTARE Vue.js
[official documentation](https://vue-test-utils.vuejs.org/)

[vue-testing-handbook](https://lmiller1990.github.io/vue-testing-handbook/v3/#what-is-this-guide)

[testing-library](https://testing-library.com/)

<br><br/>

# Theme & Dashboard
[top 5 free vue dashboards framework](https://dev.to/suniljoshi19/top-5-free-vue-dashboards-framework-comparison-2hg5)

[trending ui component libraries](https://themeselection.com/trending-vuejs-ui-component-libraries-frameworks/)

<br><br/>

# OTHER

[vue-cheat-sheet](https://dev.to/adnanbabakan/vue-cheat-sheet-1-194a)
[vue-cheat-sheet](https://flaviocopes.com/vue-cheat-sheet/)


# Examples
[composition-api-demos](https://github.com/LinusBorg/composition-api-demos)
[]

## Sort and pagination
[table-sorting-and-pagination](https://www.raymondcamden.com/2018/02/08/building-table-sorting-and-pagination-in-vuejs)
[table-sorting-and-pagination-in-vuejs-with-async-data](https://www.raymondcamden.com/2020/02/01/building-table-sorting-and-pagination-in-vuejs-with-async-data)

# Filters
[migrating-from-filters](https://www.raymondcamden.com/2020/08/13/migrating-from-filters-in-vue-3)

## Provide / inject
[example of slides components](https://www.raymondcamden.com/2020/08/28/an-experiment-with-vue-components)