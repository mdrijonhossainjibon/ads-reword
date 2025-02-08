import { RootState } from '@/modules/app';

export const selectTelegramState = (state: RootState) => state.private.telegram

export const selectTelegramUser = (state: RootState) => selectTelegramState(state).user;

export const selectTelegramIsAuthenticated = (state: RootState) => 
  selectTelegramState(state).isAuthenticated;

export const selectTelegramLoading = (state: RootState) => 
  selectTelegramState(state).loading;

export const selectTelegramError = (state: RootState) => 
  selectTelegramState(state).error;

export const selectTelegramAccessToken = (state: RootState) => 
  selectTelegramState(state).accessToken;
