# RXJS in Angular: Reactive development
Rxjs è una libreria che permette di lavorare su `stream di dati` processandoli tramite numerosi operatori. E' parte integrante di Angular che utilizza gli Observable nei form, nel routing e nell'httpService.

Observer (ascolta lo stream prodotto dall'Observable e reagisce tramite tre callback):
- `next()` item process it
- `error()` occurred
- `complete()` when completed (per evitare dei memory leaks)

Il `Subscriber` è un tipo di Observer che ha in + la possibilità di fare l'unsubscribe dall'Observable

```javascript
const observer = {
    next: (res)=> console.log(res),
    error: (error)=> console.log(error)//
    complete: ()=> console.log('Done')//
}
  ```

`Observable` (Observable stream di dati sincroni o asincroni o  eventi del browser):
- start the stream (of, from, interval)

```javascript
const stream = new Observable( observer => {
    observer.next('uno')
    observer.next('due')
    observer.complete()     // conclude lo stream
}

// Si deve chiamare subscribe() per iniziare l'Obervable stream !!!!
const subscription = stream.subscribe(observer)

// si chiude la sottoscrizione
const subscription.unsubscribe() 
```

E' possibile fermare un Observable stream con i 3 metodi:
- call complete
- usando gli operatori ***of('Uno', 'due')*** o ***from(['uno','due'])*** che chiamamo internamente complete()
- throw an error

Altro esempio di creazione di Observable

```typescript
@ViewChild('para') par: ElementRef

ngAfterViewInit(){
    const parStream = fromEvent(this.par.nativeElement, 'click')
    .subscribe(console.log)
}

// emette eventi a specifici intervalli
const num = interval(1000).subscribe(console.log)

```


## RXJS Operators
Per processare o comporre lo stream si usano gli operatori (ce ne stanno circa 100) che sono delle funzioni che trasformano o manipolano gli elementi in un Observable stream. Si usa l'operatore ***pipe()*** PRIMA del subscribe() per applicare tale operatori in sequenza:
```typescript

of(2,4,6)
.pipe(
    map(item=>item*2),
    tap(item=>console.log(item)),
    take(2)
)
.subscribe(console.log)
```

***map()*** esegue una trasformazione su ogni elemento dello stream (prende un input stream e crea un output stream per continuare il flusso)

***tap()*** esegue una operazione senza modificare lo stream (prende un input stream e crea un output stream per continuare il flusso) ed è usato per DEBUG come "utility operator".

***take(2)*** emette al massimo un indicato numero di item ed è usato per "limitare lo stream" come filtering operator.


# Going Reactive in Angular 

## Async pipe
Con l'async pipe non c'è bisogno di fare nè il subscribe nè l'unsubscribe, migliora il change detection (di default c'è la checkAlways strategy ma con OnPush si guarda solo quando proprietà di @Input cambiano quando si emettono eventi o quando un Observable emette).
```typescript
@Component({
    templateUrl:'sasasa',
    changeDetection: ChangeDetectionStrategy.OnPush
})
```
Le chiamate tramite httpService ritornano un Observable così detto COLD che non emette finchè non c'è una sottoscrizione (Unicast) mentre i HOT Observable, come i Subject e BehaviouralSubject emettono anche senza sottoscrittori (e sono generalmente Multicast, cioè danno a tutti i sottoscrittori):

```typescript
// COLD
products$ = this.http.get<Product[]>(url).subscribe()

// HOT
productSubject = new Subject<number>();
this.productSubject.nect(12)
```

```typescript

/* nel service */
getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(data => console.log('Products: ', JSON.stringify(data))),
        catchError( err =>{
            console.error()
            // return of([]) si rimanda un array vuoto ...
        })
      );
}

/* nel componente */
products: Product[] = [];
sub: Subscription;

constructor(private productService: ProductService) { }

ngOnInit(): void {
    this.sub = this.productService.getProducts()
        .subscribe(
        products => this.products = products,
        error => this.errorMessage = error
        );
}

ngOnDestroy(): void {
    this.sub.unsubscribe();
}

```
Nel template:
```html
<table class="table mb-0" *ngIf="products">
        <tbody *ngFor="let product of products">
          <!-- code here -->
        </tbody>
</table>
```

