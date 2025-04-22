# Creating and Using Generics in TypeScript

Appunti del corso [Creating and Using Generics in TypeScript](https://app.pluralsight.com/library/courses/typescript-generics-creating-using/table-of-contents).

- File del corso: [Demo app](https://github.com/bricewilson/Creating-and-Using-Generics-in-Typescript)
- [Sito ufficiale typescript](https://www.typescriptlang.org)
- versione usata `4.2.2`

## Using built-in generic types

Cosa sono i Generics? Sono delle parti di codice (funzioni, interfacce, classi) riutilizzabile che funziona con più tipi. Per esempio nel caso sotto potrei avere una classe che gestisce un catalogo di Libri ed un'altra classe per le riviste, ed un altra per i fumetti, etc. Tramite una sola classe generica è possibile gestire le crud di più item. Con `T` si indica un tipo generico che è ripetuto dentro le annotazioni di classe, metodi, etc.

```typescript
export class Shelf<T> {  // NB: si deve mettere nel nome della classe !!!

    _item: T[] = [];

    addItem(newItem:T){ // implementation}

    removeItem(oldItem:T){ // implementation}
}

// in another file
import {Shelf} from './Shelf'
import {Book} from './Book'
import {Magazine} from './Magazine'

// si deve specificare che tipo si usa al posto di T !!!
let bookShelf: Shelf<Book> = new Shelf<Book>()
bookShelf.addItem(new Book())
bookShelf.addItem(new Magazine()) // -> ERR del compilatore
```

> `Array<T>` è un generic assai usato ed un esempio della flessibilità che offrono i generics

## Creating your own generic functions

Anche le funzioni possono accettare type parameters pertanto

```typescript
function checkOut<T, V>(item: T, customer: V): T {
  // NB: si deve mettere nel nome della fn

  let availableItem: T = getItemFromDB(item);
  let availableCustomer: V = getCustomerFromDB(customer);
  if (availableItem && availableCustomer) {
    // implementation
  }
  return item;
}

checkOut<Book, Student>(someBook, someStudent);
```

> NB: la lettera che si associa dal 2° parametro in poi è a discrezione dello sviluppatore
> Ts deduce (infer) il tipo ritornato da una funzione nel caso in cui non venga espressamente dichiarato o il tipo di generics in base ai parametri passati

E' possibile applicare dei vincoli ai tipi (type constrains) utilizzabili dai generics utilizzando la sintassi `extends nomeInterfaccia` che deve essere soddisfatta

```typescript
import { MeetingResource } from "./models/meetingResource";
import { ConferenceRoom, conferenceRoomData } from "./models/conferenceRoom";

function getBigRooms<T extends MeetingResource>(
  rooms: Array<T>,
  minSize: number
): Array<T> {
  let bigRooms: Array<T> = [];

  rooms.forEach((r) => {
    if (r.capacity > minSize) {
      // ConferenceRoom ha la prop capacity !!!
      bigRooms.push(r);
    }
  });
  return bigRooms;
}

let bigRooms: Array<ConferenceRoom> = getBigRooms<ConferenceRoom>(
  conferenceRoomData,
  20
);
```

> Il tipo della funzione getBigRooms è `<T extends MeetingResource>(rooms: Array<T>, minSize: number) => Array<T>` che può esser messo dentro una variabile:

```typescript
let getLargeRooms = <T extends MeetingResource>(
  rooms: Array<T>,
  minSize: number
) => Array<T>;
```

Altro esempio:

```typescript
function addItem(item: string, array: string[]) {
  array = [...array, item];
  return array;
}
```

Si rende la funzione "generica" con la seguente sintassi:

```typescript
function addItem<T>(item: T, array: T[]) {
  array = [...array, item];
  return array;
}
```

Come si può restringere i tipi ammessi in `T`? Si può usare la keyword `extends`

```typescript
function addItem<T extends boolean | string>(item: T, array: T[]) {
  array = [...array, item];
  return array;
}

addItem("hello", []);

addItem(true, [true, true]);

addItem(new Date(), []);
//      ^^^^^^^^^^
// Argument of type 'Date' is not assignable to parameter of type 'string | boolean'
```

## Creating and using generic Interfaces and Classes

```typescript
export interface LibraryCollection<T> {
  _items: T[];
  addItem(newItem: T): void;
  removeItem(oldItem: T): void;
}

let collection: LibraryCollection<string> = {
  _items: ["Libro1", "Libro2"],
  addItem: (s) => console.log("Added"),
  removeItem: (s) => console.log("Removed"),
};
```

Il tipo T verrà specificato quando l'interfaccia verrà implementata in un obj literal o una classe.

```typescript
import {LibraryCollection} from './LibraryCollection'

export class Shelf<T> implements LibraryCollection<T> {
    _item: T[] = [];

    addItem(newItem:T){ // implementation}
    removeItem(oldItem:T){ // implementation}
}
```

> i membri statici delle classi non possono referenziare class type parameters, ossia generic classes sono solo generiche sulle loro istanze !!

E' possibile applicare dei type constrains anche alle classi:

```typescript
import { MeetingResource } from "./meetingResource";

class Reservation<T extends MeetingResource> {
  reservationDate: Date;
  organizerName: string;
  resource: T;

  request(requestResource: T, requester: string) {
    this.organizerName = requester;
    this.resource = requestResource;
    console.log(
      `${this.organizerName} requested a reservation for ${requestResource.name}`
    );
  }
}
```
