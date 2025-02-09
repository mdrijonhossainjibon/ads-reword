export interface Task {
    id: string;
    type: 'ad' | 'subscription' | 'social' | 'promotion';
    title: string;
    description: string;
    points: number;
    status: 'available' | 'completed' | 'locked';
    completedCount?: number;
    maxCount?: number;
    timeLeft?: number;
    platform?: string;
  }
  
export  interface TasksState {
    loading: boolean;
    error: string | null;
    tasks: Task[];
    stats : {
      totalPoints : number;
      completedTasks : number;
    }
  }
  