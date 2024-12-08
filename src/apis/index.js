import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {Config} from "../config";
import RNRestart from "react-native-restart";
const axiosInstance = axios.create({
	baseURL: Config.baseUrl,
});

axiosInstance.interceptors.request.use(
	async function (config) {
		config.headers = Config.appHeader;
		const token = await AsyncStorage.getItem("access_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		// Do something before request is sent
		// console.log(config);
		return config;
	},
	function (error) {
		console.log("Error Interceptor", error);
		// Do something with request error
		// console.log("error", error);
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        console.log("error :", error);

        // Sanitize the error before rejecting
        const sanitizedError = {
            status: error.response?.status,
            message: error.response?.data?.message || "An error occurred",
        };

        return Promise.reject(sanitizedError); // Return only serializable data
    }
);


export default axiosInstance;
