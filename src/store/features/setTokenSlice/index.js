import AsyncStorage from "@react-native-async-storage/async-storage";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../../apis";
import apiRoutes from "../../../apis/apiRoutes";

export const setUserFcmToken = createAsyncThunk(
	"setUserFcmToken",
	async (data, {rejectWithValue}) => {
		const res = await axiosInstance
			.post(apiRoutes.setUserToken, data)
			.then((resp) => resp.data)
			.catch((err) => {
				return rejectWithValue(err.response.data);
			});
		return res;
	}
);

export const setTokeSlice = createSlice({
	name: "userFcmToken",
	initialState: {
		status: false,
		loading: false,
		error: false,
		data: null,
	},

	extraReducers: {
		[setUserFcmToken.fulfilled]: (state, action) => {
			state.status = true;
			state.loading = false;
			state.error = false;
			state.data = action.payload;
		},
		[setUserFcmToken.pending]: (state, action) => {
			state.status = false;
			state.loading = true;
			state.error = false;
			state.data = null;
		},
		[setUserFcmToken.rejected]: (state, action) => {
			state.status = false;
			state.loading = false;
			state.error = action?.payload;
		},
	},
});
export default setTokeSlice.reducer;
