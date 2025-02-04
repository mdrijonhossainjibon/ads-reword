import { takeLatest, put, call } from 'redux-saga/effects';
import { AUTH_LOGIN } from './types';
import { loginSuccess, loginFailure } from './actions';

// Mock API call - replace with actual API
const loginApi = async (credentials: { username: string; password: string }) => {
  // Implement your API call here
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, username: credentials.username });
    }, 1000);
  });
};

function* loginSaga(action: any) {
  try {
    const user = yield call(loginApi, action.payload);
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

export function* authSaga() {
  yield takeLatest(AUTH_LOGIN, loginSaga);
}
