"use client";

import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  fetchTasksRequest, 
  fetchTasksSuccess, 
  fetchTasksFailure,
  WATCH_AD_REQUEST,
  watchAdSuccess,
  watchAdFailure
} from './reducer';

interface WatchAdResult {
  success: boolean;
  pointsEarned: number;
  newTotal: number;
  message: string;
}

function* fetchTasksSaga() {
  try {
    // Replace this with your actual API call
      const response = yield call(fetch, '/api/mobile/tasks');
     yield put(fetchTasksSuccess(response.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchTasksFailure(error.message));
    } else {
      yield put(fetchTasksFailure('An unknown error occurred'));
    }
  }
}

function* watchAdSaga() {
  try {
    const response: Response = yield call(fetch, '/api/mobile/watch-ad', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to process ad watch');
    }

    const data: WatchAdResult = yield response.json();
    yield put(watchAdSuccess(data));
  } catch (error) {
    yield put(watchAdFailure(error instanceof Error ? error.message : 'Failed to watch ad'));
  }
}

export function* tasksSaga() {
  yield takeLatest(fetchTasksRequest , fetchTasksSaga);
  yield takeLatest(WATCH_AD_REQUEST, watchAdSaga);
}
