import mongoose from 'mongoose';
import { seedUsers } from './userSeed';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ads-tg-next';

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('🌱 Starting database seeding...');

    // Run seeds
    await seedUsers();

    console.log('✨ Database seeding completed successfully');
  } catch (error) {
    console.error('❌ Error during database seeding:', error);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.disconnect();
  }
}

// Run seeding
main();
