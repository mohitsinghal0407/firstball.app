import React, {Component} from "react";
import {
	View,
	Text,
	Modal,
	StyleSheet,
	TouchableWithoutFeedback,
	Dimensions,
} from "react-native";
import {Fonts} from "../../theme/fonts";
import Entypo from "react-native-vector-icons/Entypo";

const PopupCard = ({
	modalVisible,
	setModalVisible,
	modalTitle,
	modalContent,
	modalBodyStyle,
	modalViewStyle,
}) => {
	return (
		<View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<TouchableWithoutFeedback
					onPress={() => setModalVisible(!modalVisible)}
				>
					<View
						style={{
							// flex: 1,
							height:
								Dimensions.get("screen").height -
								Dimensions.get("screen").height * 5,
						}}
					/>
				</TouchableWithoutFeedback>
				<View style={styles.centeredView}>
					<View style={[styles.modalView, {...modalViewStyle}]}>
						<View style={[styles.modalBody, {...modalBodyStyle}]}>
							{modalContent}
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		justifyContent: "center",
		alignItems: "center",
		flex: 2,
		// marginTop: 30,
		backgroundColor: "rgba(0,0,0,0.4)",
	},
	modalView: {
		// margin: 20,
		backgroundColor: "white",
		borderRadius: 15,
		padding: 20,
		alignItems: "center",
		shadowColor: "#828282",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: "80%",
		// marginTop: "-50%",
	},
	modalBody: {
		width: "100%",
		// backgroundColor: "red",
		paddingTop: 10,
		// paddingBottom: 40,
	},
});
export default PopupCard;
