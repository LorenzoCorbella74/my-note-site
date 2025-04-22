const { MongoClient } = require('mongodb');
const assert = require('assert');

// si importa dei dati
const libriRepo = require("./repos/libriRepo")
const libriData = require("./libri.json")

// const uri = "mongodb://localhost:27017"; in locale
const dbName = 'testDB' // definito su Mongo Atlas 
const uri = `mongodb+srv://admin:admin@prova.25ws1.mongodb.net/${dbName}?retryWrites=true&w=majority`;

async function main() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    await client.connect();

    try {

        // la GET ritorna sempre un ARRAY
        const getData = await libriRepo.get()
        assert.equal(libriData.length, getData.length)  // test OK

        // si filtra in base ad una query
        const filterData = await libriRepo.get({ isbn: getData[4].isbn });
        assert.deepEqual(filterData[0], getData[4]);

        // si limita a n elementi
        const limitData = await libriRepo.get({}, 3);
        assert.equal(limitData.length, 3);

        const id = getData[4]._id.toString();
        const byId = await libriRepo.getById(id);
        assert.deepEqual(byId, getData[4])

        // const results = await libriRepo.loadData(libriData)
        // console.log(`Inserted ${results.insertedCount} books`);
        // assert.equal(libriData.length, results.insertedCount)  // test OK
        // assert.notEqual(libriData.length, results.insertedCount)  // test FAIL



        console.log('Inserted books: ', results.ops);   // cosa si è inserito è undefined

        const newItem = {
            "isbn": "9781593279509",
            "title": "Eloquent JavaScript, Third Edition",
            "subtitle": "A Modern Introduction to Programming",
            "author": "Marijn Haverbeke",
            "published": "2018-12-04T00:00:00.000Z",
            "publisher": "No Starch Press",
            "pages": 472,
            "description": "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
            "website": "http://eloquentjavascript.net/"
          }
          const addedItem = await libriRepo.add(newItem);
          assert(addedItem._id)
          const addedItemQuery = await libriRepo.getById(addedItem._id);
          assert.deepEqual(addedItemQuery, newItem)
      
          const updatedItem = await libriRepo.update(addedItem._id, {
            "isbn": "9781593279509",
            "title": "Eloquent JavaScript, Third Edition",
            "subtitle": "A Modern Introduction to Programming",
            "author": "Marijn Haverbeke",
            "published": "2018-12-04T00:00:00.000Z",
            "publisher": "No Starch Press",
            "pages": 472,
            "description": "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
            "website": "http://eloquentjavascript.net/"
          });
          assert.equal(updatedItem.isbn, "9781593279509");
      
      
          const removed = await libriRepo.remove(addedItem._id);
          assert(removed);
          const deletedItem = await libriRepo.getById(addedItem._id);
          assert.equal(deletedItem, null);

    } catch (error) {
        console.log(error)
    } finally {
        const admin = client.db(dbName).admin();

        // await client.db(dbName).dropDatabase() // si svuota il database
        // console.log(await admin.serverStatus()); non funziona !!!
        console.log(await admin.listDatabases());

        await client.db(dbName).dropDatabase();
        console.log(await admin.listDatabases());

        client.close();
    }

    client.close()
}

main()
