import React from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import {Color} from "../../theme/colors";
import {dynamicSize} from "../../utils/helpers";
import {CommonStyle} from "../../theme/style";
const InputBox = ({
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
	return (
		<View style={[CommonStyle.inputBar, {...changeBorderColor}]}>
			<View style={styles.inputField}>
				<TextInput
					style={[CommonStyle.input, {...style}]}
					placeholder={placeholder}
					maxLength={maxLength}
					secureTextEntry={secureTextEntry}
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
			<View style={styles.iconField}>{showIcon}</View>
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

export default InputBox;
