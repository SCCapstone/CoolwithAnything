import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen";
import AddTask from "../components/AddTask";
import AddWorkout from "../components/AddWorkout";
import AddMeal from "../components/AddMeal";
import WorkoutScreen from "../screens/WorkoutScreen";
import CookbookScreen from "../screens/CookbookScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
  const navigation = useNavigation();
  const userID = route.params?.userID;
  console.log("checking fetching User ID" + userID);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [savedMeals, setSavedMeals] = useState([]);
  const { showActionSheetWithOptions } = useActionSheet();

  useEffect(() => {
    //debugger; // Code to run when savedWorkouts change, if neces
  }, [savedWorkouts]);
  const openActionSheet = () => {
    const options = ["Create Task", "Create Workout", "Create Meal", "Cancel"];
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            navigation.navigate("Task");
            break;
          case 1:
            navigation.navigate("Workout");
            break;
          case 2:
            navigation.navigate("Meal");
            break;
          default:
            break; // Cancel or outside the options, do nothing
        }
      }
    );
  };

  return (
    <Tab.Navigator
    name="Tab Navigator"
      initialRouteName="Today"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Today") {
            iconName = "calendar";
          } else if (route.name === "Your Workouts") {
            iconName = "dumbbell";
          } else if (route.name === "Your Cookbook") {
            iconName = "food-fork-drink";
          } else if (route.name === "Add") {
            iconName = "plus-circle";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: '#63D4D5', // Color of the icon and text when the tab is active
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          display: "flex",
          backgroundColor: '#3e5e60', 
          borderTopWidth: 0, // Set borderTopWidth to 0 to remove the top border
          elevation: 0,
          shadowOpacity: 0,
        },
      })}
    >
      <Tab.Screen
        name="Today"
        component={HomeScreen}
        initialParams={{ userID: userID }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Add"
        component={View} // This is just a placeholder
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault(); // Prevent default action
            openActionSheet(); // Open action sheet
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
          tabBarTestID: 'add-test'
        }}
      />
      <Tab.Screen
        name="Your Workouts"
        component={WorkoutScreen} // Changed from using children prop for clarity
        initialParams={{
          userID: userID , // Keep only serializable parameters
        }}
        options={{ headerShown: false, tabBarTestID: 'workout-test' }}
      />

      <Tab.Screen
        name="Your Cookbook"
        component={CookbookScreen}
        initialParams={{
          userID: userID,
        }}
        options={{ headerShown: false, tabBarTestID: 'cookbook-test' }}
      />
      {/* Hidden screens for action sheet options */}
      <Tab.Screen
        name="Task"
        component={AddTask}
        options={{ tabBarButton: () => null }}
        initialParams={{ userID: userID }} // Pass the user id to the task screen
      />
      <Tab.Screen
        name="Workout"
        component={AddWorkout}
        options={{ tabBarButton: () => null, headerShown: false }}
        initialParams={{
          userID: userID,
          savedWorkouts: savedWorkouts,
          setSavedWorkouts: setSavedWorkouts,
        }} // Pass the user id to the workout screen
      />
      <Tab.Screen
        name="Meal"
        component={AddMeal}
        options={{ tabBarButton: () => null, headerShown: false }}
        initialParams={{
          userID: userID,
          savedMeals: savedMeals,
          setSavedMeals: setSavedMeals,
        }} // Pass the user id to the meal screen
      />
    </Tab.Navigator>
  );
};



export default TabNavigator;
