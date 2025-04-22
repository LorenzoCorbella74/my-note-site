const { MongoClient, ObjectID } = require('mongodb');

function libriRepo() {

    const dbName = 'testDB' // definito su Mongo Atlas 
    const uri = `mongodb+srv://admin:admin@prova.25ws1.mongodb.net/`;

    function get(query, limit) {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(url);
            try {
                await client.connect();
                const db = client.db(dbName);

                let items = db.collection('libri').find(query);  // ritorna un "CURSOR" per avere i dati si deve fare item.toArray()

                // collection.find({}).project({ a: 1 })                          // Create a projection of field a
                // collection.find({}).skip(1).limit(10)                          // Skip 1 and limit 10
                // collection.find({}).batchSize(5)                               // Set batchSize on cursor to 5
                // collection.find({}).filter({ a: 1 })                           // Set query on the cursor
                // collection.find({}).comment('add a comment')                   // Add a comment to the query, allowing to correlate queries
                // collection.find({}).addCursorFlag('tailable', true)            // Set cursor as tailable
                // collection.find({}).addCursorFlag('oplogReplay', true)         // Set cursor as oplogReplay
                // collection.find({}).addCursorFlag('noCursorTimeout', true)     // Set cursor as noCursorTimeout
                // collection.find({}).addCursorFlag('awaitData', true)           // Set cursor as awaitData
                // collection.find({}).addCursorFlag('exhaust', true)             // Set cursor as exhaust
                // collection.find({}).addCursorFlag('partial', true)             // Set cursor as partial
                // collection.find({}).addQueryModifier('$orderby', { a: 1 })        // Set $orderby {a:1}
                // collection.find({}).max(10)                                    // Set the cursor max
                // collection.find({}).maxTimeMS(1000)                            // Set the cursor maxTimeMS
                // collection.find({}).min(100)                                   // Set the cursor min
                // collection.find({}).returnKey(10)                              // Set the cursor returnKey
                // collection.find({}).setReadPreference(ReadPreference.PRIMARY)  // Set the cursor readPreference
                // collection.find({}).showRecordId(true)                         // Set the cursor showRecordId
                // collection.find({}).sort([['a', 1]])                           // Sets the sort order of the cursor query
                // collection.find({}).hint('a_1')                                // Set the cursor hint
                if (limit > 0) {
                    items = items.limit(limit);
                }
                resolve(await items.toArray());
                client.close();
            } catch (error) {
                reject(error);
            }
        });
    }

    function getById(id) {
        return new Promise(async (resolve, reject) => {
          const client = new MongoClient(url);
          try {
            await client.connect();
            const db = client.db(dbName);
            const item = await db.collection('libri').findOne({ _id: ObjectID(id) }); // non basta l'id ma serve l'ObjectID
            resolve(item);
            client.close();
          } catch (error) {
            reject(error);
          }
        });
      }
    
      function add(item) {
        return new Promise(async (resolve, reject) => {
          const client = new MongoClient(url);
          try {
            await client.connect();
            const db = client.db(dbName);
            const addedItem = await db.collection('libri').insertOne(item);
    
            resolve(addedItem.ops[0]); // ops è un array ma si vuole solo il 1° elem
            client.close();
          } catch (error) {
            reject(error);
          }
        });
      }
    
      function update(id, newItem) { // si deve passare tutto l'obj
        return new Promise(async (resolve, reject) => {
          const client = new MongoClient(url);
          try {
            await client.connect();
            const db = client.db(dbName);
            const updatedItem = await db.collection('libri')
              .findOneAndReplace({_id: ObjectID(id)}, newItem, {returnOriginal:false});
            
            resolve(updatedItem.value); // .value per avere indietro cosa aggiornato
            client.close();
          } catch (error) {
            reject(error);
          }
        });
      }
    
      function remove(id){
        return new Promise(async (resolve, reject) => {
          const client = new MongoClient(url);
          try {
            await client.connect();
            const db = client.db(dbName);
            const removed = await db.collection('libri').deleteOne({_id: ObjectID(id)});
    
            resolve(removed.deletedCount === 1);
            client.close();
          } catch (error) {
            reject(error);
          }
        });
      }

    function loadData(data) {
        return new Promise(async (resolve, reject) => {
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            try {
                await client.connect();
                const db = client.db(dbName)

                const results = await db.collection('libri').insertMany(data); // si passa un .json a insertMany 
                resolve(results);
                client.close()
            } catch (error) {
                reject(error)
            }
        })
    }

    return { loadData, get, getById, add, update, remove }
}

module.exports = libriRepo();