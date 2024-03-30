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
  const { userID } = route.params;
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [savedMeals, setSavedMeals] = useState([]);
  const { showActionSheetWithOptions } = useActionSheet();
  const navigation = useNavigation();
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
            iconName = "plus-circle"; // Customize as needed
            size = focused ? size + 10 : size; // Increase size if focused
            return (
              <TouchableOpacity
                style={styles.addButton}
                onPress={openActionSheet}
                onLongPress={openActionSheet}
              >
                <MaterialCommunityIcons
                  name={iconName}
                  color={color}
                  size={size}
                />
              </TouchableOpacity>
            );
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarActiveBackgroundColor: "#5da8af",
        tabBarInactiveBackgroundColor: "#3e5e60",
        tabBarStyle: [{ display: "flex", tabBarActiveBackgroundColor: '#3e5e60' }],
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
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TouchableOpacity

              onPress={openActionSheet}
              onLongPress={openActionSheet}
            >
              <MaterialCommunityIcons
                name="plus-circle"
                color={color}
                size={focused ? size + 10 : size}
              />
            </TouchableOpacity>
          ),
          headerShown: false 
        }}
      />
      <Tab.Screen
        name="Your Workouts"
        component={WorkoutScreen} // Changed from using children prop for clarity
        initialParams={{
          userID: userID, // Keep only serializable parameters
        }}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Your Cookbook"
        component={CookbookScreen}
        initialParams={{
          userID: userID,
        }}
        options={{ headerShown: false }}
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
