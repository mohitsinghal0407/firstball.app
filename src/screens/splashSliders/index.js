import React, {useEffect, useRef, useState} from "react";
import {
	View,
	Text,
	FlatList,
	Image,
	Dimensions,
	BackHandler,
} from "react-native";
import AppButton from "../../components/appButton";
import MainContainer from "../../components/mainContainer";
import {CommonStyle} from "../../theme/style";
import style from "./style";
import Carousel from "react-native-reanimated-carousel";
import {dynamicSize} from "../../utils/helpers";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashSliders = (props) => {
	const width = Dimensions.get("window").width;
	// useEffect(() => {
	// 	const backAction = () => {
	// 		return true;
	// 	};

	// 	const backHandler = BackHandler.addEventListener(
	// 		"hardwareBackPress",
	// 		backAction
	// 	);

	// 	return () => backHandler.remove();
	// }, []);

	const [index, setIndex] = useState(0);
	const isCarousel = useRef(null);
	const [currentSlide, setCurrentSlide] = useState(0);

	const slidersData = [
		{
			id: 1,
			image: require("../../assets/equality.png"),
			heading: "",
			description:
			`the ultimate entertainment app that unveils the mystery of your future family!${'\n'} Using your unique data to provide swift predictions about the gender of your next baby. ${'\n'} Discover the excitement of peeking into the future and unraveling the secrets of your growing family with Baby Genie!`
		},
		{
			id: 2,
			image: require("../../assets/list.png"),
			heading: "Give the Genie few answers",
			description:"While not guaranteeing results, Baby Genie provides strategic guidance on timing intercourse according to your menstrual cycle, which some theories suggest may sway the odds.",
		},
		{
			id: 3,
			image: require("../../assets/social_media.png"),
			heading: "Quick Predictions",
			description:
			"Step into the future of family planning with Baby Genie! Our innovative app uses fertility tracking algorithms to potentially influence your baby's gender. \n Create your own personalized baby gender prediction journey in minutes and enjoy the exciting quest of welcoming your little one into the world!",
		},
	];

	const itemList = ({item}) => {
		return (
			<View style={style.flatBg}>
				<View style={style.textCenter}>
					{item?.id == 3 ? (
						<Image
							source={item.image}
							resizeMode="contain"
							// style={{height: 110, width: 110}}
						/>
					) : (
						<Image
							source={item.image}
							resizeMode="contain"
							// style={{height: 180, width: 180}}
						/>
					)}

					<Text style={style.headingList}>{item.heading}</Text>
					<Text style={[CommonStyle.descText]}>{item.description}</Text>
				</View>
			</View>
		);
	};

	const onCarouselProgressChange = (e) => {
		setCurrentSlide(e);

		// console.log("currentSlide e:", e);
		// console.log("currentSlide :", currentSlide);
	};

	const getStarted = async () => {
		await AsyncStorage.setItem("walkthrow", "true");
		props.navigation.navigate("SelectGoal");
	};
	return (
		<>
			<View style={{flex: 1, backgroundColor: "#fff"}}>
				<View style={CommonStyle.outerWrapper}>
					<Text style={CommonStyle.appHeading}>
						Welcome to {"\n"} Baby Genie!
					</Text>
				</View>
				<View style={{flex: 1, marginTop: dynamicSize(-80)}}>
					<GestureHandlerRootView>
						<Carousel
							width={width}
							mode="parallax"
							autoPlay={false}
							snapEnabled={true}
							data={slidersData}
							scrollAnimationDuration={500}
							renderItem={(item) => itemList(item)}
							onSnapToItem={(e) => onCarouselProgressChange(e)}
						/>
					</GestureHandlerRootView>
				</View>

				<View style={CommonStyle.horizontalWrapper}>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							position: "absolute",
							bottom: 50,
						}}
					>
						<View
							style={[
								CommonStyle.dots,
								currentSlide == "0"
									? {backgroundColor: "#F19CB3"}
									: {backgroundColor: "#FFDEE7"},
							]}
						></View>
						<View
							style={[
								CommonStyle.dots,
								currentSlide == "1"
									? {backgroundColor: "#F19CB3"}
									: {backgroundColor: "#FFDEE7"},
							]}
						></View>
						<View
							style={[
								CommonStyle.dots,
								currentSlide == "2"
									? {backgroundColor: "#F19CB3"}
									: {backgroundColor: "#FFDEE7"},
							]}
						></View>
					</View>
					<View
						style={{
							width: "50%",
							alignSelf: "flex-end",
							marginVertical: dynamicSize(20),
						}}
					>
						<AppButton title={"Get Started"} onPress={() => getStarted()} />
					</View>
				</View>
			</View>
		</>
	);
};
export default SplashSliders;
