
import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    AppState,
} from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputBox from "../../../components/inputBox";
import AppButton from "../../../components/appButton";
import Processing from "../../processing";
import { CommonActions } from "@react-navigation/native";
import { CommonStyle } from "../../../theme/style";
import {
	dynamicSize,
	showErrorMessage,
	showSuccessMessage,
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
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const appState = useRef(AppState.currentState);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        mode: 'mobile'
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateForm = () => {
        let newErrors = {};
        if (!formData.username) {
            newErrors.username = 'This field is required.';
        }
        if (!formData.password) {
            newErrors.password = 'This field is required.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onPressLogin(formData);
        }
    };

    const checkTokenAndNavigate = async () => {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "UserProfile" }],
                })
            );
        }
    };

    const onPressLogin = async (data) => {
        try {
            setIsLoading(true);
			console.log("dataReachedAtLogin", data);
			const response = await axiosInstance.post(apiRoutes.signIn, data);
			console.log("responseAfterDispatch", response);
            if (response.data.success) {
                await AsyncStorage.setItem("access_token", response.data.token);
                checkTokenAndNavigate();
            } else {
                setIsOpen(true);
            }
        } catch (error) {
            console.error("Login error:", error);
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
                                {touched.username && errors.username && (
                                    <Text style={CommonStyle.errorMsg}>
                                        {errors.username}
                                    </Text>
                                )}
                            </View>
                            <InputBox
                                placeholder={"username"}
                                changeBorderColor={{
                                    borderColor:
                                        touched.username && errors.username
                                            ? Color.primaryPink
                                            : null,
                                    borderWidth:
                                        touched.username && errors.username ? 1 : null,
                                    marginTop:
                                        touched.username && errors.username
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
                        {touched.password && errors.password && (
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
                                    touched.password && errors.password
                                        ? Color.primaryPink
                                        : null,
                                borderWidth:
                                    touched.password && errors.password ? 1 : null,
                                marginTop:
                                    touched.password && errors.password
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
            {isOpen && (
                <View style={styles.errorModal}>
                    <Text style={styles.errorText}>Invalid login details. Please try again.</Text>
                    <AppButton title="Retry" onPress={() => setIsOpen(false)} />
                </View>
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
	// container: { flex: 1, justifyContent: "center", padding: 16 },
    // title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
    // input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 10 },
    // errorInput: { borderColor: "red" },
    errorText: { color: "red", fontSize: 12 },
    errorModal: { padding: 20, alignItems: "center", backgroundColor: "#fff" },
});

export default SignIn;
