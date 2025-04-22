# Angular forms

In angular 2.x ci stanno due tipi di form:
- ___template driven___ (html + two way data binding): è + facile ma meno potente, simile a Angularjs, automaticamente traccia lo stato del form e dei singoli input
- ___reactive forms___ (model driven) (form e dati e validation nella component class): sono + flessibili e permettono di cambiare le regole dinamicamente. Non sono basati su data binding (modello dei dati immutabile) ma è il codice che gestisce il cambiamento dei dati sottostanti. Si ha accesso a trasformazioni reattive (debounceTime o distinctUntilChanged). Permettono facilmente di aggiungere elementi dinamicamente. Richiedono + codice.

## Stato dei form
Lo stato di ogni elemento di input può essere "pristine" se non è cambiato o "dirty" se è stato cambiato. Lo stato degli elementi si riflette sullo stato complessivo del form che può essere "valid" o avere "errors" di validazione. Questi stati definiscono se un utente ha visitato un elemento di input "touched" o "untouched" se l'elemento no ha avuto il focus.
Per la gestione di tutte queste informazioni, oltre che i valori degli input,  Angular fornisce  i `FormGroup` (stato del form o sottoform) e i `FormControl` (stato dei singoli elementi) che sono usati da entrambi i due approcci.

Il form model è la struttura dei dati che rappresenta il form HTML con i sui controls, il value (che contiene il value di tutti gli elementi) e le proprietà dirty, valid, touched, etc da non confondere con il data model usato per il data binding.

## Template driven
Nel template si mette per ogni singolo elemento il data binding, le regole di validazione (attributi), i messaggi di errore ed Angular automaticamente genera il form model che può essere usato nella component class. Si importa il ___FormModule___ che fornisce le direttive:
- ngForm
- ngModel
- ngModelGroup

Quando Angular vede un form nel template automaticamente attacca un ngForm ed istanzia un FormGroup: per accedere al form state si usa una reference utile per quando ci si vuole riferire al form. Quando angular vede un ngModel crea un FormControl e lo chiama secondo l'attributo name dell'input e tramite il riferimento si può accedere al form control state.
All'interno dell'app.module.ts si importa:
```typescript
import {FormsModule} from '@angular/forms'
@NgModule({
    ...
    imports:[
        BrowserModule,
        FormsModule
    ]
})
```
```html
<form novalidate
          (ngSubmit)="save(signupForm)"
          #signupForm="ngForm">
      <div class="form-group row mb-2">
        <label class="col-md-2 col-form-label"
               for="firstNameId">First Name</label>
        <div class="col-md-8">
          <input class="form-control"
                 id="firstNameId"
                 type="text"
                 placeholder="First Name (required)"
                 required
                 minlength="3"
                 [(ngModel)]=customer.firstName
                 name="firstName"
                 #firstNameVar="ngModel"
                 [ngClass]="{'is-invalid': (firstNameVar.touched || firstNameVar.dirty) && !firstNameVar.valid }" />
          <span class="invalid-feedback">
            <span *ngIf="firstNameVar.errors?.required">
              Please enter your first name.
            </span>
            <span *ngIf="firstNameVar.errors?.minlength">
              The first name must be longer than 3 characters.
            </span>
          </span>
        </div>
      </div>
    <div class="form-group row mb-2">
        <div class="offset-md-2 col-md-4">
          <button class="btn btn-primary mr-3"
                  type="submit"
                  style="width:80px"
                  [title]="signupForm.valid ? 'Save your entered data' : 'Disabled until the form data is valid'"
                  [disabled]="!signupForm.valid">
            Save
          </button>
        </div>
      </div>
</form>
<br>Dirty: {{ signupForm.dirty }}
<br>Touched: {{ signupForm.touched }}
<br>Valid: {{ signupForm.valid }}
<br>Value: {{ signupForm.value | json }}
```

```javascript
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// non un interfaccia perchè si crea una istanza ...
export class Customer {
  constructor(
    public firstName = '',
    public lastName = '',
    public email = '',
    public sendCatalog = false,
    public addressType = 'home',
    public street1?: string,
    public street2?: string,
    public city?: string,
    public state = '',
    public zip?: string) { }
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer = new Customer();

  constructor() { }
  ngOnInit(): void {}

  save(customerForm: NgForm): void {
    console.log(customerForm.form);
    console.log('Saved: ' + JSON.stringify(customerForm.value));
  }
}
```

## Reactive Forms
Quando si vuole aggiungere dinamicamente degli input, o reagire a cosa scrive l'utente o aspettare la validazione finchè l'utente ha smesso di scrivere, o fornire differenti regole di validazioni per situazioni differenti, è meglio usare i form reattivi.

