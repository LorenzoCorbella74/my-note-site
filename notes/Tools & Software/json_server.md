[Back to index](../README.md)

# [Json Server](https://github.com/typicode/json-server)

## Installazione
```bash
# Istallazione globale
$ npm install -g json-server

# Istallazione in un progetto
$ npm install json-server --save-dev

# senza istallazione
npx json-server mocks/db.json
```
Creare una cartella per il db: 
```json
// mocks/db.json
{
  "blogs": [
    {
      "title": "title example",
      "content": "content example",
      "author": "Your favorite author",
      "id": 1
    },
    {
      "title": "another title example",
      "content": "more content example",
      "author": "Your friend's favorite author",
      "id": 2
    },
    {
      "title": "title example number 3",
      "content": "even better content",
      "author": "me",
      "id": 3
    }
  ]
}
```
Eseguire lo script per avere il server online su `http://localhost:3000`:
```bash
$ json-server --watch mocks/db.json  --port 3004 --delay 500 --no-cors # -w -p -d
```

E' possibile mappare delle rotte tramite il [routing](https://github.com/typicode/json-server#add-custom-routes)
``` json
{
  "/api/*": "/$1",
  "/:resource/:id/show": "/:resource/:id",
  "/posts/:category": "/posts?category=:category",
  "/articles\\?id=:id": "/posts/:id"
}
// Start JSON Server with --routes option.
// 
// json-server db.json --routes routes.json
// Now you can access resources using additional routes.
//  /api/posts # → /posts
//  /api/posts/1  # → /posts/1
//  /posts/1/show # → /posts/1
//  /posts/javascript # → /posts?category=javascript
//  /articles?id=1 # → /posts/1
```

