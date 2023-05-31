import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // Set up listener for incoming notifications while app is open
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Received a notification while app is open:', notification);
      setNotification(notification);
    });

    // Set up listener for when app is opened from a notification
    const subscriptionOpen = Notifications.addNotificationResponseReceivedListener(notificationOpen => {
      console.log('Opened app from a notification:', notificationOpen);
      setNotification(notificationOpen.notification);
    });

    return () => {
      subscription.remove();
      subscriptionOpen.remove();
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      {notification && (
        <View style={{ marginTop: 16, padding: 20, backgroundColor: '#f5f5f5' }}>
          <Text style={{ fontWeight: 'bold' }}>Received a notification!</Text>
          <Text>{notification.request.content.title}</Text>
          <Text>{notification.request.content.body}</Text>
        </View>
      )}
    </View>
  );
}
