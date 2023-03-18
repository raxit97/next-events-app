import { connectDatabase, insertDocument } from "../../../utils/db-util";

export default async function handler(req, res) {
    if (req.method === "POST") {
        let client;
        const email = req.body.email;
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValid = pattern.test(email);
        if (!email.trim().length === 0 || !isValid) {
            res.status(422).json({ message: "Invalid email address!" });
            return;
        }
        try {
            client = await connectDatabase();
        } catch (error) {
            res.status(500).json({ error: "DB connection failed!" });
        }
        try {
            await insertDocument(client, "events", "newsletter", { email });
        } catch (error) {
            res.status(500).json({ error: "Inserting document failed!!" });
        }
        res.status(201).json({ message: "Signed up!" });
        client.close();
    }
}
