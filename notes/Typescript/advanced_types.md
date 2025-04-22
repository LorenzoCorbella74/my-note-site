# Type utility

Typescript permette di usare delle [utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html):

## Union type (OR)

Permette di specificare che una variabile può essere di più tipi

```typescript
function logIdentifier(id: string | undefined) {
  if (!id) {
    console.error("no identifier found");
  } else {
    console.log("id", id);
  }
}
```

## Intersection type (AND)

E' possibile anche utilizzare l'`intersection types` che è principalmente usato per combinare dei tipi di oggetti esistenti (quindi non solo l'intersezione). L'`intersection type` è definito usando l'operatore `&`. Notare che si poteva anche usare una Interfaccia che estendeva + interfacce con `interface ElevatedEmployee extends Employee, Admin`.

```typescript
type Admin = {
  name: string;
  priviledges: string[];
};

type Employee = {
  name: string;
  startDAte: Date;
};

type ElevatedEmployee = Employee & Admin;
```

Se vogliamo però esprimere types/interfaces in una maniera più dinamica e potente, si deve usare i generics

## keyof

Per ogni tipo T, keyof T è l'unione dei nomi delle proprietà pubbliche conosciute di T.

```typescript
interface Person {
  age: number;
  name: string;
}

type PersonKeys = keyof Person; // "age" | "name"
```

Se usato insieme ad extends permette di limitare il tipo di un parametro generico <T, K extends keyof T> , K può essere soltanto una chiave di una proprietà pubblica di T (non ha niente a che fare con estendere un tipo o ereditarietà). Un [caso d'uso](https://mariusschulz.com/blog/keyof-and-lookup-types-in-typescript) può essere:

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person: Person = {
  age: 22,
  name: "Tobias",
};

// name is a property of person  --> no error
const name = getProperty(person, "name");

// gender is not a property of person  --> error
const gender = getProperty(person, "gender");
```

Keyof può essere utilizzato anche con classi ma funziona soltanto con i membri pubblici di tale classe (quindi non con campi private o static)

# Mapped types

# [Mapped types](https://javascript.plainenglish.io/advanced-typescript-with-code-challenges-mapped-types-6825c7fc984a)

```typescript
type AppConfig = {
  email: string;
  mainColor: string;
  darkMode: boolean;
};

type AppPermissions = {
  changeEmail: boolean;
  changeMainColor: boolean;
  changeDarkMode: boolean;
};

// si usano gli stessi nomi
type AppPermissions = {
  [Property in keyof AppConfig]: boolean;
};

// si modificano i nomi
type AppPermissions = {
  [Property in keyof AppConfig as `change${Property}`]: boolean;
};

// si possono usare exclude, pick e omit
type AppPermissions = {
  [Property in keyof AppConfig as Exclude<Property, "darkMode">]: boolean;
};

type AppPermissions = {
  [Property in keyof Omit<AppConfig, "darkMode">]: boolean;
};
```

# [utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html):

## Partial

Permette di rendere tutte le proprietà opzionali in un tipo dove tutte le proprietà originariamente dovrebbero essere richieste.

```typescript
type Worker = {
  name: string;
  profession: string;
};

// Not defining 'profession' is allowed
const worker: Partial<Worker> = {
  name: "Jeroen",
};
```

# Required

L'opposto di `Partial` è `Required`, invece di rendere le proprietà opzionali, le rende required.

```typescript
type Worker = {
  name?: string;
  profession?: string;
};

// You should defining 'name' and 'profession'
const worker: Required<Worker> = {
  name: "Jeroen",
  profession: "Developer",
};
```

## Readonly

Vediamo un esempio di `Readonly` che permette di rendere tutte le proprietà di una entità read only:

```typescript
interface Teacher {
  name: string;
  email: string;
}

/*
Invece di mettere:

    interface Teacher {
        readonly  name: string;
        readonly email: string;
    }

Si può usare:
*/

type ReadonlyTeacher = Readonly<Teacher>;

const t: ReadonlyTeacher = { name: "jose", email: "jose@test.com" };

t.name = "max"; // Error: Cannot assign to 'name' because it is a read-only property.(2540)

// oppure con l'operatore  -  che toglie il modificatore successivo
type Writeable<T> = { -readonly [P in keyof T]: T[P] };

const t: Writeable<Teacher> = { name: "jose", email: "jose@test.com" };

t.name = "max"; // works fine
```

L'idea è quello di avere delle strutture immutabili usando `readonly` o `Readonly`.
Da typescript 3.4 si può utilizzare anche `as const` che rende la struttura non modificabile.

## Pick

`Pick`, permette di includere solo alcune proprietà selettivamente:

```typescript
type Worker = {
  name: string;
  profession: string;
  isWorking: boolean;
};

// Only 'name' and 'isWorking' are included
const worker: Pick<Worker, "name" | "isWorking"> = {
  name: "Jeroen",
  isWorking: true,
};
```

## Omit

L'opposto di `Pick` è chiamato `Omit`, che esclude le proprietà che non si vuole usare.

```typescript
type Worker = {
  name: string;
  profession: string;
  isWorking: boolean;
};

// 'profession' is now excluded
const worker: Omit<Worker, "profession"> = {
  name: "Jeroen",
  isWorking: true,
};
```

## Record

Il tipo `Record` permette di definire un oggetto dove le chiavi hanno un tipo differente del corrispettivo valore.

```typescript
type Worker = "developer" | "architect";
type Person = { name: string };

// a worker object has now 'developer' or 'architect' as keys
const worker: Record<Worker, Person> = {
  developer: { name: "Jeroen" },
  architect: { name: "Bob" },
};
```

## NonNullable

Un modo facile per escludere null and undefined dai valori è usare il tipo `NonNullable`.

```typescript
// Returns only 'Jeroen'
const worker: NonNullable<"Jeroen", undefined, null>;
```

## Extract

Per estrarre valori in questo caso di tipo `keyof`, si può usare `Extract` per includere soltanto le chiavi che esistono nei tipi dati.

```typescript
type Worker = {
  name: string;
  age: string;
  isWorking: boolean;
};
type Person = {
  name: string;
  age: string;
};
// 'name' or 'age' is both in type Person and Worker therefore only allowed
const worker: Extract<keyof Worker, keyof Person> = "name" || "age";
```

## Exclude

Per escludere i valori, in questo caso di tipo `keyof`, si può usare `Exclude` per escludere le chiavi che sono duplicatein entrambi i tipi dati:

```typescript
type Worker = {
  name: string;
  age: string;
  isWorking: boolean;
};
type Person = {
  name: string;
  age: string;
};
// 'isWorking' is not in type Person and therefor only allowed
const worker: Exclude<keyof Worker, keyof Person> = "isWorking";
```

## Type alias

Sono simili alle interfacce (anche se queste possono essere estese, mentre i types possono essere estese con &)

```typescript
type Persona = {
  [key: string]: string | number | boolean; // sintassi per specificare proprietà di cui non si conosce la chiave
  mode: string;
};
```

## function overload

Si usa la sintassi, con la firma della fn una sopra l'altra:

```typescript
function add(a: number, b: number): number;
function add(a: Compinable, b: Combinable) {
  if (typeof a === "string" && typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

## Literal types

Permette di specificare **il valore che un tipo può avere**, e che può essere di tipo string, number, boolean

```typescript
/**
 * string literal
 * la variabile di tipo 'Language' can be only a 'string' and has a value of 'JavaScript'.
 */
type Language = "JavaScript";
const myLanguage: Language = "JavaScript";
const myLanguage: Language = "Java"; // Error: Type '"Java"' is not assignable to type '"JavaScript"'.(2322)

/**
 * number literal
 * la variabile di tipo 'BoxSize' can be only a 'number' and has a value of 4.
 */
type BoxSize = 4;
const boxSize: BoxSize = 4;
const anotherBoxSize: BoxSize = 5; // Error: Type '5' is not assignable to type '4'.(2322)

/**
 * boolean literal
 * la variabile di tipo 'IsValid' can be only a 'boolean' and has a value of true.
 */
type IsValid = true;
const isFormControlValid: IsValid = true;
const isValidFormControl: IsValid = null; // Error: Type 'null' is not assignable to type 'true'.(2322)
```

Questo permette di avere un comportamento simile all' enum

```typescript
// string literal with union type
type UserRoles = "User" | "Admin" | "Moderator";
const userRole: UserRoles = "Admin";

// number literal with union type
type BoxSizes = 4 | 8 | 12;
const box: BoxSize = 12;

// boolean literal with union type
type IsValid = true | false;
const isFormValid: IsValid = false;
```

## typeof

L'operatore typeof in typescript funziona differentemente rispetto a quello javascript. Ritorna il tipo della variabile!!

```typescript
const volvoS60 = {
  make: "Volvo",
  model: "S60",
};

const t = typeof vehicle;
console.log(t); // object in javascript !!!

/**
 *  in TypeScript ritorna un tipo con 2 proprietà:
 * 'make: string' and 'model: string'
 */
type Car = typeof volvoS60;
/**
 * type Car = {
 *   make: string;
 *   model: string;
 * }
 */
const volvoXC90: Car = {
  make: "Volvo",
  model: "XC90",
};
```

Usato con keyof è molto potente e permette ad esempio di partire da un enum e avere tutte le proprietà di tali enum

```typescript
const volvoXC90 = {
  make: "Volvo",
  model: "XC90",
};
// typeof volvoXC90; returns the type { make: string; model: string }
// keyof typeof volvoXC90; return the literal type union { 'make' | 'model' }
type CarProps = keyof typeof volvoXC90;

let carProp: CarProps;

carProp = "make";
carProp = "model";
carProp = "year"; // Error: Type '"year"' is not assignable to type '"make" | "model"'.(2322)

enum Transmissions {
  automatic = "automatic",
  manual = "manual",
}

type CarTransmissions = keyof typeof Transmissions;

const volvoS60Transmission: CarTransmissions = "manual";
const volvoXC90Transmission: CarTransmissions = "automatic";
```

## Indexed Access Types

Per accedere delle parti di un tipo si possono usare gli index access type che tramite le [ ] permettono di selezionare delle parti di un tipo:

```typescript
type Dog = {
  name: string;
  lastName: string;
  age: number;
};

type DogAge = Dog["age"]; // type number
// oppure con union type
type DogNameOrAge = Dog["age" | "name"]; // type number | string
```

E' possibile usare gli index access type per creare uno Union type da un **const** object
(si parte da un oggetto e si recuperano i tipi delle chiavi e dei valori):

```typescript
const Prizes = {
  FIRST: 1000,
  SECOND: 500,
  THIRD: 100,
} as const;

type PrizesType = typeof Prizes;
type PrizesTypeKeys = keyof PrizesType; // "FIRST" | "SECOND" | "THIRD"
type Prize = PrizesType[PrizesTypeKeys]; // 1000 | 500 | 100

function payUp(prize: Prize) {}
```

E' possibile accedere alle proprietà innestate di un oggetto:

```typescript
type Dog = {
  name: string;
  lastName: string;
  age: number;
  owner: {
    name: string;
    age: number;
  };
};

type AgeOrName = "name" | "age";

type OwnerNameOrAge = Dog["owner"][AgeOrName]; // type number | string
```

o accedere agli oggetti dentro un array:

```typescript
const players = [
  { id: "asda", score: 100 },
  { id: "akjkjk", score: 180 },
  { id: "jgfj", score: 130 },
];

type Player = (typeof players)[number]; // {id:string;score:number}
```

# Casi particolari

- [10-typescript-features-you-might-not-be-using](https://obaranovskyi.medium.com/10-typescript-features-you-might-not-be-using-yet-or-didnt-understand-d1f28888ea45)
