import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../lib/mongodb'; // MongoDB bağlantı fonksiyonunu içe aktar
import Post from '../../models/Post'; // Post modelini içe aktar

// GET ve POST isteklerini işleyen API route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB(); // Veritabanına bağlan

  switch (req.method) {
    case 'GET':
      try {
        const posts = await Post.find({});
        res.status(200).json(posts);
      } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
      break;

    case 'POST':
      try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json(post);
      } catch (error) {
        res.status(400).json({ message: 'Bad Request' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
