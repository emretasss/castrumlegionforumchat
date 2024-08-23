import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const { content, author } = await request.json();
    
    if (!content || !author) {
      return NextResponse.json({ message: "Content and author are required" }, { status: 400 });
    }
    
    const newMessage = new Message({ content, author });
    await newMessage.save();
    
    return NextResponse.json({ message: "Message saved successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
