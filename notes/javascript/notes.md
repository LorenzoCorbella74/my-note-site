## Trasformare arrai in obj
```Javascript
var a = [{
    id: 1,
    nome: "Lorenzo"
  },
  {
    id: 2,
    nome: "Chiara"
  },
  {
    id: 3,
    nome: "Luce"
  },
];

var reduced = a.reduce((acc, ele) => {
  acc[ele['id']] = ele;
  return acc;
}, {});

console.log('Original: ', a);
console.log('Reduced: ', reduced);
```

## Getter Setter
```Javascript
/*
  SOURCE: https://codedump.io/share/Fa1MxeStU5dG/1/how-to-implement-behaviorsubject-with-getter-and-setter-in-angular-2
  
  Quando c'è un tentativo di settare una proprietà viene chimata la proprietà set. la set/get syntax permette 
  di legare una proprietà ad una funzione
  
  SOURCE: https://javascriptplayground.com/blog/2013/12/es5-getters-setters/
  
  
*/

@Injectable()
export class LoginService {

  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  public _isLoggedIn: Observable<boolean> = this.isLoggedInSource.asObservable();

  constructor() {}

  set isLoggedIn(logged: boolean) {
    this.isLoggedInSource.next(logged);
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  logout() {
    this.isLoggedIn = false;
  }

  login() {
    this.isLoggedIn = true;
  }

} 

export class App {
  constructor(private loginService: LoginService) {

    loginService.isLoggedIn.subscribe(bool => console.log(bool));

    //Wait and simulate a login
    setTimeout(() => {
      loginService.login();
    }, 1200);

  }
}
```

## Deep search in obj to take the value of a deep key by passing the  path

```Typescript
// SOURCE 1:  https://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string

import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>Test mapper</h2>
      <button (click)="transform(source,mapper,result)">Do!</button>
      <p>{{result|json}}</p>
    </div>
  `,
})
export class App {
  
  // origin
  source:any = {
    'part1' : {
        'name': 'Part 1',
        'size': '20',
        'qty' : '50'
    },
    'part2' : {
        'name': 'Part 2',
        'size': '15',
        'qty' : '60'
    },
    'part3' : [
        {
            'name': [
              { "prova": 85},
              {"prova": 45}
            ],
            'size': '10',
            'qty' : '20'
        }, {
            'name': 'Part 3B',
            'size': '5',
            'qty' : '20'
        }, {
            'name': 'Part 3C',
            'size': '7.5',
            'qty' : '20'
        }
    ]
};
  
  // matrix of transformation
  mapper:any = {
    x: "part1.name",
    y: "part2.qty",
    z: "part3[0].name[0].prova"
  };
  
  // destination
  result:any = {
    x:null,
    y:null,
    z:null
  };
  
  constructor() { }
  
  private mapByPath(o, s) {
      s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
      s = s.replace(/^\./, '');           // strip a leading dot
      var a = s.split('.');
      for (var i = 0, n = a.length; i < n; ++i) {
          var k = a[i];
          if (k in o) {
              o = o[k];
          } else {
              return;
          }
      }
      return o;
  }
  
  transform(s,m,d, newObj?:boolean){
    let temp = {};
    Object.keys(d).forEach(k=>{
      temp[k]= this.mapByPath(s,m[k]);
    });
    
    this.result = newObj? JSON.parse(JSON.stringify(temp)): temp; // si crea un nuovo obj
    
  }
  
}

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ App ],
  bootstrap: [ App ]
})
export class AppModule {}


// Una libreria interessante è: https://github.com/mariocasciaro/object-path
```