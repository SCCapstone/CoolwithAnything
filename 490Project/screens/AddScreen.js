import React from "react";
import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AddWorkout from "./AddWorkouts";
import AddMeals from "./AddMeals";
function AddTask() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Add Task</Text>
    </View>
  );
}

function AddMeal() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Add Meal</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

const AddScreen = ({
  route,
  savedWorkouts,
  setSavedWorkouts,
  savedMeal,
  setSavedMeals,
}) => {
  useEffect(() => {}, [savedWorkouts]);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Add Task/Event"
        component={AddTask}
        options={{ tabBarLabel: "Task/Event" }}
      />
      <Tab.Screen
        name="Add Workouts"
        component={() => (
          <AddWorkout
            savedWorkouts={savedWorkouts}
            setSavedWorkouts={setSavedWorkouts}
          />
        )}
        options={{ tabBarLabel: "Workout" }}
      />
      <Tab.Screen
        name="Add Meal"
        component={() => (
          <AddMeals savedMeal={savedMeal} setSavedMeals={setSavedMeals} />
        )}
        options={{ tabBarLabel: "Meal" }}
      />
    </Tab.Navigator>
  );
};

export default AddScreen;
