// AddScreen.js
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddTask from '../components/AddTask';
import AddWorkout from '../components/AddWorkout';
import AddMeal from '../components/AddMeal';

const Tab = createMaterialTopTabNavigator();

const AddScreen = () => {
  
  return (
    <Tab.Navigator>
      <Tab.Screen name="Create Task" component={AddTask} />
      <Tab.Screen name="Create Workout" component={AddWorkout} />
      <Tab.Screen name="Create Meal" component={AddMeal} />
    </Tab.Navigator>
  );
};

export default AddScreen;
