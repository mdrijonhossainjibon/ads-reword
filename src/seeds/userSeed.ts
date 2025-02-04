import mongoose from 'mongoose';
 
import User from '../models/User';

export async function seedUsers() {
  try {
    // Clear existing users
    await User.deleteMany({});

    // Create admin user
    
    const admin = await User.create({
      username: 'admin',
      email: 'tachonline.24@gmail.com',
      password: 'MyP4ssw0rd2024',
      role: 'admin',
      balance: 0,
      watchedAds: 0,
      earnedPoints: 0,
      dailyLimit: 0,
      tasks: [],
    });

    // Create some test users
    const testUsers = [
      {
        username: 'user1',
        email: 'user1@example.com',
        password: 'user123',
        role: 'user',
        balance: 100,
        watchedAds: 5,
        earnedPoints: 50,
        dailyLimit: 10,
        tasks: [],
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        password: 'user123',
        role: 'user',
        balance: 200,
        watchedAds: 8,
        earnedPoints: 80,
        dailyLimit: 10,
        tasks: [],
      },
    ];

    for (const userData of testUsers) {
      await User.create({
        ...userData,
      });
    }

    console.log('✅ Users seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
}
