# Angular architecture
Quando si pianifica una applicazione si deve considerare: 
- come strutturare features e moduli autoconsistenti ed indipendenti
- organizzare componenti e condividere funzionalità 
- container/presentation pattern
- tecniche di comunicazione tra componenti e ruolo di RXJS (Subject)
- state management
- custom decorator, pipes

Non c'è una unica maniera per definire l'architettura di una applicazione, ma delle semplici opzioni valide (e sopratutto KEEP IT SIMPLE tenere la struttura il più FLAT possibile senza molte cartelle innestate e TRY to be DRY) e [l'angular style guide ](https://angular.io/guide/styleguide). E' importante usare dei mockup per descrivere tutte le feature di ogni singola pagina.

## Organizzare feature e moduli
Si tende a mettere tutto ciò che riguarda una feature dentro una cartella contenente un angular module che può essere caricato in lazy loading (feature based approach).
```
 Modules
    - FeatureA
        components
        featureA.module.ts
        featureA-routing.module.ts
        featureA.service.ts
        SubFeature
            components
            subfeature.module.ts
    - Shared (importato da vari moduli)
        componenti (header, sidebar, etc)
        services (LoggingService, ErrorService, DataService)
        interceptors
        pipes
        shared.module,ts
    - Core  (Usato solo dal root module)
        
```
A volte è utile creare una custom library che può essere usata in più applicazioni. Dall'agular-cli 6 è possibile creare una shared library con:
```bash
& ng new my-project # definisce un workspace
& cd my-project
& ng generate library my-lib # aggiorna il ts-config del progetto per usare la libreria
& ng build my-lib # può essere usata dai progetti nel workspace, senza doverla pubblicare su npm
& cd dist/my-lib
& npm publish
```

```bash
& ng g c path/to/nome
```

## Strutturare i componenti
E' importante sempre suddividere dei componenti complessi in componenti figli.
Il pattern ___container & presentation___ permette di strutturare i componenti dentro un contenitore che gestisce lo stato comunicando con i servizi, con dentro dei componenti figli che presentano lo stato (presentation component). E' assolutamente vietato che anche i figli comunichino con services e manipolino lo stato (non devono cambiare lo stato). 

Come regola generale si:
- passa dal container ai figli tramite proprietà di input 
- passa dai figli al container con proprietà di output 
- si setta la changeDetection strategy su 'ChangeDetectionStrategy.OnPush' nei presentation components in modo da permettere aggiornamenti sui figli quando:
    - quando cambia una input property
    - un eventEmitter o dom event fires
    - Sync pipe receive an event
    - change detection is manually invoked via ChangeDetectorRef

Se gli input sono primitive (stringhe, numeri, for value) allora si aggiornano anche le informazioni dentro ai figli, ma se si passa degli oggetti (for reference) no:
```typescript
ngOnChanges(simpleChanges: SimpleChanges){
    if(simpleChanges['customers']){
        console.log('customers changed!').
    }
}
```
Per ovviare a questo problema si deve usare delle tecniche di cloning (JSON.parse, che ha problemi con la date, custom solution, o Immutable.js (libreria di Facebook)). Nel terzo caso si ha:
```javascript
import {List, Map, fromJS} from 'immutable';
// si usa così:
fromJS(customer).toJS() as Customer
```
Dove le `List` sono array, `Map` sono chiave valore e `fromJS` è per fare deeep copy e produrre mappe da convertire in javascript object.

[getter e setter per gli input](https://ultimatecourses.com/blog/detect-input-property-changes-ngonchanges-setters)

## Component Inheritance
Può essere utile in qualche scenario specifico per riutilizzare delle funzionalità. E' abbastanza raro usarla ma si può costruire un base component, senza template e far si che altri componenti ereditino da tale componente astratto funzioni, input e output.
```typescript
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-base-component',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseComponent implements OnInit, OnChanges {
  @Input() label: string;
  
  private _value: string;
  @Input() get value() {
      return this._value;
  }
  set value(val: string) {
      if (val && val !== this._value) {
        this.isDirty = true;
      }
      this._value = val;
      this.valueChange.emit(val);
  }

  @Input() isDirty = false;
  @Output() valueChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      console.log('Value changed ', changes['value'].currentValue);
    }
  }

}

// si usa così:
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'app-widget1',
  templateUrl: './widget1.component.html',
  styleUrls: ['./widget1.component.css']
})
export class Widget1Component extends BaseComponent implements OnInit {
 
  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
```


### child routes 
Un 'altra opzione può essere l'uso di child routes dentro i componenti:
```typescript
const routes:Route = [
    {
        path:'customers/:id',
        component:CustomerComponent,
        children:[
            { 
                path:'edit', 
                component: CustomerEditComponent
            },
            {
                path:'detail', 
                component: CustomerDetailComponent
            }
        ]
    }
]
// Il componente contenitore ha path /customer/44
// i figli:
// CustomerEdit     /customers/44/edit e
// CustomerDetail   /customers/44/detail e
```
Ciò permette di avere degli indirizzi distinti che devono essere caricati uno alla volta e non tutto insieme

## Comunicazione tra componenti
Oltre alla modalità standard con @Input e @output per componenti innestati o siblings si usano i seguenti metodi:
1. ***Event bus***: un service funge da middleman tra componenti (mediator pattern, dove i componenti non sanno da dove i dati arrivano): si basa su subjects/Observale
2. ***Observable Service***: si basa sull'observer pattern dove un angular service espone un observable direttamente ai componenti interessati (i componenti sanno da dove arrivano i dati)

Ci stanno 4 tipi di [Subject](http://reactivex.io/documentation/subject.html):
1. ___Subject___: (a differenza dei successivi) manda dati ai subscribed observers, ma se si attacca un altro subscriber successivamente questo non riceverà ultimo dato ma solo i dati emessi successivamente alla sua sottoscrizione.
2. ___BehaviorSubject___: a differenza del precedente manda a tutti i sottoscrittori, anche quelli che arrivano dopo, gli ultimi dati emessi precedentemente alla sottoscrizione.
3. ___ReplaySubject___: i sottoscrittori possono ricevere non solo l'ultimo valore (come il BehaviouSubject) ma anche i precedenti (e può essere configurabile)
4. ___AsyncSubject___: è completamente diverso dai precedenti, in quanto emette solo l'ultimo valore e poi fa il complete, questo permette al componente di prendere solo l'ultimo valore di una sequenza ignorando tutti i precedenti. 

L'idea è quella di avere tutti i Subject private e tutti gli observable che espongono i precedenti pubblici ed entrambi con $ in fondo. NON è possibile la sottoscrizione diretta ad un SUBJECT!!!!.

```typescript
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  customers = [];
  private subject$: Subject<ICustomer[]> = new Subject();
  subjectObservable$: Observable<ICustomer[]> = this.subject$.asObservable();

  private behaviorSubject$ = new BehaviorSubject(this.customers);
  behaviorSubjectObservable$: Observable<ICustomer[]> = this.behaviorSubject$.asObservable()>;


```

### Event bus
E' utile e veloce, quando si vuole comunicare a qualsiasi livello dell'applicazione, ma il problema è che può diventare uno spaghetti di eventi. Potrebbe essere utile aggiungere da dove arriva l'evento, e comunque ci si deve ricordare di fare l'unsubscribe!!.

```typescript
import { Injectable } from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

    private subject$ = new Subject();

    on(event: Events, action: any): Subscription {
         return this.subject$
              .pipe(
                    filter((e: EmitEvent) => e.name === event),
                    map((e: EmitEvent) => e.value)
                  )
              .subscribe(action);
    }

    emit(event: EmitEvent) {
        this.subject$.next(event);
    }
}

export class EmitEvent {
  constructor(
      public name: any, 
      public value?: any
      ) { 

      }

}

// i tipi di eventi vanno elencati qua
export enum Events {
  CustomerSelected
}

// all'interno del componente si emette
import { EventBusService, EmitEvent, Events } from '../../core/services/event-bus.service';

// si importa con la DI
constructor(private eventbus: EventBusService) { }

// si usa mandando un evento
 this.eventbus.emit(new EmitEvent(Events.CustomerSelected, data));

 // si sta in ascolto dell'evento e si riceve in altro componente
 import { EventBusService, Events } from './core/services/event-bus.service';
import { Customer } from './shared/interfaces';
import { Subscription } from 'rxjs';
import { DataService } from './core/services/data.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  customer: Customer;
  eventbusSub: Subscription;

  constructor(private eventbus: EventBusService, private dataService: DataService) {}

  ngOnInit() {
    //Example of using an event bus to provide loosely coupled communication (mediator pattern)
    this.eventbusSub = this.eventbus.on(Events.CustomerSelected, cust => (this.customer = cust));
  }

  ngOnDestroy() {
    // AutoUnsubscribe decorator above makes these calls unnecessary
    // this.eventbusSub.unsubscribe();

  }
}
```

## Observable service
E' più efficace dell'Event bus, in quanto permette di condividere dati tra differenti strati dell'applicazione e la sorgente dei dati è conosciuta.


```typescript
import { Injectable } from '@angular/core';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Customer } from '../../shared/interfaces';
import { ClonerService } from './cloner.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  customers: Customer[] = [
    { id: 1, name: 'John Doe', city: 'Phoenix', age: 42 }
  ];

  private customersSubject$ = new BehaviorSubject<Customer[]>(this.customers);
  customersChanged$ = this.customersSubject$.asObservable();

  constructor(private cloner: ClonerService) { }

  getCustomers() : Observable<Customer[]> {
    return of(this.customers);
  }

  addCustomer() : Observable<Customer[]> {
    let id = this.customers[this.customers.length - 1].id + 1;
    this.customers.push({
      id: id,
      name: 'New Customer ' + id,
      city: 'Somewhere',
      age: id * 5
    });
    this.customersSubject$.next(this.customers);
    return of(this.customers);
  }

  addCustomerClone() : Observable<Customer[]> {
    return this.addCustomer().pipe(
      map(custs => {
        return this.cloner.deepClone(custs);
      })
    )
  }

}
```

Ci si sottoscrive al cambiamento di quel modello con:
```typescript
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from './core/services/data.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  customers: Customer[];

  customersChangedSub: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    //Example of using BehaviorSubject to be notified when a service changes
    this.customersChangedSub = this.dataService.customersChanged$.subscribe(custs => (this.customers = custs));
  }

  ngOnDestroy() {
    // AutoUnsubscribe decorator above makes these calls unnecessary
    // if(this.customersChangedSub){
    //     this.customersChangedSub.unsubscribe();
    // }
  }
}
```

## State management
Servono davvero queste soluzioni? Non bastano component e services? Spesso le applicazioni hanno bisogno di Stati globali dell'applicazione, uno stato per l'utente o la sessione e vari entity state per le varie pagine.
Ci stanno varie opzioni:
- Services (eventualmente con Subject): l'importante è che quando si hanno tanti services non si abbiano stati comuni ma ognuno gestica la sua logica specifica. Per farli comunicare potrebbe essere utile avere uno store utilizzato per la comunicazione tra services. 
- NgRx: è ispirato da Redux (store as single source of truth e immutable data) ed unifica gli eventi nell'applicazione tramite [RxJS](https://ngrx.io) che fornisce una consistenza a tutto il team (presente e futuro).
- ngrx-data (è una extension che semplifica NgRx che rende tutto + semplice con meno boilerplate)
- Observable Store: è una versione estesa degli observable service

## Considerazioni aggiuntive
Non è opportuno chiamare Function dai template, in quanto sono invocate tutte le volte che avviene un cambiamento(no caching): si deve invece usare le Pipes (caching), ossia una pure pipe ritorna lo stesso risultato dato lo stesso input, e sono chiamate quando gli input cambiano.
```html
<div>{{addTax(product.price)|currency}}</div> <!-- NO! -->
<div>{{product.price|addTax|currency}}</div> <!-- YES! -->
```
## Memo decorator
E' possibile aumentare la capacità di caching di una pipe tramite il memo-decorator quando è passato una primitiva 
```typescript
import memo from 'memo-decorator';

@Pipe({name: 'addTaxmemo'})
export class AddTaxMemoPipe implements PipeTransform {

  @Memo()
  transform(value:any, args?:any):any {
    // code here...
  }
}
```

## Http requests
E' importante usare degli operatori di RxJS che semplificano la vita in certi contesti:
- switchMap: completa un Observable interno switchando su un altro Observable
- mergeMap: ritornano dei dati che vengono mergiati nello stream che torna indietro
- forkJoin: permette di fare chiamate in parallelo


```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of, from } from 'rxjs';
import { tap, map, switchMap, catchError, mergeMap, concatMap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpClientRxJSService {

  baseUrl = 'https://swapi.dev/api/';

  constructor(private http: HttpClient) { }

  getCharacter(name: string) {
    if (name) {
      return this.http.get(this.baseUrl + 'people/?search=' + name)
        .pipe(
          map(res => res['results']),
          catchError(error => of(null))
        )
    }
    return of(null);
  }

  getCharacters() {
    return this.http.get(this.baseUrl + 'people/').pipe(map(res => res['results'])));
  }

  getPlanets() {
    return this.http.get(this.baseUrl + 'planets/').pipe(map(res => res['results']));
  }

  // 1) si fanno chiamate in parallelo
  getCharactersAndPlanets() {
    return forkJoin([
      this.getCharacters(),
      this.getPlanets()
    ])
    .pipe(
      map((res) => {
        return { characters: res[0], planets: res[1] };
      }),
      catchError(error => of(error))
    );
  }

  // 2) per ogni elemento dell'array si fa una chiamata che decora ogni elemento e poi si ritrasforma in array
  getCharactersAndHomeworlds() {
    return this.http.get(this.baseUrl + 'people/')
      .pipe(
        switchMap(res => {
          // si switcha per prendere solo la proprietà che interessa
          // convert array to observable !
          return from(res['results']);
        }),
        // PER OGNI ELEMENTO DELL'ARRAY !!!!!
        // concatMap((person: any) => {  concatMap nel caso in cui si voglia mantenere l'ordine (non mantenuto da mergeMap)
        mergeMap((person: any) => { 
            return this.http.get(this.convertHttps(person['homeworld']))
              .pipe(
                map(hw => {
                  person['homeworld'] = hw;
                  return person;
                })
              );
        }),
        toArray() // Si rimettono tutti gli item sopra dentro un Observable ARRAY !!!
      );
  }

  // 2) si usa switchMap per guardare all'observable interno che si unisce a quello esterno
  getCharacterAndHomeworld() {
    const url = this.baseUrl + 'people/1/';
    return this.http.get(url)
      .pipe(
        switchMap(character => {
          return this.http.get(this.convertHttps(character['homeworld']))
            .pipe(
              map(hw => {
                character['homeworld'] = hw;
                return character;
              })
            )
        })
      );
  }

// 3) si recupera solo l'informazione interna facendo 2 chiamate
  getCharacterHomeworld(charUrl) {
    return this.http.get(charUrl)
      .pipe(
        switchMap(character => this.http.get(this.convertHttps(character['homeworld']));)
      );
  }

  convertHttps(url) {
    return  url.replace('http://', 'https://');
  }
}

```
Per maggiori informazioni si veda: [stackoverflow](https://stackoverflow.com/questions/49698640/flatmap-mergemap-switchmap-and-concatmap-in-rxjs)

## Links
- [Angular Architecture and Best Practices](https://app.pluralsight.com/library/courses/angular-architecture-best-practices/table-of-contents)
- [code del corso](https://github.com/DanWahlin/angular-architecture)
- [code del corso jumpstart](https://github.com/DanWahlin/Angular-JumpStart)
