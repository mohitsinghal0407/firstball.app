import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {View, Text, Image} from "react-native";
import {useSelector} from "react-redux";
import {Color} from "../../theme/colors";
import {CommonStyle} from "../../theme/style";
import {dynamicSize} from "../../utils/helpers";
import {planResults, resultShare} from "../../utils/resources";
import style from "./style";

const SlotsCard = ({navigation, preferredGender}) => {
	console.log("prefferedgencder", preferredGender);
	const result = useSelector((state) => state.plan.data);

	useEffect(() => {
		AsyncStorage.getItem("postdata");
	});

	return (
		<>
			{result?.map((item, id) => {
				return (
					<View
						key={id}
						style={[
							CommonStyle.blueBoxPrice,
							{
								backgroundColor:
									preferredGender == "female"
										? Color.inputPinkBg
										: Color.predictLightBlue,
								paddingTop: dynamicSize(0),
							},
						]}
					>
						<View
							style={{
								alignSelf: "flex-end",
							}}
						>
							<Image
								source={
									preferredGender == "female"
										? resultShare.pinkBlobArrow
										: resultShare.blueBlobArrow
								}
							/>
						</View>
						<View
							style={[
								CommonStyle.headingStyleBar,
								{marginTop: dynamicSize(-20, 1)},
							]}
						>
							<View>
								<Image
									source={
										preferredGender == "female"
											? planResults.slotCalenderPink
											: planResults.slotCalender
									}
								/>
								{/* <Image source={planResults.slotCalenderPink} /> */}
							</View>
							<View style={{paddingLeft: dynamicSize(10)}}>
								<Text
									style={[
										style.slot,
										{
											color:
												preferredGender == "female"
													? Color.primaryPink
													: Color.primaryBlue,
										},
									]}
								>
									Slot {id + 1}
								</Text>
								{/* <Text style={style.dateText}>{startDate[id]}</Text> */}
								<View style={CommonStyle.headingStyleBar}>
									<Text
										style={[
											style.dateText,
											{
												color:
													preferredGender == "female"
														? Color.primaryPink
														: Color.primaryBlue,
											},
										]}
									>
										{moment(item?.start).format("DD MMM")} -&nbsp;
									</Text>
									<Text
										style={[
											style.dateText,
											{
												color:
													preferredGender == "female"
														? Color.primaryPink
														: Color.primaryBlue,
											},
										]}
									>
										{moment(item?.end).format("DD MMM YYYY")}
									</Text>
								</View>
							</View>
						</View>
					</View>
				);
			})}
		</>
	);
};
export default SlotsCard;
