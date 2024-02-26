import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BrowseWorkouts from '../components/BrowseWorkouts';
import SavedWorkouts from '../components/SavedWorkouts';

// Notice how we're not passing savedWorkouts and setSavedWorkouts as props anymore
const WorkoutScreen = () => {
  const [activeTab, setActiveTab] = useState('BrowseWorkouts');

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
