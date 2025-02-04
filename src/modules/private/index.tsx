import { combineReducers } from "redux";
import { userReducer } from "./user/reducer";
import { withdrawReducer } from "./withdraw/reducer";
import { tasksReducer } from "./tasks/reducer";
import { watchReducer } from "./watch/reducer";

export const privateReducer =  combineReducers({
    
  user: userReducer,
  withdraw: withdrawReducer,
  tasks: tasksReducer,
  watch: watchReducer
})