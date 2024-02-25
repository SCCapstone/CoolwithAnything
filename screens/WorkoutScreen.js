// WorkoutScreen.js
import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BrowseWorkouts from "../components/BrowseWorkouts";
import SavedWorkouts from "../components/SavedWorkouts";

const Tab = createMaterialTopTabNavigator();

const WorkoutScreen = ({ savedWorkouts, setSavedWorkouts }) => {
  const [activeTab, setActiveTab] = useState("BrowseWorkouts");

  useEffect(() => {
    // debugger; // Code to run when savedWorkouts change, if necessary
  }, [savedWorkouts]);

  const renderTabContent = () => {
    if (activeTab === "BrowseWorkouts") {
      return <BrowseWorkouts />;
    } else if (activeTab === "SavedWorkouts") {
      return (
        <SavedWorkouts
          workouts={savedWorkouts}
          setSavedWorkouts={setSavedWorkouts}
        />
      );
    }
    // Add more conditions for additional tabs if needed
  };

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
          <SavedWorkouts
            workouts={savedWorkouts}
            setSavedWorkouts={setSavedWorkouts}
          />
        )}
        options={{ tabBarLabel: "Saved" }}
      />
    </Tab.Navigator>
  );
};

export default WorkoutScreen;
