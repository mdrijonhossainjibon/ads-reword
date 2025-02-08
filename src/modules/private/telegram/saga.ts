import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from './actions';
import { TelegramUser } from './types';

interface LoginResponse {
  success: boolean;
  user: TelegramUser;
  accessToken: string;
}

function* handleTelegramLogin(action: ReturnType<typeof actions.telegramLoginRequest>) {
  try {
    const response: { data: LoginResponse } = yield call(
      axios.post,
      '/api/auth/telegram/login',
      action.payload
    );

    if (response.data.success) {
      yield put(actions.telegramLoginSuccess(response.data.user, response.data.accessToken));
      
      // Store the access token in localStorage
      localStorage.setItem('telegram_access_token', response.data.accessToken);
    } else {
      yield put(actions.telegramLoginFailure('Login failed'));
    }
  } catch (error) {
    yield put(actions.telegramLoginFailure(error instanceof Error ? error.message : 'An error occurred'));
  }
}

function* handleTelegramCheckAuth() {
  try {
    const token = localStorage.getItem('telegram_access_token');
    
    if (!token) {
      yield put(actions.telegramCheckAuthFailure('No token found'));
      return;
    }

    const response: { data: LoginResponse } = yield call(
      axios.get,
      '/api/auth/telegram/check',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.data.success) {
      yield put(actions.telegramCheckAuthSuccess(response.data.user, response.data.accessToken));
    } else {
      yield put(actions.telegramCheckAuthFailure('Authentication check failed'));
      localStorage.removeItem('telegram_access_token');
    }
  } catch (error) {
    yield put(actions.telegramCheckAuthFailure(error instanceof Error ? error.message : 'An error occurred'));
    localStorage.removeItem('telegram_access_token');
  }
}

function* handleTelegramLogout() {
  localStorage.removeItem('telegram_access_token');
}

export function* telegramSaga() {
  yield takeLatest(actions.TELEGRAM_LOGIN_REQUEST, handleTelegramLogin);
  yield takeLatest(actions.TELEGRAM_CHECK_AUTH_REQUEST, handleTelegramCheckAuth);
  yield takeLatest(actions.TELEGRAM_LOGOUT, handleTelegramLogout);
}
