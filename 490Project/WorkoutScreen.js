import React from 'react';
import { View, Text } from 'react-native';
import styles from './browseStyle.js';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function BrowseWorkout() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Workout 1</Text>
    </View>
  );
}

function SavedWorkouts() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Workout aksldjf!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

const WorkoutScreen = ({ route }) => {
  return (
        <Tab.Navigator>
        <Tab.Screen name="Browse Workouts" component={BrowseWorkout} options={{ tabBarLabel: 'Browse' }}/>
        <Tab.Screen name="Saved Workouts" component={SavedWorkouts} options={{ tabBarLabel: 'Saved' }}/>
      </Tab.Navigator>
  );
  }


export default WorkoutScreen;