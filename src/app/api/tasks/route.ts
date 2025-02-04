import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
 
import { connectToDatabase } from "@/lib/mongoose";
import { Task, UserTask } from "@/models/Task";
 

export async function GET() {
  try {
    await connectToDatabase();
    const session = await getServerSession();

    
  
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tasks = await Task.find();
    const userTasks = await UserTask.find({ userId: session.user.id });

    const userTasksMap = new Map(
      userTasks.map(ut => [ut.taskId.toString(), ut])
    );

    const tasksWithProgress = tasks.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description,
      points: task.points,
      totalRequired: task.totalRequired,
      type: task.type,
      progress: userTasksMap.get(task._id.toString())?.progress || 0,
      completed: userTasksMap.get(task._id.toString())?.completed || false,
       lastResetAt: userTasksMap.get(task._id.toString())?.lastResetAt
    }));

    const totalPoints = userTasks.reduce((sum, ut) => {
      const task = tasks.find(t => t._id.toString() === ut.taskId.toString());
      return sum + (ut.completed ? (task?.points || 0) : 0);
    }, 0);

    const completedTasks = userTasks.filter(ut => ut.completed).length;

    return NextResponse.json({
      tasks: tasksWithProgress,
      stats: {
        totalPoints,
        completedTasks
      }
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await  connectToDatabase();
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { taskId, progress, completed } = await request.json();

    let userTask = await UserTask.findOne({
      userId: session.user.id,
      taskId
    });

    if (!userTask) {
      userTask = new UserTask({
        userId: session.user.id,
        taskId,
        progress: 0,
        completed: false
      });
    }

    userTask.progress = progress;
    userTask.completed = completed;

    await userTask.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}