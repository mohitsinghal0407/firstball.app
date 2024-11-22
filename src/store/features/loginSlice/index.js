import AsyncStorage from "@react-native-async-storage/async-storage";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../../apis";
import apiRoutes from "../../../apis/apiRoutes";

export const loginUser = createAsyncThunk(
	"loginUser",
	async (data, { rejectWithValue }) => {
		console.log("dataInSlice", data);
		try {
			const response = await axiosInstance.post(apiRoutes.signIn, data);
			return response.data;
		} catch (err) {
			const sanitizedError = {
				status: err.response?.status,
				message: err.response?.data?.message || "Something went wrong",
			};
			return rejectWithValue(sanitizedError);
		}
	}
);

export const loginSlice = createSlice({
	name: "login",
	initialState: {
		status: false,
		loading: false,
		error: false,
		data: null,
	},

	extraReducers: (builder) => {
		builder
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = true;
				state.loading = false;
				state.error = false;
				state.data = action.payload;
			})
			.addCase(loginUser.pending, (state) => {
				state.status = false;
				state.loading = true;
				state.error = false;
				state.data = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = false;
				state.loading = false;
				state.error = action.payload;
			});
	},
});
export default loginSlice.reducer;
