import { seedSettings } from './settings';

export default async function seed() {
  try {
    console.log('Starting database seeding...');
    
    await seedSettings();
    
    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

 
