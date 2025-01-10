import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import Navigation from './src/routes/navigation';
import { initializePushNotifications, requestUserPermission } from './src/components/NotificationService';
import { AppState, ActivityIndicator, StyleSheet, View } from 'react-native';
import { PermissionScreen } from './src/components/PermissionScreen';
import axiosInstance from './src/apis';
import apiRoutes from './src/apis/apiRoutes';
import { Config } from './src/config';
import { UpdateScreen } from './src/components/UpdateScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [appState, setAppState] = useState('checking'); // States: 'checking', 'permissionsDenied', 'updateRequired', 'ready'
  const [appUrl, setAppUrl] = useState('');

  const handlePermissionCheck = async () => {
    const granted = await requestUserPermission();

    if (granted) {
      initializePushNotifications();
      // handleVersionCheck(); // Perform version check after permissions are granted
    } 
    // else {
    //   setAppState('permissionsDenied'); // Show the PermissionScreen
    // }
  };

  const handleVersionCheck = async () => {
    try {
      const response = await axiosInstance.get(apiRoutes.settings);
      if(response.data.success){
        if (response.data.settingInfo[0].updateAppRequired) {
          if (Config.appVersion != response.data.settingInfo[0].appVersion) {
            setAppState('updateRequired'); // Show update modal
            setAppUrl(response.data.settingInfo.appUrl); // Set app URL from API response
          } else {
            setAppState('ready'); // Proceed to main app
          }
        } else {
          setAppState('ready'); // Proceed to main app
        }
      }
    } catch (error) {
      console.error('Version check failed:', error);
      setAppState('ready'); // Allow app to proceed even if version check fails
    }
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active' && appState === 'permissionsDenied') {
        setAppState('checking');
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    if (appState === 'checking') {
      handlePermissionCheck();
      handleVersionCheck();
    }

    return () => {
      subscription.remove();
    };
  }, [appState]);

  if (appState === 'permissionsDenied') {
    return <PermissionScreen onRequestPermission={handlePermissionCheck} />;
  }

  if (appState === 'checking') {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (appState === 'updateRequired') {
      return <UpdateScreen visible={true} appUrl={appUrl} />;
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
