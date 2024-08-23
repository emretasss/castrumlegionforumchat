// /pages/api/topics.ts

import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Topic from "@/models/Topic";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    if (req.method === "GET") {
        const topics = await Topic.find({}).populate("author");
        return res.status(200).json(topics);
    }

    if (req.method === "POST") {
        const { title, content, author } = req.body;
        const topic = await Topic.create({ title, content, author });
        return res.status(201).json(topic);
    }
}
