import { FETCH_TASKS_FAILURE, FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS, WATCH_AD_FAILURE, WATCH_AD_REQUEST, WATCH_AD_SUCCESS } from "./constants";
import { Task } from "./types";

export const fetchTasksRequest = () => ({
    type: FETCH_TASKS_REQUEST,
  });
  
  export const fetchTasksSuccess = (tasks: Task[]) => ({
    type: FETCH_TASKS_SUCCESS,
    payload: tasks,
  });
  
  export const fetchTasksFailure = (error: string) => ({
    type: FETCH_TASKS_FAILURE,
    payload: error,
  });
  
  export const watchAdRequest = () => ({
    type: WATCH_AD_REQUEST,
  });
  
  export const watchAdSuccess = (result: any) => ({
    type: WATCH_AD_SUCCESS,
    payload: result,
  });
  
  export const watchAdFailure = (error: string) => ({
    type: WATCH_AD_FAILURE,
    payload: error,
  });