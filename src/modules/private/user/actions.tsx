import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, GET_ME_REQUEST } from './constants';

export const fetchUserRequest = (payload: string) => ({
    type: FETCH_USER_REQUEST,
    payload,
});

export const fetchUserSuccess = (payload: any) => ({
    type: FETCH_USER_SUCCESS,
    payload,
});

export const getMeRequest = () => ({
    type: GET_ME_REQUEST,
});
export const fetchUserFailure = (error: string) => ({
    type: FETCH_USER_FAILURE,
    payload: error,
});