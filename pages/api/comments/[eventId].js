import { connectDatabase, getAllDocuments, insertDocument } from "../../../utils/db-util";

export default async function handler(req, res) {
    const eventId = req.query.eventId;
    let client;
    try {
        client = await connectDatabase();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "DB connection failed!" });
        return;
    }
    if (req.method === "POST") {
        const { email, name, text } = req.body;
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValid = pattern.test(email);
        if (
            !email || email.trim().length === 0 || !isValid ||
            !name || name.trim() === "" ||
            !text || text.trim() === ""
        ) {
            res.status(422).json({ message: "Invalid inputs!" });
            client.close();
            return;
        }
        const newComment = { name, email, text, eventId };
        try {
            const result = await insertDocument(client, "events", "comments", newComment);
            newComment._id = result.insertedId;
            res.status(201).json({ message: "Added Comment!", comment: newComment });
        } catch (error) {
            res.status(500).json({ error: "Inserting document failed!!" });
        }
    } else if (req.method === "GET") {
        try {
            const documents = await getAllDocuments(client, "events", "comments", { eventId }, { key: -1 });
            res.status(200).json({ comments: documents });
        } catch (error) {
            res.status(500).json({ error: "Getting documents failed!!" });
        }
    }
    client.close();
}
