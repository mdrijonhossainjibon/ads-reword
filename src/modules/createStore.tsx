"use client";

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, rootSaga } from './app';

// Create the Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Enable Redux DevTools Extension if available
const composeEnhancers = 
  (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Create the store with middleware and DevTools integration
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
