# Generics

I Generics permettono di specializzare classi, interfacce o funzioni.

Si può definire una interfaccia generica che rappresenta il cambiamento in un valore di cui non sappiamo il tipo le cui proprietà prenderanno, ma sappiamo che queste due proprietà avranno lo stesso tipo "generico" che chiamiamo `ValueType`. E' un pò come i template html aventi dei placeholder che verranno solo in seguito valorizzati.

```typescript
interface ChangeRecord<ValueType> {
  oldValue: ValueType;
  newValue: ValueType;
}

function isChanged<ValueType>(change: ChangeRecord<ValueType>) {
  return change.oldValue !== change.newValue;
}
```

Per usare l'interfaccia generica ad esempio per descrivere un cambiamento di temperatura si passa un tipo number che permetterà di specializzare l'interfaccia al caso specifico:

```typescript
type ChangeInTemperature = ChangeRecord<number>;
```

Si può inoltre aggiungere dei vincoli ai generics per specificare quali tipi sono ammessi per l'argomento del tipo generico:

```typescript
interface ChangeRecord<ValueType extends string | number | boolean> {
  oldValue: ValueType;
  newValue: ValueType;
}
```

# Meta programming con i generics -> MAYBE

Grazie a costrutti sintattici, operanti a livello di tipo è possibile creare nuovi tipi programmaticamente. E' possibile utilizzare l'operatore `union` indicante che entrambe le opzioni sono valide

```typescript
type NumberOrString = string | number;
```

E' così possibile definire un tipo "Somethig or null":

```typescript
type StringOrNull = string | null;
const test1: StringOrNull = "hello"; // OK
const test2: StringOrNull = null; // OK
const test3: StringOrNull = 42; // Type Error
```

E' pertanto possibile definire un generic del tipo

```typescript
type MaybeNull<ValueType> = ValueType | null;

const test1: MaybeNull<string> = "hello"; // OK
const test2: MaybeNull<number> = null; // OK
const test3: MaybeNull<boolean> = 42; // Type Error

// usato dentro le funzioni così
function requireValue<ValueType>(input: MaybeNull<ValueType>) {
  if (input === null) throw Error("value is required!");
  return input;
}

// suppose "test1" is of type MaybeNull<string>
requireValue(test1); // string
// suppose "test2" is of type MaybeNull<number>
requireValue(test2); // number
```

Supponiamo di avere una configurazione che può essere:

```json
{
  "happinessScoreToday": 10
}
```

oppure

```javascript
{
  happinessScoreToday: (weatherOpinion) =>
    weatherOpinion === "gorgeous" ? 10 : 5;
}
```

quindi possiamo avere un tipo del tipo

```typescript
type HappinessScoreConfig =
  | number
  | (weatherOpinion: WeatherOpinion) => number;
```

Supponendo che tutte le configurazioni hanno un tipo costante/fn si può generalizzare questo tipo di unione in un tipo generico `MaybeConstant`

```typescript
type MaybeConstant<Function extends (...args: any[]) => any> =
  | Function
  | ReturnType<Function>;
```

Il built in type `ReturnType` estrae il return type dell'argomento funzione, quindi si può riscrivere il tipo con:

```typescript
type HappinessScoreConfig = MaybeConstant<
  (weatherOpinion: WeatherOpinion) => number
>;

// si usa così
function useConfig(config: HappinessScoreConfig): number {
  // return config; // can't do this, might be function!
  // return config("gorgeous"); // can't do this, might be number!
  if (typeof config === "number") return config; // OK
  return config("gorgeous"); // also OK, can only be function.
}
```

Altro interessante esempio è una funzione che può completare come operazione sincrona con un valore o asincrona come promise di tale valore:

```typescript
type MaybePromise<ValueType> = ValueType | Promise<ValueType>;

// eventualmente combinata
type ResolveHappinessConfig = MaybeConstant<
  (weatherOpinion: WeatherOpinion) => MaybePromise<number>
>;
```

Altro esempio un valore o una lista

```typescript
type MaybeArray<ValueType> = ValueType | ValueType[];
```

## Source:

- [typescript-generics](https://medium.com/@tar.viturawong/the-true-power-of-typescript-generics-1303d78a1c9a)

## Altro esempio

Data una funzione di cui non sappiamo il formato degli input e valori ritornati:

```typescript
function addItem(item: string, array: string[]) {
  array = [...array, item];
  return array;
}
```

Si rende "generica" con la seguente sintassi (dove il parametro iDontKnow è generalmente scritto come " T "):

```typescript
function addItem<IDontKnow>(item: IDontKnow, array: IDontKnow[]) {
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
