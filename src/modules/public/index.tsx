import { combineReducers } from "redux";
import { authReducer } from "./auth/reducer";

export const publicReducer =  combineReducers({
    auth: authReducer
})