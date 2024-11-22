import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, FlatList} from "react-native";
import {CommonStyle} from "../../theme/style";
import style from "./style";
import Octicons from "react-native-vector-icons/Octicons";
import {Color} from "../../theme/colors";
import {dynamicSize, showErrorMessage} from "../../utils/helpers";
import {useDispatch} from "react-redux";
import {getUserTransactions} from "../../store/features/userTransactionSlice";
import moment from "moment";
import {Fonts} from "../../theme/fonts";
import ScreenLoader from "../screenLoader";
import {
	Collapse,
	CollapseHeader,
	CollapseBody,
	AccordionList,
} from "accordion-collapse-react-native";

const PurchaseHistory = ({questionTitle, previewTitle, navigation}) => {
	const dispatch = useDispatch();
	const [userDetail, setUserDetail] = useState([]);
	const [groupData, setGroupData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [collapseIndex, setCollapseIndex] = useState(false);
	const [totalPredictions, setTotalPredictions] = useState(0);
	const [totalPurchase, settotalPurchase] = useState(0);

	useEffect(() => {
		setIsLoading(true);
		dispatch(getUserTransactions()).then((res) => {
			// console.log("res of the user transactions", res);

			if (res?.payload != undefined && res?.payload != "") {
				if (res?.meta?.requestStatus === "fulfilled") {
					const sum = res?.payload.reduce((accumulator, object) => {
						return accumulator + parseInt(object.amount);
					}, 0);

					settotalPurchase(sum / 100);

					setUserDetail(res?.payload);
					setTotalPredictions(res?.payload.length);
					// settotalPurchase((res?.payload[0]?.amount / 100)/12);
				} else {
					showErrorMessage(res?.error);
				}
			} else {
				// showErrorMessage("Oops ! You don't have any data to display");
				// setTimeout(() => {
				// 	navigation.navigate("SelectGoal");
				// }, 2000);
			}
			setIsLoading(false);
		});
	}, []);

	useEffect(() => {
		if (userDetail.length > 0) {
			const groups = userDetail.reduce((groups, predictNumber) => {
				const date = predictNumber.createdAt.split("T")[0];
				if (!groups[date]) {
					groups[date] = [];
				}
				groups[date].push(predictNumber);
				return groups;
			}, {});

			// Edit: to add it in the array format instead
			const groupArrays = Object.keys(groups).map((date) => {
				return {
					date,
					predictions: groups[date],
				};
			});
			setGroupData(groupArrays);
		}
	}, [userDetail]);

	const [showText, setShowText] = useState(false);

	const itemList = ({item, index}) => {
		console.log("item :", item);

		const sum = item?.predictions.reduce((accumulator, object) => {
			return accumulator + parseInt(object.amount);
		}, 0);
		return (
			<View
				style={{alignSelf: "flex-start", marginVertical: dynamicSize(10, 1)}}
			>
				<>
					<Collapse
						onToggle={(r) =>
							!r ? setCollapseIndex(false) : setCollapseIndex(index)
						}
						isExpanded={collapseIndex === index ? true : false}
					>
						<CollapseHeader>
							<View style={style.toggleBlock}>
								<View style={style.questionSection}>
									<Text
										style={[
											style.questionTittle,
											{
												color:
													collapseIndex === index
														? Color.primaryPink
														: Color.primaryBlue,
											},
										]}
									>
										{item.predictions.length} predictions
									</Text>
									{collapseIndex === index ? null : (
										<Text
											style={[
												CommonStyle.descText,
												{textAlign: "left", paddingTop: dynamicSize(0)},
											]}
										>
											{moment(item.date).format("DD/MM/YYYY")}
										</Text>
									)}
								</View>

								<View
									style={style.dropDown}
									// onPress={() => setShowText(!showText)}
									// onPress={() => handleToggleIcon(item?.id)}
								>
									<Octicons
										name={
											collapseIndex === index ? "chevron-up" : "chevron-down"
										}
										size={24}
										color={
											collapseIndex === index
												? Color.primaryPink
												: Color.primaryBlue
										}
									/>
								</View>
							</View>
						</CollapseHeader>
						<CollapseBody>
							<View style={{marginBottom: dynamicSize(10, 1)}}>
								<Text style={CommonStyle.captionText}>
									<Text style={{fontFamily: Fonts.bold}}>Amount : </Text> $
									{sum / 100}
								</Text>
								{/* <Text style={CommonStyle.captionText}>
									<Text style={{fontFamily: Fonts.bold}}>Status : </Text>
									{item.predictions[0].status}
								</Text> */}
							</View>
						</CollapseBody>
					</Collapse>

					{/* {showText ? (
						<View style={{marginBottom: dynamicSize(10, 1)}}>
							<Text style={CommonStyle.captionText}>
								<Text style={{fontFamily: Fonts.bold}}>Amount : </Text> $
								{item.predictions[0].amount / 100}
							</Text>
							<Text style={CommonStyle.captionText}>
								<Text style={{fontFamily: Fonts.bold}}>Status : </Text>
								{item.predictions[0].status}
							</Text>
						</View>
					) : null} */}

					<View style={style.hrLine}></View>
				</>
			</View>
		);
	};
	return (
		<>
			<View>
				<Text
					style={[
						CommonStyle.descText,
						{fontFamily: Fonts.bold, color: Color.primaryPink},
					]}
				>
					Total Predictions : {totalPredictions}
				</Text>
				<Text
					style={[
						CommonStyle.descText,
						{fontFamily: Fonts.bold, color: Color.primaryPink},
					]}
				>
					Total Amount : ${totalPurchase}
				</Text>
			</View>
			<FlatList
				data={groupData}
				renderItem={(item, index) => itemList(item, index)}
				keyExtractor={(item) => item.title}
			/>
			{isLoading && <ScreenLoader />}
		</>
	);
};
export default PurchaseHistory;
