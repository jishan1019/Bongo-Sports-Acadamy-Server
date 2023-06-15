const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion } = require("mongodb");

// Middlewere--------------------
app.use(cors());
app.use(express.json());

// Mongodb Code Here--------------
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER}@cluster0.q1ppz51.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("bongo_sports_db").command({ ping: 1 });

    // Db Collection Code Here---------------------
    const db = client.db("bongo_sports_db");
    const allClasses = db.collection("classes");
    const instractorCollection = db.collection("instractor");
    const facilitiesCollection = db.collection("facilities");

    //All Get Oparation Code Here--------------
    app.get("/classes", async (req, res) => {
      const result = await allClasses.find().toArray();
      res.send(result);
    });

    app.get("/instractor", async (req, res) => {
      const result = await instractorCollection.find().toArray();
      res.send(result);
    });

    app.get("/facilities", async (req, res) => {
      const result = await facilitiesCollection.find().toArray();
      res.send(result);
    });

    // All Post Oparation Code Here---------------------

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//Local Code here---------------
app.get("/", (req, res) => {
  res.send("Bongo Sports Running...");
});

app.listen(port, () => {
  console.log("App Running On Port");
});
