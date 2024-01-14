import { MongoClient } from "mongodb";

import React, { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import Head from 'next/head'



const HomePage = ({ meetups }) => {
    console.log('home rendered');
  return <>
  <Head>
    <title>React meetups</title>
    <meta name="description" content="React meetup pages in next.js"/>
  </Head>
  <MeetupList meetups={meetups} />
  </> 
};

// export function getServerSideProps(context){

//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
  // fetch data
  console.log('called');

  const client = await MongoClient.connect(
    "mongodb+srv://25zeeshanraza:password-1@nextdb.qj8fc1z.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image : meetup.image,
        description : meetup.description,
        id: meetup._id.toString()
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
