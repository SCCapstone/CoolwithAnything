// WorkoutScreen.js
import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BrowseWorkouts from '../components/BrowseWorkouts';
import SavedWorkouts from '../components/SavedWorkouts';

const Tab = createMaterialTopTabNavigator();

const WorkoutScreen = ({ savedWorkouts, setSavedWorkouts }) => {
  useEffect(() => {
    // Code to run when savedWorkouts change, if necessary
  }, [savedWorkouts]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Browse Workouts"
        component={BrowseWorkouts}
        options={{ tabBarLabel: "Browse" }}
      />
      <Tab.Screen
        name="Saved Workouts"
        children={() => (
          <SavedWorkouts workouts={savedWorkouts} setSavedWorkouts={setSavedWorkouts} />
        )}
        options={{ tabBarLabel: "Saved" }}
      />
    </Tab.Navigator>
  );
};

export default WorkoutScreen;
