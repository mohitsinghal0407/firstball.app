import React, { useEffect, useState } from 'react';
import { Linking, BackHandler, View, StyleSheet, Text, TouchableOpacity, Modal, AppState } from 'react-native';
import { Color } from '../theme/colors';
// import {Color} from "../../../theme/colors";

export const PermissionScreen = ({ onRequestPermission }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleBackPress = () => {
      BackHandler.exitApp();
      return true; // Prevent default back action
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Listen for app state changes (active or background)
    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        setModalVisible(true); // Show modal again when the app comes to the foreground
      }
      setAppState(nextAppState);
    };

    // Subscribe to app state changes
    const appStateListener = AppState.addEventListener('change', handleAppStateChange);

    // Clean up listeners on unmount
    return () => {
      backHandler.remove();
      appStateListener.remove();
    };
  }, [appState]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>Enable Notifications</Text>
          <Text style={styles.message}>
            Please enable notification permissions in your device settings to continue using the app.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => Linking.openSettings()}>
              <Text style={styles.buttonText}>Open Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.exitButton]} onPress={() => BackHandler.exitApp()}>
              <Text style={styles.exitButtonText}>Exit App</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  alertBox: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    color: '#555',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'space-between', // Add space between the buttons
    width: '100%',
    paddingHorizontal: 10, // Add some horizontal padding
  },
  button: {
    flex: 1, // Make buttons share equal space
    backgroundColor: Color.primaryBlue,
    paddingVertical: 12,
    marginHorizontal: 5, // Add space between buttons
    borderRadius: 5,
    alignItems: 'center',
  },
  exitButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  exitButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
