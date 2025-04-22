# [Peg.js](https://pegjs.org/)

Peg.js (e la sua ultima [versione](https://peggyjs.org/)) permette di produrre dei parser (parser generator) per interpretare stringhe di testo. Utilizza una grammatica simile alle regex ma permette di superare i limiti di quest'ultime nelle strutture ricorsive.

La grammatica è costituita da una lista di regole interpretate from Top to Bottom, quindi la regola iniziale è la root della grammatica. Ogni regola è come una dichiarazione di variabile con un nome e una espressione da parsare.

```javascript
// npm install -g pegjs

var peg = require("pegjs");
var grammar = "start = ('a' / 'b')+";
var parser = peg.generate(grammar);

parser.parse("abba"); 
// returns ["a", "b", "b", "a"]
```

```peg.js
// match di stringa esatta
start = 'hello world' // returns 'hello world'

// singola espressione di un numero
integer = [0-9]+ // parsing 1 returns ['1']
integer = [0-9]+ // parsing '' throws error
integer = [0-9]*') // parsing '124' returns ['1','2','4'],

// regole tra loro associate TOP to BOTTOM
float = integer+ '.' integer+
integer = [0-9]

// espressione OR con /
number = float / integer / bigint / imaginary
```

## Strutture ricorsive
Le strutture ricorsive permettono di descrivere strutture innestate od ad albero ma anche liste piatte di chiave/valore. 
```
commaSeparatedIntegerList
    = integer ',' commaSeparatedIntegerList
    / integer
integer = [0-9]
```

Un esempio semplificato di oggetto json può essere:
```
object = "{" keyValueList? "}"
keyValueList = keyValue ',' keyValueList / keyValue
keyValue = key ":" value
key = [a-zA-Z]+
value = string / intArray / object
string = "'"[a-zA-Z]+ "'"
intArray
    = '[' integer ',' intArray ']'
    / integer
integer = [0-9]+
```


## Formattazione output
E' possibile definire l'output del parsing tramite la seguente sintassi:
```peg.js
integer = digits:[0-9] { return digits.join() }
// parsing '124' now returns '124' instead of ['1','2','4'],
```



## Esempi di grammatica per espressioni aritmetiche

```peg.js
// Esempio di grammatica per espressioni aritmetiche tipo  
// "2 * (3 + 4)" e calcola il valore.

Expression
  = head:Term tail:(_ ("+" / "-") _ Term)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "+") { return result + element[3]; }
        if (element[1] === "-") { return result - element[3]; }
      }, head);
    }

Term
  = head:Factor tail:(_ ("*" / "/") _ Factor)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "*") { return result * element[3]; }
        if (element[1] === "/") { return result / element[3]; }
      }, head);
    }

// si richiama RICORSIVAMENTE le espressioni dentro le parentesi
Factor
  = "(" _ expr:Expression _ ")" { return expr; }
  / Integer

Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r]*
```

Altri esempi si parser di espressioni matematiche sono:
- [patrickroberts](https://gist.github.com/patrickroberts/35366b0ffb824e533a3bfb8fb28cad31)
- [complete-mathematical-expressions](https://stackoverflow.com/questions/19390084/parsing-complete-mathematical-expressions-with-peg-js)
- [var predefinite e funzioni](https://stackoverflow.com/questions/26286961/peg-js-extension-with-predefined-functions-and-variables)
- [pegjs-maths-parsing](https://www.tutorialguruji.com/javascript/pegjs-maths-parsing/)


## Teoria
Si legge da sx a dx e si fanno i conti da sx a dx (left to right associativity). Per la somma non importa perchè è associative (si ottiene lo stesso risultato sia che si faccia da sx a dx che l'opposto) ma la stessa cosa non vale per le altre operazioni che devono essere considerate in ordine di precedenza. Il trucco è processare stringhe di operazioni con la stessa precedenza come una lista che permette di costruire l'albero con l'associazione corretta.


# Lista della spesa
```json
// Onion 1kg
// Tomatoes 500gm
// Beans 1kg

// Output
[
  { "name": "Onion","quantity": 1000 },
  { "name": "Tomatoes","quantity": 500},
  { "name": "Beans", "quantity": 1000}
]
```

```peg.js
Start = GroceryList

GroceryList = GroceryListItem *

GroceryListItem
 = n:Name _ q:Quantity nl*
 { return { name: n, quantity: q };}

Name = Word

Quantity
 = w:Weight u:Unit
 { if(u == "kg") return w * 1000; return w;} 

Weight
 = n:Number+
 { return parseInt(n.join(""));}

// sono due lettere!!!!
Unit
 = first:Letter second:Letter
 { return first + second; }

Word
 = l:Letter+
 { return l.join(""); }

Number
 = [0-9]

Letter
 = [a-zA-Z]

nl "New line"
 = "\n"

ws "Whitespace"
 = [ \t]

_ "One or more whitespaces"
 = ws+
```

Può essere utile mettere tutto il codice js dentro un [blocco con un proprio stato](https://stackoverflow.com/questions/4205442/peg-for-python-style-indentation) e helpers fn per poi richiamarlo all'interno delle fn di formattazione:
```
/* Initializations */
{
  function start(first, tail) {
    var done = [first[1]];
    for (var i = 0; i < tail.length; i++) {
      done = done.concat(tail[i][1][0])
      done.push(tail[i][1][1]);
    }
    return done;
  }

  var depths = [0]; 

  function indent(s) {
    var depth = s.length;

    if (depth == depths[0]) return [];

    if (depth > depths[0]) {
      depths.unshift(depth);
      return ["INDENT"];
    }

    var dents = [];
    while (depth < depths[0]) {
      depths.shift();
      dents.push("DEDENT");
    }
    if (depth != depths[0]) dents.push("BADDENT");

    return dents;   // output di tutto l'AST
  }
}

/* The real grammar */
start   = first:line tail:(newline line)* newline? { return start(first, tail) }
line    = depth:indent s:text                      { return [depth, s] }
indent  = s:" "*                                   { return indent(s) }
text    = c:[^\n]*                                 { return c.join("") }
newline = "\n"                                     {}
```


# Programming language

- [pegjs grammar for a simple programming language](https://codereview.stackexchange.com/questions/171615/peg-js-grammar-for-a-simple-programming-language)
- [javascript language grammar](https://github.com/dmajda/pegjs/blob/master/examples/javascript.pegjs)
- [rio programming language](https://github.com/slaviqueue/rio)
- [D16](https://github.com/kornalius/DX16)


# Links
- [PEG.JS AND CUSTOM GRAMMARS](https://chernivtsi.js.org/pegjs-and-custom-grammars/#/)
- [examples on official site](https://github.com/pegjs/pegjs/tree/master/examples)
- [Intro to peg.js](https://nathanpointer.com/blog/introToPeg/)
- [Introduzione 2](https://www.rajeeshcv.com/2015/10/13/build-parsers-using-peg-js/)
- [Beginning parsers with PEG.js](https://coderwall.com/p/316gba/beginning-parsers-with-peg-js)
- [Beginners guide to building boolean expression compiler](https://samarjit-samanta.medium.com/beginners-guide-to-building-boolean-expression-compiler-ac17c0d3fa0c)
- [DBN](https://sergimansilla.com/blog/writing-a-javascript-interpreter-for-dbn-using-canvas-i/)
- [Writing a DSL parser using PegJS(oggetto)](https://dev.to/barryosull/writing-a-dsl-parser-using-pegjs--4igo)
- [PEG Parsers: sometimes more appropriate than Regex](https://dev.to/meseta/peg-parsers-sometimes-more-appropriate-than-regex-4jkk)
- [casi](https://devbugfix.com/t/pegjs)
- [Get any text between ( and ) ](https://devbugfix.com/p/1169374)
- [operatore "!" con OR/AND](https://stackoverflow.com/questions/27473149/pegjs-how-to-add-not-logical-operator-to-grammar-that-parses-and-or)
- [How does backtracking work in peg.js](https://stackify.dev/179640-how-does-backtracking-work-in-peg-js-with-example)
- [calculator](https://github.com/camillebaronnet/calculator)
- [expression language](https://github.com/EdgeVerve/feel)

# Compile to JS
Tramite il modulo [esprima](https://esprima.org/) è possibile eseguire la lexical analysis (tokenization) o la syntactic analysis (parsin di un programma javascript) che produce un AST.

```javascript
var esprima = require('esprima')
var program = 'const answer = 42';

esprima.tokenize(program);
// [ { type: 'Keyword', value: 'const' },
//   { type: 'Identifier', value: 'answer' },
//   { type: 'Punctuator', value: '=' },
//   { type: 'Numeric', value: '42' } ]
// 
esprima.parse(program);
// { type: 'Program',
//   body:
//    [ { type: 'VariableDeclaration',
//        declarations: [Object],
//        kind: 'const' } ],
//   sourceType: 'script' }
```

## Links
- [How to create programming language that compiles to JavaScript](https://hackernoon.com/creating-your-own-javascript-based-programming-language-has-never-been-easier-wju33by)
- [Riassunto Escodegen](http://modularity.info/conference/2013/escodegen.html)
- [Dynamically generating code using AST](https://blogs.ajitsingh.me/posts/dynamically-generating-code-using-ast/)
- [Escodegen and Esmangle](https://speakerdeck.com/constellation/escodegen-and-esmangle-using-mozilla-javascript-ast-as-an-ir)


