import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchTasksRequest, fetchTasksSuccess, fetchTasksFailure } from './reducer';

function* fetchTasksSaga() {
  try {
    // Replace this with your actual API call
    // const response = yield call(api.fetchTasks);
    // yield put(fetchTasksSuccess(response.data));
  } catch (error) {
    //yield put(fetchTasksFailure(error.message));
  }
}

export function* tasksSaga() {
  ///yield takeLatest(fetchTasksRequest.type, fetchTasksSaga);
}
