import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb'; // veya uygun yol
import { Post } from '@/models/Post'; // adlandırılmış export kullanın

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find().sort({ createdAt: -1 }).exec();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to fetch posts', error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const { author, content } = await request.json();
    const post = new Post({ author, content });
    await post.save();
    return NextResponse.json(post);
  } catch (error) {
    console.error('Failed to create post', error);
    return NextResponse.error();
  }
}
