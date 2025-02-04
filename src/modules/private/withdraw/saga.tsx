import { takeLatest, put, call } from 'redux-saga/effects';

import { api } from '@/lib/client/api';
import { withdrawFailure, withdrawRequest } from './actions';
import { WITHDRAW_REQUEST } from './constants';

// Replace this with your actual API call
function* handleWithdraw(action: ReturnType<typeof withdrawRequest>)  : IterableIterator<any> {
  try {
     const {  data } = yield  call(api.withdraw as any, { ...action.payload  });
     console.log(data)
  } catch (error) {
    yield put(withdrawFailure(error instanceof Error ? error.message : 'An error occurred'));
  }
}

export function* withdrawSaga() {
 yield takeLatest(WITHDRAW_REQUEST, handleWithdraw);
}