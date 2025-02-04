import mongoose from 'mongoose';
 

const userTaskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  progress: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  lastResetAt: { type: Date, default: Date.now },
  attempts: { type: Number, default: 0 }, // Number of attempts in current period
  history: [{ // History of task completions
    completedAt: { type: Date },
    pointsEarned: { type: Number }
  }]
});
 


const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  points: { type: Number, required: true },
  totalRequired: { type: Number, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['ad', 'subscription', 'social', 'promotion', 'watchAds', 'dailyTarget', 'watchTime']
  }, 
  platformUrl: { type: String }, // URL for subscription/social tasks
  platform: { type: String }, // Platform name (e.g., 'YouTube', 'Telegram')
  duration: { type: Number }, // Duration in seconds for ad tasks
  resetInterval: { type: Number, default: 86400 }, // Reset interval in seconds, default 24 hours
  maxAttempts: { type: Number }, // Maximum number of attempts per reset period
  isActive: { type: Boolean, default: true }, // Whether the task is currently active
  requirements: { type: Map, of: String }, // Additional requirements for the task
  order: { type: Number, default: 0 } // Order in which tasks should be displayed
})
 

export const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export const UserTask = mongoose.models.UserTask || mongoose.model('UserTask', userTaskSchema);