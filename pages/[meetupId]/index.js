import { MongoClient, ObjectId } from "mongodb";

import React from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

const MeetupDetails = ({ meetupData }) => {
  return (
    <>
    <Head>
    <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
    </Head>
      <MeetupDetail
        title={meetupData.title}
        image={meetupData.image}
        address={meetupData.address}
        description={meetupData.description}
      />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://25zeeshanraza:password-1@nextdb.qj8fc1z.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetupIds = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetupIds.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const id = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://25zeeshanraza:password-1@nextdb.qj8fc1z.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetupData = await meetupsCollection.findOne({ _id: new ObjectId(id) });

  client.close();

  return {
    props: {
      meetupData: {
        id: meetupData._id.toString(),
        title: meetupData.title,
        description: meetupData.description,
        image: meetupData.image,
        address: meetupData.address,
      },
    },
  };
}

export default MeetupDetails;
