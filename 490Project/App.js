import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import CalendarComponent from './CalendarComponent.js';
import styles from './styles';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>

      <Text>Calendar</Text>
      <SafeAreaView>
        <CalendarComponent/>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}
