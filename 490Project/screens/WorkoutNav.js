import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BrowseWorkout from './WorkoutScreen.js';
import WorkoutApi from '../WorkoutApi.js';

const Stack = createNativeStackNavigator();

const WorkoutNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BrowseWorkout" component={BrowseWorkout} />
        <Stack.Screen name="ApiScreen" component={ApiScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WorkoutNav;