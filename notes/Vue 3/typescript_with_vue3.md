# TypeScript in Vue 3 & Composition API

- [course](https://github.com/iamshaunjp/vue-with-typescript)

## Title
Usando la vue-cli si sceglie typescript senza componenti come classi. Si crea un progetto con: 
```bash
& vue create project_name
```
Per i progetti vue con typescript considerare i seguenti:
- `<script lang="ts"></script>`
- si deve utilizzare `defineComponent`
- una volta assegnato un tipo non si può cambiare
- quando si inizia un file, grazie a vetur scrivendo `ts` appare una lista di possibili template
- quando si importa un file vue si deve specificare l'estenzione `.vue`
- abilitare nei settings il vetur interpolation service (vetur template) per avere la lista delle proprietà di una interfaccia nell'intellisense


```typescript
// per specificare il tipo all'interno di data si 
// usa il type casting
data(){
    return {
        name:'string',
        age:25 as number | string
    }
}
// dopo aver messo in assets il file global.css si importa 
// in main.js con import './assets/global.css'
```
## [Composition API with typescript](https://v3.vuejs.org/guide/typescript-support.html#annotating-props)
```typescript

import { defineComponent, reactive, toRefs, ref, Ref} from 'vue'

setup(){
    /* 
    const state = reactive({
        name:'string',
        age:25 as number | string
    })

    function change(name:string){
        state.name = name 
    }
    return {
        ...toRefs(state)
    } */
    
    const name = ref('default')
    const age= ref<number | string>(25)  // se vogliamo specificare + tipi...

    // oppure
    const age:Ref<number | string> = ref(25)  // se vogliamo specificare + tipi...
    
    return {name, age} 
}
```

In una cartella `types` è possibile indicare le interfacce che poi possono essere importate in un componente vue:
```typescript
interface Job {
    title:string,
    location:string,
    salary:number
}
export default Job

// si importa in un altro file:
import job from './types/job'

// si definisce il ref di tipo job[]
const jobs = ref<Job[]>([
    { title: 'xxx', location:'xxxxx', salary : 340 }
])
```

## Props in typescript

```typescript
// all'interno di un componente padre si usa il componente
// <JobList :jobs="jobs"> avente in input varie props

// all'interno del componente JobList
import {defineComponent, PropType} from 'vue'
import Job from '@/types/job'

export default defineComponent({
    props:{
        jobs:{
            required:true,
            type: Array as PropType<Job[]>
        }
    }
})
 
```

## Functions
```typescript
// all'interno di un file si definisce un tipo custom
type OrderTerm = 'location'|'title'|'salary'
export default OrderTerm

// che poi si importa all'interno di un componente "destinazione"
import OrderTerm from './types/OrderTerm'

setup(){
    const order = ref<OrderTerm>('title')
    
    const handleClick = (term: OrderTerm )=> {
        order.value = term
    }
    
    return {order}
}
```

## Computed value
```typescript
setup(){
    const movieName:Ref<string> = ref('Ciccio')
    
    const nameAndCountry: ComputedRef<string> = computed((): string => `The movie name is ${movieName.value}`);

    // if it has a setter method:
    const nameAndCountry: WritableComputedRef<string> = computed({
        get(): string {
            return 'somestring'
        },
        set(newValue: string): void {
            // set something
        },
    });
    
    return {nameAndCountry}
}
```

## Watch

