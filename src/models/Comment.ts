import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
  content: { type: String, required: true },
  username: { type: String, required: true },
  avatar: { type: String, required: true },
  likes: { type: Number, default: 0 },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now }
});

export const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
