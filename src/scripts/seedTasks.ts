import { connectToDatabase } from "@/lib/mongoose";
import { Task } from "@/models/Task";

const defaultTasks = [
  {
    title: "Watch Premium Ad",
    description: "Watch a 30-second premium advertisement to earn points",
    points: 50,
    totalRequired: 10,
    type: "ad",
    duration: 30,
    maxAttempts: 10,
    order: 1,
    isActive: true
  },
  {
    title: "Subscribe to Channel",
    description: "Subscribe to our partner YouTube channel",
    points: 200,
    totalRequired: 1,
    type: "subscription",
    platform: "YouTube",
    platformUrl: "https://youtube.com/channel/example",
    order: 2,
    isActive: true
  },
  {
    title: "Join Telegram Group",
    description: "Join our Telegram community group",
    points: 150,
    totalRequired: 1,
    type: "social",
    platform: "Telegram",
    platformUrl: "https://t.me/example",
    order: 3,
    isActive: true
  },
  {
    title: "Share App",
    description: "Share our app with your friends on social media",
    points: 100,
    totalRequired: 1,
    type: "promotion",
    requirements: new Map([
      ["platforms", "Twitter,Facebook,Instagram"],
      ["message", "Check out this amazing app! #ExampleApp"]
    ]),
    order: 4,
    isActive: true
  },
  {
    title: "Watch App Promo",
    description: "Watch a featured app promotional video",
    points: 75,
    totalRequired: 5,
    type: "ad",
    duration: 45,
    maxAttempts: 5,
    order: 5,
    isActive: true
  }
];

async function seedTasks() {
  try {
    await connectToDatabase();
    
    // Clear existing tasks
    await Task.deleteMany({});
    
    // Insert new tasks
    await Task.insertMany(defaultTasks);
    
    console.log("Tasks seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding tasks:", error);
    process.exit(1);
  }
}

seedTasks();
