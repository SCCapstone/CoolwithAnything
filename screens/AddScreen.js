import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddTask from "../components/AddTask";
import AddWorkout from "../components/AddWorkout";
import AddMeal from "../components/AddMeal";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AddScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AddScreenTabs" component={AddScreenTabs} testID="stack-test"/>
    </Stack.Navigator>
  );
};

const AddScreenTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Create Task"
        component={AddTask}
        options={{
          tabBarButton: (props) => <TouchableOpacity {...props} testID="add-task"/>,
          tabBarTestID:"add-task" 
        }}
      />
      <Tab.Screen
        name="Create Workouttttt"
        component={AddWorkout}
        options={{
          tabBarButton: (props) => <TouchableOpacity {...props} testID="add-workout"/>,
          tabBarTestID:"add-workout"
        }}
      />
      <Tab.Screen
        name="Create Meal"
        component={AddMeal}
        options={{
          tabBarButton: (props) => <TouchableOpacity {...props} testID="add-meal"/>,
          tabBarTestID:"add-meal"
        }}
      />
    </Tab.Navigator>
  );
};


export default AddScreen;
