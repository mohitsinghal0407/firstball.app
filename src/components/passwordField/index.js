import React, {useState} from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import {Color} from "../../theme/colors";
import {dynamicSize} from "../../utils/helpers";
import {CommonStyle} from "../../theme/style";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const PasswordField = ({
	style,
	placeholder,
	onChangeText,
	multiline,
	caretHidden,
	numberOfLines,
	textContentType,
	keyboardType,
	placeholderTextColor,
	onSubmitEditing,
	autoFocus,
	value,
	autoCorrect,
	secureTextEntry,
	onBlur,
	invalid,
	onEndEditing,
	maxLength,
	editable,
	showIcon,
	changeBorderColor,
}) => {
	const [passwordVisible, setPasswordVisible] = useState(true);

	return (
		<View style={[CommonStyle.inputBar, {...changeBorderColor}]}>
			<View style={styles.inputField}>
				<TextInput
					style={[CommonStyle.input, {...style}]}
					placeholder={placeholder}
					maxLength={maxLength}
					secureTextEntry={passwordVisible}
					onEndEditing={onEndEditing}
					onChangeText={onChangeText}
					editable={editable}
					value={value}
					onBlur={onBlur}
					multiline={multiline}
					autoCapitalize="none"
					caretHidden={caretHidden}
					numberOfLines={numberOfLines}
					textContentType={textContentType}
					placeholderTextColor={Color.inputPlaceholderColor}
					autoCorrect={autoCorrect}
					keyboardType={keyboardType}
					autoFocus={autoFocus}
					onSubmitEditing={onSubmitEditing}
				/>
			</View>
			<TouchableOpacity
				style={styles.iconField}
				onPress={() => setPasswordVisible(passwordVisible ? false : true)}
			>
				<MaterialIcons
					name={passwordVisible ? "lock-outline" : "lock-open"}
					size={20}
					color={Color.primaryBlue}
				/>
			</TouchableOpacity>
		</View>
	);
};
const styles = StyleSheet.create({
	inputField: {
		width: "80%",
	},
	iconField: {
		width: "20%",
		alignSelf: "center",
		alignItems: "flex-end",
	},
});

export default PasswordField;
