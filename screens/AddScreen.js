import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddTask from "../components/AddTask";
import AddWorkout from "../components/AddWorkout";
import AddMeal from "../components/AddMeal";

const Stack = createStackNavigator();

const AddScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AddScreenTabs" component={AddScreenTabs} />
    </Stack.Navigator>
  );
};

const AddScreenTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Create Task" component={AddTask} />
      <Tab.Screen name="Create Workout" component={AddWorkout} />
      <Tab.Screen name="Create Meal" component={AddMeal} />
    </Tab.Navigator>
  );
};

export default AddScreen;
