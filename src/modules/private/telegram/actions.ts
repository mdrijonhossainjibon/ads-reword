import { TelegramUser } from './types';

// Action Types
export const TELEGRAM_LOGIN_REQUEST = 'telegram/LOGIN_REQUEST';
export const TELEGRAM_LOGIN_SUCCESS = 'telegram/LOGIN_SUCCESS';
export const TELEGRAM_LOGIN_FAILURE = 'telegram/LOGIN_FAILURE';

export const TELEGRAM_LOGOUT = 'telegram/LOGOUT';

export const TELEGRAM_CHECK_AUTH_REQUEST = 'telegram/CHECK_AUTH_REQUEST';
export const TELEGRAM_CHECK_AUTH_SUCCESS = 'telegram/CHECK_AUTH_SUCCESS';
export const TELEGRAM_CHECK_AUTH_FAILURE = 'telegram/CHECK_AUTH_FAILURE';

// Action Creators
export const telegramLoginRequest = (userData: TelegramUser) => ({
  type: TELEGRAM_LOGIN_REQUEST as typeof TELEGRAM_LOGIN_REQUEST,
  payload: userData
});

export const telegramLoginSuccess = (userData: TelegramUser, accessToken: string) => ({
  type: TELEGRAM_LOGIN_SUCCESS as typeof TELEGRAM_LOGIN_SUCCESS,
  payload: { user: userData, accessToken }
});

export const telegramLoginFailure = (error: string) => ({
  type: TELEGRAM_LOGIN_FAILURE as typeof TELEGRAM_LOGIN_FAILURE,
  payload: error
});

export const telegramLogout = () => ({
  type: TELEGRAM_LOGOUT as typeof TELEGRAM_LOGOUT
});

export const telegramCheckAuthRequest = () => ({
  type: TELEGRAM_CHECK_AUTH_REQUEST as typeof TELEGRAM_CHECK_AUTH_REQUEST
});

export const telegramCheckAuthSuccess = (userData: TelegramUser, accessToken: string) => ({
  type: TELEGRAM_CHECK_AUTH_SUCCESS as typeof TELEGRAM_CHECK_AUTH_SUCCESS,
  payload: { user: userData, accessToken }
});

export const telegramCheckAuthFailure = (error: string) => ({
  type: TELEGRAM_CHECK_AUTH_FAILURE as typeof TELEGRAM_CHECK_AUTH_FAILURE,
  payload: error
});

export type TelegramActions = 
  | ReturnType<typeof telegramLoginRequest>
  | ReturnType<typeof telegramLoginSuccess>
  | ReturnType<typeof telegramLoginFailure>
  | ReturnType<typeof telegramLogout>
  | ReturnType<typeof telegramCheckAuthRequest>
  | ReturnType<typeof telegramCheckAuthSuccess>
  | ReturnType<typeof telegramCheckAuthFailure>;
