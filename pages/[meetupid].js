import { useRouter } from "next/router";
import React from "react";
import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const detail = (props) => {
  const meetup = props.meetup;

  return (
    <>
    <Head>
      <title>{meetup ? meetup.title : "Loading..."}</title>
      <meta name="description" content={meetup ? meetup.description : "Loading..."} />
    </Head>
      {meetup && (
        <MeetupDetail
          image={meetup.image}
          title={meetup.title}
          address={meetup.location}
          description={meetup.description}
        />
      )}
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://kaderishabbir:shabbir123@meetups.z11w7dw.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetupsIDS = await meetupsCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();
  //only returns _id and not other values
  console.log("meetupsIDS", meetupsIDS);
  const paths = meetupsIDS.map(x => {
    const id = x._id.toString();
    return {params: {meetupid: id}}
  });


  return {
    fallback: true,
    paths: paths
  }

}

export async function getStaticProps(context) {
  console.log(context.params, context.params.meetupid);

  const client = await MongoClient.connect(
    "mongodb+srv://kaderishabbir:shabbir123@meetups.z11w7dw.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetupid = context.params.meetupid;
  const meetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupid),
  });
  console.log("FOUND MEETUP", meetup);
  const { title, location, description, image } = meetup;
  client.close();

  return {
    props: {
      meetup: { title, location, description, image },
    },
  };
}

export default detail;
