// Keep unused imports just in case, will delete unused at the end of the project
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView } from 'react-native';
import CalendarComponent from './CalendarComponent.js';
import DayScreen from './DayScreen.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calendar" component={CalendarComponent} />
        <Stack.Screen name="Today" component={DayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
