# MongoDB ATLAS (MongoDB in the Cloud):
https://cloud.mongodb.com/v2/67d1b00aecc12a0576998be3#/overview

Tutorial:
https://www.freecodecamp.org/news/how-to-build-a-replit-clone-with-socketio-monaco-editor-and-copilotkit/

Node + ATLAS
https://github.com/mongodb-university/atlas_starter_nodejs/blob/master/app.js

Username: inglorenzocorbella 
Password: eYQKU5N9BvVIkVo2

npm install mongodb


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://inglorenzocorbella:<db_password>@cluster0.peifq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);