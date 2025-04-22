# Ricerca per chiave o per iterazione

La funzione è quella di ricercare solo un elemento tra n. 
Cercare lookup table o hash table.

```javascript

var tags = [
    'tag1',
    'tag2',
    'tag3',
    ...
];

var tags2 = {
    'tag1' : null,
    'tag2' : null,
    'tag3' : null,
}

// 1) con gli array
tags.indexOf(value) // exists?

// oppure se un array di oggetti
for (var i = 0; i < tags.length; i ++) {
  if (tags[i].id == id) { 
    selected = tags[i]; 
    break;
  }
}

//2) con oggetti
tags2[value] // exists?
```

# Mappe

Le mappe rispetto agli oggetti sono:
- 2.5 volte + veloci per trovare item (.has())
- 40 volte + veloci per settare proprietà (.set())
- 30 volte + veloci per cancellare proprietà (.delete())
- 5 volte  + lente all'interno di un ciclo for settare proprietà all'interno di un oggetto

Sono preferibili agli oggetti quando 
- si deve aggiungere e togliere dinamicamente proprietà e quando il numero delle proprietà non è conosciuto in anticipo.
- quando si ha bisogno che la chiave abbia anche varie informazioni
- quando è importante l'ordine di inserimento 


## Metodi
 - `Map.prototype.set(key, value)` – aggiunge la chiave ed il corrispondente valore;
 - `Map.prototype.get(key)` – ritorna il valore della corrispondente key;
 - `Map.prototype.delete(key) ` – cancella chiave valore dalla mappa;
 - `Map.prototype.has(key)` – ritorna un booleano se la key è presente;
 - `Map.prototype.clear()` – rimuove tutti gli elementi della mappa;
- `Map.prototype.size`  -  ritorna il numero di coppie key-value 


## Iterare su mappe
Da notare che rispetto agli oggetti normali l'iterazione tiene conto dell'ordine di inseriemento. Con le mappe ci sono 4 metodi per iterare:
- `map.keys()` – returns an iterable for keys,
- `map.values()` – returns an iterable for values,
- `map.entries()` – returns an iterable for entries [key, value], it’s used by default in for..of.
- `map.forEach()` come per gli array.

```javascript    
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// iterate over values (amounts)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// iterate over [key, value] entries
for (let entry of recipeMap) { // the same as of recipeMap.entries()
  alert(entry); // cucumber,500 (and so on)
}

// runs the function for each (key, value) pair
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```


## OBJ -> Map
```javascript
let obj = {
  name: "John",
  age: 30
};

let map = new Map(Object.entries(obj));

alert( map.get('name') ); // John
```
## Map -> Obj
```javascript
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }
```

## Mappa -> Array

```javascript
const map = new Map([['one', 1], ['two', 2]]);
const arr = [...map];

const mapToObj = map => {
  const obj = {};
  map.forEach((key, value) => { obj[key] = value });
  return obj;
};

const objToMap = obj => {
  const map = new Map;
  Object.keys(obj).forEach(key => { map.set(key, obj[key]) });
  return map;
};
```


# Sources
- [map-set](https://javascript.info/map-set)
- [example](https://medium.com/@bretcameron/how-javascript-maps-can-make-your-code-faster-90f56bf61d9d)
- [what and when](https://medium.com/front-end-weekly/es6-map-vs-object-what-and-when-b80621932373)