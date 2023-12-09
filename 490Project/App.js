import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { useState, useEffect } from "react";

import CalendarComponent from "./CalendarComponent.js";
import DayScreen from "./DayScreen.js";
import WorkoutScreen from "./WorkoutScreen";
import CookbookScreen from "./CookbookScreen";
import AddScreen from "./AddScreen.js";
import SettingsScreen from "./SettingsScreen.js";

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
        component={() => (
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
