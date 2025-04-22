# Decorators

I decoratori sono oggetti usati per aggiungere o estendere dinamicamente delle funzionalità ad altri oggetti, senza dover cambiare l'implementazione dell'oggetto di partenza e senza utilizzare altre metodologie quali subclassing e inheritance. In Typescript abbiamo:

```typescript
@filterMales // This is the decorator
class MyClass {
  constructor(children) {
    this.children = children
  }
}
```

In Javascript possiamo avere classi con metodi che possono essere modificati o con un decoratore o con subclasses:
```javascript
function Frog(name) {
  this.name = name
}

Frog.prototype.getTeeths = function() {
  return 2
}

Frog.prototype.lick = function(target) {
  console.log(`I'm going lick you, ${target.name}. You better taste delicious`)
}

// Or with classes
class Frog {
  constructor(name) {
    this.name = name
  }

  getTeeths() {
    return 2
  }

  lick(target) {
    console.log(
      `I'm going lick you, ${target.name}. You better taste delicious`,
    )
  }
}

/* 1) qua si modifica una classe con un decoratore*/
function withToad(frog) {
    frog.getTeeths = function() {
        return 0
    }
}

/* 2) si modifica una classe facendo una sottoclasse */
function Toad(name) {
  Frog.call(this, name)
  
  this.getTeeths = function() {
    return 0
  }
}
const kellyTheToad = new Toad('kelly')

// or using classes

class Toad extends Frog {
  getTeeths() {
    return 0
  }
}
const kellyTheToad = new Toad('kelly')

```

Un altro esempio potrebbe essere l'applicazione di un tema:

```javascript
function Theme() {}

/* metodo che ritorna una configurazione di default */
Theme.prototype.createStylesheet = function() {
  return {
    header: {
      color: '#333',
      fontStyle: 'italic',
      fontFamily: 'Roboto, sans-serif',
    },
    background: {
      backgroundColor: '#fff',
    },
    button: {
      backgroundColor: '#fff',
      color: '#333',
    },
    color: '#fff',
  }
}

Theme.prototype.applyStylesheet = function(stylesheet) {
  const bodyElem = document.querySelector('body')
  const headerElem = document.getElementById('header')
  const buttonElems = document.querySelectorAll('button')
  this.applyStyles(bodyElem, stylesheet.background)
  this.applyStyles(headerElem, stylesheet.header)
  buttonElems.forEach((buttonElem) => {
    this.applyStyles(buttonElem, stylesheet.button)
  })
}

Theme.prototype.applyStyles = function(elem, styles) {
  for (let key in styles) {
    if (styles.hasOwnProperty(key)) {
      elem.style[key] = styles[key]
    }
  }
}

// si applica con
const theme = new Theme()
const stylesheet = theme.createStylesheet()
theme.applyStylesheet(stylesheet)

```

Possiamo decorare il metodo di creazione della configurazione dei default per generare un'altra configurazione a partire da quella di default. L'idea è comunque avere un metodo che ritorna la configurazione ddefault e avere n modificatori che la modificano in modo da poter applicare delle varianti anceh temporanemante:

```javascript
function bloodTheme(originalTheme) {
  const default = originalTheme.createStylesheet()
  
  originalTheme.createStylesheet = function() {
    return {
      name: 'blood',
      ...default,
      header: {
        ...default.header,
        color: '#fff',
        fontStyle: 'italic',
      },
      background: {
        ...default.background,
        color: '#fff',
        backgroundColor: '#C53719',
      },
      button: {
        ...default.button,
        backgroundColor: 'maroon',
        color: '#fff',
      },
      primary: '#C53719',
      secondary: 'maroon',
      textColor: '#fff',
    }
  }
}

// si applica il decoratore per modificare il metodo di default
const theme = new Theme()
bloodTheme(theme) // -> Applying the decorator - si modifica la configurazione
const stylesheet = theme.createStylesheet()
theme.applyStylesheet(stylesheet)

```
