Per conservare e recuperare documenti da MongoDB è spesso usato MONGOOSE un ODM (object document mapper) che permette di strutturare i dati in una maniera più comoda rispetto al driver di default per node.js in quanto permette la validazione, default value, l’associazione e altre funzioni di data modeling (quali pseudo-joins, object life cycle management, rich query builder, etc)
```js
var mongoClient = require('mongodb').MongoClient;

// connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", 
  function(err,db){
    if(!err){
      console.log("we are connected");
    }
  });
```
<u><b>Costruire lo schema (è il template dei miei dati) e costruire il modello a partire da tale schema.</b></u>
```js
var mongoose = require (‘mongoose’);
var Schema = mongoose.Schema;

// definisce lo schema dell'entità customer
var customerSchema = new Schema({
  name: String,
  isActive: Boolean
});

// costruisce il modello partendo dallo schema
// var Customer = mongoose.model('Customer', customerSchema, nomeCollection);
module.exports = mongoose.model('Customer',CustomerSchema);

/* i permessi data types:
Mongoose  - Javascript
string        string
number        number
Date        object
Buffer        Object
boolean        boolean
mixed        object
objectId        object
Array        Array (object)
```
Si costruisce una versione più complessa:
```js
// definisce il modello dell'entità customer con un oggetto innestato, permettendo
// una scrittura più ordinata (a livello di funzionalità non ho benefici): è utile
// indicare ciò che è innestato con il prefisso "sub"

var addressSchema = new Schema ({
  type:String,
  street:String,
  city: String,
  state:String,
  country: String,
  postalCode:Number
});

var customerSchema = new Schema({
  name: {
          first:String,
          last: String
  },
  address: [addressSchema],
  createdOn: {type:Date, default:Date.now},
  isActive: {type: Boolean default:true}
});

// disable _id
var noIdSchema = new Schema ({name :String},{_id:false});
```
Esempio di Schema.add
```js
// Example of using Schema.add ...
var includeMiddleName = true;

var exampleSchema = new Schema;

if (includeMiddleName) {
	exampleSchema.add({ 
		memberName: { 
			first: String,
			middle: String,
			last: String
		}
	});
} else {
	exampleSchema.add({ 
		memberName: { 
			first: String,
			last: String
		}
	});
};

exampleSchema.add({
	project: String,
    workYesterday: String,
    workToday: String,
    impediment: String,
    createdOn: { type: Date, default: Date.now }
});
```
<b>Ricapitolando: si definisce uno schema e si costruisce un model, in pratica una classe da cui i documenti che vorrò aggiungere al db saranno delle sue istanze.</b>
```js
var personSchema = new Schema ({
  firstName: String,
  lastName: String
});

var Person = mongoose.model('Person', personSchema);

// si definisce una istanza del modello...
var bob = new Person({
  firstName:"Lorenzo",
  lastname:"Corbella"
});
```
I principali metodi usati per recuperare (queryng) i documenti sono<div><ul><li><span style="line-height: 1.4;">find - Model.find( conditions, [fields], [options], [callbacks])</span><br></li><li><span style="line-height: 1.4;">findById</span><br></li><li><span style="line-height: 1.4;">findOne</span><br></li><li><span style="line-height: 1.4;">where</span><br></li></ul></div><div>Per aggiornare e rimuovere:</div><div><ul><li>update</li><li>remove</li><li>findByIdAndUpdate</li><li>findByAndRemove</li></ul></div><div><br></div>
CALLBACKS: sono funzioni anonime che permettono di gestire gli eventuali errori ed i risultati.
```js
someModel.find(function(err,results){
// handle error….

// handle results….
});
```