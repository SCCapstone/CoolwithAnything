import React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function AddTask() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Add Task</Text>
    </View>
  );
}

function AddWorkout() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Add Workout</Text>
    </View>
  );
}

function AddMeal() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Add Meal</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

const AddScreen = ({ route }) => {
  return (
        <Tab.Navigator>
        <Tab.Screen name="Add Task/Event" component={AddTask} options={{ tabBarLabel: 'Task/Event' }}/>
        <Tab.Screen name="Add Workouts" component={AddWorkout} options={{ tabBarLabel: 'Workout' }}/>
        <Tab.Screen name="Add Meal" component={AddMeal} options={{ tabBarLabel: 'Meal'}}/>
      </Tab.Navigator>
  );
  }


export default AddScreen;