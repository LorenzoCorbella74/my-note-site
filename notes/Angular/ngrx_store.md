# NGRX Store

## Index
- [Istallazione](#istallazione)
- [Store](#store)
- [Computed Signals](#computed)
- [Aggiornamento store](#aggiornamento-store)
- [Batch updates](#batch-updates)
- [Links](#links)

## Istallazione
```bash
ng add @ngrx/signals@latest # oppure npm install @ngrx/signals --save
npm i @angular-architects/ngrx-toolkit # per  debugging tramite redux devtools
```

## Store
Si crea un file `employee-store.ts` nella cartella `src/stores` dove è possibile definire uno store, come un service effettivo di angular:
```typescript
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';

import {withDevtools} from '@angular-architects/ngrx-toolkit';

type EmployeeState = {
    items: Employee[];
    isLoading: boolean;
    error:Error | null;
    filters: {
        name: string;
        salary: Record<'from'|'to', number>;
    };
};

const initialState: EmployeeState = {
    loadedItems: [],
    isLoading: false,
    error: null,
    filters: {
        name: '',
        salary: { from: 0, to: 10000 }
    }
};

export const EmployeesStore = signalStore(
    withDevtools('Employees'), // configurazione per il debug tramite redux devtools
    { provideIn: 'root' }, // configurazione per il provider del service
    withState(initialState), // si fornisce uno stato iniziale
    withComputed(state =>{
        count: computed(() => state.loadedItems().length),
        filteredItems: computed(() => {
            let result = state.loadedItems();
            if(state.filters.name()) {
                result = result.filter(e => e.name.toLowerCase().includes(state.filters.name().toLowerCase()));
            }
            return result;
        }),

    }), 
    withMethods( (store)=>{
        updateFiltersName(name: EmployeeState['filters']['name']) {
            patchState(store, state => ({
                filters: { ...state.filters, name }
            }))
        }
    }
    )
);

```

Per utilizzare lo store dentro un componente:
```typescript
import { useSignal } from '@ngrx/signals';
import { EmployeeState } from '../stores/employee-store';

@Component({
    selector: 'app-employee-list',
    template: `
        <input type="text" [value]="store.filters.name()" (change)="store.updateFiltersName($event.target.value)">
        @if(store.isLoading()) {
            <div>Loading...</div>
            <div *ngIf="store.error()">{{ store.error().message }}</div>
        } @else {
         <div>Employees: {{ store.count() }}</div>
            <ul>
                <li *ngFor="let employee of store.loadedItems()">{{ employee.name }}</li>
            </ul>
        }
    `
})
export class EmployeeListComponent {
    store = inject(EmployeesStore);
}

```
Notare che tutte le proprietà del `EmployeesStore` sono accessibile come un signal quindi come funzioni tipo `store.items()` o come `DeepSignals` per gli oggetti innestati a cui si può accedere tarmite `store.filters()` oppure per le singole proprietà a cui si può accedere tramite `store.filters.name()` oppure `store.filters.salary.from()`. Da notare che la differenza tra `store.filters.salary().from` e `store.filters.salary.from()` è quando il valore si aggiorna in quanto la prima si aggiorna quando tutto l'oggetto è aggiornato mentre la seconda solo quando il singolo valore è aggiornato, quindi __l'idea è scendere il più possibile per avere il valore più aggiornato possibile__.


L'idea di fondo dello store è:
- togliere la logica di manipolazione dello stato dal componente
- condividere uno stato tra più componenti

Nel caso in cui si voglia mettere delle proprietà `private` si deve anteporre un `_` al nome della proprietà. Una volta che sono private non sono più accessibili come signal ma solo all'interno dello store dentro le funzioni withMethos, withComputed, etc.

Per il debugging è possibile utilizzare la JSON pipe `{{ store.items() | json }}` (importandola negli inport con `import:[JsonPipe]`) oppure il Reduc Devtools.

## Computed

All'interno della funzione `withComputed` si possono definire delle funzioni che ritornano valori calcolati a partire dallo stato attuale. Tali valori calcolati sono a loro volta dei Signal READ ONLY (quindi accessibili come funzioni  `{{ store.count() }}`) . __L?idea è che all'interno dei computed NON ci possano essere dei side effect!!__

## Aggiornamento store
All'interno della funzione `withMethods` si possono definire delle funzioni che permettono di aggiornare degli slices dello stato. Tali funzioni possono essere chiamate all'interno del componente per aggiornare lo stato. Notare l'uso della funzione `patchState` che permette di aggiornare lo stato in modo immutabile. 

E' possibile semplificare l'uso di patchState utilizzando Immer (da installare tramite `> npm i immer`) che permette di scrivere in modo più semplice le funzioni di aggiornamento dello stato quando questo è innestato:
```typescript
import produce from 'immer';

// al posto di:
updateFiltersSalary(value:Partial<EmployeeState['filters']>) {
    patchState(store, state => ({
        filters: { ...state.filters, 
        salary: { ...state.filters.salary, ...value } }
    }))
}

// si può scrivere:
updateFiltersSalary(value:Partial<EmployeeState['filters']>) {
    patchState(store, state => produce(state, draft => {
        draft.filters.salary = { ...draft.filters.salary, ...value };
    }))
}
```

All'interno delle funzione `withComputed` o `withMethod` si possono usare dei providers per iniettare servizi esterni (anche se è un hack basato sul valore dei default dei parametri delle funzioni):
```typescript
signalStore(
    { provideIn: 'root' },
    withState(initialState),
    withComputed((state, logger=inject(LoggerService)) => {
        
    }),
    withMethods((store, api=inject(ApiService)) => {
        // all things rxjs
        loadEmployees: rxMethod<void>(
            pipe(
                tap(() => patchState(store, state => ({ isLoading: true }))),
                switchMap(() => api.getEmployees()),
                tap(employees => patchState(store, state => ({ loadedItems: employees }))),
                catchError(error => patchState(store, state => ({ error })),
                tap(() => patchState(store, state => ({ isLoading: false })))
            )
        )
    })
```
IL metodo `rxMethod` permette di utilizzare gli operatori rxjs all'interno delle funzioni di aggiornamento dello stato.

All'interno dello store tramite la funzione `withHooks` si possono utilizzare i lifecycle hooks di angular, come se fosse un componente:
```typescript
signalStore(
    { provideIn: 'root' },
    withState(initialState),
    withHooks({
        onInit: (store) => {
            store.loadEmployees();
        },
        onDestroy: (store) => {
            store.clearEmployees();
        }
    }),
)
```

## Batch updates
La funzione `patchState` permette di aggiornare lo stato in un solo colpo su più proprietà:
```typescript
clearFilters() {
    patchState(
        store, 
        (state) => ({filters:...state.filters,, name: ''}),
        (state) => ({filters:...state.filters,, salary: {from: 0, to: 10000}})
        ),
}
```

## Links
- [Corso Eggheads](https://egghead.io/courses/scalable-signals-angular-architecture-with-ngrx-signal-store-a33abd39)
- [repo corso](https://github.com/ducin/egghead-ngrx-signal-store)
- [Documentazione](https://ngrx.io/guide/signals)


