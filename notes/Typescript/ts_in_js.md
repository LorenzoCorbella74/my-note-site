[Back to index](../README.md)

# Typescript in JS files

Per abilitare il compilatore typescript anche in file .js dentro VSC si deve mettere all'inizio del file

```javascript
//@ts-check
```

Poi aggiungere tramite l'autocomplete dell'intellisense tutte le informazioni con le direttive di JSDOC

```javascript
/**
 * param {string} message
 * return {string}
 */
```

## Rimuovere errori

```typescript
// 2) Eliminare l'errore
if (false) {
  // @ts-ignore
  console.log("x");
}
```
