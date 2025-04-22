```js
// con require si carica l'oggeto mongodb che espone l'obj mongoclient
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/video'; // "video" è il nome del db

MongoClient.connect(url, function(err, db) {  
    console.log("Successfully connected to server");

    // Find some documents in our collection
    db.collection('movies').find({}).toArray(function(err, docs) {

        // Print the documents returned
        docs.forEach(function(doc) {
            console.log(doc.title);
        });

        // Close the DB
        db.close();
    });

    // Declare success
    console.log("Called find()");
});
```
<b>Il node.js driver esegue operazioni ASINCRONE</b>, cioè invece di aspettare la risposta del db server prima di continuare, passa una callback function che specifica cosa fare a seguito della risposta della risposta del db.