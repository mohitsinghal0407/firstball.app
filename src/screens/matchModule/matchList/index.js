import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import AppButton from "../../../components/appButton";
import MainContainer from "../../../components/mainContainer";
import { Color } from "../../../theme/colors";
import { CommonStyle } from "../../../theme/style";
import { dynamicSize, showErrorMessage } from "../../../utils/helpers";
import PopupCard from "../../../components/popupCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import style from "./style";
import UpcomingMatchCard from "../../../components/match/upcomingMatchCard";
import LiveMatchCard from "../../../components/match/liveMatchCard";

const MatchList = ({ navigation, route }) => {
  const [exitModal, setExitModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const calculateTimeLeft = () => {
    if (!userInfo?.expiresAt) return { years: 0, months: 0, days: 0 };
    
    const now = new Date();
    const expiryDate = new Date(userInfo.expiresAt);
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const totalMonths = Math.floor(diffDays / 30);
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const days = diffDays % 30;
    
    return { years, months, days };
  };

  const logoutApp = async () => {
    setIsLoading(true);
    await AsyncStorage.clear().then(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "SignIn" }],
        })
      );
    });
  };

  const getUserInfo = async () => {
    const user_info = await AsyncStorage.getItem("user_info");
    setUserInfo(JSON.parse(user_info));
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      // Refresh logic handled by LiveMatchCard component
    } catch (error) {
      showErrorMessage(`Matches Refresh! ${error?.message ? error.message : 'Something went wrong.'}`);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    getUserInfo();
  }, []);

  const timeLeft = calculateTimeLeft();

  return (
    <>
      <MainContainer fluid>
        <ScrollView 
          contentContainerStyle={[
            CommonStyle.topSpacing,
            { paddingHorizontal: 10 }
          ]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Color.primaryBlue]}
              tintColor={Color.primaryBlue}
            />
          }
        >
          <Text
            style={[
              CommonStyle.title,
              {
                marginBottom: 15,
                fontSize: 22,
                color: Color.primaryBlue,
                textAlign: "center",
              },
            ]}
          >
            Live Matches
          </Text>

          <LiveMatchCard />

          <Text style={{
            textAlign: 'center',
            color: Color.primaryPink,
            marginTop: 10,
            fontSize: 15,
            fontStyle: 'italic'
          }}>
            Hello {userInfo?.fullName || 'Guest'},{'\n'}
            {timeLeft.years > 0 && `${timeLeft.years} years `}
            {timeLeft.months > 0 && `${timeLeft.months} months `}
            {timeLeft.days > 0 && `${timeLeft.days} days `}
            left in your subscription
          </Text>

          <Text
            style={[
              CommonStyle.title,
              {
                marginTop: 20,
                marginBottom: 15,
                fontSize: 22,
                color: Color.primaryBlue,
                textAlign: "center",
              },
            ]}
          >
            Upcoming Matches
          </Text>
          
          <UpcomingMatchCard />

          <View style={[CommonStyle.topSpacing, { marginBottom: 10 }]} />
        </ScrollView>
      </MainContainer>

      <View
        style={{
          backgroundColor: Color.white,
          borderTopWidth: 1,
          borderColor: Color.primaryBlue + "20",
        }}
      >
        <View
          style={[
            CommonStyle.headingStyleBar,
            {
              paddingBottom: dynamicSize(6, 1),
              paddingHorizontal: dynamicSize(8, 1),
            },
          ]}
        >
          <TouchableOpacity
            style={[
              CommonStyle.headingStyleBar,
              {
                backgroundColor: Color.white,
                padding: 6,
                borderRadius: 6,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 2,
                width: '25%',
                alignSelf: 'flex-end'
              },
            ]}
            onPress={() => setExitModal(!exitModal)}
          >
            <Ionicons
              name="power"
              size={20}
              color={Color.primaryBlue}
              style={{ alignSelf: "center" }}
            />
            <Text style={[style.logoutText, { fontSize: 12 }]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      <PopupCard
        modalContent={
          <View>
            <Text style={[CommonStyle.modalTitle, { fontSize: 16 }]}>
              Are you sure you want to {"\n"}Log Out?
            </Text>
            <View style={[CommonStyle.footer, { marginTop: 15 }]}>
              <View style={{ width: "45%" }}>
                <AppButton
                  title={"No"}
                  textStyle={{ color: Color.primaryBlue, fontSize: 14 }}
                  bgStyle={{ backgroundColor: Color.placeholder, padding: 8 }}
                  onPress={() => setExitModal(!exitModal)}
                />
              </View>
              <View style={{ width: "10%" }} />
              <View style={{ width: "45%" }}>
                <AppButton 
                  title={"Yes"} 
                  onPress={logoutApp}
                  textStyle={{ fontSize: 14 }}
                  bgStyle={{ padding: 8 }}
                />
              </View>
            </View>
          </View>
        }
        modalVisible={exitModal}
        setModalVisible={() => setExitModal(!exitModal)}
      />
    </>
  );
};

export default MatchList;
