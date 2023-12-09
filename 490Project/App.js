// App.js
import React from "react";
import { useState, useEffect } from 'react';
import MainNavigator from "./navigators/MainNavigator";

import CalendarComponent from "./screens/CalendarComponent.js";
import DayScreen from "./screens/DayScreen.js";
import WorkoutScreen from "./screens/WorkoutScreen";
import CookbookScreen from "./screens/CookbookScreen";
import AddScreen from "./screens/AddScreen.js";
import SettingsScreen from "./screens/SettingsScreen.js";
import WorkoutNav from "./screens/WorkoutNav.js";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [savedMeals, setSavedMeals] = useState([]);
  useEffect(() => {}, [savedWorkouts]);
  useEffect(() => {}, [savedMeals]);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Your Workouts"
        component={(WorkoutNav) => (
          <WorkoutScreen
            savedWorkouts={savedWorkouts}
            setSavedWorkouts={setSavedWorkouts}
          />
        )}
        options={{
          tabBarLabel: "Workout",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dumbbell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={() => (
          <AddScreen
            savedWorkouts={savedWorkouts}
            setSavedWorkouts={setSavedWorkouts}
            savedMeals={savedMeals}
            setSavedMeals={setSavedMeals}
          />
        )}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Your Cookbook"
        component={() => (
          <CookbookScreen
            savedMeals={savedMeals}
            setSavedMeals={setSavedMeals}
          />
        )}
        options={{
          tabBarLabel: "Cookbook",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="food-fork-drink"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const CalendarStack = () => {
  return (
    <Stack.Navigator initialRouteName=" ">
      <Stack.Screen name=" " component={CalendarComponent} />
      <Stack.Screen name="DayScreen" component={DayScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
