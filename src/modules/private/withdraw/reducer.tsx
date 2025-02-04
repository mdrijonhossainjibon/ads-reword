// reducer.ts

import { WITHDRAW_REQUEST, WITHDRAW_SUCCESS, WITHDRAW_FAILURE } from './constants';

interface WithdrawState {
  loading: boolean;
  error: string | null;
  data: any; // Replace 'any' with your specific data type
}

const initialState: WithdrawState = {
  loading: false,
  error: null,
  data: null,
};

export const withdrawReducer = (state = initialState, action: any): WithdrawState => {
  switch (action.type) {
    case WITHDRAW_REQUEST:
      return { ...state, loading: true, error: null };
    case WITHDRAW_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case WITHDRAW_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
