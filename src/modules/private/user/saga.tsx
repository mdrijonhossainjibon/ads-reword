import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, GET_ME_SUCCESS, GET_ME_FAILURE, GET_ME_REQUEST } from './constants';
import { api } from '@/lib/client/api';

 

function* fetchUserSaga(): IterableIterator<any> {
  try {
    const response: any = yield call(api.getMe);
     
    yield put({ type: FETCH_USER_SUCCESS, payload: response.data });
  } catch (error : any) {
    yield put({ type: FETCH_USER_FAILURE, payload: error.message });
  }
}

function* getMeSaga() : IterableIterator<any> {
  try {
    const response: any = yield call(api.getMe);
    console.log(response.data);
    yield put({ type: GET_ME_SUCCESS, payload: response.data.data });
  } catch (error : any) {
    yield put({ type: GET_ME_FAILURE, payload: error.message });
  }
}

export function* userSaga(): IterableIterator<any> {
  yield takeLatest(FETCH_USER_REQUEST, fetchUserSaga);
  yield takeLatest(GET_ME_REQUEST, getMeSaga);
}