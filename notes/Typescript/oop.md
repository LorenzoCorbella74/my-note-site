# Creating Object-oriented TypeScript Code

Appunti del corso [Creating Object-oriented TypeScript Code](https://app.pluralsight.com/library/courses/typescript-creating-object-oriented-code/table-of-contents). 
- File del corso: [Demo app](https://github.com/DanWahlin/TypeScriptDemos)
- [Sito ufficiale typescript](https://www.typescriptlang.org)
- versione usata `4.2.2`

## Classi
Le classi sono dei "modelli", mentre le interface sono dei "contratti".
```typescript

class Person {

    private _age:number

    static prop: numner // proprietà statiche

    // permette di inizializzare istanze con dati
    constructor(){}

    get age(){
        return this._age
    }

    // i set permettono di filtrare i dati
    set age(value:number){
        if (value>0){
            this._age=value
        }
    }

    // può essere chiamata anche senza istanziare la classe
    // con Person.fn()
    static fn(){

    }
}
```

# Inheritance and Abstraction
Quando delle classi hanno bisogno di funzionalità di un'altra classe si usa l'ereditarietà che permette di estendere la classe padre, ereditando le sue funzionalità ed eventualmente modificandole:
```typescript

class Monster{
    constructor(public howbad:number){ }
}

class Enemy extends Monster{
    constructor(howbad:number){
        super(howbad)   // si chiama la classe di MOnster
    }
}
```
### Override member
E' possibile nei figli fare l'override dei metodi della classe parent, da cui si eredita, semplicemente ripetendo il nome del metodo con una implementazione diversa.

# Abstract class
Le classi astratte permettono di astrarre funzionalità complesse in un oggetto che può essere usato come base per altri oggetti. Che differenza c'è tra una classe normale e una classe astratta da cui altre ereditano? La classe astratta non c'è bisogno di essere istanziata ma serve solo come "modello" per le altre classi che erediteranno da essa.

```typescript
export abstract class BankAccount {

    // Abstract member (devono essere implementate dai child!!!)
    abstract accountType:AccountType

    // metodo CON implementazione
    deposit(){}

    // qua è SENZA l'implementazione
    // a questo livello non sappiamo come implementarlo
    // ma nei figli SI DEVE IMPLEMENTARE!!!!
    abstract getAccountInfo():any;
}
```

# Interfacce e polimorfismo
> Polimorfismo: un set di oggetti ha lo stesso comportamento, ma la maniera in cui eseguono quel comportamento è differente. 

Le interfacce agiscono come un contratto che definisce un set di regole che permette di 
1) strutturare oggetti che avranno implementazioni differenti ma comportamenti uguali 
2) definire dei tipi di tipo custom
3) Le classi possono implementare le interfacce 
4) Dare consistenza a più oggetti ed assicurare la consistenza di una applicazione. 

Possono essere usate per definire "la forma" dei dati che viene passata come parametro all'interno di un metodo e ciò che ritorna da una funzione.Non generano codice, non appaiono a runtime, ma servono  durante lo sviluppo.

```typescript
export interface AccountInfo {
    routingNumber:number;
    bankAccount:number
} 

export interface AccountSettings {
    id:number
    title:string
    balance:umber
    interestRate?: number
    accountInfo?: AccountInfo
}
```

Tramite i generics possiamo rendere le interfacce "più flessibili"
```typescript
// 1) si definiscono dei tipi generici come "placeholder"
export interface AccountInfo<TRouteNumber, TRouteNumber> {
    routingNumber:TRouteNumber;
    bankAccount:TRouteNumber
} 

export interface DepositWithdrawal {
    deposit(amount:number):void
    withdrawal(amount:number):void
}

export interface AccountSettings {
    id:number
    title:string
    balance:umber
    interestRate?: number
    // <- 2) chi l'utilizza deve specificare che tipo sono !!!
    accountInfo?: AccountInfo<string, number> 
}

// E' possibile mescolare (UNIRE) delle interfacce con la key "extends"
export interface Account extends AccountSettings, DepositWithdrawal {}
```

`extends`  si usa solo con le interfacce, ma è inoltre possibile estendere dei tipi con: 
```typescript
type Event = {
   name: string;
   dateCreated: string;
   type: string;
}

interface UserEvent extends Event {
   UserId: string; 
}
```
Oppure [unire due tipi](https://stackoverflow.com/a/41385149) con l'operatore `&`:
```typescript
type TypeA = {
    nameA: string;
};
type TypeB = {
    nameB: string;
};
export type TypeC = TypeA & TypeB;
export type TypeC = TypeA & { prop1: string};
```