E' possibile puntare anche ad un file js:
```javascript
// index.js
const faker = require('faker');

module.exports = () => {
    faker.locale = "it"; // (Italian)

    const data = {
        customers: [],
        addresses: [],
    }

    for (let i = 1; i <= 100; i++) {
        let customer = {};
        let address = {};

        customer.id = i;
        let name = {};
        name.first = faker.name.firstName();
        name.last = faker.name.lastName();
        customer.name = name;
        data.customers.push(customer);

        address.id = i;
        address.address = faker.address.streetAddress();
        address.state = faker.address.stateAbbr();
        data.addresses.push(address);
    }

    return data;
}

// Si starta con: json-server index.js
// si avranno endpoint:
// http://localhost:3000/customers
// http://localhost:3000/addresses
``` 
## Links
- [file db multipli](https://billyyyyy3320.com/en/2019/07/21/create-json-server-with-multiple-files/) 
- [file db multipli 2](https://stackoverflow.com/questions/36836424/cant-watch-multiple-files-with-json-server)
- [proxy in angular](https://kaustubhtalathi.medium.com/mock-data-for-angular-5-applications-with-json-server-part-1-d377eced223b) OTTIMO! ***
- [angular e file multipli](https://kaustubhtalathi.medium.com/mock-data-for-angular-5-applications-with-json-server-part-2-final-427bd68005bb) OTTIMO! ***
- [server with json-server](https://dev.to/vcpablo/js-mocking-a-rest-api-with-json-server-368)
- [general strategies](https://dev.to/kettanaito/api-mocking-strategies-for-javascript-applications-48kl)
- [relazioni nei dati di json-server](https://keyholesoftware.com/2020/03/16/mock-restful-server-fast-with-json-server/)
- [json-server and JWT](https://itnext.io/building-a-fake-and-jwt-protected-rest-api-with-json-server-d7668ad36ee4)

## [Json generator](https://www.json-generator.com/)

# Generazione JSON

## [Faker](https://github.com/Marak/faker.js)
- [some example](https://zetcode.com/javascript/fakerjs/)
- [json-server & faker](https://spin.atomicobject.com/2018/10/08/mock-api-json-server/)
- [json-server & faker 2](https://itnext.io/how-to-generate-mock-data-using-faker-js-and-json-server-1d17007a08e4)
- [json-server & faker 3](https://hackernoon.com/back-end-data-and-api-prototyping-with-fakerjs-and-json-server-n5t36uw)

## [json-skema-faker](https://github.com/json-schema-faker/json-schema-faker)
- [articolo](https://medium.com/@housecor/rapid-development-via-mock-apis-e559087be066#.93d7w8oro)
- [FROM json to json schema](https://www.liquid-technologies.com/online-json-to-schema-converter)
- [FROM json schema TO json](https://www.liquid-technologies.com/online-schema-to-json-converter)
- [FROM json schema TO json](https://json-schema-faker.js.org/)
- [json-schema-faker](https://codesource.io/building-mock-apis-using-json-schema-faker-and-json-server/)
- [esempio generazione con json-skema-faker 1](https://www.freecodecamp.org/news/rapid-development-via-mock-apis-e559087be066/)
- [esempio generazione con json-skema-faker 1](https://www.carlserver.com/blog/post/create-fake-data-using-json-schema-faker)


L'idea è quella di generare i mock con tool online che permettono di avere velocemente dei json e poi generare il server mock con gli articoli *** (che permettono di avere la necessaria flessibilità)


# Angular 

## Angular in memory web api
Per angular si ha il modulo [angular-in-memory-web-api](https://github.com/angular/in-memory-web-api/blob/master/README.md) che, in sviluppo, sta in ascolto delle chiamate e permette delle funzionalità CRUD (ed eventualmente di fare [l'override su url](https://github.com/angular/in-memory-web-api/blob/master/src/app/hero-in-mem-data-override.service.ts).

- [esempio angular-in-memory-web-api](https://blog.logrocket.com/angular-in-memory-web-api-tutorial-mocking-crud-apis-in-angular/)
- [esempio angular-in-memory-web-api + faker](https://medium.com/@amcdnl/mocking-with-angular-more-than-just-unit-testing-cbb7908c9fcc)

```typescript
// in un service abbiamo il path per le api 
@Injectable()
export class HeroService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private heroesUrl = 'api/collection/heroes';  // URL to web api

  constructor(private http: Http) {}

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
  }
}

// il service mock è
import { InMemoryDbService, ParsedRequestUrl, RequestInfoUtilities } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 0, name: 'Zero' },
      ...
      { id: 20, name: 'Tornado' }
    ];
    return { heroes };  // le chiavi devono essere contenute qua
  }

// permette di correggere i path
  parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
    const newUrl = url.replace(/\/collection\/heroes/, '/heroes');  
    const parsed = utils.parseRequestUrl(newUrl);
    console.log(`parseRequestUrl override of '${url}':`, parsed);
    return parsed;
  }
}
``` 

## MockServiceWorker
Altra alternativa, che potrebbe essere utilizzata anche per i test E2E, è [MockServiceWorker](https://mswjs.io/)
- [guida](https://timdeschryver.dev/blog/using-msw-in-an-angular-project)
- [msw rest API + angular](https://github.com/mswjs/examples/tree/master/examples/rest-angular)
- [msw rest API + angular 2](https://dev.to/angular/using-msw-mock-service-worker-in-an-angular-project-2kd6)

Da notare che va specificato ogni endpoint (quindi forse meglio la soluzione sopra...):
```javascript
// ./src/mocks/browser.ts
import { setupWorker, rest } from 'msw'

export const mocks = [
  rest.get('https://api.github.com/users/:user', (req, res, ctx) => {
    const { user } = req.params
    return res(
      ctx.status(200),
      ctx.json({ name: `mocked-${user}`, bio: 'mocked-bio'})
    )
  }),
]

const worker = setupWorker(...mocks)
worker.start()

export { worker, rest } 
``` 

## Interceptor per mock rest api
Si può infine usare gli [interceptor per simulare una rest api](https://jasonwatmore.com/post/2020/07/18/angular-10-fake-backend-example-for-backendless-development) o [esempio di CRUD e alert ](https://jasonwatmore.com/post/2020/09/01/angular-master-details-crud-example). Anche in questo caso si deve specificare verbo e singolo endpoint.
```typescript
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(user);
        }

        function updateUser() {
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            let user = users.find(x => x.id === idFromUrl());

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // update and save user
            Object.assign(user, params);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
}; 
``` 