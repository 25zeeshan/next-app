import React from "react";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

const NewMeetupPage = () => {
  const router = useRouter();

  async function onAdd(formData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();

    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Add meetups</title>
        <meta name="description" content="React meetup pages in next.js" />
      </Head>
      <NewMeetupForm onAddMeetup={onAdd} />
    </>
  );
};

export default NewMeetupPage;
