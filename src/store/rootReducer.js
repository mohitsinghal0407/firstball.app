import {combineReducers} from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
const rootReducer = combineReducers({
	// add slices here
	login: loginSlice,
});
export default rootReducer;
