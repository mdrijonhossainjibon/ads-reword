import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_LOGOUT } from './types';

export const login = (credentials: { username: string; password: string }) => ({
  type: AUTH_LOGIN,
  payload: credentials,
});

export const loginSuccess = (user: any) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error: string) => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: AUTH_LOGOUT,
});
