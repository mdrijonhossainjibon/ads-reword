import { FETCH_TASKS_FAILURE, FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS, WATCH_AD_FAILURE, WATCH_AD_REQUEST, WATCH_AD_SUCCESS } from "./constants";
import {  TasksState } from "./types";


const initialState: TasksState = {
  loading: false,
  error: null,
  tasks: [],
  stats : {
    totalPoints : 0,
    completedTasks : 0
  }
};
 

// Action Creators


// Reducer
export const tasksReducer = (state = initialState, action:  any): TasksState => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TASKS_SUCCESS:
      return { ...state, loading: false, tasks: action.payload.tasks , stats: action.payload.stats };
    case FETCH_TASKS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case WATCH_AD_REQUEST:
      return { ...state, loading: true, error: null };
    case WATCH_AD_SUCCESS:
      return { ...state, loading: false, tasks: action.payload };
    case WATCH_AD_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
