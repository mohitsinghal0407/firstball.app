import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    AppState,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputBox from "../../../components/inputBox";
import AppButton from "../../../components/appButton";
import Processing from "../../processing";
import { CommonActions } from "@react-navigation/native";
import { CommonStyle } from "../../../theme/style";
import {
	dynamicSize,
	showErrorMessage,
} from "../../../utils/helpers";
import { loginScreen } from "../../../utils/resources";
import Ionicons from "react-native-vector-icons/Ionicons";
import MainContainer from "../../../components/mainContainer";
import { Color } from "../../../theme/colors";
import PasswordField from "../../../components/passwordField";
import style from "./style";
import apiRoutes from "../../../apis/apiRoutes";
import axiosInstance from "../../../apis";

const SignIn = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const appState = useRef(AppState.currentState);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        mode: 'mobile'
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        checkTokenAndNavigate();
    }, []);

    const validateField = (name, value) => {
        if (!value) {
            return 'This field is required.';
        }
        return '';
    };

    const validateForm = () => {
        let newErrors = {};
        Object.keys(formData).forEach(key => {
            if (key !== 'mode') {
                const error = validateField(key, formData[key]);
                if (error) newErrors[key] = error;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Validate field on change
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onPressLogin(formData);
        }
    };

    const checkTokenAndNavigate = async () => {
        try {
            const token = await AsyncStorage.getItem("access_token");
            if (token) {
                // Verify if token is valid by making an API call
                const response = await axiosInstance.get(apiRoutes.userInfo)
                
                if (response.data.success) {
                    const today = new Date();
                    const expiresAtDate = new Date(response.data.user.expiresAt);
        
                    // Normalize both dates to midnight
                    today.setHours(0, 0, 0, 0);
                    expiresAtDate.setHours(0, 0, 0, 0);
                    // Check if the account is expired
                    if (today < expiresAtDate) {
                        await AsyncStorage.setItem("user_info", JSON.stringify(response.data.user));
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: "MatchList" }],
                            })
                        );
                    }
                } else {
                    // If token is invalid, remove it
                    await AsyncStorage.removeItem("access_token");
                }
            }
        } catch (error) {
            // If verification fails, remove token
            await AsyncStorage.removeItem("access_token");
        }
    };

    const onPressLogin = async (data) => {
        try {
            setIsLoading(true);
			const response = await axiosInstance.post(apiRoutes.signIn, data);
            if (response.data.success) {
                await AsyncStorage.setItem("access_token", response.data.token);
                await AsyncStorage.setItem("user_info", JSON.stringify(response.data.user));
                checkTokenAndNavigate();
            } else {
                showErrorMessage(`Authentication failed! ${response?.message ? response.message : 'Something went wrong.'}`);
            }
        } catch (error) {
            showErrorMessage(`Authentication failed! ${error?.message ? error.message : 'Something went wrong.'}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <Processing />}
            {!isLoading && (
				<MainContainer fluid>
					<View style={style.lockIcon}>
						<Image source={loginScreen.lockIcon} />
						<Text
							style={[
								CommonStyle.appHeading,
								{ fontSize: dynamicSize(30), marginTop: dynamicSize(10, 1) },
							]}
						>
							Sign in
						</Text>
					</View>

                    <View style={{ paddingHorizontal: dynamicSize(5, 1) }}>
                        <View>
                            <View>
                                {errors.username && (
                                    <Text style={CommonStyle.errorMsg}>
                                        {errors.username}
                                    </Text>
                                )}
                            </View>
                            <InputBox
                                placeholder={"username"}
                                changeBorderColor={{
                                    borderColor:
                                        errors.username
                                            ? Color.primaryPink
                                            : null,
                                    borderWidth:
                                        errors.username ? 1 : null,
                                    marginTop:
                                        errors.username
                                            ? dynamicSize(0)
                                            : dynamicSize(20, 1),
                                }}
                                value={formData.username}
                                onChangeText={(value) => handleChange("username", value)}
                                keyboardType="default"
                                showIcon={
                                    <Ionicons
                                        name="person-outline" 
                                        size={20}
                                        color={Color.primaryBlue}
                                    />
                                }
                            />
                        </View>
                        {errors.password && (
                            <Text style={CommonStyle.errorMsg}>
                                {errors.password}
                            </Text>
                        )}
                        <PasswordField
                            placeholder={"***************"}
                            value={formData.password}
                            onChangeText={(value) => handleChange("password", value)}
                            changeBorderColor={{
                                borderColor:
                                    errors.password
                                        ? Color.primaryPink
                                        : null,
                                borderWidth:
                                    errors.password ? 1 : null,
                                marginTop:
                                    errors.password
                                        ? dynamicSize(0)
                                        : dynamicSize(20, 1),
                            }}
                        />									
                        <View style={CommonStyle.topSpacing}></View>
                        <AppButton
                            title={"Get Started"}
                            onPress={handleSubmit}
                            isLoading={isLoading}
                        />
                    </View>
				</MainContainer>  
            )}
        </>
    );
};

const styles = StyleSheet.create({
    closeIcon: {
		backgroundColor: "red",
		alignSelf: "center",
		backgroundColor: "#FFDEE7",
		borderRadius: 50,
		padding: dynamicSize(5, 1),
		marginBottom: dynamicSize(10, 1),
	},
    errorText: { color: "red", fontSize: 12 },
    errorModal: { padding: 20, alignItems: "center", backgroundColor: "#fff" },
});

export default SignIn;
