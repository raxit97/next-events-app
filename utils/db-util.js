import { MongoClient } from "mongodb";

const connectDatabase = async () => {
    const client = await MongoClient.connect("mongodb+srv://raxitjain:CP7SK7YdhFZvblcG@cluster0.z8bnvsw.mongodb.net/?retryWrites=true&w=majority");
    return client;
};

const insertDocument = async (client, dbName, collection, document) => {
    const eventsDb = client.db(dbName);
    const result = await eventsDb.collection(collection).insertOne(document);
    return result;
};

const getAllDocuments = async (client, dbName, collection, filter, sort) => {
    const eventsDb = client.db(dbName);
    const documents = await eventsDb
        .collection(collection)
        .find(filter)
        .sort(sort)
        .toArray();
    return documents;
}

export { connectDatabase, insertDocument, getAllDocuments };
