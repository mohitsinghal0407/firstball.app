// src/components/NotificationService.js

import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { Alert } from 'react-native';
import { BackHandler } from 'react-native'; // Import BackHandler to close the app

import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// Request user permission for notifications
export async function requestUserPermission() {
    
    const status = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    
    if (status === RESULTS.DENIED || status === RESULTS.BLOCKED) {
      const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      
      if (result === RESULTS.GRANTED) {
        console.log('Notification permission granted');
        return true;
      } 
      else {
        console.log('Notification permission denied');
        return false;
      }
    } 
    else {
      console.log('Notification permission already granted');
      return true;
    }
  }
  
// Create a notification channel for Android
export function createNotificationChannel() {
  PushNotification.createChannel(
    {
        channelId: 'default',
        channelName: 'Default Channel',
        channelDescription: 'A channel for general notifications',
        soundName: 'default',
        importance: PushNotification.Importance.HIGH,
        vibrate: true,
    },
    (created) => {
        console.log(`createChannel returned '${created}'`);
    }
  );
}

// Handle foreground notifications
export function handleForegroundNotifications() {
  return messaging().onMessage(async remoteMessage => {
    console.log('Foreground message:', remoteMessage);

    // Display the notification using PushNotification
    PushNotification.localNotification({
      channelId: 'default',
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
    });
  });
}

// Handle background and terminated notifications
export function handleBackgroundNotifications() {
  return messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background message:', remoteMessage);
  });
}

// Handle notification when the app is opened from the background
export function handleAppOpenedFromNotification() {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification caused app to open from background:', remoteMessage.notification);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('App opened from a notification:', remoteMessage.notification);
      }
    });
}

// Get FCM Token
export async function getFCMToken() {
  const token = await messaging().getToken();
  console.log('FCM Token:', token);
  return token;
}

// Initialize the push notification setup
export async function initializePushNotifications() {
    const permissionGranted = await requestUserPermission(); // Request permission first
  
    if (permissionGranted) {
        createNotificationChannel();  // Create notification channel only after permission
        getFCMToken();                 // Retrieve the FCM token
        handleForegroundNotifications(); // Handle foreground notifications
        handleBackgroundNotifications(); // Handle background notifications
        handleAppOpenedFromNotification(); // Handle notifications when app opened from background
    }
}
