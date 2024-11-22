import AsyncStorage from "@react-native-async-storage/async-storage";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../../apis";
import apiRoutes from "../../../apis/apiRoutes";

export const setNavigationSlice = createSlice({
	name: "setNavigation",
	initialState: {
		status: false,
	},

	reducers: {
		setNavigation: (state, payload) => {
			console.log("payload :", payload);
			state.status = payload.payload.status;
		},
	},
});
export const {setNavigation} = setNavigationSlice.actions;
export default setNavigationSlice.reducer;
