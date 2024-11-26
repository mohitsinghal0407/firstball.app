import React, {useState} from "react";
import {View, Text} from "react-native";
import BackArrow from "../../../components/backArrow";
import InputBox from "../../../components/inputBox";
import MainContainer from "../../../components/mainContainer";
import {Color} from "../../../theme/colors";
import {CommonStyle} from "../../../theme/style";
import style from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppButton from "../../../components/appButton";
import {dynamicSize, showErrorMessage, showSuccessMessage} from "../../../utils/helpers";
import {CommonActions} from "@react-navigation/native";
import apiRoutes from "../../../apis/apiRoutes";
import axiosInstance from "../../../apis";

const ChangePassword = ({navigation}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
        password: '',
        newPassword: '',
        confirmPassword: ''
    });
	const [errors, setErrors] = useState({})


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
        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'New password and confirm password does not match';
        }
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

	const handleChangePassword = async () => {
		setIsLoading(true);
		if (!validateForm()) {
			setIsLoading(false);
			return;
		}
		try {
			// API call would go here
			console.log("formData: ", formData);
			const response = await axiosInstance.post(apiRoutes.changePassword, formData);
            if (response.data.success) {
                showSuccessMessage("Password changed successfully");
				navigation.dispatch(
					CommonActions.reset({
						index: 1,
						routes: [{name: "MatchList"}],
					})
				);
            } 
			else {
                showErrorMessage(`Authentication failed! ${response?.message ? response.message : 'Something went wrong.'}`);
            }
		} catch (error) {
			showErrorMessage(error?.message || "Failed to change password");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<MainContainer fluid>
			<BackArrow navigation={navigation} colorChange={Color.primaryBlue} />
			<View style={CommonStyle.headingStyleBar}>
				<View style={style.screenTitle}>
					<Text style={[CommonStyle.appHeading, {textAlign: "left"}]}>
						Change Password
					</Text>
				</View>
			</View>
			<View>
				{errors.password && <Text style={CommonStyle.errorMsg}>{errors.password}</Text>}
			</View>
			<InputBox
				placeholder={"Current Password"}
				secureTextEntry
				changeBorderColor={{
					borderColor: errors.password ? Color.primaryPink : null,
					borderWidth: errors.password ? 1 : null,
					marginTop: errors.password ? dynamicSize(0) : dynamicSize(20, 1),
				}}
				value={formData.password}
				onChangeText={(value) => handleChange("password", value)}
				showIcon={
					<Ionicons
						name="key-outline"
						size={20}
						color={Color.primaryBlue}
					/>
				}
			/>

			<View>
				{errors.newPassword && <Text style={CommonStyle.errorMsg}>{errors.newPassword}</Text>}
			</View>
			<InputBox
				placeholder={"New Password"}
				secureTextEntry
				changeBorderColor={{
					borderColor: errors.newPassword ? Color.primaryPink : null,
					borderWidth: errors.newPassword ? 1 : null,
					marginTop: errors.newPassword ? dynamicSize(0) : dynamicSize(20, 1),
				}}
				value={formData.newPassword}
				onChangeText={(value) => handleChange("newPassword", value)}
				showIcon={
					<Ionicons
						name="lock-closed-outline"
						size={20}
						color={Color.primaryBlue}
					/>
				}
			/>

			<View>
				{errors.confirmPassword && <Text style={CommonStyle.errorMsg}>{errors.confirmPassword}</Text>}
			</View>
			<InputBox
				placeholder={"Confirm New Password"}
				secureTextEntry
				changeBorderColor={{
					borderColor: errors.confirmPassword ? Color.primaryPink : null,
					borderWidth: errors.confirmPassword ? 1 : null,
					marginTop: errors.confirmPassword ? dynamicSize(0) : dynamicSize(20, 1),
				}}
				value={formData.confirmPassword}
				onChangeText={(value) => handleChange("confirmPassword", value)}
				showIcon={
					<Ionicons
						name="lock-closed-outline"
						size={20}
						color={Color.primaryBlue}
					/>
				}
			/>

			<View style={CommonStyle.topSpacing}></View>
			<AppButton
				title={"Change Password"}
				onPress={handleChangePassword}
				isLoading={isLoading}
			/>
		</MainContainer>
	);
};

export default ChangePassword;
