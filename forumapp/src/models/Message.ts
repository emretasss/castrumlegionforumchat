import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
  roomId: string;
  userName: string;
  text: string;
}

const messageSchema: Schema = new Schema({
  roomId: { type: String, required: true },
  userName: { type: String, required: true },
  text: { type: String, required: true },
}, { timestamps: true });

const Message = mongoose.model<IMessage>('Message', messageSchema);

export default Message;
