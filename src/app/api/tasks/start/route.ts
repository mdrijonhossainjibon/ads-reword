import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/lib/mongoose";
import { Task, UserTask } from "@/models/Task";
import { authOptions } from "@/lib/auth";
 

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const session : any = await getServerSession(authOptions);
 

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

     

    const { taskId } = await request.json();

    const task = await Task.findById(taskId);
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    
    let userTask = await UserTask.findOne({
      userId: session.user.id,
      taskId : task._id
    });


   


  
    if (!userTask) {
      const userTask = new UserTask({
        userId: session.user.id,
        taskId,
        lastResetAt: new Date(),
        progress: 0,
        completed: false,
        attempts: 0
      });
      await userTask.save();
    }

    // Check if task is locked
    const now = new Date();
    const resetInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    if (userTask?.lastResetAt && (now.getTime() - userTask?.lastResetAt.getTime() < resetInterval)) {
      if (userTask.completed) {
        return NextResponse.json({ error: "Task is locked" }, { status: 403 });
      }
    } else {
      // Reset task if 24 hours have passed
      userTask.progress = 0;
      userTask.completed = false;
      userTask.lastResetAt = now;
      await userTask.save();
    }

    // Generate response based on task type
    let responseData: any = { success: true };



    switch (task.type) {
      case 'ad':
        responseData.adUrl = `/mobile/tasks/ad/${taskId}`;
        break;
      case 'subscription':
        responseData.url = task.platformUrl;
        break;
      case 'social':
        responseData.socialUrl = task.platformUrl;
        break;
      case 'promotion':
        responseData.promotionUrl = task.platformUrl;
        break;
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error starting task:", error);
    return NextResponse.json(
      { error: "Failed to start task" },
      { status: 500 }
    );
  }
}