Questi danno la responsabilità di creare il form model alla component class insieme alle regole di validazione i messaggi di errore e proprietà per la gestione dei dati (non c'è data binding) e metodi per operazioni sui form. Nel template si definiscono gli input w poi si legano al form model. Si deve importare il modulo ___ReactiveFormsModule___ che fornisce le direttive:
- formGroup
- formControl
- formControlName
- formGroupName
- formArrays : per lavorare con formGroups come array
- formArrayName

All'interno dell'app.module.ts si importa:
```typescript
import {ReactiveFormsModule} from '@angular/forms'
@NgModule({
    ...
    imports:[
        BrowserModule,
        ReactiveFormsModule
    ]
})
```

```html
<form novalidate
          (ngSubmit)="save()"
          [formGroup]="customerForm">

      <div class="form-group row mb-2">
        <label class="col-md-2 col-form-label"
               for="firstNameId">First Name</label>
        <div class="col-md-8">
          <input class="form-control"
                 id="firstNameId"
                 type="text"
                 placeholder="First Name (required)"
                 formControlName="firstName"
                 [ngClass]="{'is-invalid': (customerForm.get('firstName').touched ||
                                            customerForm.get('firstName').dirty) &&
                                            !customerForm.get('firstName').valid }" />
          <span class="invalid-feedback">
            <span *ngIf="customerForm.get('firstName').errors?.required">
              Please enter your first name.
            </span>
            <span *ngIf="customerForm.get('firstName').errors?.minlength">
              The first name must be longer than 3 characters.
            </span>
          </span>
        </div>
      </div>
    <!-- esempio di formGroup dentro un formGroup -->
<div formGroupName="emailGroup">
        <div class="form-group row mb-2">
          <label class="col-md-2 col-form-label"
                 for="emailId">Email</label>
          <div class="col-md-8">
            <input class="form-control"
                   id="emailId"
                   type="email"
                   placeholder="Email (required)"
                   formControlName="email"
                   [ngClass]="{'is-invalid': emailMessage }" />
            <span class="invalid-feedback">
              {{ emailMessage }}
            </span>
          </div>
        </div>

        <div class="form-group row mb-2">
          <label class="col-md-2 col-form-label"
                 for="confirmEmailId">Confirm Email</label>
          <div class="col-md-8">
            <input class="form-control"
                   id="confirmEmailId"
                   type="email"
                   placeholder="Confirm Email (required)"
                   formControlName="confirmEmail"
                   [ngClass]="{'is-invalid': customerForm.get('emailGroup').errors ||
                                             ((customerForm.get('emailGroup.confirmEmail').touched || 
                                              customerForm.get('emailGroup.confirmEmail').dirty) && 
                                              !customerForm.get('emailGroup.confirmEmail').valid) }" />
            <span class="invalid-feedback">
              <span *ngIf="customerForm.get('emailGroup.confirmEmail').errors?.required">
                Please confirm your email address.
              </span>
              <span *ngIf="customerForm.get('emailGroup').errors?.match">
                The confirmation does not match the email address.
              </span>
            </span>
          </div>
        </div>
      </div>
    <!-- .range è una regola custom -->
      <div class="form-group row mb-2">
        <label class="col-md-2 col-form-label"
               for="ratingId">Rating</label>
        <div class="col-md-8">
          <input class="form-control"
                 id="ratingId"
                 type="number"
                 formControlName="rating"
                 [ngClass]="{'is-invalid': (customerForm.get('rating').touched || 
                                             customerForm.get('rating').dirty) && 
                                             !customerForm.get('rating').valid }" />
          <span class="invalid-feedback">
            <span *ngIf="customerForm.get('rating').errors?.range">
              Please rate your experience from 1 to 5.
            </span>
          </span>
        </div>
      </div>
    ...
    <button class="btn btn-primary mr-3"
                  type="submit"
                  style="width:80px"
                  [title]="customerForm.valid ? 'Save your entered data' : 'Disabled until the form data is valid'"
                  [disabled]="!customerForm.valid">
            Save
          </button>
</form>
```

Per accedere alle form Model properties si usa: 
```javascript
// 1)
customerForm.controls.firstName.valid
// 2) + breve
customerForm.get('firstName').valid
```
Nella component class:

```typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

import { Customer } from './customer';


// esempio di Cross field validation, cioè si valuta la validazione di un gruppo di elementi
function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { match: true };
}

// esempio di validazione custom con parametro passato 
function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { range: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;

  // data model
  customer:Customer = new Customer();
  emailMessage: string;

  get addresses(): FormArray {
    return this.customerForm.get('addresses') as FormArray;
  }

  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    /* 
    // si usa il FORM MODEL senza il form BUILDER
    this.customerForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        sendCatalogue: new FormControl(true)    // default
    }) 
    */

    // con il BUILDER
    this.customerForm = this.fb.group({
        // firstName: {value:'', disabled: true} come oggetto
      firstName: [
          '', // valore di default
        [Validators.required, Validators.minLength(3)], // validatori
      /* eventuale 3° argomento è per async validators */
      ],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
      }, { validator: emailMatcher }),  // custom validation
      phone: '',
      notification: 'email',
      rating: [null, ratingRange(1, 5)], // custom validation with params
      sendCatalog: true,
      addresses: this.fb.array([this.buildAddress()])
    });

    // si guarda al cambiamento di un radio btn  per
    // definire le regole di validazione di un altro field
    this.customerForm.get('notification').valueChanges.subscribe(
      value => this.setNotification(value)
    );

    // si sta in ascolto di un cambiamento di fa il debounce
    // e si modificano i msg di errore
    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(emailControl)
    );
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: ['', Validators.required],
      street2: '',
      city: '',
      state: '',
      zip: ''
    });
  }

  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      emailGroup: { email: 'jack@torchwood.com', confirmEmail: 'jack@torchwood.com' }
    });
    const addressGroup = this.fb.group({
      addressType: 'work',
      street1: 'Mermaid Quay',
      street2: '',
      city: 'Cardiff Bay',
      state: 'CA',
      zip: ''
    });
    // qua si aggiorna solo un field
    this.customerForm.setControl('addresses', this.fb.array([addressGroup]));
  }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

// messaggi di errore messi uno di seguito all'altro
  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
  }

// in caso l'utente faccia una certa scelta si aggiornano le regole di validazione con .setValidators
  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
        // si rimuove tutte le regole di validazione
      phoneControl.clearValidators();
    }
    // si aggiorna il valore e validità
    phoneControl.updateValueAndValidity();
  }

}
```
Per aggiornare il modello del form (i valori) con il modello dei dati si usa ___setValue___  e ___patchValue___:
```typescript
// per aggiornare TUTTI  i controlli del form 
this.customerForm.setValue({
    firstName:'Lore',
    lastName:'Corbe',
    email:'lore@lore.it',
})
// per aggiornare un subset
this.customerForm.patchValue({firstName:'Lore' })
```

## Custom validator
E' possibile definire delle regole di validazione custom
```typescript
function myValidator(c:AbstractControl): {[key:string]: boolean} |null {
    if('somethingIsWrong'){
        return {myvalidator:true} // la chiave 'myvalidator' è il nome della broken validation rule che è passata alla errors collections
    }
    return null     // se null non ci stanno errori
}
```
Se invece vogliamo passare dei parametri si usa una wrapper fn:
```typescript
function myValidator(param:any): ValidatorFn {
    return (c:AbstractControl): {[key:string]: boolean} |null {
        if('somethingIsWrong'){
            return {myvalidator:true} // la chiave 'myvalidator' è il nome della broken validation rule che è passata alla errors collections
        }
        return null     // se null non ci stanno errori
    }
}
```

## Watching
E' possibile stare in ascolto dei cambiamenti del form o dei singoli FormControl in quanto espongono un Observable con la proprietà ___valueChanges___:
```typescript
// a livello di singolo controllo
this.myFormControl.valueChanges.subscribe( val => console.log(val))

// a livello di gruppo
this.myFormGroup.valueChanges.subscribe( val => console.log(JSON.stringify(val)))

// a livello di form
this.customerForm.valueChanges.subscribe( val => console.log(JSON.stringify(val)))
```
Stare in ascolto dei cambiamenti permette poi di reagire a tali cambiamenti con la possibilità di:
- modificare le regole di validazione
- gestire i messaggi di validazione
- modificare gli elementi nell'interfaccia
- fornire dei suggerimenti automatici

## Reactive transformation
Tramite gli Observable è possibile avere delle extrafeatures:
- ___debounceTime___: ignora eventi fino ad uno specifico momento è passato senza un altro evento: è usato per mostrare eventuali msg di errori non appena l'utente ha smesso di scrivere.
- ___throttleTime___: emette un valore e poi ignora i valori successivi per un determinato intervallo di tempo.
- ___distintUntilChanged___: sopprime i duplicati consecutivi.

## Aggiungere dinamicamente elementi
Tramite FormArray, essendo un array di FormControl è possibile dinamicamente duplicare degli elementi di un form. Da notare che nel template si deve fare un loop tra tale array (dove si accede agli elementi non per nome per index):
Si creano con:
```typescript
// normalmente
this.myArray = new FormArray([...])
// tramite il builder
this.myArray = this.fb.array([... ])
```



```html
<div *ngIf="customerForm.get('sendCatalog').value">
        <div formArrayName="addresses">

          <div [formGroupName]="i"
               *ngFor="let address of addresses.controls; let i=index">
            <div class="form-group row mb-2">
              <label class="col-md-2 col-form-label pt-0">Address Type</label>
              <div class="col-md-8">
                <div class="form-check form-check-inline">
                  <label class="form-check-label">
                    <input class="form-check-input"
                           id="addressType1Id"
                           type="radio"
                           value="home"
                           formControlName="addressType"> Home
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <label class="form-check-label">
                    <input class="form-check-input"
                           id="addressType1Id"
                           type="radio"
                           value="work"
                           formControlName="addressType"> Work
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <label class="form-check-label">
                    <input class="form-check-input"
                           id="addressType1Id"
                           type="radio"
                           value="other"
                           formControlName="addressType"> Other
                  </label>
                </div>
              </div>
            </div>

            <div class="form-group row mb-2">
              <label class="col-md-2 col-form-label"
                     attr.for="{{'street1Id' + i}}">Street Address 1</label>
              <div class="col-md-8">
                <input class="form-control"
                       id="{{ 'street1Id' + i }}"
                       type="text"
                       placeholder="Street address (required)"
                       formControlName="street1"
                       [ngClass]="{'is-invalid': (address.controls.street1.touched || 
                                                  address.controls.street1.dirty) && 
                                                  !address.controls.street1.valid }">
                <span class="invalid-feedback">
                  <span *ngIf="address.controls.street1.errors?.required">
                    Please enter your street address.
                  </span>
                </span>
              </div>
            </div>

            <div class="form-group row mb-2">
              <label class="col-md-2 col-form-label"
                     attr.for="{{'street2Id' + i}}">Street Address 2</label>
              <div class="col-md-8">
                <input class="form-control"
                       id="{{'street2Id' + i}}"
                       type="text"
                       placeholder="Street address (second line)"
                       formControlName="street2">
              </div>
            </div>

            <div class="form-group row mb-2">
              <label class="col-md-2 col-form-label"
                     attr.for="{{'cityId' + i}}">City, State, Zip Code</label>
              <div class="col-md-3">
                <input class="form-control"
                       id="{{'cityId' + i}}"
                       type="text"
                       placeholder="City"
                       formControlName="city">
              </div>
              <div class="col-md-3">
                <select class="form-control"
                        id="{{'stateId' + i}}"
                        formControlName="state">
                  <option value=""
                          disabled
                          selected
                          hidden>Select a State...</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
              <div class="col-md-2">
                <input class="form-control"
                       id="{{'zipId' + i}}"
                       type="number"
                       placeholder="Zip Code"
                       formControlName="zip">
              </div>
            </div>
          </div>

        </div>
```



## Routing guard 
E' opportuno settare la canDeactivate routing Guard quando si hanno dei cambiamenti non salvati.
```typescript
// nel router
[
    {path:'products', component: ProductListComponent },
    {
        path:'products/:id', 
        component: ProductDetailComponent, 
        canActivate:[ProductDetailGuard] // cerca specifici criteri
    },
    {
        path:'products/:id/edit', 
        component: ProductEditComponent, 
        canActivate:[ProductEditGuard] 
    }
]
// la guard è 

import { ProductEditComponent } from './product-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
  canDeactivate(component: ProductEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.productForm.dirty) {
      const productName = component.productForm.get('productName').value || 'New Product';
      return confirm(`Navigate away and lose all changes to ${productName}?`);
    }
    return true;
  }
}
```
Per prendere dei dati da BE e metterli nel form si usa .patchValue() :
```typescript
ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      tags: this.fb.array([]),
      description: ''
    });

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getProduct(id);
      }
    );
  }

  getProduct(id: number): void {
    this.productService.getProduct(id)
      .subscribe({
        next: (product: Product) => this.displayProduct(product),
        error: err => this.errorMessage = err
      });
  }

  displayProduct(product: Product): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;

    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }

    // Update the data on the form
    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description
    });
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

```


## Links
- [corso angular-2-reactive-forms](https://app.pluralsight.com/library/courses/angular-2-reactive-forms/table-of-contents)
- [codice corso](https://github.com/DeborahK/Angular-ReactiveForms)