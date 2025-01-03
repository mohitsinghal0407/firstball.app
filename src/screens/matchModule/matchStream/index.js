import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Dimensions, StatusBar, PanResponder, TouchableOpacity } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { LiveKitRoom, useTracks, VideoTrack, isTrackReference } from '@livekit/react-native';
import { Track } from 'livekit-client';
import BackArrow from '../../../components/backArrow';
import axiosInstance from '../../../apis';
import apiRoutes from '../../../apis/apiRoutes';
import { showErrorMessage } from '../../../utils/helpers';
import Ionicons from 'react-native-vector-icons/Ionicons';

const livekitServerUrl = 'wss://firstball-ge9m4mmg.livekit.cloud';

const MatchStream = ({ route, navigation }) => {
  const { matchId } = route.params;
  const [token, setToken] = useState(null);
  const [match, setMatch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [roomInstance, setRoomInstance] = useState(null);
  const [liveMatches, setLiveMatches] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));

  // Lock to landscape and hide status bar on mount
  useEffect(() => {
    StatusBar.setHidden(true);
    Orientation.lockToLandscape();

    // Clean up function
    return () => {
      StatusBar.setHidden(false);
      Orientation.unlockAllOrientations();

      // Ensure proper cleanup of LiveKit connection
      if (roomInstance) {
        roomInstance.disconnect();
        setRoomInstance(null);
      }
    };
  }, []);

  // Add navigation listener for cleanup
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      if (roomInstance) {
        roomInstance.disconnect();
        setRoomInstance(null);
        setMatch(null);
        setToken(null);
        setLiveMatches([]);
      }
    });

    return unsubscribe;
  }, [navigation, roomInstance]);

  // Fetch live matches
  const getLiveMatches = async () => {
    try {
      const response = await axiosInstance.get(apiRoutes.matches);
      if (response.data.success) {
        const live = response.data.matches.filter(
          (match) => match.status === "live"
        );
        setLiveMatches(live);
        const initialIndex = live.findIndex(match => match._id === matchId);
        setCurrentMatchIndex(initialIndex >= 0 ? initialIndex : 0);
      }
    } catch (error) {
      showErrorMessage(`Live Matches! ${error?.message ? error.message : 'Something went wrong.'}`);
    }
  };

  // Navigation handlers
  const handlePrevMatch = () => {
    if (currentMatchIndex > 0) {
      const prevIndex = currentMatchIndex - 1;
      setCurrentMatchIndex(prevIndex);
      fetchMatchAndToken(liveMatches[prevIndex]._id);
    }
  };

  const handleNextMatch = () => {
    if (currentMatchIndex < liveMatches.length - 1) {
      const nextIndex = currentMatchIndex + 1;
      setCurrentMatchIndex(nextIndex);
      fetchMatchAndToken(liveMatches[nextIndex]._id);
    }
  };

  // Pan Responder for swipe gestures
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 50;
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < -100 && currentMatchIndex < liveMatches.length - 1) {
        // Swipe left - next match
        handleNextMatch();
      } else if (gestureState.dx > 100 && currentMatchIndex > 0) {
        // Swipe right - previous match
        handlePrevMatch();
      }
    },
  });

  // Fetch match and token
  const fetchMatchAndToken = async (matchId) => {
    try {
      setIsLoading(true);
      const { data: streamData } = await axiosInstance.get(`${apiRoutes.matchStream}/${matchId}`);
      
      setToken(streamData.stream);
      setMatch(matchId);
    } catch (error) {
      console.error('Error fetching match or stream data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLiveMatches();
    fetchMatchAndToken(matchId);

    return () => {
      if (roomInstance) {
        roomInstance.disconnect();
      }
    };
  }, [matchId]);

  // Handle LiveKit connection
  const handleConnected = (room) => {
    setIsConnected(true);
    setRoomInstance(room);
  };

  const handleDisconnected = () => {
    setIsConnected(false);
    setRoomInstance(null);
  };

  // Handle dimension changes
  useEffect(() => {
    const onChange = ({ window }) => {
      setWindowDimensions(window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      subscription.remove();
    };
  }, []);

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
    <View style={styles.fullScreenContainer} {...panResponder.panHandlers}>
      <LiveKitRoom
        serverUrl={livekitServerUrl}
        token={token}
        connect={true}
        options={{
          adaptiveStream: true,
          dynacast: true,
          publishDefaults: {
            simulcast: true,
            videoCodec: 'vp8',
          },
          videoCaptureDefaults: {
            resolution: { width: 1920, height: 1080 },
          },
        }}
        onConnected={handleConnected}
        onDisconnected={handleDisconnected}
        style={{ flex: 1 }}
      >
        <View style={styles.headerOverlay}>
          <BackArrow navigation={navigation} colorChange="rgba(255,255,255,0.7)" />
        </View>

        <RoomView isConnected={isConnected} windowDimensions={windowDimensions} />

        <View style={styles.navigationControls}>
          <TouchableOpacity 
            style={[styles.navButton, currentMatchIndex === 0 && styles.disabledButton]} 
            onPress={handlePrevMatch}
            disabled={currentMatchIndex === 0}
          >
            <Ionicons name="chevron-back" size={30} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.navButton, currentMatchIndex === liveMatches.length - 1 && styles.disabledButton]}
            onPress={handleNextMatch}
            disabled={currentMatchIndex === liveMatches.length - 1}
          >
            <Ionicons name="chevron-forward" size={30} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
        </View>
        
      </LiveKitRoom>
    </View>
  );
};

const RoomView = ({ isConnected, windowDimensions }) => {
  const tracks = useTracks([
    { source: Track.Source.Camera },
    { source: Track.Source.ScreenShare },
    { source: Track.Source.Microphone },
  ]);

  const renderTrack = ({ item }) => {
    if (isTrackReference(item) && (item.publication?.kind === 'video' || item.source === Track.Source.ScreenShare)) {
      return (
        <View style={styles.videoContainer}>
          <VideoTrack 
            trackRef={item} 
            style={{
              width: windowDimensions.width, 
              height: windowDimensions.height,
            }}
            objectFit="cover" 
          />
        </View>
      );
    }
    return null;
  };

  if (tracks.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Waiting for video stream...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        renderItem={renderTrack}
        keyExtractor={(item, index) => `${item?.participant?.identity}-${index}`}
        contentContainerStyle={styles.flatListContainer}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 5,
    zIndex: 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  fullscreenVideo: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
    textAlign: 'center',
  },
  muteButtonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 2,
  },
  navigationControls: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    right: 0,
    top: '50%',
    paddingHorizontal: 20,
    zIndex: 2,
  },
  navButton: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default MatchStream;