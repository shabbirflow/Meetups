import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
//our-domain.com/new-meetup

const newMeetup = () => {
  const router = useRouter();

  const addMeetup = async (meetupData) => {
    // console.log(data);
    const res = await fetch("api/new-meetup", {
      body: JSON.stringify(meetupData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    console.log("FRONT", data);
    router.push("/");
  };

  return (
    <>
      <Head><title>New Meetup</title><meta name="description" content="create a new meetup" /></Head>
      <h1>NEW MEETUP</h1>
      <NewMeetupForm onAddMeetup={addMeetup} />
    </>
  );
};

export default newMeetup;