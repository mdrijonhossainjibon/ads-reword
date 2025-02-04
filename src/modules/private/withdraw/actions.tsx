// actions.ts

import { WITHDRAW_REQUEST, WITHDRAW_SUCCESS, WITHDRAW_FAILURE } from './constants';

export const withdrawRequest = ( payload : any) => ({
  type: WITHDRAW_REQUEST,
  payload,
});

export const withdrawSuccess = (payload: any) => ({
  type: WITHDRAW_SUCCESS,
  payload,
});

export const withdrawFailure = (error: string) => ({
  type: WITHDRAW_FAILURE,
  payload: error,
});
