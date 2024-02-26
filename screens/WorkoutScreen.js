<<<<<<< HEAD
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
=======
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BrowseWorkouts from '../components/BrowseWorkouts';
import SavedWorkouts from '../components/SavedWorkouts';
import { useWorkouts } from '../services/WorkoutsContext';

// Notice how we're not passing savedWorkouts and setSavedWorkouts as props anymore
const WorkoutScreen = () => {
  const { savedWorkouts, setSavedWorkouts } = useWorkouts();
  const [activeTab, setActiveTab] = useState('BrowseWorkouts');
>>>>>>> cf3c249a52852d8841d87cd23edbcb942b23a65a

  const renderTabContent = () => {
    switch (activeTab) {
      case 'BrowseWorkouts':
        return <BrowseWorkouts />;
      case 'SavedWorkouts':
        return <SavedWorkouts />; // No props passed here
      default:
        return <BrowseWorkouts />; // Default view
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'BrowseWorkouts' && styles.activeTab]}
          onPress={() => setActiveTab('BrowseWorkouts')}
        >
          <Text style={styles.tabText}>Browse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'SavedWorkouts' && styles.activeTab]}
          onPress={() => setActiveTab('SavedWorkouts')}
        >
          <Text style={styles.tabText}>Saved</Text>
        </TouchableOpacity>
      </View>
>>>>>>> cf3c249a52852d8841d87cd23edbcb942b23a65a
      {renderTabContent()}
    </View>
  );
};

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'navy',
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
});

export default WorkoutScreen;