Nella modalità reattiva si ha invece:
```typescript

/* il service  rimane uguale*/

/* nel componente */
products$: Observable<Product[]> = [];

constructor(private productService: ProductService) { }

ngOnInit(): void {
    this.products$ = this.productService.getProducts()
}
```
Nel template:
```html

<div *ngIf="(products$ | async) as products">
    <tbody *ngFor="let product of products">
        <!-- code here -->
    </tbody>
</div>
```


## catchError

### Catch & replace
L'operatore ***catchError*** permette di prendere errori che avvengono negli Observable ed eventualmente rimpiazzare l'errore per continuare dopo che è avvenuto un errore con un Observable che emette un array vuoto o la costante EMPTY di RxJS (che immediatamente fa il complete()).

### Catch & retrow

```typescript
// nel service
getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        catchError(err => {
            let customMessage = 'bè'
           return throwError(customMessage);  // --> propaga l'errore alla sottoscrizione
        })
      );
}

// Nel componente:
ngOnInit(): void {
    this.products$ = this.productService.getProducts()
                        .pipe(
                            catchError(err=> {
                                this.errorMessage = err
                                return EMPTY
                            })
                        )
}

```

## DECLARATIVE APPROACH

Volendo si può rendere tutto ancora più dichiarativo spostando tutto dentro il service e togliendo tutto dall'ngOnInit:

```typescript
// nel service
products$ =  this.http.get<Product[]>(this.productsUrl)
      .pipe(
        catchError(err => {
            let customMessage = 'bè'
           return throwError(customMessage);  // --> propaga l'errore alla sottoscrizione
        })
      );
}

// Nel componente:
products$ = this.productService.products$
                        .pipe(
                            catchError(err=> {
                                this.errorMessage = err
                                return EMPTY
                            })
                        )
}

```

Tale approccio permette di:
- avere la piena potenza degli operatori di RxJS
- combinare gli streams
- condividere gli observable
- reagire ad azioni


## Mappare i dati nelle response
```typescript

products$ =  this.http.get<Product[]>(this.productsUrl)
      .pipe(
        map( products => products.map(
            item => ({...item, price: item.price*1,5 }) as Product
        )),
        catchError(err => {})
      );
}
```
Si modifica la response del backend e si fa il cast anche se il modello dovrebbe tenere in considerazione il modello per l'UI (quindi le proprietà dell'UI dovrebbero essere opzionali).


## Combine streams
Unendo degli stream è possibile mappare dati ad altri dati, lavorare con fonti multiple di dati, reagire ad azioni, semplificare il template code etc.

```typescript

// nel service
  // All products
  products$ = this.http.get<Product[]>(this.productsUrl)
    .pipe(
      tap(data => console.log('Products', JSON.stringify(data))),
      catchError(this.handleError)
    );

  // Combine products with categories
  // Map to the revised shape.
  productsWithCategory$ = combineLatest([
    this.products$,
    this.productCategoryService.productCategories$
  ]).pipe(
    map(([products, categories]) =>
      products.map(product => ({
        ...product,
        price: product.price * 1.5,
        category: categories.find(c => product.categoryId === c.id).name,
        searchKey: [product.productName]
      }) as Product)
    ),
    shareReplay(1)
  );
```

L'operatore ***combineLatest([a$,b$,c$])*** permette di combinare  gli ultimi valori di ogni Observable di input (ed emette uno stream solo se tutti gli stream di input hanno emesso un valore).

L'operatore ***forkJoin([a$,b$,c$])*** permette di combinare  gli ultimi valori di ogni Observable di input e di emettere un valore quando tutti gli stream di input sono completati. E' l'analogo del Promise.all per gli Observable ed è utile quando si deve processare i risultati quando tutti gli stream sono completi. Non è pipeable.

L'operatore ***a$.pipe(withLatestFrom([b$,c$])*** permette di combinare  gli ultimi valori di ogni Observable di input allo stream di partenza (ed emette uno stream solo se tutti gli stream di input hanno emesso un valore). E' usato per reagire a cambiamenti in un solo stream o per regolare l'output di altri stream.


# Reactive to actions
L'utente esegue delle azioni. Tramite RxJS si combina degli stream per reagire ad azioni. E' opportuno fare una distinzione tra DATA STREAM (ottenuti da http.GET) ed ACTION STREAM (ottenuti da interazione utente)

L'operatore di trasformazione ***filter(item=> item==='apple')*** permette di filtrare gli elementi che soddisfano una predicate fn. Prendendo un input stream, si sottoscrive e crea un output stream.

