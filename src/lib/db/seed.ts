import { Task } from "@/models/Task";

 

async function seed() {
 
  const tasks = [
    {
      title: "Watch 5 Ads",
      description: "Watch 5 advertisements to earn points",
      points: 50,
      totalRequired: 5,
      type: "watchAds"
    },
    {
      title: "Complete Daily Target",
      description: "Complete your daily ad watching target",
      points: 100,
      totalRequired: 1,
      type: "dailyTarget"
    },
    {
      title: "Watch Ads for 30 mins",
      description: "Watch advertisements for a total of 30 minutes",
      points: 75,
      totalRequired: 30,
      type: "watchTime"
    }
  ];

  await Task.deleteMany({}); // Clear existing tasks
  await Task.insertMany(tasks);

  console.log('Database seeded!');
  process.exit(0);
}

seed().catch(console.error);