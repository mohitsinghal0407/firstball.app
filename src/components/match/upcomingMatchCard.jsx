import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";

const API_KEY = "AIzaSyCnRMAllWjnKYvHOpBcM4d0pOeEWydMmiA";
const SPREADSHEET_ID = "16H0aj66tFnrUsXxIiznfaT0m0GBxgPEGj8fCtzCFtzI";
const RANGE = "Sheet1!A2:H";

const UpcomingMatchCard = () => {
  const [matches, setMatches] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch match data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        const data = await response.json();

        if (!data.values) {
          throw new Error("No match data found");
        }

        const matchData = {};

        data.values.forEach((row) => {
          const [date, time, teamOne, teamTwo, location, competition, teamOneLogoUrl, teamTwoLogoUrl] = row;

          if (!matchData[date]) {
            matchData[date] = [];
          }

          matchData[date].push({
            date,
            time,
            teamOne,
            teamTwo,
            location,
            competition,
            teamOneLogoUrl,
            teamTwoLogoUrl,
          });
        });

        setMatches(matchData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch matches. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render individual match card
  const renderMatch = ({ item }) => (
    <View style={styles.matchCard}>
      <Text style={styles.competitionText}>{item.competition}</Text>
      <View style={styles.teamContainer}>
        <View style={styles.teamDetails}>
          {item.teamOneLogoUrl && (
            <Image
              source={{ uri: item.teamOneLogoUrl }}
              style={styles.logo}
              accessibilityLabel={`Logo of ${item.teamOne}`}
            />
          )}
          <Text style={styles.teamText} numberOfLines={2}>
            {item.teamOne}
          </Text>
        </View>
        <Text style={styles.vsText}>vs</Text>
        <View style={styles.teamDetails}>
          {item.teamTwoLogoUrl && (
            <Image
              source={{ uri: item.teamTwoLogoUrl }}
              style={styles.logo}
              accessibilityLabel={`Logo of ${item.teamTwo}`}
            />
          )}
          <Text style={styles.teamText} numberOfLines={2}>
            {item.teamTwo}
          </Text>
        </View>
      </View>
      <View style={styles.matchInfo}>
        <Text style={styles.timeText}>🕒 {item.time}</Text>
        <Text style={styles.locationText}>📍 {item.location}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading matches...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (Object.keys(matches).length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.noMatchesText}>No upcoming matches found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {Object.keys(matches).map((date) => (
        <View key={date} style={styles.dateSection}>
          <Text style={styles.dateText}>{date}</Text>
          <FlatList
            data={matches[date]}
            renderItem={renderMatch}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#2563EB",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  noMatchesText: {
    color: "#6B7280",
    fontSize: 16,
    textAlign: "center",
  },
  dateSection: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563EB",
    textAlign: "center",
    marginVertical: 10,
    borderBottomWidth: 2,
    borderColor: "#2563EB",
    paddingBottom: 5,
  },
  matchCard: {
    backgroundColor: "#E0F2FE",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: "100%",
  },
  competitionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6D28D9",
    textAlign: "center",
    marginBottom: 8,
  },
  teamContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  teamDetails: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 8,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 4,
  },
  teamText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    textAlign: "center",
  },
  vsText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4B5563",
    marginHorizontal: 8,
  },
  matchInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1D4ED8",
  },
  locationText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#6B7280",
  },
});

export default UpcomingMatchCard;