Per creare degli Action stream si usa Subject() o BehaviouralSubject(), che sono un misto di Observable e di Observer. Gli Observable sono unicast ogni sottoscrittore prende una propria copia dello stream, mentre il Subject/BehaviouralSubject (è un tipo di Subject che accetta dei valori iniziali) no in quanto i sottoscrittori condividono lo stesso stream., quindi con quest'ultimi si può condividere lo stream con subscriber multipli.
 
```typescript
  // ACTION STREAM for product selection
  // Default to 0 for no product
  // Must have a default so the stream emits at least once.
  private productSelectedSubject = new BehaviorSubject<number>(0);
  productSelectedAction$ = this.productSelectedSubject.asObservable();

  // si può così emettere dati nello stream
  onSelected(categoryId:number){
      this.productSelectedSubject.next(categoryId)
  }

  // si combina gli stream
  products$ = combineLatest([
                    this.productService.products$,
                    this.productSelectedAction$
                ]).pipe(
                    map(([products,categoryId ])=>{
                        products.filter(product=>{
                            categoryId? product.categoryId===categoryId : true
                        })
                    })
                )
```

## Caching Observables
Quando i dati non cambiano (o non poi così frequentemente) è preferibile cachare i dati. Quando si aggiunge, rimuove o aggiorna è opportuno riaggiornare la lista cachando la lista all'inerno del service: 

```typescript
private products: Products[]


// un metodo è di mettere tutto dentro una proprietà
getProducts(): Observable<Product[]>{
  if(this.products){
    return of(this.products)
  }
  return this.http.get<Product[]>(this.productsUrl)
  .pipe(
        tap(data=> this.products = data)    
        catchError(this.handleError)        
  );
}

// un altro metodo è di usare l'operatore shareReplay()
products$ = return this.http.get<Product[]>(this.productsUrl)
                .pipe(
                    shareReplay(1),
                    catchError(this.handleError) 
                )

```

***shareReplay***  ripete un numero definito di emissioni alla sottoscrizione (1 indica l'ultima emissione) condiviso tra tutti i subscribers. Se ho n sottoscrittori a una chiamata che ritorna un observable ho n chiamate, con sharereplay l'output è shareto tra tutti i sottoscrittori.


## High order Mapping operator
Quando ho una get che mi emette un Observable di informazioni dove per ognana si dovrebbe fare un altra get che mi emette un Observable di informazioni otteniamo un Observable<Observable<Qualcosa>> ossia un High order Observable. Come si gestiscono? Dovremmo fare un subscribe dentro un altro subscribe. Si utilizzano i così detti High order Mapping Operators che mappano ogni valore con una sorgente (outer Obervable) verso un nuovo (Inner) Obervable permettendo una sottoscrizione / unsubscribe automatica dall'inner observable ed emettono i valori risultanti all'output observable:

- concatMap  è un operatore di trasformazione che aspetta il completamento di ogni inner Observable prima di processare il successivo e dà come output una sequenza di output
- mergeMap (flatMAp)è un operatore di trasformazione che esegue gli inner observable in parallelo e fa il merge dei risultati (senza che sia richiesto uno specifico ordine)
- switchMap è un operatore di trasformazione ferma il precedente inner Observable e switcha al successivo Inner Observable. Le emissioni degli inner Observable sono mergiate nell'output stream. E' usato quando si deve fermare un Ob prima di switchare al successivo (per type ahead o autocomplete)

```typescript
of('A1','A2')
.pipe(
  cancatMap(id=> this.http.get<Item>('/item/'+id))
)
.subscribe(console.log) // si ottiene prima A1$ poi A2$


of('A1','A2')
.pipe(
  mergeMap(id=> this.http.get<Item>('/item/'+id))
)
.subscribe(console.log) // si ottiene  [A1$, A2$] o [A2$, A1$] in quanto l'ordine non è importante 
```


# Combine streams

```typescript

// 1) con subscribe innestati
getDataByUsingSubscribe() {
  this.http.get('https://jsonplaceholder.typicode.com/users?username=Bret')
  .pipe(
    map( users => users[0]), 
    take(1)
  )
  .subscribe( user => {
    this.userName = user.username;
    this.http.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
    .subscribe( posts => {
      this.posts = posts;
    });
    this.http.get(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`)
    .subscribe( albums => {
      this.albums = albums;
    });
  });
}

