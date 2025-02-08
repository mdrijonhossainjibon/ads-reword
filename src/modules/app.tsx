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
 
import { watchSaga } from './private/watch/saga';
import { telegramReducer } from './private/telegram';
import { userReducer } from './private/user/reducer';
import { withdrawReducer } from './private/withdraw';
import { tasksReducer } from './private/tasks/reducer';
import { watchReducer } from './private/watch/reducer';
 
  



export const privateReducer =  combineReducers({
  telegram : telegramReducer, 
  user: userReducer,
  withdraw: withdrawReducer,
  tasks: tasksReducer,
  watch: watchReducer
})





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

 