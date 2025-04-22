# Optional chaining
L' optional chaining operator permette di leggere il valore di una proprietà locata in profondità ad una catena di proprietà innestate senza dover validare ogni singolo passo della catena. ***E' supportato in ogni browser ad eccezione di IE11***.

```javascript
// Dato un oggetto innestato:
const house = {
  price: 1000000,
  currency: 'USD',
  address: {
    city: 'New York',
    street: 'Main street',
    postal_code: '1234 AB',
    state: {
      name: 'New York',
      abbreviation: 'N.Y.'
    }
  },
  owner: {
    name: "John Doe"
  }
};

// per accedere ad una proprietà si usa 1):
const owner = house.owner ? house.owner.name : null;
const state = house.address && house.address.state ? house.address.state.name : null
// oppure 2)
const owner = house.owner.name ?? null; // nullish coalescing operator
```

Nel secondo caso se `owner` non esiste o è null si ha un errore. Per risolvere tale problema si usa l'optional chaining operator che ritorna `undefined` se non trova la proprietà indicata:
```javascript
const city = house?.address?.city // "New York"
const nonExisting = house?.roof?.material // Undefined
const houseNumber = house?.address?.number // Undefined
const state = house?.address?.state?.abbreviation // "N.Y."
```

Si può inoltre usare anche nei seguenti tre casi:
```javascript
// 1) accedere a proprietà dinamiche di un obj
const someProperty = obj?.['property-' + propertyName];

// 2) insieme al coalesching operator per settare dei valori di default
const ownerName = house?.owner?.name ?? "Unknown owner";

// 3) con funzioni
const result = someObject.customMethod?.();
```

[SOURCE](https://levelup.gitconnected.com/this-trick-changed-the-way-i-access-nested-objects-in-javascript-bc8ead3a7015) 