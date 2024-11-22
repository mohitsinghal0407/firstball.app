import React, {useState} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {CommonStyle} from "../../theme/style";
import style from "./style";
import Octicons from "react-native-vector-icons/Octicons";
import {Color} from "../../theme/colors";
import {dynamicSize} from "../../utils/helpers";

const ToogleQuestion = ({questionTitle}) => {
	const [collapseView, setCollapseView] = useState(false);
	const questionData = [
		{
			id: 1,
			questions: "What if my cycle isn’t 28 days?",
			ans: "Baby Genie will have less favorable odds predicting the baby’s gender. While it's still fun to get the prediction out, the algorithm was developed considering a consistent 28 days cycle. Please check back at another time. We are constantly working to improve and will be able to accommodate various cycles.",
		},
		{
			id: 2,
			questions: "How does Baby Genie determine the sex of my child?",
			ans: "Baby Genie uses fertility tracking algorithms based on traditional gender prediction methods.",
		},
		{
			id: 3,
			questions: "What if my previous child was born premature?",
			ans: "Due to the methods in which Baby Genie uses to calculate and predict the gender of the baby, it will have less favorable odds predicting the baby's gender.",
		},
	];

	const handleOpenView = (itemId) => {
		if (collapseView === itemId) {
			setCollapseView(false);
		} else {
			setCollapseView(itemId);
		}
	};
	return (
		<View style={{alignSelf: "flex-start", marginVertical: dynamicSize(10, 1)}}>
			<>
				{questionData.map((item, index) => {
					return (
						<View>
							<View style={style.toggleBlock}>
								<View style={style.questionSection}>
									<Text
										style={[
											style.questionTittle,
											{
												color:
													item?.id == collapseView
														? Color.primaryPink
														: Color.primaryBlue,
											},
										]}
									>
										{item.questions}
									</Text>
									{/* {item?.id == collapseView ? null : (
										<Text
											style={[
												CommonStyle.descText,
												{textAlign: "left", paddingTop: dynamicSize(0)},
											]}
										>
											Preview
										</Text>
									)} */}
								</View>

								<TouchableOpacity
									style={style.dropDown}
									// onPress={() => setShowText(!showText)}
									onPress={() => handleOpenView(item?.id)}
									// onPress={() => handleToggleIcon(item?.id)}
								>
									<Octicons
										name={
											item?.id == collapseView ? "chevron-up" : "chevron-down"
										}
										size={24}
										color={
											item?.id == collapseView
												? Color.primaryPink
												: Color.primaryBlue
										}
									/>
								</TouchableOpacity>
							</View>
							{item?.id == collapseView ? (
								<>
									<View style={{marginBottom: dynamicSize(10, 1)}}>
										<Text style={CommonStyle.captionText}>{item.ans}</Text>
									</View>
								</>
							) : null}
							{/* {showText ? (
								<View style={{marginBottom: dynamicSize(10, 1)}}>
									<Text style={CommonStyle.captionText}>{item.ans}</Text>
								</View>
							) : null} */}

							<View style={style.hrLine}></View>
						</View>
					);
				})}
			</>
		</View>
	);
};
export default ToogleQuestion;
