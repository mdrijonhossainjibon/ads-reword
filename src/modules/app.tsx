"use client";

import { combineReducers } from 'redux';
import { all, call  } from 'redux-saga/effects';
    

// Public modules
import { publicReducer } from './public';
import { authSaga } from './public/auth/saga';

// Private modules

import { userSaga } from './private/user/saga';

import { tasksSaga } from './private/tasks/saga';
import { withdrawSaga } from './private/withdraw/saga';
import { privateReducer } from './private';
import { watchSaga } from './private/watch/saga';

export const rootReducer = combineReducers({
  public: publicReducer,
  private: privateReducer,
  
});

export function* rootSaga() {
  yield all([
    call(authSaga),
    call(userSaga),
    call(withdrawSaga),
    call(tasksSaga),
    call(watchSaga),
  ]);
}

export type RootState = ReturnType<typeof rootReducer>;

 