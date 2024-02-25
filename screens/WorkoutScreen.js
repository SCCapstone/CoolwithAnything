import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BrowseWorkouts from "../components/BrowseWorkouts";
import SavedWorkouts from "../components/SavedWorkouts";

const WorkoutScreen = ({ savedWorkouts, setSavedWorkouts }) => {
  const [activeTab, setActiveTab] = useState("BrowseWorkouts");

  useEffect(() => {
    // TODO: Save workouts
    // Code to run when savedWorkouts change, if necessary
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
    <View>
      {/* Tab Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 10,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity onPress={() => setActiveTab("BrowseWorkouts")}>
          <Text
            style={{
              color: activeTab === "BrowseWorkouts" ? "#FF7754" : "black",
              fontSize: 16,
            }}
          >
            Browse Workouts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("SavedWorkouts")}>
          <Text
            style={{
              color: activeTab === "SavedWorkouts" ? "#FF7754" : "black",
              fontSize: 16,
            }}
          >
            Saved Workouts
          </Text>
        </TouchableOpacity>
        {/* Add more TouchableOpacity elements for additional tabs if needed */}
      </View>

      {/* Render the content based on the active tab */}
      {renderTabContent()}
    </View>
  );
};

export default WorkoutScreen;