// WorkoutScreen.js
import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BrowseWorkouts from '../components/BrowseWorkouts';
import SavedWorkouts from '../components/SavedWorkouts';

const Tab = createMaterialTopTabNavigator();

const WorkoutScreen = ({ savedWorkouts, setSavedWorkouts }) => {
  useEffect(() => {
<<<<<<< HEAD
=======
    // TODO: Save workouts
>>>>>>> kaylytran
    // Code to run when savedWorkouts change, if necessary
  }, [savedWorkouts]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Browse Workouts"
        component={BrowseWorkouts}
<<<<<<< HEAD
        options={{ tabBarLabel: "Browse" }}
=======
        options={{ tabBarLabel: "Browse", color: "red" }}
        color={"red"}
>>>>>>> kaylytran
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
