import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
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
  const [matches, setMatches] = useState([]);

  // Fetch matches from the server
  const fetchMatches = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(apiRoutes.matches);
    } catch (error) {
      showErrorMessage(`Error: ${error.message || "Something went wrong."}`);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  // Handle manual refresh button
  const handleRefresh = () => {
    fetchMatches(); // Re-fetch matches on button press
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
      {/* Scrollable Content with Pull-to-Refresh */}
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
        <Text style={[CommonStyle.title, styles.sectionTitle]}>Live Matches</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color={Color.primaryBlue} />
        ) : (
          <LiveMatchCard />
        )}

        {/* Upcoming Matches Section */}
        <Text style={[CommonStyle.title, styles.sectionTitle]}>Upcoming Matches</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color={Color.primaryBlue} />
        ) : (
          <UpcomingMatchCard />
        )}
      </ScrollView>

      {/* Refresh Button */}
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Ionicons name="refresh" size={24} color={Color.white} />
      </TouchableOpacity>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
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
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: Color.primaryBlue,
    padding: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default MatchList;
