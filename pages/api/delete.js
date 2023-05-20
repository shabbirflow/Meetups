// /api/new-meetup is the URL
import { MongoClient, ObjectId } from "mongodb";

async function deleteEvent(req, res) {
  if (req.method === "POST") {
    // console.log("HIT IT");
    const body = req.body;
    // console.log(body.id, "BACKEND API ROUTE");

    const client = await MongoClient.connect(
      //returns a promise
      "mongodb+srv://kaderishabbir:shabbir123@meetups.z11w7dw.mongodb.net/?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupCollection = db.collection("meetups");
    // const result = await meetupCollection.findOne({_id: new ObjectId(body.id)});
    const result = await meetupCollection.deleteOne({_id: new ObjectId(body.id)});
    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup Deleted successfully" });
  }
//   res.json({message: "DEFAULT RESPONSE. IDK WHAT TO DO."})
}

export default deleteEvent;
