// /api/new-meetup
//mongodb+srv://25zeeshanraza:password-1@nextdb.qj8fc1z.mongodb.net/?retryWrites=true&w=majority

import { MongoClient } from "mongodb";

async function handler(req, res){
    //console.log(req);
    if(req.method === 'POST'){
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://25zeeshanraza:password-1@nextdb.qj8fc1z.mongodb.net/?retryWrites=true&w=majority')
        const db=client.db();


        const meetupsCollection =db.collection('meetups');
        const result = await meetupsCollection.insertOne(data)

        //console.log(result);

        client.close();

        res.status(201).json({message : "Meetup inserted"})
    }
}

export default handler;