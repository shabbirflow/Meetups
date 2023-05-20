import MeetupList from "@/components/meetups/MeetupList";
import React, { useEffect, useState } from "react";
import { DUMMY_MEETUPS } from "@/components/dummydata";
import Head from "next/head";
import { MongoClient } from "mongodb";

const index = (props) => {

  // console.log(props.meetups);

  return (
    <>
    <Head>
      <title>All Meetups</title>
      <meta name="description" content="List of all meetups" />
    </Head>
      <h1>ALL MEETUPS</h1>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {

  const client = await MongoClient.connect(
    "mongodb+srv://kaderishabbir:shabbir123@meetups.z11w7dw.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        location: meetup.location,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 3,
  };
}


export default index;
