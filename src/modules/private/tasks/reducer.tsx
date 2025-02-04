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
const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

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

// Reducer
export const tasksReducer = (state = initialState, action: any): TasksState => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
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
    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
