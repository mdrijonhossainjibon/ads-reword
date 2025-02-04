import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, GET_ME_REQUEST , GET_ME_SUCCESS, GET_ME_FAILURE } from './constants';

interface UserState {
  loading: boolean;
  error: string | null;
  data: any | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  data: null,
};

 

// Action Creators
export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (payload: any) => ({
  type: FETCH_USER_SUCCESS,
  payload,
});

export const fetchUserFailure = (error: string) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

// Reducer
export const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_ME_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ME_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_ME_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
