import { MongoClient, ServerApiVersion } from "mongodb";
const uri = "mongodb+srv://kaderishabbir:shabbir123@meetups.z11w7dw.mongodb.net/?retryWrites=true&w=majority";

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
    const meetupsCollection = client.db().collection("meetups");
    const meetups = await meetupsCollection.find().toArray();
    // console.log("BACKEND lol", meetups);
    return meetups;
  }
   finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export default async function getMeetups(req, res){
    if(req.method === 'GET'){
        const meetups = await run();
        res.status(201).json(meetups);
    }
}