// 2) con mergeMap
getDataByUsingMergeMap() {
  this.http.get('https://jsonplaceholder.typicode.com/users?username=Bret').pipe(
    map( users => {
      const user = users[0];
      this.userName = user.username;
      return user;
    }),
    mergeMap( user => this.http.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)),
    take(1)
  ).subscribe( posts => {
      this.posts = posts;
  });
}

// 3) FORKJOIN
getDataByUsingForkJoin() {
  const posts = this.http.get(`https://jsonplaceholder.typicode.com/posts?userId=1`);
  const albums = this.http.get(`https://jsonplaceholder.typicode.com/albums?userId=1`);

  forkJoin([posts, albums]).pipe(take(1)).subscribe( result => {
    this.posts = result[0];
    this.albums = result[1];
  });
}

// 4) MERGEMAP + FORKJOIN
combine2Techniques() {
  this.http.get('https://jsonplaceholder.typicode.com/users?username=Bret').pipe(
    map( users => {
      const user = users[0];
      this.userName = user.username;
      return user;
    }),
    mergeMap( user => {
      const posts = this.http.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
      const albums = this.http.get(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`);
      return forkJoin([posts, albums, of(user)]);
    }),
    take(1)
  ).subscribe( result => {
      this.posts = result[0];
      this.albums = result[1];
      this.user = result[2]
  });
}
```
Altra tecnica è quella di utilizzare l'operatore toArray per combinare + stream:
```typescript
// Currently selected product
// Used in both List and Detail pages,
// so use the shareReply to share it with any component that uses it
  selectedProduct$ = combineLatest([
    this.productsWithCategory$,
    this.productSelectedAction$
  ]).pipe(
    map(([products, selectedProductId]) =>
      products.find(product => product.id === selectedProductId)
    ),
    tap(product => console.log('selectedProduct', product)),
    shareReplay(1)
  );


   // Suppliers for the selected product
  // Only gets the suppliers it needs
  selectedProductSuppliers2$ = this.selectedProduct$
    .pipe(
      filter(selectedProduct => Boolean(selectedProduct)),
      switchMap(selectedProduct =>
        from(selectedProduct.supplierIds)
          .pipe(
            mergeMap(supplierId => this.http.get<Supplier>(`${this.suppliersUrl}/${supplierId}`)),
            toArray(),
            tap(suppliers => console.log('product suppliers', JSON.stringify(suppliers)))
          )
      )
    );
```

In una singola pagina, invece di avere + stream gestiti con l'async pipe e corrispondenti ngIf per gestire l'assenza degli observable (prima che questi vengano emessi), si può combinare + stream insieme con la seguente tecnica:

```typescript
product$ = this.productService.selectedProduct$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  // Set the page title
  pageTitle$ = this.product$
    .pipe(
      map((p: Product) => p ? `Product Detail for: ${p.productName}` : null)
    );

  // Suppliers for this product
  productSuppliers$ = this.productService.selectedProductSuppliers$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      }));

  // Create a combined stream with the data used in the view
  vm$ = combineLatest([this.product$,this.productSuppliers$,this.pageTitle$])
    .pipe(
      filter(([product]) => Boolean(product)),  // Use filter to skip if the product is null
      map(([product, productSuppliers, pageTitle]) =>({ product, productSuppliers, pageTitle }))
    );
```

Con tale tecnica è possibile anche svolgere operazioni multiple (crud) su un'unica base dati [ma è più complicato](https://github.com/DeborahK/Angular-RxJS/blob/master/APM-WithExtras/src/app/products/product.service.ts). Sarebbe meglio tutte le volte intervenire sull'entità principale che è poi esposta all'esterno con un Observable.

Ed in testa al template si usa:
```html
<div class="card" *ngIf="vm$ | async as vm">
  <div class="card-header">
    {{vm.pageTitle}}
  </div>
  <!-- code here -->
</div>
```

## Scan
Un altro operator utile è scan che permette di accumulare informazioni da eventi emessi:
- [scan](https://www.learnrxjs.io/learn-rxjs/operators/transformation/scan)


## Links:
- [stackblitz](https://stackblitz.com)
- [Rxjs](https://rxjs.dev)
- [learnrxjs.io](https://www.learnrxjs.io)
- [codice corso su github](https://github.com/DeborahK/Angular-RxJS)
- [mergeMap & forkJoin requests](https://levelup.gitconnected.com/handle-multiple-api-requests-in-angular-using-mergemap-and-forkjoin-to-avoid-nested-subscriptions-a20fb5040d0c)

## Corsi correlati
- Angular Component communication
- Angular ngRx: getting started



