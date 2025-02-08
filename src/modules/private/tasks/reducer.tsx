interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TasksState {
  loading: boolean;
  error: string | null;
  tasks: Task[];
}

const initialState: TasksState = {
  loading: false,
  error: null,
  tasks: [],
};

// Action Types
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
export const WATCH_AD_REQUEST = 'WATCH_AD_REQUEST';
export const WATCH_AD_SUCCESS = 'WATCH_AD_SUCCESS';
export const WATCH_AD_FAILURE = 'WATCH_AD_FAILURE';

// Action Creators
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

// Reducer
export const tasksReducer = (state = initialState, action: any): TasksState => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
    case WATCH_AD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };
    case WATCH_AD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case FETCH_TASKS_FAILURE:
    case WATCH_AD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
