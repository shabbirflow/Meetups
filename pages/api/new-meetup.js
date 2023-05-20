// /api/new-meetup is the URL
import { MongoClient } from "mongodb";

async function getEvents(req, res) {
  if (req.method === "POST") {

    console.log("HIT IT");

    const data = req.body;
    console.log(data, "BACKEND API ROUTE");
    const { title, image, location, description } = data;

    const client = await MongoClient.connect(
      //returns a promise
      "mongodb+srv://kaderishabbir:shabbir123@meetups.z11w7dw.mongodb.net/?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne({title, image, location, description});
    console.log(result);

    client.close();
    res.status(201).json({ message: "Meetup inserted successfully" });
  }
}

export default getEvents;



// import { MongoClient, ServerApiVersion } from "mongodb";
// const uri = "mongodb+srv://kaderishabbir:shabbir123@meetups.z11w7dw.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run(req) {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");

//     console.log("BACKEND", req.body);
//     const {title, image, description, location} = req.body;

//     const meetupsCollection = client.db().collection("meetups");
//     const result = await meetupsCollection.insertOne({title, image, description, location});
//     console.log("BACKEND", result);
//   }
//    finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// export default async function uploadEventHandler(req, res) {
//   run(req).catch(console.dir);
//   res.status(201).json({ message: "Meetup inserted successfully" })
// }

