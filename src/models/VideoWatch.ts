// models/VideoWatch.ts
import mongoose from 'mongoose';

const VideoWatchSchema = new mongoose.Schema({
  userId: String,
  videoId: mongoose.Schema.Types.ObjectId,
  watchTime: Number,
  completedAt: Date,
  lastWatchedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const VideoWatch = mongoose.models.VideoWatch || mongoose.model('VideoWatch', VideoWatchSchema);
