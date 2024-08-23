import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  room: { type: String, required: true },
  text: { type: String, required: true },
  user: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);
export default Message; // Export default olarak düzenleyin
