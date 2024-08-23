import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  author: string;
  content: string;
  createdAt: Date;
}

const PostSchema: Schema = new Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model<IPost>('Post', PostSchema);
export { Post };
