# RxJs Patterns

La partenza è sempre un Observable a cui si attaccano vari operatori. Un Subject o behaviouralSubject sono sia degli Observable a cui ci si può sia sottoscrivere sia emettere informazioni tramite il `.next()`.

```typescript
private userSubject = new Subject<string>();    // qua si può fare il next
// private userSubject = new BehaviourSubject<string>('');

exposedUsert$ = this.userSubject.asObservable(); // stream pubblico
```
## 1 - ricavare dati dipendanti da altri dati
Facendo variare uno stream ( exposedUsert$ ) è possibile eseguire delle modifiche su un altro stream (postForUser$). Ad esempio rendendo un campo di ricerca uno stream è possibile filtrare un altro stream...

```typescript
private userSubject = new Subject<string>();    // qua si può fare il next
// private userSubject = new BehaviourSubject<string>('');

postForUser$ = this.exposedUsert$.pipe(
    switchMap(userName => this.http.get<User[]>(`/users/${username}`)),
    switchMap(users => this.http.get<Post[]>(`/posts?userId=${users[0].id}`)),
)
```
NB: un consiglio è di far si che se c'è un errore in un elemento della pipeline si possa sapere dove il problema è avvenuto: è quindi opportuno spezzare la pipeline in pezzi autonomi.

```typescript

function getUserId(username:string): Observable<number>{
    return this.http.get<User[]>(`/users/${username}`)
    .pipe(
        catchError(this.handleError),
        map(users => (users.length===0 ? 0 : user[0].id))
    )
}
function getPostForUser(userId:number): Observable<Post[]>{
    return this.http.get<Post[]>(`/posts?userId=${userId}`)
    .pipe(catchError(this.handleError))
}

postForUser$ = this.exposedUsert$.pipe(
    switchMap(userName => getUserId(userName)),
    switchMap(userId => getPostForUser(userId)),
)
```

## 2 - Aggregare + streams con combineLatest
Si può aggregare + streams tramite l'operatore combineLatest (che emette l'output quando tutti gli stream hanno emesso almeno una volta):

```typescript
postsWithCategory$ = combineLatest([
    this.allPosts$,
    this.categorySrv.allCategories$
]).pipe(
    map(([posts, cats])=> posts.map(post=> ({
        ...post,
        category:cat.find(c=> post.categoryId===c.id)?.name
    }) as Post ))
)
```
Se volessimo raggruppare per categoria

```typescript
postGroupedByCategory$ = postsWithCategory$.pipe(
    concat(), // emette ogni elemento dell'array
    groupBy(post=> post.categoryId, post=> post) // fn chiave di selezione, fn di selezione elemento
    mergeMap(group=> zip(of(group.key), group.pipe(toArray()))), // per ogni gruppo emette una tupla con un id e post[] 
    toArray() // emette un array con tutte le tuple precedenti
)
```
## 2) merge - solo uno emette... 
L'operatore `merge` permette di far si che solo uno degli stream emetta un valore (vanno quindi in OR):
```typescript
const operations$ = merge(documentText$, clickToOpen$, focus$, clear$)

return combineLatest([
    operations$, // quando una delle 4 sopra emette un valore
    categories$
]).pipe(...)

```

# Gestione errori
Ogni Observable può emettere valori ma può andare anche in errore. Per gestire gli errori si usa l'operatore `catchError`

```typescript
export class SharksComponent {
    sharks$: Observable<Shark[]>;
    lastBiteLocation$: Observable<{ x: number, y: number }>;

    constructor(private sharkService: SharkService) {
        this.sharks$ = this.sharkService.getSharks();
        this.lastBiteLocation$
        .subscribe(
            location => {
                // We have a location to handle here!
            },
            error => {
                // Now we can handle our custom bite error and show it in the UI!
                this.biteError = error;
            }
        );
    }

    // si tracciano gli eventi del mouse creando un Observable tramite of
    bite(event: MouseEvent): Observable<{ x: number, y: number}> {
        return of({ x:this.getX(event), y: this.getY(event) }); 
    }

    // per la gestione dell'errore si usa
    bite(event: MouseEvent): Observable<{ x: number, y: number}> {
    return of({ x: 0, y: 0 })
            .pipe(
                map(loc => ({ x: this.getX(event),y: this.getY(event)}),
                catchError(error => {
                    // Handle our error here...
                    console.error(error);
                    return of({ x: 0, y: 0 }); // qua ritorna nella 1° fn del subscribe come se l'errore non ci fosse stato
                });
            );
    }
}
```

Per la gestione di errori custom (o error avoidance)  si usa l'operatore `throwError` che riemette un errore che essere raccolto da un'altro catchError o nella 2° fn del subscribe.
```typescript
catchError(error => {
    console.error(error);
    return throwError(new Error('This shark did not bite correctly!'));
});
```

Se la sorgente completa senza emettere niente `throwIfEmpty` permette di emettere l'errore.
```typescript
of()
.pipe(
    throwIfEmpty()
).subscribe(
    v =>console.log(v), 
    err => console.log(err.messsage)
)
```
`onErrorResumeNext` a differenza di quanto promette e in realtà un onError switch to: quando si presenta un errore c'è un jump ad un nuovo stream. Ma la cosa strana è che poi una volta completato il 1° viene eseguito anche il "backup".
```typescript
const backup = of('Lore'.'Lore')
of('Lore'.'Chiara')
.pipe(
    map(source=>{
        if(source!=='Lore'){
            throw new Error('oops..');
        }
        return source;
    }),
    onErrorResumeNext(backup)
).subscribe(
    v =>console.log(v), 
    err => console.log(err.messsage)
)
```

`retry(n)` permette di "ritentare" lo steam andato in errore (ma ripartendo dall'inizio) mentre `retryWhen` permette o di emettere un errore, o di completare o di ritentare.




