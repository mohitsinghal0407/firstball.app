import React, { useEffect, useState, useRef } from "react";
import {
    AppState,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Processing from "../../processing";
import { CommonActions } from "@react-navigation/native";
import apiRoutes from "../../../apis/apiRoutes";
import axiosInstance from "../../../apis";
import DeviceInfo from 'react-native-device-info';
import { Config } from "../../../config";
import { UpdateAppScreen } from "../../../components/UpdateScreen";

const SignIn = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        checkTokenAndNavigate();
    }, []);

    const checkTokenAndNavigate = async () => {
        try {
            // Verify if token is valid by making an API call
            await AsyncStorage.clear();
            const deviceId = await DeviceInfo.getUniqueId();
            const response = await axiosInstance.post(apiRoutes.registerAndLoginForMobileApp, { mode: 'mobile', username: deviceId });
            if (response.data.success) {
				setIsLoading(false);
                await AsyncStorage.setItem("access_token", response.data.token);
                await AsyncStorage.setItem("user_info", JSON.stringify(response.data.user));
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [{ name: "MatchList" }],
                    })
                );
            } else {
                // If token is invalid, remove it
                await AsyncStorage.removeItem("access_token");
            }
        } catch (error) {
            // If verification fails, remove token
            await AsyncStorage.removeItem("access_token");
        }
    };

    return (
        <>
            {isLoading && <Processing />}
        </>
    );
};

export default SignIn;
