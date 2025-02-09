import { call, put, takeLatest } from "redux-saga/effects";
 
import { api } from "@/lib/client/api";
import { FETCH_TASKS_REQUEST } from "./constants";
import { fetchTasksSuccess } from "./actions";

 function *  fetchTasksSaga  ()  {
   const response = yield call(api.getTasks );

   console.log(response.data);
   yield  put(fetchTasksSuccess(response.data));
}

export function* tasksSaga() {
  yield takeLatest(FETCH_TASKS_REQUEST, fetchTasksSaga);
}