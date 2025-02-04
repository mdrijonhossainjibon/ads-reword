// models/Video.ts
import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  youtubeId: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  channelName: { type: String, required: true },
  channelAvatar: { type: String, required: true },
  subscribers: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  points: { type: Number, required: true },
  duration: { type: String, required: true },
  uploadDate: { type: String, required: true },
  descriptionDetails: {
    text: String,
    uploadDate: String,
    category: String,
    tags: [String]
  },
  totalViews: { type: Number, default: 0 },
  isLiked: { type: Boolean, default: false }
}, { 
  timestamps: true 
});

export const Video = mongoose.models.Video || mongoose.model('Video', VideoSchema);
