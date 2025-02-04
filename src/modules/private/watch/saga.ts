import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_VIDEO_REQUEST,
  ADD_VIEW_REQUEST,
  FETCH_RELATED_VIDEOS_REQUEST,
} from './types';
import {
  fetchVideoSuccess,
  fetchVideoFailure,
  addViewSuccess,
  addViewFailure,
  fetchRelatedVideosSuccess,
  fetchRelatedVideosFailure,
} from './actions';

function* fetchVideo(action: { type: string; payload: string })  : IterableIterator<any> {
  try {
    const response = yield call(axios.get, `/api/watch/${action.payload}`);
    yield put(fetchVideoSuccess(response.data.video));
    // After fetching video, automatically fetch related videos
    yield put({ type: FETCH_RELATED_VIDEOS_REQUEST, payload: action.payload });
  } catch (error : any) {
    yield put(fetchVideoFailure(error.message));
  }
}

function* addView(action: { type: string; payload: string }) {
  try {
    yield call(axios.post, `/api/watch/${action.payload}/view`);
    yield put(addViewSuccess());
  } catch (error : any) {
    yield put(addViewFailure(error.message));
  }
}

function* fetchRelatedVideos(action: { type: string; payload: string }) : IterableIterator<any> {
  try {
    const response = yield call(axios.get, `/api/watch/${action.payload}/related`);
    yield put(fetchRelatedVideosSuccess(response.data.videos));
  } catch (error : any) {
    yield put(fetchRelatedVideosFailure(error.message));
  }
}

export function* watchSaga() {
  yield takeLatest(FETCH_VIDEO_REQUEST, fetchVideo);
  yield takeLatest(ADD_VIEW_REQUEST, addView);
  yield takeLatest(FETCH_RELATED_VIDEOS_REQUEST, fetchRelatedVideos);
}
