import {isRejectedWithValue, isFulfilled} from "@reduxjs/toolkit";
import {showErrorMessage} from "../../utils/helpers";
// import { toast } from 'your-cool-library'/

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
	// console.log(api , { action: isRejectedWithValue(action) }, isFulfilled(action))
	// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
	if (isRejectedWithValue(action)) {
		console.log("actionaction :", action);
		// showErrorMessage("We got a rejected action!")
		console.warn("We got a rejected action!");
		// toast.warn({ title: 'Async error!', message: action.error.data.message })
	}

	return next(action);
};
