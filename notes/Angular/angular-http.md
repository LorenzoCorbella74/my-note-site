# Angular HTTP

Il modulo ___HttpClient___ permette di fare chiamate http,  va importato all'interno di `app.module.ts`:
```typescript
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations:[
        // ...Componenti
    ],
    imports:[
        BrowserModule,
        HttpClientModule
    ]
})
```

# Consumare Servizi REST
- create POST /api/books -> HTTP 201 Created (l'entità creata è ritornata nel body della response)
- read GET /api/books o /api/books/:id -> HTTP 200
- Update PUT /api/books/5 -> HTTP 204 No Content
- Delete DELETE /api/books/:id -> HTTP 204 No Content

```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';

class DataService {

    getAllBooks(): Observable<Book[]> {
        console.log('Getting all books from the server.');
        return this.http.get<Book[]>('/api/books');
    }

    getBookById(id: number): Observable<Book> {
        return this.http.get<Book>(`/api/books/${id}`, {
            headers: new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': 'my-token'
            })
        });
    }

    // si trasforma cosa torna tramite il pipe operator (>> RXJS 5.5)
    getOldBookById(id: number): Observable<OldBook> {
    return this.http.get<Book>(`/api/books/${id}`)
      .pipe(
        map(b => <OldBook>{
          bookTitle: b.title,
          year: b.publicationYear
        }),
        tap(classicBook => console.log(classicBook))
      );
    }

      addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>('/api/books', newBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateBook(updatedBook: Book): Observable<void> {
    return this.http.put<void>(`/api/books/${updatedBook.bookID}`, updatedBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteBook(bookID: number): Observable<void> {
    return this.http.delete<void>(`/api/books/${bookID}`);
  }

}

```
## Gestione errori 
Tramite l'operatore catchError si ritorna degli errori custom al componente che può essere mostrato all'utente.
```typescript
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

/* in altro file */
export class TrackerError {
  errorNumber: number;  // numero/codice per mappatura
  message: string;      // tecnico
  friendlyMessage: string;  // messaggio + friendly
}

class DataService {

  getAllBooks(): Observable<Book[] | TrackerError> {
    console.log('Getting all books from the server.');
    return this.http.get<Book[]>('/api/books')
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  private handleHttpError(error: HttpErrorResponse): Observable<TrackerError> {
    let dataError = new TrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return throwError(dataError);    
  }

}

// Nel componente che utilizza il service:
ngOnInit(){
    this.dataService.getAllBooks()
    .subscribe(
        (data:Book[]|TrackerError)=> this.books = <Book[]>data,
        (err:TrackerError)=> console.log(err.friendlyMessage),
        ()=> console.log('All done getting books.')
    )
}
// in caso di errore torno un errore che voglio io!!
// ... An error occurred retrieving data.
```

## Resolvers
I resolvers, implementati come angular services, sono una feature del router che permette di fare il prefetch di dati per il componente prima di attivare una nuova rotta. Questo previene la possibilità di presentare un componente vuoto aumentando l'esperienza d'uso.
```typescript
// si crea un file per il resolver
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Book } from 'app/models/book';
import { DataService } from 'app/core/data.service';
import { TrackerError } from 'app/models/TrackerError';

@Injectable({
  providedIn: 'root'
})
export class BooksResolverService implements Resolve<Book[] | TrackerError> {

  constructor(private dataService: DataService) { }

// questo metodo è eseguito per tutte le route che usano questo resolver
  resolve(
      route: ActivatedRouteSnapshot, 
      state: RouterStateSnapshot): Observable<Book[] | TrackerError> {
    return this.dataService.getAllBooks()
      .pipe(
        catchError(err => of(err)) // ritorna al componente
      );
  }

}

// all'interno del modulo di routing si imposta il resolver:
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, resolve: { resolvedBooks: BooksResolverService } },
  { path: 'addbook', component: AddBookComponent },
  { path: 'addreader', component: AddReaderComponent },
  { path: 'editreader/:id', component: EditReaderComponent },
  { path: 'editbook/:id', component: EditBookComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// nel componente si usa ciò che è tornato dal resolver
ngOnInit(){
    let resolvedData: Book[] | TrackerError = this.route.snapshot.data['resolvedBooks']; // la key è nelle impostazioni del router

    if (resolvedData instanceof TrackerError) {
      console.log(`Dashboard component error: ${resolvedData.friendlyMessage}`);
    }
    else {
      this.allBooks = resolvedData;
    }
}
```

## Interceptors
Gli interceptors sono degli angular service che implementano una specifica interface chiamata HttpInterceptor (un pò come i resolver). Permettono di manipolare le chiamate Http prima che siano passate al server o le response prima che ritornino all'app. Sono usati principalmente per aggiungere degli headers a tutte le request in uscita ed eventualmente a gestire gli errori di ritorno dal server, logging e fare il report di eventi di progresso e client side caching.

```typescript

export class myInterceptor implements HttpInterceptor {

    // si ha un solo metodo
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler   // ce ne possono essere tanti pertanto questa permette di passare al prossimo interceptor
    ): Observable<HttpEvent<any>>{

        const modifiedRequest = req.clone();

        // change modifiedRequest here !!!

        return next.handle(modifiedRequest)
        .pipe(
            tap(event=>{
                if(event instanceof HttpResponse){
                    // modify the HttpResponse here
                }
            })
        )


    }
}
```

gli interceptors vanno registrati come tutti gli angular services secondo la seguente sintassi:
```typescript
@NgModule({
    declarations:[],
    imports:[],
    providers:[
        // l'ordine indicherà chi verrà eseguito prima
        // da notare che prima si mette l'interceptor sulla request e poi quello sulla response
        {
            provide:HTTP_INTERCEPTORS, // senpro lo stesso token anche se ce ne stanno tanti
            useClass: myInterceptor, 
            multi:true // indica che posso usare multiple interceptor
        },
        {
            provide:HTTP_INTERCEPTORS, // senpro lo stesso token anche se ce ne stanno tanti
            useClass: youInterceptor, 
            multi:true
        }
    ]
})
```
Esempio di aggiunta Header:

```typescript
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpContextToken } from '@angular/common/http';
import { Observable } from 'rxjs';

export const CONTENT_TYPE = new HttpContextToken(() => 'application/json');

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`AddHeaderInterceptor - ${req.url}`);

    let jsonReq: HttpRequest<any> = req.clone({
      setHeaders: { 'Content-Type': req.context.get(CONTENT_TYPE) }
    });

    return next.handle(jsonReq);
  }

}
```
Esempio di manipolazione di response:
```typescript
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogResponseInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`LogResponseInterceptor - ${req.url}`);

    return next.handle(req)
      .pipe(
        tap(event => {
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      )
  }
}
```
E' possibile passare delle ulteriori informazioni agli interceptor tramite il context object che permette di configurarli opportunamente. Il context object è passato insieme alla normale request ma non arriva al server, si ferma all'interno dell'interceptor. Per creare e processare Interceptor Metadata si usa
```typescript
// interceptor
export const OPTIONS_1 = new HttpContextToken<number>(()=>42)   // si passa una funzione che ritorna il default value del token

// Tale opzione è passata dentro il service
let my_context: HttpContext = new HttpContext();
my_context.set(OPTIONS_1, 13) // si passa il token ed il nuovo valore che si passa al token

this.http.get('/api/books',{context: my_context})

// all'interno dell'interceptor si usa .get per prendere il token che interessa
let first_option: number = req.context.get<number>(OPTION_1)


// nel service si può fare anche così per settare il context
 getAllBooks(): Observable<Book[] | BookTrackerError> {
    console.log('Getting all books from the server.');
    return this.http.get<Book[]>('/api/books', {
      context: new HttpContext().set(CONTENT_TYPE, 'application/xml')
    })
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }
```


## Cachare dati nell'app
```json
// all'interno del package.json si ha lo script per far partire l'app in watch mode e il mock server su localhost:3000
{
  "start": "concurrently --kill-others \"ng build --watch --no-delete-output-path\" \"node server.js\"",
    "build": "ng build && node server.js",
}
```

```bash
& ng generate service core/HttpCache --skip-tests
```
## Links
- [corso Angular HTTP Communication](https://app.pluralsight.com/library/courses/angular-http-communication/table-of-contents)
- [codice corso](https://github.com/bricewilson/angular-http-communication)