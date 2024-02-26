import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BrowseMeals from '../components/BrowseMeals';
import SavedMeals from '../components/SavedMeals';

// Notice how we're not passing savedWorkouts and setSavedWorkouts as props anymore
const CookbookScreen = () => {
  const [activeTab, setActiveTab] = useState('BrowseMeals');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'BrowseWorkouts':
        return <BrowseMeals />;
      case 'SavedMeals':
        return <SavedMeals />; // No props passed here
      default:
        return <BrowseMeals />; // Default view
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
      <TouchableOpacity onPress={() => setActiveTab("BrowseMeals")}>
        <Text
          style={{
            color: activeTab === "BrowseMeals" ? "#FF7754" : "black",
            fontSize: 16,
          }}
        >
          Browse Meals
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab("SavedMeals")}>
        <Text
          style={{
            color: activeTab === "SavedMeals" ? "#FF7754" : "black",
            fontSize: 16,
          }}
        >
          Saved Meals
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

export default CookbookScreen;
