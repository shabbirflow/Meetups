import MeetupList from "@/components/meetups/MeetupList";
import React, { useEffect, useState } from "react";
import { DUMMY_MEETUPS } from "@/components/dummydata";
import Head from "next/head";

const index = (props) => {
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

  const res = await fetch('http://localhost:3000/api/meetups', {
    method: "GET", 
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await res.json();
  // console.log("FRONT DATA", data);

  //get data from an API
  return {
    props: {
      meetups: data,
    },
    revalidate: 10, 
//this page will be re-generated at least once every 10 seconds if there are requests coming to this page
  };
}


// export async function getServerSideProps(context) {
//   const req = context.req; 
//   const res = context.res; //request and response objects

//   return { 
//     props: {
//       meetups: DUMMY_MEETUPS,
//     }
//   }
// }

export default index;
