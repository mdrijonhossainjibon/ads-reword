import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export interface IUser extends Document {
  telegramId?: string;
  username: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
  role: 'user' | 'admin';
  balance: number;
  watchedAds: number;
  earnedPoints: number;
  dailyLimit: number;
  totalEarned: number;
  createdAt: Date;
  updatedAt: Date;
  comparePassword?(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
   
    telegramId: { type: String, sparse: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, sparse: true },
    password: { type: String  , default : null},
    firstName: { type: String  , default : null},
    lastName: { type: String , default : null},
    photoUrl: { type: String  , default : null},
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    balance: { type: Number, default: 0 },
    watchedAds: { type: Number, default: 0 },
    earnedPoints: { type: Number, default: 0 },
    dailyLimit: { type: Number, default: 10 },
    totalEarned: { type: Number, default: 0 },
  
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password!, salt);
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);
