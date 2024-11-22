import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { LiveKitRoom, useTracks, VideoTrack, isTrackReference, RoomAudioRenderer } from '@livekit/react-native';
import { Track } from 'livekit-client';
import BackArrow from '../../components/backArrow';
import axiosInstance from '../../apis';
import apiRoutes from '../../apis/apiRoutes';
import { Color } from '../../theme/colors';

const livekitServerUrl = 'wss://firstball-ge9m4mmg.livekit.cloud';

const MatchStream = ({ route, navigation }) => {
  const { matchId } = route.params;
  const [token, setToken] = useState(null);
  const [match, setMatch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // Track connection status
  const videoContainerRef = useRef(null);

  // Cleanup when unmounting the component
  useEffect(() => {
    const fetchMatchAndToken = async () => {
      try {
        setIsLoading(true);
        const { data: streamData } = await axiosInstance.get(`${apiRoutes.matchStream}/${matchId}`);
        setToken(streamData.stream);

        const { data: matchData } = await axiosInstance.get(`${apiRoutes.matchDetails}/${matchId}`);
        setMatch(matchData.match);
      } catch (error) {
        console.error('Error fetching match or stream data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatchAndToken();

    // Cleanup function for when navigating away from this component
    return () => {
      // Ensure the LiveKit connection is properly cleaned up
      setToken(null);  // Clear token on unmount
      setMatch(null);  // Clear match data
      setIsConnected(false); // Reset connection state
      console.log('Disconnected from LiveKit server (cleanup)');
    };
  }, [matchId]);

  const handleConnected = () => {
    setIsConnected(true);
    console.log('Connected to LiveKit server');
  };

  const handleDisconnected = () => {
    setIsConnected(false);
    console.log('Disconnected from LiveKit server');
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!token || !match) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load stream</Text>
      </View>
    );
  }

  return (
    <>
      <BackArrow navigation={navigation} colorChange={Color.primaryBlue} />
      <Text style={[styles.matchTitle, { fontSize: 24, color: Color.primaryBlue, textAlign: 'center' }]}>
        {match.homeTeam} vs {match.awayTeam}
      </Text>
      <LiveKitRoom
        serverUrl={livekitServerUrl}
        token={token}
        connect={true}
        options={{
          adaptiveStream: { pixelDensity: 'screen' },
        }}
        audio={true}
        video={true}
        onConnected={handleConnected}
        onDisconnected={handleDisconnected}
      >
        <RoomView isConnected={isConnected} />
      </LiveKitRoom>
    </>
  );
};

const RoomView = ({ isConnected }) => {
  const tracks = useTracks(
    [{ source: Track.Source.ScreenShare, withPlaceholder: false }],
    { onlySubscribed: false },
  );

  const renderTrack = ({ item }) => {
    if (isTrackReference(item)) {
      return <VideoTrack trackRef={item} style={styles.participantView} />;
    } else {
      return <View style={styles.participantView} />;
    }
  };

  return (
    <View style={styles.container}>
      {isConnected ? (
        <FlatList 
          data={tracks} 
          renderItem={renderTrack}
          contentContainerStyle={styles.flatListContainer} 
        />
      ) : (
        <Text style={styles.errorText}>Waiting for connection...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  participantView: {
    height: 200,
    width: Dimensions.get('window').width - 20, // Full width minus padding
    marginVertical: 10,
  },
  matchTitle: {
    marginBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MatchStream;
