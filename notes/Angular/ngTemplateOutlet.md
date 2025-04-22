# ngTemplateOutlet

Per creare componenti riutilizzabili è molto utile il `ngTemplateOutlet` e `ngTemplateOutletContext` che permette di fornire dei template riutilizzabili ai componenti. Vediamo come estendere un componente del tipo

```typescript
export class SelectorComponent {
  selected: string;

  @Input() options: string[];
  @Output() selectionChanged = new EventEmitter<string>();
  @Input() displayFunc: (string) => string = (x) => x; // default fn

  selectOption(option: string) {
    this.selected = option;
    this.selectionChanged.emit(option);
  }
}
```

```html
<div>
  <button>{{selected || 'Select'}}</button>
  <ul>
    <li *ngFor="let option of options" (click)="selectOption(option)">
      {{option}}
    </li>
  </ul>
</div>

<!-- Si usa con: -->
<app-selector [options]="sharks" [displayFunc]="appendLatin"> </app-selector>
```

Tramite il tag ng-template abbiamo un blocco di codice html riusabile che di default è nascosto e può avere dati di input ed eventi di output.

Per includere dell'html passato dall'esterno dentro il template del componente si può usare la content projection usando:
- 1) il tag `<ng-content>` 
- 2) ng-container con direttiva ngTemplateOutlet.

```html
<li *ngFor="let option of options">
  <ng-content></ng-content> <!-- 1) si proietta contenuto esterno -->
</li>
```

Ma per far si che all'interno si possa accedere al contesto "locale" si deve usare la direttiva `ngTemplateOutlet` che funziona da placeholder per un template passato dall'esterno:

```html
<!-- 1) Si definisce template di tipo  TemplateRef-->
<ng-template #myTemplate> World! </ng-template>

<!--2) Si renderizza il template nel contenitore -->
Hello <ng-container [ngTemplateOutlet]="myTemplate"></ng-container>
```

Per far si che il template abbia accesso al contesto interno del componente si usa ngTemplateOutletContext e si specifica il nome delle proprietà che saranno poi visibili nel template che verrà passato:

```html
<div class="app-selector btn-group" dropdown>
  <button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">
    <ng-template #defaultSelected> {{ picked?.name || label }} </ng-template>

    <ng-container
      [ngTemplateOutlet]="selectedTemplateRef || defaultSelected"
      [ngTemplateOutletContext]="{ $implicit: picked }"
    >
    </ng-container>
    <span class="caret"></span>
  </button>

  <ul *dropdownMenu class="dropdown-menu">
    <li
      *ngFor="let option of options; index as i"
      (click)="selectOption(option)"
    >
      <ng-template #defaultOption>
        <a class="dropdown-item"> {{ option?.name || option }} </a>
      </ng-template>

      <ng-container
        [ngTemplateOutlet]="optionTemplateRef || defaultOption"
        [ngTemplateOutletContext]="{ $implicit: option, index: i }"
      >
      </ng-container>
    </li>
  </ul>
</div>
```

Per accedere al contesto dentro il template si usa la sintassi let-\* che permette di accedere alle variabili di input ed eventualmente di cambiare nome (come con idx) Quella implicita permette di usare let-option, ma si poteva mettere anche let-item.

Si usa così 1) degli input di tipo template o 2)@ContentChild in cui è possibile combinare lo stato di dove definiamo il template (di solito esterno al componente) con il contesto di dove il template è istanziato (internamente al componente):

```html
<!-- Using @Input to pass template into component -->
<ng-template #selectedTemplate let-shark>
  <fa-icon *ngIf="shark" [icon]="getSwimIcon(shark)"></fa-icon>
  {{ shark?.name || "Shark" }}
</ng-template>

<app-my-selector
  [label]="'Sharks'"
  [options]="sharks"
  (selectionChanged)="selectedShark = $event"
  [selectedTemplate]="selectedTemplate"
>
  <!-- Using @ContentChild to pass template into component -->
  <ng-template #optionTemplate let-shark let-id="index">
    <a class="dropdown-item" [style.color]="id % 2 == 0 ? 'black' : 'blue'">
      <fa-icon *ngIf="shark" [icon]="getSwimIcon(shark)"></fa-icon>
      {{ displayFunc(shark) }}
    </a>
  </ng-template>
</app-my-selector>
```

## Input di tipo generico

E' possibile indicare che un componente avrà degli input generici secondo la sintassi:

```typescript
export class SelectorComponent<T> {
  @Input()
  options: T[];
  @ContentChild("optionTemplate")
  optionTemplateRef?: TemplateRef<any>;

  @Output()
  selectionChanged = new EventEmitter<T>();
}
```

## Inizializzazione variabli

E' possibile inizializzare variabili aventi tipi specifici come vuote:

```typescript
export interface Shark {
  name: string;
  latinName: string;
  status: string;
}

@Component({
  selector: "app-client-1",
  templateUrl: "./client-1.component.html",
})
export class Client1Component {
  sharks: Shark[] = [
    ...
  ];

  selectedShark: Shark = {} as Shark;
}

```

## Links

- [Articolo](https://indepth.dev/posts/1405/ngtemplateoutlet)
- [Componenti agnostici](https://indepth.dev/posts/1314/agnostic-components-in-angular)
- [creating reusable angular components](https://medium.com/angular-in-depth/creating-reusable-angular-components-how-to-avoid-the-painful-trap-most-go-in-d531761d6c7a)
- [plugin architecture](https://christianlydemann.com/implementing-a-plugin-architecture-with-angular-and-openlayers/)
- [indepth.dev](https://indepth.dev/angular)
