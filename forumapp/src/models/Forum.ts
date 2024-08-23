import mongoose from 'mongoose';

const ForumSchema = new mongoose.Schema({
  room: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Forum = mongoose.model('Forum', ForumSchema);

export default Forum;
