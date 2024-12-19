import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";
import MainContainer from "../../../components/mainContainer";
import { Color } from "../../../theme/colors";
import { CommonStyle } from "../../../theme/style";
import LiveMatchCard from "../../../components/match/liveMatchCard";
import UpcomingMatchCard from "../../../components/match/upcomingMatchCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import axiosInstance from "../../../apis";
import apiRoutes from "../../../apis/apiRoutes";
import { showErrorMessage } from "../../../utils/helpers";

const MatchList = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch matches from the server
  const fetchMatches = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.get(apiRoutes.matches);
      // Set matches if API response is successful
    } catch (error) {
      showErrorMessage(`Error: ${error.message || "Something went wrong."}`);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  // Handle manual refresh button
  const handleRefresh = () => {
    fetchMatches();
  };

  // Pull-to-refresh handler
  const onPullToRefresh = () => {
    setRefreshing(true);
    fetchMatches();
  };

  // Fetch matches on component mount
  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <MainContainer fluid>
      <View style={styles.container}>
        {/* Scrollable Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onPullToRefresh}
              colors={[Color.primaryBlue]}
              tintColor={Color.primaryBlue}
            />
          }
        >
          {/* Live Matches Section */}
          {isLoading ? (
            <ActivityIndicator size="large" color={Color.primaryBlue} />
          ) : (
            <LiveMatchCard />
          )}

          {/* Upcoming Matches Section */}
          <Text style={[styles.sectionTitle]}>
            Upcoming Matches
          </Text>
          {isLoading ? (
            <ActivityIndicator size="large" color={Color.primaryBlue} />
          ) : (
            <UpcomingMatchCard />
          )}
        </ScrollView>

        {/* Fixed Refresh Button */}
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <Ionicons name="refresh" size={24} color={Color.white} />
        </TouchableOpacity>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  sectionTitle: {
    marginVertical: 15,
    fontSize: 22,
    color: Color.primaryBlue,
    textAlign: "center",
  },
  refreshButton: {
    position: "absolute", // Ensures the button is always on the screen
    bottom: 20, // Positioned 20px above the screen bottom
    right: 20, // Positioned 20px from the screen's right edge
    backgroundColor: Color.primaryBlue,
    padding: 15,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default MatchList;
